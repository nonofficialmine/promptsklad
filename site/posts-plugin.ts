// Генерирует страницы из posts/<раздел>/*.md для каждого языка: сами посты и списки разделов.
// Плюс боковая панель со всеми разделами — переключение между ними в 1 клик.
// Страницы авторов (/authors/*) пока отключены — см. закомментированный блок ниже.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import * as path from 'node:path';
import type { RspressPlugin, Sidebar } from '@rspress/core';
import { LANGS, SECTIONS, UI, prefix } from './i18n';

const NICK = /^[A-Za-z0-9-]{1,39}$/;

type Post = { title: string; slug: string; section: string; file: string; author?: string };

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
      if (!name.endsWith('.md')) continue;
      const file = path.join(dir, name);
      const md = readFileSync(file, 'utf8');
      const author = frontmatterValue(md, 'author');
      posts.push({
        title: frontmatterValue(md, 'title') ?? name,
        slug: name.replace(/\.md$/, ''),
        section,
        file,
        author: author && NICK.test(author) ? author : undefined,
      });
    }
  }
  return posts;
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
          items: posts.filter((p) => p.section === s.id).map((p) => ({ text: p.title, link: `${pre}/${s.id}/${p.slug}` })),
        })),
      ];
    }),
  );
}

export function postsPlugin(postsRoot: string): RspressPlugin {
  return {
    name: 'promptsklad-posts',
    addPages() {
      const posts = collectPosts(postsRoot);
      // const authors = new Map<string, Post[]>();
      // for (const p of posts) if (p.author) authors.set(p.author, [...(authors.get(p.author) ?? []), p]);
      // const byCount = [...authors].sort((a, b) => b[1].length - a[1].length);

      return LANGS.flatMap((lang) => {
        const pre = prefix(lang);
        const link = (p: Post) => `- [${escapeText(p.title)}](${pre}/${p.section}/${p.slug})`;
        const share = UI.shareVia[lang].replace(/\[(.+)\]/, `[$1](${pre}/new)`);

        const postPages = posts.map((p) => ({ routePath: `${pre}/${p.section}/${p.slug}`, filepath: p.file }));

        const sectionPages = SECTIONS.map((s) => {
          const items = posts.filter((p) => p.section === s.id).map(link);
          const shareHere = share.replace(`(${pre}/new)`, `(${pre}/new?section=${s.id})`);
          return {
            routePath: `${pre}/${s.id}/`,
            content: [`# ${s.title[lang]}`, '', s.desc[lang], '', ...(s.extra?.[lang] ? [s.extra[lang], ''] : []), ...(items.length ? items : [UI.empty[lang]]), '', `${shareHere}.`].join('\n'),
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
