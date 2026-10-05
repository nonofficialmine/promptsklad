// Главная — сессия Claude Code в окне терминала: стартовая рамка с маскотом,
// строка ввода и живое меню slash-команд (печать фильтрует, ↑↓ выбирают, ⏎ открывает).
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang, usePages } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { SECTIONS, UI, postsLabel, prefix, type Lang } from '../i18n';
import './TerminalHub.css';

// Логотип Claude Code из стартового экрана CLI (символы-квадранты), перерисованный пикселями.
const LOGO = [' ▐▛███▜▌', '▝▜█████▛▘', '  ▘▘ ▝▝'];
const QUADS: Record<string, [number, number][]> = {
  '█': [[0, 0], [1, 0], [0, 1], [1, 1]],
  '▐': [[1, 0], [1, 1]],
  '▌': [[0, 0], [0, 1]],
  '▛': [[0, 0], [1, 0], [0, 1]],
  '▜': [[0, 0], [1, 0], [1, 1]],
  '▘': [[0, 0]],
  '▝': [[1, 0]],
};
const PIXELS = LOGO.flatMap((row, y) =>
  [...row].flatMap((ch, x) => (QUADS[ch] ?? []).map(([dx, dy]) => [x * 2 + dx, y * 2 + dy] as const)),
);

function Mascot() {
  return (
    // Ячейка терминала вдвое выше ширины -> «пиксель»-квадрант 1×2.
    <svg className="th-mascot" viewBox="0 0 18 12" aria-label="Claude Code" role="img">
      {PIXELS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y * 2} width={1.02} height={2.04} />
      ))}
    </svg>
  );
}

type Cmd = { name: string; desc: string; link: string; count?: number };

export function TerminalHub({ title, cta }: { title?: string; cta?: { text: string; link: string } }) {
  const lang = (useLang() || 'ru') as Lang;
  const pre = prefix(lang);
  const { pages } = usePages();
  const [query, setQuery] = useState('/');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  // Посты общие для всех языков — берём русские маршруты (без префикса), без страниц-списков.
  const posts = useMemo(
    () =>
      pages
        .filter((p) => SECTIONS.some((s) => p.routePath.startsWith(`/${s.id}/`)) && !p.routePath.endsWith('/'))
        .sort((a, b) => b.routePath.localeCompare(a.routePath)),
    [pages],
  );

  const commands: Cmd[] = useMemo(
    () => [
      ...SECTIONS.map((s) => ({
        name: `/${s.id}`,
        desc: s.short[lang],
        link: `${pre}/${s.id}/`,
        count: posts.filter((p) => p.routePath.startsWith(`/${s.id}/`)).length,
      })),
      { name: '/share', desc: UI.shareDesc[lang], link: cta?.link ?? `${pre}/new` },
    ],
    [lang, pre, posts, cta],
  );

  const q = query.trim().toLowerCase().replace(/^\//, '');
  // По имени — с первой буквы, по описанию — с 3 символов (иначе одна буква цепляет всё подряд).
  const shown = commands.filter(
    (c) => !q || c.name.slice(1).startsWith(q) || (q.length >= 3 && c.desc.toLowerCase().includes(q)),
  );
  const active = Math.min(sel, Math.max(shown.length - 1, 0));

  // На десктопе курсор сразу в строке ввода — как в настоящем терминале.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) input.current?.focus({ preventScroll: true });
  }, []);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const d = e.key === 'ArrowDown' ? 1 : -1;
      setSel((active + d + shown.length) % Math.max(shown.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      links.current[active]?.click(); // переход через Link — без перезагрузки страницы
    } else if (e.key === 'Escape') {
      setQuery('/');
      setSel(0);
    }
  };

  return (
    <div className="th">
      <div className="th-window">
        <div className="th-bar">
          <i />
          <i />
          <i />
          <span>promptsklad — claude — 100×32</span>
        </div>

        <div className="th-screen" onClick={(e) => e.target === e.currentTarget && input.current?.focus()}>
          <p className="th-shell">
            <span className="th-green">guest@promptsklad</span> <span className="th-blue">~</span> % claude
          </p>

          {/* стартовая рамка Claude Code */}
          <section className="th-box">
            <span className="th-box__title">promptsklad</span>
            <div className="th-box__left">
              <p className="th-bold">{UI.welcome[lang]}</p>
              <Mascot />
              {title && <h1 className="th-title">{title}</h1>}
              <p className="th-dim">
                {SECTIONS.length} {UI.sectionsCount[lang]} · {postsLabel(posts.length, lang)} · ~/promptsklad
              </p>
            </div>
            <div className="th-box__right">
              <p className="th-accent">{UI.howTitle[lang]}</p>
              <p>
                1. {UI.how1[lang]}
                <br />
                2. {UI.how2[lang]}
                <br />
                3. {UI.how3[lang]}
              </p>
              <hr />
              <p className="th-accent">{UI.recentTitle[lang]}</p>
              {posts.length ? (
                posts.slice(0, 3).map((p) => (
                  <Link key={p.routePath} href={`${pre}${p.routePath}`} className="th-recent">
                    {p.title}
                  </Link>
                ))
              ) : (
                <p className="th-dim">{UI.noRecent[lang]}</p>
              )}
            </div>
          </section>

          {/* строка ввода */}
          <label className="th-input">
            <span className="th-input__caret">&gt;</span>
            <input
              ref={input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSel(0);
              }}
              onKeyDown={onKey}
              placeholder={UI.placeholder[lang]}
              spellCheck={false}
              autoComplete="off"
              aria-label={UI.placeholder[lang]}
              aria-controls="th-menu"
            />
          </label>

          {/* меню slash-команд: каждая строка — ссылка */}
          <nav id="th-menu" className="th-menu" aria-label={UI.sections[lang]}>
            {shown.length ? (
              shown.map((c, i) => (
                <Link
                  key={c.name}
                  href={c.link}
                  ref={(el: HTMLAnchorElement | null) => {
                    links.current[i] = el;
                  }}
                  className={`th-item${i === active ? ' is-sel' : ''}${c.name === '/share' ? ' th-item--share' : ''}`}
                  onMouseEnter={() => setSel(i)}
                >
                  <span className="th-item__ptr">{i === active ? '❯' : ' '}</span>
                  <span className="th-item__name">{c.name}</span>
                  <span className="th-item__desc">{c.desc}</span>
                  {c.count !== undefined && <span className="th-item__count">{c.count}</span>}
                  <span className="th-item__go">↵</span>
                </Link>
              ))
            ) : (
              <p className="th-dim th-nomatch">{UI.noMatch[lang]}</p>
            )}
          </nav>
          <p className="th-footer">{UI.keys[lang]}</p>
        </div>
      </div>
    </div>
  );
}
