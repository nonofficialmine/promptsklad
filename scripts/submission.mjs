// Превращает Issue из формы в карточку content/<section>/<n>-<slug>.md.
// Запуск в Action: ISSUE_BODY, ISSUE_NUMBER, ISSUE_AUTHOR в env.
// Пишет результат в $GITHUB_OUTPUT: ok=true|false, file=..., message=...
import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { spec, validate, splitList } from '../site/validate.mjs';

const NO_RESPONSE = '_No response_';

/** Тело issue-формы ("### Label\n\nvalue") -> { id: value } */
export function parseIssue(body) {
  const byLabel = Object.fromEntries(spec.fields.map((f) => [f.label, f.id]));
  const values = {};
  let current = null;
  let buf = [];
  const flush = () => {
    if (!current) return;
    const v = buf.join('\n').trim();
    values[current] = v === NO_RESPONSE ? '' : v;
  };
  for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
    const m = /^### (.+)$/.exec(line);
    if (m && byLabel[m[1].trim()]) {
      flush();
      current = byLabel[m[1].trim()];
      buf = [];
    } else if (current) {
      buf.push(line);
    }
  }
  flush();
  return values;
}

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

/** values + автор -> текст карточки */
export function render(values, author) {
  const section = spec.sections[values.section];
  const title = values.post_title.replace(/\s+/g, ' ').trim();
  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `tags: ${JSON.stringify(splitList(values.tags))}`,
    `models: ${JSON.stringify(splitList(values.models))}`,
    `author: ${JSON.stringify(author)}`,
    '---',
  ];
  const parts = [
    `# ${escapeText(title)}`,
    `**Автор:** [@${author}](/authors/${author})`,
    `**Для чего:** ${escapeText(values.purpose.trim())}`,
  ];
  if (values.usage?.trim()) parts.push(`**Как использовать:** ${escapeText(values.usage.trim())}`);
  // Промпт — всегда как есть в code-блоке; описание кейса — экранированный markdown.
  parts.push(section === 'prompts' ? fence(values.post_body.trim()) : escapeText(values.post_body.trim()));
  if (values.why?.trim()) {
    const label = section === 'prompts' ? 'Почему работает' : 'Выводы';
    parts.push(`**${label}:** ${escapeText(values.why.trim())}`);
  }
  return `${fm.join('\n')}\n\n${parts.join('\n\n')}\n`;
}

export function processIssue({ body, number, author, root = '.' }) {
  const values = parseIssue(body);
  const errors = validate(values);
  if (Object.keys(errors).length) {
    const labels = Object.fromEntries(spec.fields.map((f) => [f.id, f.label]));
    const list = Object.entries(errors).map(([id, e]) => `- **${labels[id] ?? id}:** ${e}`);
    return { ok: false, message: `Пост не прошёл проверку:\n\n${list.join('\n')}\n\nИсправьте issue (Edit) — проверка запустится снова.` };
  }
  const section = spec.sections[values.section];
  const slug = slugify(values.post_title) || 'post';
  const file = `content/${section}/${number}-${slug}.md`;
  if (existsSync(`${root}/${file}`)) return { ok: false, message: `Файл ${file} уже существует.` };
  writeFileSync(`${root}/${file}`, render(values, author));
  return { ok: true, file, message: `Опубликовано: \`${file}\`` };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const env = process.env;
  const res = processIssue({ body: env.ISSUE_BODY ?? '', number: env.ISSUE_NUMBER, author: env.ISSUE_AUTHOR });
  const out = env.GITHUB_OUTPUT;
  const lines = [`ok=${res.ok}`, `file=${res.file ?? ''}`, `message<<__EOF__\n${res.message}\n__EOF__`];
  if (out) appendFileSync(out, `${lines.join('\n')}\n`);
  console.log(res.message);
}
