import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseIssue, slugify, render, processIssue } from './submission.mjs';
import { spec } from '../site/validate.mjs';

const issue = (v) =>
  spec.fields.map((f) => `### ${f.label}\n\n${v[f.id] ?? '_No response_'}`).join('\n\n');

const good = {
  section: 'Промпт',
  post_title: 'Ревью SQL-запросов',
  purpose: 'Найти медленные места в запросах',
  post_body: 'Ты — DBA. Проанализируй запрос и найди проблемы с индексами.',
  tags: 'sql, ревью',
};

function sandbox() {
  const root = mkdtempSync(join(tmpdir(), 'psk-'));
  mkdirSync(join(root, 'content/prompts'), { recursive: true });
  mkdirSync(join(root, 'content/cases'), { recursive: true });
  return root;
}

test('parseIssue: поля по заголовкам, _No response_ -> пусто', () => {
  const v = parseIssue(issue(good));
  assert.equal(v.post_title, good.post_title);
  assert.equal(v.usage, '');
});

test('parseIssue: "### " внутри текста не ломает разбор', () => {
  const v = parseIssue(issue({ ...good, post_body: '### Не поле\nтекст' }));
  assert.equal(v.post_body, '### Не поле\nтекст');
});

test('slugify: кириллица и узбекская латиница', () => {
  assert.equal(slugify('Ревью SQL-запросов'), 'revyu-sql-zaprosov');
  assert.equal(slugify("O‘zbekcha so'z"), 'o-zbekcha-so-z');
  assert.equal(slugify('!!!'), '');
});

test('позитив: валидный пост -> файл с автором из GitHub', () => {
  const root = sandbox();
  const res = processIssue({ body: issue(good), number: 7, author: 'alice', root });
  assert.equal(res.ok, true);
  assert.equal(res.file, 'content/prompts/7-revyu-sql-zaprosov.md');
  const md = readFileSync(join(root, res.file), 'utf8');
  assert.match(md, /author: "alice"/);
  assert.match(md, /\*\*Автор:\*\* \[@alice\]\(\/authors\/alice\)/);
  assert.match(md, /tags: \["sql","ревью"\]/);
  assert.match(md, /```text\nТы — DBA/);
});

test('позитив: кейс рендерится текстом с «Выводы»', () => {
  const md = render({ ...good, section: 'Кейс', why: 'Индексы решают' }, 'bob');
  assert.doesNotMatch(md, /```text/);
  assert.match(md, /\*\*Выводы:\*\* Индексы решают/);
});

test('негатив: пустые обязательные поля', () => {
  const res = processIssue({ body: issue({}), number: 1, author: 'x', root: sandbox() });
  assert.equal(res.ok, false);
  for (const l of ['Раздел', 'Название', 'Для чего', 'Промпт или описание кейса']) assert.match(res.message, new RegExp(l));
});

test('негатив: слишком короткое / длинное / неизвестный раздел / >5 тегов', () => {
  const res = processIssue({
    body: issue({ ...good, post_title: 'abc', post_body: 'x'.repeat(6001), section: 'Мем', tags: 'a,b,c,d,e,f' }),
    number: 2, author: 'x', root: sandbox(),
  });
  assert.equal(res.ok, false);
  assert.match(res.message, /Минимум 5/);
  assert.match(res.message, /Максимум 6000/);
  assert.match(res.message, /Неизвестный раздел/);
  assert.match(res.message, /Не больше 5 тегов/);
});

test('негатив: javascript: ссылка отклоняется', () => {
  const res = processIssue({ body: issue({ ...good, purpose: 'кликни [тут](javascript:alert(1))' }), number: 3, author: 'x', root: sandbox() });
  assert.equal(res.ok, false);
});

test('безопасность: HTML экранируется вне code-блока, внутри — как есть', () => {
  const md = render({ ...good, post_title: '<script>alert(1)</script> титул', post_body: '<b>prompt</b>' }, 'x');
  assert.doesNotMatch(md.split('---').slice(2).join('---').split('```')[0], /<script>/);
  assert.match(md, /&lt;script&gt;/);
  assert.match(md, /```text\n<b>prompt<\/b>\n```/);
});

test('безопасность: ``` в промпте не выходит за code-блок', () => {
  const md = render({ ...good, post_body: 'a\n```\n<script>x</script>\n```' }, 'x');
  assert.match(md, /````text\n/);
});

test('безопасность: кавычки/переводы строк в title не ломают frontmatter', () => {
  const md = render({ ...good, post_title: 'a"\nauthor: evil' }, 'x');
  assert.equal(md.match(/^author:/gm).length, 1);
});

test('негатив: повтор номера issue не перезаписывает файл', () => {
  const root = sandbox();
  processIssue({ body: issue(good), number: 9, author: 'x', root });
  const res = processIssue({ body: issue(good), number: 9, author: 'x', root });
  assert.equal(res.ok, false);
});

test('шаблон issue совпадает с fields.json', () => {
  const yml = readFileSync(new URL('../.github/ISSUE_TEMPLATE/submission.yml', import.meta.url), 'utf8');
  for (const f of spec.fields) {
    assert.match(yml, new RegExp(`id: ${f.id}\\n`), `нет id ${f.id}`);
    assert.match(yml, new RegExp(`label: ${f.label.replace(/[/]/g, '\\/')}\\n`), `нет label ${f.label}`);
  }
  for (const s of Object.keys(spec.sections)) assert.match(yml, new RegExp(`- ${s}\\n`));
});

test('id полей не совпадают с зарезервированными параметрами GitHub', () => {
  const reserved = ['title', 'body', 'labels', 'template', 'assignees', 'milestone', 'projects', 'type'];
  for (const f of spec.fields) assert.ok(!reserved.includes(f.id), `зарезервированный id: ${f.id}`);
});

test('безопасность: {} экранируется во всех текстовых полях', () => {
  const md = render({ ...good, section: 'Кейс', post_title: 'T {a}', purpose: 'p {b}', usage: 'u {c}', why: 'w {d}', post_body: 'b {e}' }, 'x');
  const text = md.split('---').slice(2).join('---');
  assert.doesNotMatch(text, /[{}]/);
});
