import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, render, postPath, blocks } from './post.mjs';
import { spec, validate, findSecret } from './validate.mjs';
import { POST } from '../api/submit.ts';
import { BODY_EXAMPLES } from './components/bodyExamples.ts';
import { loadDraft, saveDraft, clearDraft } from './components/draft.ts';

const good = {
  section: 'Промпт',
  topic: 'dev',
  post_title: 'Ревью SQL-запросов',
  purpose: 'Найти медленные места в запросах',
  post_body: 'Ты — DBA. Проанализируй запрос и найди проблемы с индексами.',
  tags: 'sql,code-review',
};

test('slugify: кириллица и узбекская латиница', () => {
  assert.equal(slugify('Ревью SQL-запросов'), 'revyu-sql-zaprosov');
  assert.equal(slugify("O‘zbekcha so'z"), 'o-zbekcha-so-z');
  assert.equal(slugify('!!!'), '');
});

test('postPath: раздел, дата, суффикс, slug', () => {
  const p = postPath({ ...good, section: 'Хук' }, new Date('2026-10-05T12:00:00Z'), () => 0.5);
  assert.equal(p, 'posts/hooks/20261005-7fff-revyu-sql-zaprosov.md');
});

test('позитив: промпт — в code-блоке, тема и теги во frontmatter и тексте, без автора', () => {
  const md = render(good);
  assert.match(md, /topic: "dev"/);
  assert.match(md, /tags: \["sql","code-review"\]/);
  assert.match(md, /\*\*Тема:\*\* Разработка · \*\*Теги:\*\* SQL, код-ревью/);
  assert.match(md, /```text\nТы — DBA/);
  assert.doesNotMatch(md, /Автор|author_name/);
});

test('SEO: description из «Для чего» (одна строка, до 160 символов), без него — нет', () => {
  assert.match(render({ ...good, purpose: 'Найти\nмедленные   места' }), /^description: "Найти медленные места"$/m);
  assert.equal(render({ ...good, purpose: 'x'.repeat(300) }).match(/^description: "(x+)"$/m)[1].length, 160);
  assert.doesNotMatch(render({ ...good, purpose: '' }), /^description:/m);
});

test('позитив: имя автора попадает в frontmatter и текст', () => {
  const md = render({ ...good, author_name: '  Али  ' });
  assert.match(md, /author_name: "Али"/);
  assert.match(md, /\*\*Автор:\*\* Али/);
});

test('позитив: кейс рендерится текстом с «Выводы»', () => {
  const md = render({ ...good, section: 'Кейс', why: 'Индексы решают' });
  assert.doesNotMatch(md, /```text/);
  assert.match(md, /\*\*Выводы:\*\* Индексы решают/);
});

test('позитив: скилл публикуется в posts/skills', () => {
  assert.match(postPath({ ...good, section: 'Скилл' }), /^posts\/skills\//);
});

test('обязательные — только раздел, тема, название, содержимое', () => {
  const errs = validate({});
  assert.deepEqual(Object.keys(errs).sort(), ['post_body', 'post_title', 'section', 'topic']);
});

test('позитив: минимальный пост без необязательных полей', () => {
  const min = { section: 'Кейс', topic: 'research', post_title: 'Короткий кейс', post_body: 'Описание кейса достаточной длины.' };
  assert.deepEqual(validate(min), {});
  const md = render(min);
  assert.doesNotMatch(md, /Для чего|Теги|Комментарий/);
});

test('негатив: тема и теги только из списка', () => {
  assert.equal(validate({ ...good, topic: 'мемы' }).topic, 'Выберите из списка');
  assert.equal(validate({ ...good, tags: 'git,хакинг' }).tags, 'Выберите из списка');
  assert.equal(validate({ ...good, tags: 'git,sql,tests,docs,bugs,security' }).tags, 'Не больше 5 тегов');
});

test('позитив: комментарий выводится и экранируется', () => {
  const md = render({ ...good, comment: 'от себя <b>важно</b> {x}' });
  assert.match(md, /\*\*Комментарий:\*\* от себя &lt;b&gt;важно&lt;\/b&gt; &#123;x&#125;/);
});

test('негатив: короткое / длинное / неизвестный раздел / >5 тегов / javascript:', () => {
  const errs = validate({ ...good, post_title: 'abc', post_body: 'x'.repeat(6001), section: 'Мем', tags: 'git,sql,tests,docs,ci-cd,security', purpose: 'кликни [тут](javascript:alert(1))' });
  assert.match(errs.post_title, /Минимум 5/);
  assert.match(errs.post_body, /Максимум 6000/);
  assert.equal(errs.section, 'Неизвестный раздел');
  assert.equal(errs.tags, 'Не больше 5 тегов');
  assert.equal(errs.purpose, 'Недопустимое содержимое');
});

test('ошибки на узбекском и английском', () => {
  assert.equal(validate({}, 'uz').post_title, 'Majburiy maydon');
  assert.equal(validate({}, 'en').post_title, 'Required field');
});

test('безопасность: HTML и {} экранируются вне code-блока, внутри — как есть', () => {
  const md = render({ ...good, section: 'Кейс', post_title: '<script>alert(1)</script> {a}', purpose: 'p {b}', post_body: '<b>x</b> {e}', author_name: '<i>n</i>' });
  const text = md.split('---').slice(2).join('---');
  assert.doesNotMatch(text, /<script>|<b>|<i>|[{}]/);
  assert.match(render({ ...good, post_body: '<b>prompt</b>' }), /```text\n<b>prompt<\/b>\n```/);
});

test('безопасность: ``` в промпте не выходит за code-блок', () => {
  assert.match(render({ ...good, post_body: 'a\n```\n<script>x</script>\n```' }), /````text\n/);
});

test('безопасность: переводы строк в title/имени не ломают frontmatter', () => {
  const md = render({ ...good, post_title: 'a"\ntags: evil', author_name: 'x\nauthor: y' });
  assert.equal(md.match(/^tags:/gm).length, 1);
  assert.equal(md.match(/^author/gm).length, 1);
});

// Ключи собираем из кусков, чтобы сканеры секретов GitHub не приняли тест за утечку.
const fake = (prefix, n = 40) => prefix + 'a1B2c3D4e5'.repeat(Math.ceil(n / 10)).slice(0, n);
const KEYS = {
  anthropic: fake('sk-' + 'ant-api03-'),
  openai: fake('sk-' + 'proj-'),
  github: fake('gh' + 'p_', 36),
  githubPat: fake('github' + '_pat_', 30),
  aws: 'AKIA' + 'Q3EGRTLMKD7WPZ2N',
  telegram: '7412589630:' + fake('AA', 33),
  privateKey: '-----BEGIN ' + 'OPENSSH PRIVATE KEY-----',
  dbUrl: 'postgres' + '://admin:S3cretPass77@db.host:5432/app',
  envLine: 'API_KEY' + '=f81a9c2e4b7d6013',
  jsonPassword: '"password": "' + 'Tr0ub4dor-3xyz"',
  bearer: 'Authorization: Bearer ' + fake('', 32),
};

test('ключи и пароли: находим каждый вид', () => {
  for (const [kind, key] of Object.entries(KEYS)) assert.ok(findSecret(`конфиг:\n${key}\n`), kind);
});

test('ключи и пароли: заглушки и обычный текст — не ключи', () => {
  const ok = [
    '"env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<ваш токен>" }',
    'OPENAI_API_KEY=your-api-key-here',
    'API_KEY=' + 'sk-' + 'x'.repeat(30),
    'Authorization: Bearer ${GITHUB_TOKEN}',
    'max_tokens: 4096',
    'postgres' + '://user:password@localhost/db',
    'postgres' + '://postgres:postgres@localhost:5432/db',
    'AKIA' + 'IOSFODNN7EXAMPLE',
    'Ты — строгий ревьюер. Ниже дифф.',
    'https://github.com/nonofficialmine/promptsklad',
  ];
  for (const s of ok) assert.equal(findSecret(s), null, s);
});

test('ключи и пароли: ошибка в любом текстовом поле, ключ в ней не целиком', () => {
  const errs = validate({ ...good, post_body: `Мой конфиг:\n${KEYS.anthropic}`, comment: KEYS.dbUrl });
  assert.match(errs.post_body, /^Похоже на ключ или пароль \(«sk-ant-a…»\)/);
  assert.ok(!errs.post_body.includes(KEYS.anthropic));
  assert.match(errs.comment, /Похоже на ключ/);
  assert.match(validate({ ...good, usage: KEYS.github }, 'uz').usage, /^Kalit yoki parolga/);
  assert.match(validate({ ...good, usage: KEYS.github }, 'en').usage, /^Looks like a key/);
});

test('примеры в поле «Содержимое»: есть у каждого раздела на всех языках и не похожи на ключи', () => {
  for (const [lang, examples] of Object.entries(BODY_EXAMPLES)) {
    assert.deepEqual(Object.keys(examples).sort(), Object.keys(spec.sections).sort(), lang);
    for (const [section, text] of Object.entries(examples)) assert.equal(findSecret(text), null, `${lang}/${section}`);
  }
});

test('предпросмотр: куски карточки по порядку, как в .md', () => {
  const b = blocks({ ...good, author_name: 'Али', why: 'w', comment: 'c' });
  assert.deepEqual(b.map((x) => x.kind + (x.label ? ':' + x.label : '')), [
    'title', 'meta', 'field:Автор', 'field:Для чего', 'code', 'field:Почему работает', 'field:Комментарий',
  ]);
  assert.deepEqual(b[1].items, [['Тема', 'Разработка'], ['Теги', 'SQL, код-ревью']]);
  const c = blocks({ ...good, section: 'Кейс', why: 'w' });
  assert.ok(c.some((x) => x.kind === 'text') && c.some((x) => x.label === 'Выводы'));
});

test('предпросмотр: полупустая форма не ломается', () => {
  const b = blocks({ section: 'Промпт' });
  assert.equal(b[0].text, '');
  assert.deepEqual(b[1].items, []);
  assert.equal(b.find((x) => x.kind === 'code').text, '');
});

test('черновик: сохраняем, читаем, удаляем', () => {
  const store = new Map();
  globalThis.localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) };
  try {
    saveDraft({ section: 'Хук', topic: 'dev' });
    assert.equal(loadDraft(), null, 'без текста — не черновик');
    saveDraft({ section: 'Хук', post_title: 'Мой хук' });
    assert.deepEqual(loadDraft(), { section: 'Хук', post_title: 'Мой хук' });
    store.set('psk-draft', JSON.stringify({ section: 'Мем', post_title: 'x', evil: 'y', tags: ['a'] }));
    assert.deepEqual(loadDraft(), { post_title: 'x' }, 'чужие поля и неизвестный раздел отбрасываем');
    store.set('psk-draft', '{битый');
    assert.equal(loadDraft(), null);
    clearDraft();
    assert.equal(store.size, 0);
    globalThis.localStorage = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); }, removeItem: () => { throw new Error('denied'); } };
    assert.equal(loadDraft(), null, 'нет доступа к хранилищу — форма без черновика');
    saveDraft({ section: 'Хук', post_title: 'x' });
    clearDraft();
  } finally {
    delete globalThis.localStorage;
  }
});

test('id полей не совпадают и не пустые; разделы уникальны', () => {
  const ids = spec.fields.map((f) => f.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(new Set(Object.values(spec.sections)).size, Object.keys(spec.sections).length);
});

// ---------- api/submit ----------
const env = { ...process.env };
let calls;
const realFetch = globalThis.fetch;

function mockFetch({ captcha = true, ghFail = false } = {}) {
  calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), method: init.method ?? 'GET', body: init.body });
    const ok = (data, status = 200) => new Response(JSON.stringify(data), { status });
    if (String(url).includes('turnstile')) return ok({ success: captcha });
    if (ghFail) return ok({ message: 'nope' }, 401);
    if (String(url).endsWith('/git/ref/heads/main')) return ok({ object: { sha: 'abc' } });
    if (String(url).endsWith('/pulls')) return ok({ html_url: 'https://github.com/x/y/pull/1' }, 201);
    return ok({}, 201);
  };
}

const req = (body, headers = {}) =>
  new Request('http://localhost/api/submit', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });

beforeEach(() => {
  process.env.TURNSTILE_SECRET_KEY = 'secret';
  process.env.GITHUB_TOKEN = 'token';
  delete process.env.SUBMIT_DRY_RUN;
});
afterEach(() => {
  globalThis.fetch = realFetch;
  process.env = { ...env };
});

test('api: валидный пост -> ветка, файл, PR (201)', async () => {
  mockFetch();
  const res = await POST(req({ values: good, captcha: 't', lang: 'ru' }));
  assert.equal(res.status, 201);
  const data = await res.json();
  assert.equal(data.prUrl, 'https://github.com/x/y/pull/1');
  assert.match(data.file, /^posts\/prompts\//);
  const put = calls.find((c) => c.method === 'PUT');
  const content = Buffer.from(JSON.parse(put.body).content, 'base64').toString('utf8');
  assert.match(content, /Ревью SQL-запросов/);
  assert.ok(calls.some((c) => c.method === 'POST' && c.url.endsWith('/git/refs')));
});

test('api: капча не прошла -> 403, GitHub не трогаем', async () => {
  mockFetch({ captcha: false });
  const res = await POST(req({ values: good, captcha: 't' }));
  assert.equal(res.status, 403);
  assert.ok(!calls.some((c) => c.url.includes('api.github.com')));
});

test('api: нет токена капчи -> 403', async () => {
  mockFetch();
  assert.equal((await POST(req({ values: good }))).status, 403);
});

test('api: невалидный пост -> 422 с ошибками на языке формы', async () => {
  mockFetch();
  const res = await POST(req({ values: { ...good, post_title: '' }, captcha: 't', lang: 'en' }));
  assert.equal(res.status, 422);
  assert.equal((await res.json()).errors.post_title, 'Required field');
});

test('api: ключ в посте -> 422, GitHub и капчу не трогаем', async () => {
  mockFetch();
  const res = await POST(req({ values: { ...good, post_body: `Конфиг:\n${KEYS.openai}` }, captcha: 't' }));
  assert.equal(res.status, 422);
  assert.match((await res.json()).errors.post_body, /Похоже на ключ/);
  assert.equal(calls.length, 0);
});

test('api: honeypot заполнен -> 400', async () => {
  mockFetch();
  assert.equal((await POST(req({ values: good, captcha: 't', website: 'spam' }))).status, 400);
});

test('api: битый JSON -> 400; слишком большой -> 413', async () => {
  const bad = new Request('http://localhost/api/submit', { method: 'POST', body: '{' });
  assert.equal((await POST(bad)).status, 400);
  assert.equal((await POST(req({ values: good }, { 'content-length': String(70 * 1024) }))).status, 413);
});

test('api: лишние поля и не-строки отбрасываются', async () => {
  mockFetch();
  process.env.SUBMIT_DRY_RUN = '1';
  const res = await POST(req({ values: { ...good, evil: 'x', tags: ['a'] }, captcha: 't' }));
  const data = await res.json();
  assert.equal(res.status, 200);
  assert.doesNotMatch(data.content, /evil/);
  assert.match(data.content, /tags: \[\]/);
});

test('api: нет секретов -> 500, без утечки подробностей', async () => {
  mockFetch();
  delete process.env.TURNSTILE_SECRET_KEY;
  const res = await POST(req({ values: good, captcha: 't' }));
  assert.equal(res.status, 500);
  assert.deepEqual(await res.json(), { error: 'not_configured' });
});

test('api: ошибка GitHub -> 502', async () => {
  mockFetch({ ghFail: true });
  assert.equal((await POST(req({ values: good, captcha: 't' }))).status, 502);
});

test('api: dry-run не ходит в GitHub', async () => {
  mockFetch();
  process.env.SUBMIT_DRY_RUN = '1';
  delete process.env.GITHUB_TOKEN;
  const res = await POST(req({ values: good, captcha: 't' }));
  assert.equal(res.status, 200);
  assert.ok(!calls.some((c) => c.url.includes('api.github.com')));
});
