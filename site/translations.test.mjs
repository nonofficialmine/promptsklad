import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assemble, collectTexts, detectLang, isTranslationFile, splitSegments, translationFile } from './translations.mjs';
import { pending, run } from '../scripts/translate.mjs';

const POST = `---
title: "Ревью кода"
description: "Найти баги до мержа"
topic: "dev"
tags: ["code-review"]
---

# Ревью кода

**Для чего:** найти баги.

\`\`\`text
Ты — строгий ревьюер.
\`\`\`

**Почему работает:** запрет на стиль.
`;

test('detectLang: ru / uz / en', () => {
  assert.equal(detectLang('Найти баги до мержа и проверить тесты'), 'ru');
  assert.equal(detectLang('Bu prompt kodni tekshirish uchun va xatolarni topish uchun kerak, o‘zbek tilida'), 'uz');
  assert.equal(detectLang('Find bugs before merging and check the tests'), 'en');
});

test('файлы переводов распознаются и не считаются оригиналами', () => {
  assert.equal(translationFile('posts/prompts/x.md', 'uz'), 'posts/prompts/x.uz.md');
  assert.ok(isTranslationFile('x.en.md'));
  assert.ok(!isTranslationFile('x.md'));
  assert.ok(!isTranslationFile('test-en.md'));
});

test('сегменты: промпт в code-блоке переводится, конфиг хука — нет; склейка без потерь', () => {
  const body = 'Текст\n```text\nпромпт\n```\nещё\n```json\n{"a":1}\n```\n';
  const p = splitSegments(body, 'prompts');
  assert.equal(p.map((s) => s.value).join(''), body);
  assert.ok(p.find((s) => s.value === 'промпт\n').translate);
  assert.ok(!p.find((s) => s.value === '{"a":1}\n').translate);
  const h = splitSegments('```text\nnpm test\n```\n', 'hooks');
  assert.ok(!h.find((s) => s.value === 'npm test\n').translate);
});

test('assemble: перевод, плашка под H1, код и метаданные сохранены', () => {
  const parts = collectTexts(POST, 'prompts');
  const tr = parts.texts.map((t) => t.replace('Ревью кода', 'Code review').replace('Найти баги до мержа', 'Find bugs before merge'));
  const md = assemble(parts, tr, { src: 'ru', lang: 'en', section: 'prompts', slug: 'x' });
  assert.match(md, /^title: "Code review"$/m);
  assert.match(md, /^description: "Find bugs before merge"$/m);
  assert.match(md, /^topic: "dev"$/m);
  assert.match(md, /^lang: "en"$/m);
  assert.match(md, /^machine_translation: true$/m);
  assert.match(md, /# Code review\n\n> Machine translation from Russian\. \[Original\]\(\/prompts\/x\)/);
  assert.match(md, /```text\n/);
});

test('assemble: ответ модели с HTML/скриптом или не той длины отклоняется', () => {
  const parts = collectTexts(POST, 'prompts');
  const evil = parts.texts.map((t, i) => (i === 2 ? '<script>alert(1)</script>' : t));
  assert.equal(assemble(parts, evil, { src: 'ru', lang: 'en', section: 'prompts', slug: 'x' }), null);
  assert.equal(assemble(parts, parts.texts.slice(1), { src: 'ru', lang: 'en', section: 'prompts', slug: 'x' }), null);
  const jsLink = parts.texts.map((t, i) => (i === 2 ? '[x](javascript:alert(1))' : t));
  assert.equal(assemble(parts, jsLink, { src: 'ru', lang: 'en', section: 'prompts', slug: 'x' }), null);
});

// ---------- scripts/translate.mjs ----------
const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

function sandbox() {
  const root = mkdtempSync(join(tmpdir(), 'psk-tr-'));
  mkdirSync(join(root, 'prompts'));
  writeFileSync(join(root, 'prompts', 'x.md'), POST);
  return root;
}

const echo = (status = 200) => {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push(JSON.parse(init.body));
    if (status !== 200) return new Response('{}', { status });
    const { t } = JSON.parse(JSON.parse(init.body).messages[1].content);
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ t }) } }] }));
  };
  return calls;
};

test('очередь: оригинал на ru -> переводы на uz и en; готовые переводы пропускаются', () => {
  const root = sandbox();
  assert.deepEqual(pending(root).map((j) => j.lang).sort(), ['en', 'uz']);
  writeFileSync(join(root, 'prompts', 'x.uz.md'), POST);
  assert.deepEqual(pending(root).map((j) => j.lang), ['en']);
});

test('run: пишет файлы переводов, повторный запуск ничего не делает', async () => {
  const root = sandbox();
  const calls = echo();
  assert.equal((await run({ token: 't', root })).done, 2);
  assert.ok(existsSync(join(root, 'prompts', 'x.uz.md')) && existsSync(join(root, 'prompts', 'x.en.md')));
  assert.match(readFileSync(join(root, 'prompts', 'x.uz.md'), 'utf8'), /translated_from: "ru"/);
  assert.equal(calls.length, 2);
  assert.equal((await run({ token: 't', root })).done, 0);
});

test('run: 429 (лимит) — остановка без ошибки, файлов нет', async () => {
  const root = sandbox();
  echo(429);
  const r = await run({ token: 't', root });
  assert.equal(r.done, 0);
  assert.ok(!existsSync(join(root, 'prompts', 'x.uz.md')));
});

test('run: ошибка сервера по одному посту не валит остальные', async () => {
  const root = sandbox();
  echo(500);
  assert.equal((await run({ token: 't', root })).done, 0);
});

test('run: max ограничивает число запросов за запуск', async () => {
  const root = sandbox();
  const calls = echo();
  await run({ token: 't', root, max: 1 });
  assert.equal(calls.length, 1);
});
