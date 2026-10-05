// Vercel Function: гостевая публикация поста.
// Капча (Cloudflare Turnstile) -> валидация -> ветка + файл + Pull Request на модерацию.
// Env: GITHUB_TOKEN (contents + pull requests: write), TURNSTILE_SECRET_KEY.
// SUBMIT_DRY_RUN=1 — без GitHub, вернуть карточку (только для локальной разработки).
import { spec, validate } from '../site/validate.mjs';
import { postPath, render } from '../site/post.mjs';

const MAX_BODY = 64 * 1024;
const GH = 'https://api.github.com';

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

async function verifyCaptcha(token: string, secret: string, ip: string | null): Promise<boolean> {
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function gh(token: string, method: string, path: string, body?: unknown) {
  const res = await fetch(`${GH}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github+json',
      'content-type': 'application/json',
      'user-agent': 'promptsklad',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`GitHub ${method} ${path}: ${res.status}`);
  return res.json() as Promise<Record<string, any>>;
}

async function openPullRequest(token: string, file: string, content: string, title: string): Promise<string> {
  const repo = `/repos/${spec.repo}`;
  const base = await gh(token, 'GET', `${repo}/git/ref/heads/main`);
  const branch = `submission/${file.split('/').pop()!.replace(/\.md$/, '')}`;
  await gh(token, 'POST', `${repo}/git/refs`, { ref: `refs/heads/${branch}`, sha: base.object.sha });
  await gh(token, 'PUT', `${repo}/contents/${file}`, {
    message: `Пост от гостя: ${title}`,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch,
  });
  const pr = await gh(token, 'POST', `${repo}/pulls`, {
    title: `[склад] ${title}`,
    head: branch,
    base: 'main',
    body: `Гостевой пост, прошёл капчу и валидацию. Файл: \`${file}\`.\n\nПроверьте содержимое и смержите, чтобы опубликовать.`,
  });
  return pr.html_url as string;
}

export async function POST(request: Request): Promise<Response> {
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return json(413, { error: 'too_large' });

  let payload: { values?: Record<string, unknown>; captcha?: string; lang?: string; website?: string };
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'bad_json' });
  }
  // Honeypot: скрытое поле, которое заполняют только боты.
  if (payload.website) return json(400, { error: 'bad_request' });

  // Берём только известные поля и только строки.
  const values: Record<string, string> = {};
  for (const f of spec.fields) {
    const v = payload.values?.[f.id];
    if (typeof v === 'string') values[f.id] = v;
  }
  const lang = (['ru', 'uz', 'en'].includes(payload.lang ?? '') ? payload.lang : 'ru') as 'ru' | 'uz' | 'en';

  const errors = validate(values, lang);
  if (Object.keys(errors).length) return json(422, { error: 'invalid', errors });

  const dryRun = process.env.SUBMIT_DRY_RUN === '1';
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const token = process.env.GITHUB_TOKEN;
  if (!secret || (!dryRun && !token)) return json(500, { error: 'not_configured' });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  if (!payload.captcha || !(await verifyCaptcha(payload.captcha, secret, ip))) return json(403, { error: 'captcha' });

  const file = postPath(values);
  const content = render(values);
  if (dryRun) return json(200, { ok: true, dryRun: true, file, content });

  try {
    const prUrl = await openPullRequest(token!, file, content, values.post_title.replace(/\s+/g, ' ').trim());
    return json(201, { ok: true, file, prUrl });
  } catch (e) {
    console.error('[submit] github error', (e as Error).message);
    return json(502, { error: 'github' });
  }
}
