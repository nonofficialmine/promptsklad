import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, render, postPath } from './post.mjs';
import { spec, validate } from './validate.mjs';
import { POST } from '../api/submit.ts';

const good = {
  section: 'Промпт',
  post_title: 'Ревью SQL-запросов',
  purpose: 'Найти медленные места в запросах',
  post_body: 'Ты — DBA. Проанализируй запрос и найди проблемы с индексами.',
  tags: 'sql, ревью',
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

test('позитив: промпт — в code-блоке, теги во frontmatter, без автора', () => {
  const md = render(good);
  assert.match(md, /tags: \["sql","ревью"\]/);
  assert.match(md, /```text\nТы — DBA/);
  assert.doesNotMatch(md, /Автор|author_name/);
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

test('негатив: пустые обязательные поля', () => {
  const errs = validate({});
  for (const id of ['section', 'post_title', 'purpose', 'post_body']) assert.ok(errs[id], id);
});

test('негатив: короткое / длинное / неизвестный раздел / >5 тегов / javascript:', () => {
  const errs = validate({ ...good, post_title: 'abc', post_body: 'x'.repeat(6001), section: 'Мем', tags: 'a,b,c,d,e,f', purpose: 'кликни [тут](javascript:alert(1))' });
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
