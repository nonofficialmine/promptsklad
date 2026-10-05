// Генерирует /authors/ и /authors/<ник> из frontmatter `author` карточек.
import { readdirSync, readFileSync } from 'node:fs';
import * as path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

const SECTIONS = { prompts: 'Промпты', cases: 'Кейсы' } as const;
const NICK = /^[A-Za-z0-9-]{1,39}$/;

type Post = { title: string; link: string; section: keyof typeof SECTIONS };

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

function collect(root: string): Map<string, Post[]> {
  const byAuthor = new Map<string, Post[]>();
  for (const section of Object.keys(SECTIONS) as (keyof typeof SECTIONS)[]) {
    const dir = path.join(root, section);
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md') || file === 'index.md') continue;
      const md = readFileSync(path.join(dir, file), 'utf8');
      const author = frontmatterValue(md, 'author');
      if (!author || !NICK.test(author)) continue;
      const title = frontmatterValue(md, 'title') ?? file;
      const posts = byAuthor.get(author) ?? [];
      posts.push({ title, section, link: `/${section}/${file.replace(/\.md$/, '')}` });
      byAuthor.set(author, posts);
    }
  }
  return byAuthor;
}

export function authorsPlugin(contentRoot: string): RspressPlugin {
  return {
    name: 'promptsklad-authors',
    addPages() {
      const byAuthor = [...collect(contentRoot)].sort((a, b) => b[1].length - a[1].length);
      const list = byAuthor.map(([nick, posts]) => `| [@${nick}](/authors/${nick}) | ${posts.length} |`);
      const pages = byAuthor.map(([nick, posts]) => {
        const lines = (Object.keys(SECTIONS) as (keyof typeof SECTIONS)[]).flatMap((s) => {
          const items = posts.filter((p) => p.section === s);
          if (!items.length) return [];
          return [`## ${SECTIONS[s]}`, '', ...items.map((p) => `- [${escapeText(p.title)}](${p.link})`), ''];
        });
        return {
          routePath: `/authors/${nick}`,
          content: [
            `# @${nick}`,
            '',
            `<img src="https://github.com/${nick}.png?size=96" alt="@${nick}" width="96" height="96" style={{ borderRadius: '50%' }} />`,
            '',
            `[Профиль на GitHub](https://github.com/${nick})`,
            '',
            ...lines,
          ].join('\n'),
        };
      });
      return [
        {
          routePath: '/authors/',
          content: ['# Авторы', '', '| Автор | Постов |', '|---|---|', ...list].join('\n'),
        },
        ...pages,
      ];
    },
  };
}
