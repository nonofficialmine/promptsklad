import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { POST as submit } from './api/submit';
import { GET as likesGet, POST as likesPost } from './api/likes';
import { canonicalPath, isPostCopy, postsPlugin, sidebar } from './site/posts-plugin';

// Прод-домен; при своём домене задать SITE_URL в env Vercel.
const SITE_URL = (process.env.SITE_URL ?? 'https://promptsklad.vercel.app').replace(/\/$/, '');
// ID сайта Umami: пробелы/переводы строк по краям — частая ошибка при вставке в Vercel.
const UMAMI_WEBSITE_ID = (process.env.UMAMI_WEBSITE_ID ?? '').trim().replace(/^["']|["']$/g, '');
const abs = (routePath: string) => `${SITE_URL}${routePath.replace(/\/index$/, '/')}`;

/** Локально /api/submit работает всухую: без GitHub, возвращает карточку. */
async function devSubmit(req: IncomingMessage, res: ServerResponse, next: () => void) {
  if (req.url !== '/api/submit' || req.method !== 'POST') return next();
  process.env.SUBMIT_DRY_RUN = '1';
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const response = await submit(
    new Request('http://localhost/api/submit', { method: 'POST', headers: req.headers as HeadersInit, body: Buffer.concat(chunks) }),
  );
  res.statusCode = response.status;
  res.setHeader('content-type', 'application/json');
  res.end(await response.text());
}

/** Локально /api/likes считает в памяти (без Redis), если в env нет ключей базы. */
async function devLikes(req: IncomingMessage, res: ServerResponse, next: () => void) {
  if (!req.url?.startsWith('/api/likes')) return next();
  process.env.LIKES_DEV_MEMORY = '1';
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const request = new Request(`http://localhost${req.url}`, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
  });
  const response = await (req.method === 'POST' ? likesPost : likesGet)(request);
  res.statusCode = response.status;
  res.setHeader('content-type', 'application/json');
  res.end(await response.text());
}

// Встроенных строк интерфейса на узбекском в Rspress нет — задаём свои.
const uz: Record<string, string> = {
  languagesText: 'Tillar',
  themeText: 'Mavzu',
  menuTitle: 'Menyu',
  outlineTitle: 'SAHIFADA',
  scrollToTopText: 'Yuqoriga',
  lastUpdatedText: 'Oxirgi yangilanish',
  prevPageText: 'Oldingi sahifa',
  nextPageText: 'Keyingi sahifa',
  editLinkText: 'Sahifani tahrirlash',
  searchPlaceholderText: 'Promptlar, skillar, hooklar bo‘yicha qidiruv…',
  searchPanelCancelText: 'Bekor qilish',
  searchNoResultsText: 'Hech narsa topilmadi',
  searchSuggestedQueryText: 'Boshqa so‘rov bilan urinib ko‘ring',
  copyMarkdownText: 'Markdownni nusxalash',
  copyMarkdownLinkText: 'Markdown havolasini nusxalash',
  openInText: 'Ochish',
  codeButtonGroupCopyButtonText: 'Nusxalash',
  codeButtonGroupWrapButtonText: 'Qatorlarni o‘rash',
  notFoundText: 'Sahifa topilmadi',
  takeMeHomeText: 'Bosh sahifaga',
  versionsText: 'Versiyalar',
  lastUpdatedAuthorText: 'Muallif',
  sourceCodeText: 'Manba kodi',
  'overview.filterNameText': 'Filtr',
  'overview.filterPlaceholderText': 'Nomini kiriting',
  'overview.filterNoResultText': 'Hech narsa topilmadi',
  promptCopyText: 'Nusxalash',
  promptCopiedText: 'Nusxalandi',
  promptExpandText: 'Yoyish',
  promptCollapseText: 'Yig‘ish',
};

export default defineConfig({
  root: path.join(__dirname, 'content'),
  siteOrigin: SITE_URL, // абсолютные hreflang
  route: { cleanUrls: true }, // URL без .html — как cleanUrls в vercel.json
  lang: 'ru',
  title: 'promptsklad',
  icon: '/icon.png',
  head: [
    // SEO: canonical на себя; копии постов в uz/en — noindex и canonical на русский оригинал.
    (route) => ['link', { rel: 'canonical', href: abs(canonicalPath(route.routePath)) }],
    (route) => (isPostCopy(route.routePath) ? ['meta', { name: 'robots', content: 'noindex, follow' }] : undefined),
    ['meta', { property: 'og:site_name', content: 'promptsklad' }],
    ['meta', { property: 'og:image', content: `${SITE_URL}/og.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // Статистика Umami (без cookies): только если задан ID сайта и только на прод-домене.
    ...(/^[0-9a-f-]{36}$/i.test(UMAMI_WEBSITE_ID)
      ? [
          `<script defer src="https://cloud.umami.is/script.js" data-website-id="${UMAMI_WEBSITE_ID}" data-domains="${new URL(SITE_URL).host}"></script>`,
        ]
      : []),
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? [['meta', { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION }] as [string, Record<string, string>]]
      : []),
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap">',
  ],
  locales: [
    {
      lang: 'ru',
      label: 'Русский',
      description: 'Общий склад промптов, скиллов, хуков, MCP и кейсов работы с Claude Code. Делитесь опытом без регистрации.',
    },
    {
      lang: 'uz',
      label: 'O‘zbekcha',
      description: 'Claude Code bilan ishlash bo‘yicha promptlar, skillar, hooklar, MCP va keyslar ombori. Ro‘yxatdan o‘tmasdan ulashing.',
    },
    {
      lang: 'en',
      label: 'English',
      description: 'A shared library of Claude Code prompts, skills, hooks, MCP servers and real-world cases. Share yours, no sign-up.',
    },
  ],
  i18nSource: (source) => {
    for (const [key, text] of Object.entries(uz)) source[key] = { ...source[key], uz: text };
    source.searchPlaceholderText = {
      ...source.searchPlaceholderText,
      ru: 'Поиск по промптам, скиллам, хукам…',
      en: 'Search prompts, skills, hooks…',
    };
    return source;
  },
  // llms.txt + .md-версии страниц — чтобы ИИ сам находил нужное
  llms: true,
  plugins: [postsPlugin(path.join(__dirname, 'posts'), SITE_URL)],
  themeConfig: {
    sidebar: sidebar(path.join(__dirname, 'posts')),
    // Меню задаётся здесь: при sidebar в конфиге Rspress не читает _nav.json.
    locales: [
      {
        lang: 'ru',
        label: 'Русский',
        nav: [
          // { text: 'Авторы', link: '/authors/', activeMatch: '/authors/' },
          { text: 'Поделиться', link: '/new' },
        ],
      },
      {
        lang: 'uz',
        label: 'O‘zbekcha',
        nav: [
          // { text: 'Mualliflar', link: '/uz/authors/', activeMatch: '/uz/authors/' },
          { text: 'Ulashish', link: '/uz/new' },
        ],
      },
      {
        lang: 'en',
        label: 'English',
        nav: [
          // { text: 'Authors', link: '/en/authors/', activeMatch: '/en/authors/' },
          { text: 'Share', link: '/en/new' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/nonofficialmine/promptsklad' },
    ],
  },
  builderConfig: {
    server: { port: 4310, strictPort: true },
    dev: { setupMiddlewares: [(middlewares) => middlewares.unshift(devSubmit, devLikes)] },
  },
});
