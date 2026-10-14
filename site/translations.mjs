// Переводы постов: posts/<раздел>/<slug>.md — оригинал на языке автора,
// posts/<раздел>/<slug>.<lang>.md — машинный перевод (делает scripts/translate.mjs в GitHub Action).
// Используется и сайтом (какой файл отдать на каком языке), и скриптом перевода.

export const LANGS = ['ru', 'uz', 'en'];
const TRANSLATION = /\.(ru|uz|en)\.md$/;

export const isTranslationFile = (name) => TRANSLATION.test(name);
export const translationFile = (file, lang) => file.replace(/\.md$/, `.${lang}.md`);

/** Язык текста автора: кириллица -> ru, узбекская латиница -> uz, иначе en. */
export function detectLang(text) {
  const letters = (text.match(/\p{L}/gu) ?? []).length || 1;
  const cyr = (text.match(/[Ѐ-ӿ]/g) ?? []).length;
  if (cyr / letters > 0.3) return 'ru';
  const uz = (text.match(/[oOgG][‘'ʻ`]|\b(va|uchun|bilan|qanday|emas|kerak|bo‘lsa|qiling|yoki|agar)\b/g) ?? []).length;
  return uz >= 3 ? 'uz' : 'en';
}

// Код в этих разделах — естественный язык (сам промпт, роль агента, SKILL.md): переводим.
// В остальных (хуки, настройки, MCP, плагины, кейсы) код — конфиги и команды: не трогаем.
const PROSE_CODE_SECTIONS = new Set(['prompts', 'agents', 'skills']);
const PROSE_FENCES = new Set(['', 'text', 'md', 'markdown']);

/**
 * Тело markdown -> сегменты. translate=true — отдаём модели, иначе вставляем как есть.
 * Ограждения ``` / ~~~ сохраняются дословно, переводится только содержимое.
 */
export function splitSegments(body, section) {
  const segs = [];
  const re = /^(`{3,}|~{3,})([^\n]*)\n([\s\S]*?)^\1[ \t]*$/gm;
  let last = 0;
  for (let m; (m = re.exec(body)); ) {
    if (m.index > last) segs.push({ value: body.slice(last, m.index), translate: true });
    const info = m[2].trim().toLowerCase();
    const prose = PROSE_CODE_SECTIONS.has(section) && PROSE_FENCES.has(info);
    segs.push({ value: `${m[1]}${m[2]}\n`, translate: false });
    segs.push({ value: m[3], translate: prose });
    segs.push({ value: m[1], translate: false });
    last = m.index + m[0].length;
  }
  if (last < body.length) segs.push({ value: body.slice(last), translate: true });
  // Пустые/пробельные куски переводить незачем.
  return segs.map((s) => (s.translate && !s.value.trim() ? { ...s, translate: false } : s));
}

export function splitFrontmatter(md) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(md);
  return m ? { fm: m[1], body: md.slice(m[0].length) } : { fm: '', body: md };
}

export function fmValue(fm, key) {
  const raw = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(fm)?.[1]?.trim();
  if (raw === undefined) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

const NAMES = {
  ru: { ru: 'русского', uz: 'узбекского', en: 'английского' },
  uz: { ru: 'rus tilidan', uz: 'o‘zbek tilidan', en: 'ingliz tilidan' },
  en: { ru: 'Russian', uz: 'Uzbek', en: 'English' },
};
const BANNER = {
  ru: (src, link) => `> Машинный перевод с ${NAMES.ru[src]}. [Оригинал](${link})`,
  uz: (src, link) => `> ${NAMES.uz[src][0].toUpperCase()}${NAMES.uz[src].slice(1)} mashina tarjimasi. [Asl nusxa](${link})`,
  en: (src, link) => `> Machine translation from ${NAMES.en[src]}. [Original](${link})`,
};

/** Маршрут оригинала: язык оригинала задаёт префикс (ru — без префикса). */
export const originalRoute = (src, section, slug) => `${src === 'ru' ? '' : `/${src}`}/${section}/${slug}`;

/** Тексты для перевода: заголовок, описание, переводимые сегменты. */
export function collectTexts(md, section) {
  const { fm, body } = splitFrontmatter(md);
  const segs = splitSegments(body, section);
  const title = fmValue(fm, 'title') ?? '';
  const description = fmValue(fm, 'description');
  const texts = [title, ...(description ? [description] : []), ...segs.filter((s) => s.translate).map((s) => s.value)];
  return { fm, segs, hasDescription: !!description, texts };
}

const UNSAFE = /<[a-zA-Z!/]|javascript:|data:text\/html/i;

/** Собрать файл перевода. Возвращает null, если ответ модели не прошёл проверку. */
export function assemble({ fm, segs, hasDescription }, translated, { src, lang, section, slug }) {
  const [title, ...rest] = translated;
  const description = hasDescription ? rest.shift() : undefined;
  const pieces = segs.filter((s) => s.translate);
  if (rest.length !== pieces.length) return null;
  // Модель не должна добавлять HTML/скрипты, которых не было в оригинале.
  for (let i = 0; i < pieces.length; i++) if (UNSAFE.test(rest[i]) && !UNSAFE.test(pieces[i].value)) return null;
  if (typeof title !== 'string' || !title.trim() || UNSAFE.test(title)) return null;

  let i = 0;
  const body = segs.map((s) => (s.translate ? rest[i++] : s.value)).join('');
  const keep = fm
    .split('\n')
    .filter((l) => !/^(title|description|lang|translated_from|machine_translation):/.test(l));
  const head = [
    '---',
    `title: ${JSON.stringify(title.replace(/\s+/g, ' ').trim())}`,
    ...(description ? [`description: ${JSON.stringify(description.replace(/\s+/g, ' ').trim())}`] : []),
    ...keep,
    `lang: ${JSON.stringify(lang)}`,
    `translated_from: ${JSON.stringify(src)}`,
    'machine_translation: true',
    '---',
  ];
  const banner = BANNER[lang](src, originalRoute(src, section, slug));
  const text = body.replace(/^\n+/, '');
  // Плашка — сразу под заголовком H1, если он есть.
  const h1 = /^# [^\n]*\n/.exec(text);
  const withBanner = h1 ? `${h1[0]}\n${banner}\n${text.slice(h1[0].length)}` : `${banner}\n\n${text}`;
  return `${head.join('\n')}\n\n${withBanner}`;
}

// ---------- Markdown -> чистый текст для модели машинного перевода и обратно ----------
// Модель получает только «листья» — фрагменты текста. Префиксы строк (#, -, 1., >, |),
// `код`, адреса ссылок, URL и маркеры **жирного** остаются нетронутыми.
const LINE_PREFIX = /^(\s*(?:#{1,6}\s+|[-*+]\s+|\d+\.\s+|>\s?)*)/;
// Тире-разделитель тоже держим вне модели: NLLB его теряет.
const INLINE = /(`[^`\n]+`)|\[([^\]\n]*)\]\(([^)\s]*)\)|\*\*([^*\n]+)\*\*|(https?:\/\/[^\s)]+)|(\||\s[—–]\s)/g;
const HAS_LETTER = /\p{L}/u;

/** Текст -> { parts, leaves }: parts — строки и номера листьев. */
export function toLeaves(text) {
  const parts = [];
  const leaves = [];
  const leaf = (s) => {
    // Пробелы по краям — вне листа, иначе модель их съест.
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
    if (m[1]) parts.push(m[1]);
    // По одному предложению на лист: модель машинного перевода реже теряет куски текста.
    m[2]?.split(/(?<=[.!?…])(\s+)(?=\S)/).forEach((piece, i) => {
      if (i % 2) parts.push(piece);
      else if (HAS_LETTER.test(piece)) parts.push({ leaf: leaves.push(piece) - 1 });
      else if (piece) parts.push(piece);
    });
    if (m[3]) parts.push(m[3]);
  };
  text.split('\n').forEach((line, li) => {
    if (li) parts.push('\n');
    const prefix = LINE_PREFIX.exec(line)[1];
    if (prefix) parts.push(prefix);
    const rest = line.slice(prefix.length);
    let last = 0;
    for (const m of rest.matchAll(INLINE)) {
      leaf(rest.slice(last, m.index));
      if (m[1] || m[5] || m[6]) parts.push(m[0]);
      else if (m[3] !== undefined) {
        parts.push('[');
        leaf(m[2]);
        parts.push(`](${m[3]})`);
      } else {
        parts.push('**');
        leaf(m[4]);
        parts.push('**');
      }
      last = m.index + m[0].length;
    }
    leaf(rest.slice(last));
  });
  return { parts, leaves };
}

export const fromLeaves = ({ parts }, translated) =>
  parts.map((p) => (typeof p === 'string' ? p : translated[p.leaf].replace(/\n/g, ' '))).join('');
