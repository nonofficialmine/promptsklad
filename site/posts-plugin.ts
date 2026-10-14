// Генерирует страницы из posts/<раздел>/*.md для каждого языка: сами посты и списки разделов.
// На каждом языке отдаётся перевод (<slug>.<lang>.md), если он есть, иначе — оригинал автора.
// Плюс боковая панель со всеми разделами — переключение между ними в 1 клик.
// Страницы авторов (/authors/*) пока отключены — см. закомментированный блок ниже.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';
import type { RouteMeta, RspressPlugin, Sidebar } from '@rspress/core';
import { LANGS, SECTIONS, UI, prefix } from './i18n';
import { detectLang, isTranslationFile, originalRoute, translationFile } from './translations.mjs';

const NICK = /^[A-Za-z0-9-]{1,39}$/;

type Version = { file: string; title: string };
type Post = {
  title: string;
  slug: string;
  section: string;
  file: string;
  author?: string;
  /** Язык оригинала (автора). */
  lang: string;
  /** Версии по языкам: оригинал + готовые переводы. */
  versions: Record<string, Version>;
};

/** Посты по ключу «раздел/slug» — для SEO-правил в head (заполняется collectPosts). */
const index = new Map<string, Post>();

const versionFor = (p: Post, lang: string): Version => p.versions[lang] ?? { file: p.file, title: p.title };

/** Для меню: «Название: пояснение» -> «Название». Полный заголовок — на странице и в подсказке. */
export const menuTitle = (title: string) => {
  const short = title.split(/:\s/)[0].trim();
  return short.length >= 4 && short !== title ? short : title;
};

// Страницы из addPages компилируются как MDX: экранируем и HTML, и выражения {}.
const escapeText = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/[[\]]/g, (c) => (c === '[' ? '&#91;' : '&#93;'));

function frontmatterValue(md: string, key: string): string | undefined {
  const fm = /^---\n([\s\S]*?)\n---/.exec(md)?.[1] ?? '';
  const raw = new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(fm)?.[1]?.trim();
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function collectPosts(postsRoot: string): Post[] {
  const posts: Post[] = [];
  for (const { id: section } of SECTIONS) {
    const dir = path.join(postsRoot, section);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).sort()) {
      if (!name.endsWith('.md') || isTranslationFile(name)) continue;
      const file = path.join(dir, name);
      const md = readFileSync(file, 'utf8');
      const author = frontmatterValue(md, 'author');
      const title = frontmatterValue(md, 'title') ?? name;
      const lang = frontmatterValue(md, 'lang') ?? detectLang(md.replace(/^---\n[\s\S]*?\n---\n/, ''));
      const versions: Record<string, Version> = { [lang]: { file, title } };
      for (const l of LANGS) {
        const tr = translationFile(file, l);
        if (l !== lang && existsSync(tr)) versions[l] = { file: tr, title: frontmatterValue(readFileSync(tr, 'utf8'), 'title') ?? title };
      }
      const post: Post = {
        title,
        slug: name.replace(/\.md$/, ''),
        section,
        file,
        author: author && NICK.test(author) ? author : undefined,
        lang,
        versions,
      };
      posts.push(post);
      index.set(`${section}/${post.slug}`, post);
    }
  }
  return posts;
}

const SECTION_IDS = SECTIONS.map((s) => s.id).join('|');
const POST_ROUTE = new RegExp(`^(/(?:uz|en))?/(${SECTION_IDS})/[^/]+$`);

function postAt(routePath: string): { post: Post; lang: string } | undefined {
  const m = POST_ROUTE.exec(routePath);
  if (!m || routePath.endsWith('/index')) return undefined;
  const post = index.get(`${m[2]}/${routePath.split('/').pop()}`);
  return post && { post, lang: m[1]?.slice(1) ?? 'ru' };
}

/** Пост на языке, на который его ещё не перевели (показан оригинал) — для SEO это дубль. */
export function isPostCopy(routePath: string): boolean {
  const at = postAt(routePath);
  return !!at && !at.post.versions[at.lang];
}

/** Для непереведённой копии — URL оригинала; для остальных страниц — сам маршрут. */
export function canonicalPath(routePath: string): string {
  const at = postAt(routePath);
  return at && isPostCopy(routePath) ? originalRoute(at.post.lang, at.post.section, at.post.slug) : routePath;
}

/** Боковая панель: все разделы и их посты, для каждого языка. */
export function sidebar(postsRoot: string): Sidebar {
  const posts = collectPosts(postsRoot);
  return Object.fromEntries(
    LANGS.map((lang) => {
      const pre = prefix(lang);
      return [
        `${pre}/`,
        SECTIONS.map((s) => ({
          text: s.title[lang],
          link: `${pre}/${s.id}/`,
          collapsible: true,
          collapsed: true,
          items: posts.filter((p) => p.section === s.id).map((p) => ({ text: menuTitle(versionFor(p, lang).title), link: `${pre}/${s.id}/${p.slug}` })),
        })),
      ];
    }),
  );
}

export function postsPlugin(postsRoot: string, siteUrl: string): RspressPlugin {
  let routes: RouteMeta[] = [];
  return {
    name: 'promptsklad-posts',
    routeGenerated(r) {
      routes = r;
    },
    // sitemap.xml: все страницы, кроме непереведённых копий постов (они noindex) и 404.
    afterBuild(config, isProd) {
      if (!isProd) return;
      const urls = [...new Set(routes.map((r) => r.routePath))]
        .filter((p) => !isPostCopy(p) && !p.includes('404'))
        .sort()
        .map((p) => `  <url><loc>${siteUrl}${p.replace(/\/index$/, '/')}</loc></url>`);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
      writeFileSync(path.join(config.outDir ?? 'doc_build', 'sitemap.xml'), xml);
    },
    addPages() {
      const posts = collectPosts(postsRoot);
      // const authors = new Map<string, Post[]>();
      // for (const p of posts) if (p.author) authors.set(p.author, [...(authors.get(p.author) ?? []), p]);
      // const byCount = [...authors].sort((a, b) => b[1].length - a[1].length);

      return LANGS.flatMap((lang) => {
        const pre = prefix(lang);
        const link = (p: Post) => `- [${escapeText(versionFor(p, lang).title)}](${pre}/${p.section}/${p.slug})`;
        const share = UI.shareVia[lang].replace(/\[(.+)\]/, `[$1](${pre}/new)`);

        const postPages = posts.map((p) => ({ routePath: `${pre}/${p.section}/${p.slug}`, filepath: versionFor(p, lang).file }));

        const sectionPages = SECTIONS.map((s) => {
          const items = posts.filter((p) => p.section === s.id).map(link);
          const shareHere = share.replace(`(${pre}/new)`, `(${pre}/new?section=${s.id})`);
          return {
            routePath: `${pre}/${s.id}/`,
            content: ['---', `description: ${JSON.stringify(s.desc[lang])}`, '---', '', `# ${s.title[lang]}`, '', s.desc[lang], '', ...(s.extra?.[lang] ? [s.extra[lang], ''] : []), ...(items.length ? items : [UI.empty[lang]]), '', `${shareHere}.`].join('\n'),
          };
        });

        // Авторы пока отключены (публикация только гостем).
        // const authorPages = byCount.map(([nick, list]) => ({
        //   routePath: `${pre}/authors/${nick}`,
        //   content: [
        //     `# @${nick}`,
        //     '',
        //     `<img src="https://github.com/${nick}.png?size=96" alt="@${nick}" width="96" height="96" style={{ borderRadius: '50%' }} />`,
        //     '',
        //     `[${UI.githubProfile[lang]}](https://github.com/${nick})`,
        //     '',
        //     ...POST_SECTIONS.flatMap((s) => {
        //       const items = list.filter((p) => p.section === s.id).map(link);
        //       return items.length ? [`## ${s.title[lang]}`, '', ...items, ''] : [];
        //     }),
        //   ].join('\n'),
        // }));

        // const authorsIndex = {
        //   routePath: `${pre}/authors/`,
        //   content: [
        //     `# ${UI.authors[lang]}`,
        //     '',
        //     `| ${UI.author[lang]} | ${UI.posts[lang]} |`,
        //     '|---|---|',
        //     ...byCount.map(([nick, list]) => `| [@${nick}](${pre}/authors/${nick}) | ${list.length} |`),
        //   ].join('\n'),
        // };

        return [...postPages, ...sectionPages];
      });
    },
  };
}
