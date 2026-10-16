// Карточка поста: values формы -> posts/<section>/<дата>-<slug>.md.
// Используется функцией публикации (api/submit.ts).
import { spec, splitList } from './validate.mjs';
import { TAGS, TOPICS } from './taxonomy.mjs';

const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k',
  л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q',
  ғ: 'g', ҳ: 'h',
};

export function slugify(s) {
  return [...s.toLowerCase()]
    .map((c) => TRANSLIT[c] ?? c)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)
    .replace(/-+$/, '');
}

// .md в Rspress пропускает сырой HTML -> экранируем всё, что вне code-блоков.
// {} — на случай компиляции как MDX (страховка, .md сейчас не MDX).
const escapeText = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');

function fence(s) {
  const longest = Math.max(2, ...[...s.matchAll(/`+/g)].map((m) => m[0].length));
  const f = '`'.repeat(longest + 1);
  return `${f}text\n${s}\n${f}`;
}

const oneLine = (s) => (s ?? '').replace(/\s+/g, ' ').trim();

/** Тело карточки по кускам. Из них собирается и .md (render), и предпросмотр в форме. */
export function blocks(values) {
  const section = spec.sections[values.section];
  const name = oneLine(values.author_name);
  const topic = TOPICS[values.topic]?.ru ?? values.topic;
  const tags = splitList(values.tags).map((t) => TAGS[t]?.ru ?? t);
  const field = (label, v) => (v?.trim() ? [{ kind: 'field', label, text: v.trim() }] : []);
  return [
    { kind: 'title', text: oneLine(values.post_title) },
    { kind: 'meta', items: [...(topic ? [['Тема', topic]] : []), ...(tags.length ? [['Теги', tags.join(', ')]] : [])] },
    ...(name ? [{ kind: 'field', label: 'Автор', text: name }] : []),
    ...field('Для чего', values.purpose),
    ...field('Как использовать', values.usage),
    // Промпт/конфиг — как есть в code-блоке; описание кейса — текстом (markdown).
    { kind: section !== 'cases' ? 'code' : 'text', text: (values.post_body ?? '').trim() },
    ...field(section === 'cases' ? 'Выводы' : 'Почему работает', values.why),
    ...field('Комментарий', values.comment),
  ];
}

const toMarkdown = (b) => {
  if (b.kind === 'title') return `# ${escapeText(b.text)}`;
  if (b.kind === 'meta') return b.items.map(([k, v]) => `**${k}:** ${v}`).join(' · ');
  if (b.kind === 'field') return `**${b.label}:** ${escapeText(b.text)}`;
  return b.kind === 'code' ? fence(b.text) : escapeText(b.text);
};

/** values -> текст карточки */
export function render(values, now = new Date()) {
  const title = oneLine(values.post_title);
  const name = oneLine(values.author_name);
  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    // Дата добавления — для ленты «Новое».
    `date: ${JSON.stringify(now.toISOString().slice(0, 10))}`,
    // Сниппет для поисковиков — из «Для чего».
    ...(values.purpose?.trim() ? [`description: ${JSON.stringify(oneLine(values.purpose).slice(0, 160))}`] : []),
    `topic: ${JSON.stringify(values.topic)}`,
    `tags: ${JSON.stringify(splitList(values.tags))}`,
    `models: ${JSON.stringify(splitList(values.models))}`,
    ...(name ? [`author_name: ${JSON.stringify(name)}`] : []),
    '---',
  ];
  return `${fm.join('\n')}\n\n${blocks(values).map(toMarkdown).join('\n\n')}\n`;
}

/** Путь файла: дата + случайный суффикс исключают коллизии без чтения репозитория. */
export function postPath(values, now = new Date(), rand = Math.random) {
  const section = spec.sections[values.section];
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const id = Math.floor(rand() * 0xffff).toString(16).padStart(4, '0');
  return `posts/${section}/${date}-${id}-${slugify(values.post_title) || 'post'}.md`;
}
