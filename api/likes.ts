// Vercel Function: лайки постов. Счётчики — в Upstash Redis (REST API), регистрация не нужна.
// Env: KV_REST_API_URL + KV_REST_API_TOKEN (Vercel → Storage → Upstash for Redis) или UPSTASH_REDIS_REST_URL / _TOKEN.
// Накрутки: один лайк на пост с одного IP (храним только хэш IP), не больше 30 запросов в минуту с одного IP.
// Без базы — 503 not_configured, кнопка на сайте прячется. LIKES_DEV_MEMORY=1 — счётчики в памяти (локально).
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { isPostId } from '../site/likes.mjs';

const RATE_PER_MIN = 30;
const LIKE_TTL = 60 * 60 * 24 * 365;
const MAX_IDS = 100;

type Cmd = (string | number)[];
export type Store = (cmds: Cmd[]) => Promise<unknown[]>;

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

/** Upstash REST: несколько команд одним запросом. */
function upstash(url: string, token: string): Store {
  return async (cmds) => {
    const res = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(cmds),
    });
    if (!res.ok) throw new Error(`redis ${res.status}`);
    const out = (await res.json()) as { result?: unknown; error?: string }[];
    const failed = out.find((r) => r.error);
    if (failed) throw new Error(`redis: ${failed.error}`);
    return out.map((r) => r.result);
  };
}

/** Те же команды в памяти процесса — для локального запуска и тестов. */
export function memoryStore(): Store {
  const kv = new Map<string, { v: string; exp?: number }>();
  const hash = new Map<string, number>();
  const live = (k: string) => {
    const e = kv.get(k);
    if (e?.exp && e.exp < Date.now()) kv.delete(k);
    return kv.get(k);
  };
  const run = ([op, ...args]: Cmd): unknown => {
    const [k, ...rest] = args.map(String);
    switch (String(op).toUpperCase()) {
      case 'SET': {
        if (rest.includes('NX') && live(k)) return null;
        const ex = rest.indexOf('EX');
        kv.set(k, { v: rest[0], exp: ex >= 0 ? Date.now() + Number(rest[ex + 1]) * 1000 : undefined });
        return 'OK';
      }
      case 'INCR': {
        const e = live(k);
        const v = Number(e?.v ?? 0) + 1;
        kv.set(k, { v: String(v), exp: e?.exp });
        return v;
      }
      case 'DEL':
        return live(k) && kv.delete(k) ? 1 : 0;
      case 'HINCRBY': {
        const v = (hash.get(`${k}/${rest[0]}`) ?? 0) + Number(rest[1]);
        hash.set(`${k}/${rest[0]}`, v);
        return v;
      }
      case 'HSET':
        hash.set(`${k}/${rest[0]}`, Number(rest[1]));
        return 1;
      case 'HMGET':
        return rest.map((f) => (hash.has(`${k}/${f}`) ? String(hash.get(`${k}/${f}`)) : null));
      default:
        throw new Error(`memoryStore: ${op}`);
    }
  };
  return async (cmds) => cmds.map(run);
}

let devStore: Store | undefined;
function storeFromEnv(): Store | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) return upstash(url, token);
  if (process.env.LIKES_DEV_MEMORY === '1') return (devStore ??= memoryStore());
  return null;
}

// Лайкать можно только существующий пост. В сборке функции на Vercel папки posts нет — там проверяется только формат id.
const POSTS = join(process.cwd(), 'posts');
const postExists = (id: string) => !existsSync(POSTS) || existsSync(join(POSTS, `${id}.md`));

const ipHash = (request: Request) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  return createHash('sha256').update(`${process.env.LIKES_SALT ?? 'promptsklad'}:${ip}`).digest('hex').slice(0, 32);
};

const toCount = (v: unknown) => Math.max(0, Number(v ?? 0) || 0);

export async function handleLikes(request: Request, store: Store | null): Promise<Response> {
  if (!store) return json(503, { error: 'not_configured' });
  try {
    // GET /api/likes?ids=prompts/a,skills/b -> { counts: { "prompts/a": 3, ... } }
    if (request.method === 'GET') {
      const ids = [...new Set((new URL(request.url).searchParams.get('ids') ?? '').split(','))].filter(isPostId).slice(0, MAX_IDS);
      if (!ids.length) return json(200, { counts: {} });
      const [values] = (await store([['HMGET', 'likes', ...ids]])) as [(string | null)[]];
      return json(200, { counts: Object.fromEntries(ids.map((id, i) => [id, toCount(values?.[i])])) });
    }
    if (request.method !== 'POST') return json(405, { error: 'method' });

    // POST { id, action: "like" | "unlike" } -> { id, count, liked }
    let body: { id?: unknown; action?: unknown };
    try {
      body = await request.json();
    } catch {
      return json(400, { error: 'bad_json' });
    }
    const { id, action } = body;
    if (!isPostId(id) || (action !== 'like' && action !== 'unlike')) return json(400, { error: 'bad_request' });
    if (!postExists(id)) return json(404, { error: 'not_found' });

    const ip = ipHash(request);
    const rate = `likes:rl:${ip}`;
    const [, hits] = await store([['SET', rate, 0, 'NX', 'EX', 60], ['INCR', rate]]);
    if (Number(hits) > RATE_PER_MIN) return json(429, { error: 'rate_limited' });

    // Отметка «этот IP лайкнул пост»: счётчик меняется, только если отметка появилась или исчезла.
    const mark = `likes:by:${ip}:${id}`;
    const [changed] = await store([action === 'like' ? ['SET', mark, 1, 'NX', 'EX', LIKE_TTL] : ['DEL', mark]]);
    const delta = action === 'like' ? (changed === 'OK' ? 1 : 0) : Number(changed) === 1 ? -1 : 0;
    const [result] = delta ? await store([['HINCRBY', 'likes', id, delta]]) : ((await store([['HMGET', 'likes', id]])) as [unknown[]])[0];
    let count = Number(result ?? 0) || 0;
    if (count < 0) {
      await store([['HSET', 'likes', id, 0]]);
      count = 0;
    }
    return json(200, { id, count, liked: action === 'like' });
  } catch (e) {
    console.error('[likes]', (e as Error).message);
    return json(502, { error: 'store' });
  }
}

export const GET = (request: Request) => handleLikes(request, storeFromEnv());
export const POST = (request: Request) => handleLikes(request, storeFromEnv());
