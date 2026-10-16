import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { isPostId, postIdFromRoute } from './likes.mjs';
import { GET, handleLikes, memoryStore } from '../api/likes.ts';

test('лайки: id поста из адреса страницы — один на все языки', () => {
  assert.equal(postIdFromRoute('/prompts/level-up'), 'prompts/level-up');
  assert.equal(postIdFromRoute('/en/prompts/level-up'), 'prompts/level-up');
  assert.equal(postIdFromRoute('/uz/plugins/boss'), 'plugins/boss');
  for (const r of ['/', '/prompts/', '/prompts/index', '/new', '/en/new', '/catalog', '/foo/bar', undefined]) assert.equal(postIdFromRoute(r), null, String(r));
});

test('лайки: формат id', () => {
  assert.ok(isPostId('hooks/block-debug-logs'));
  for (const bad of ['../etc/passwd', 'prompts/A', 'prompts/', 'nope/x', 'prompts/index', 'prompts/' + 'x'.repeat(200), 42]) assert.ok(!isPostId(bad), String(bad));
});

const post = (body, ip = '1.1.1.1') =>
  new Request('http://localhost/api/likes', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify(body) });
const get = (ids) => new Request(`http://localhost/api/likes?ids=${encodeURIComponent(ids)}`);

test('лайки: без базы — 503, кнопка прячется', async () => {
  assert.equal((await handleLikes(get('prompts/level-up'), null)).status, 503);
});

test('лайки: один лайк на пост с одного IP, снять можно только свой', async () => {
  const store = memoryStore();
  const like = async (ip, action = 'like') => (await handleLikes(post({ id: 'prompts/level-up', action }, ip), store)).json();
  assert.equal((await like('1.1.1.1')).count, 1);
  assert.equal((await like('1.1.1.1')).count, 1, 'повторный лайк не считается');
  assert.equal((await like('2.2.2.2')).count, 2);
  assert.equal((await like('1.1.1.1', 'unlike')).count, 1);
  assert.equal((await like('1.1.1.1', 'unlike')).count, 1, 'повторное снятие не уменьшает');
  assert.equal((await like('3.3.3.3', 'unlike')).count, 1, 'чужой лайк не снять');
  const counts = (await (await handleLikes(get('prompts/level-up,plugins/boss,../x'), store)).json()).counts;
  assert.deepEqual(counts, { 'prompts/level-up': 1, 'plugins/boss': 0 });
});

test('лайки: плохие запросы — 400/404/405, частые — 429', async () => {
  const store = memoryStore();
  assert.equal((await handleLikes(post({ id: 'prompts/level-up', action: 'boom' }), store)).status, 400);
  assert.equal((await handleLikes(post({ id: '../x', action: 'like' }), store)).status, 400);
  assert.equal((await handleLikes(post({ id: 'prompts/no-such-post', action: 'like' }), store)).status, 404);
  const bad = new Request('http://localhost/api/likes', { method: 'POST', body: '{' });
  assert.equal((await handleLikes(bad, store)).status, 400);
  assert.equal((await handleLikes(new Request('http://localhost/api/likes', { method: 'PUT' }), store)).status, 405);
  let last;
  for (let i = 0; i < 31; i++) last = await handleLikes(post({ id: 'prompts/level-up', action: i % 2 ? 'unlike' : 'like' }, '9.9.9.9'), store);
  assert.equal(last.status, 429);
});

const env = { ...process.env };
const realFetch = globalThis.fetch;
afterEach(() => {
  process.env = { ...env };
  globalThis.fetch = realFetch;
});

test('лайки: Upstash — один pipeline-запрос с ключом из env Vercel', async () => {
  process.env.KV_REST_API_URL = 'https://redis.example/';
  process.env.KV_REST_API_TOKEN = 'test-token';
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), auth: init.headers.authorization, body: JSON.parse(init.body) });
    return new Response(JSON.stringify([{ result: ['5'] }]), { status: 200 });
  };
  const res = await GET(get('prompts/level-up'));
  assert.deepEqual((await res.json()).counts, { 'prompts/level-up': 5 });
  assert.equal(calls[0].url, 'https://redis.example/pipeline');
  assert.equal(calls[0].auth, 'Bearer test-token');
  assert.deepEqual(calls[0].body, [['HMGET', 'likes', 'prompts/level-up']]);
});
