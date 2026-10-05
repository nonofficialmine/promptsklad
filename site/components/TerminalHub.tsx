// Главная в стиле терминала Claude Code: маскот в центре, 8 разделов-команд вокруг,
// команда публикации и «как это работает» как вывод терминала.
import { useState } from 'react';
import { useLang, usePages } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { SECTIONS, UI, prefix, type Lang } from '../i18n';
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

const ROW = 56; // высота строки команды; по ней считаются линии к маскоту
const W = 220; // ширина центральной колонки со связями

/** Кривая от края колонки к маскоту. */
function wire(side: 'left' | 'right', i: number): string {
  const y = ROW / 2 + i * ROW;
  const cy = (ROW * 4) / 2;
  const [x0, x1] = side === 'left' ? [0, W / 2 - 58] : [W, W / 2 + 58];
  const mid = (x0 + x1) / 2;
  return `M${x0} ${y} C${mid} ${y}, ${mid} ${cy}, ${x1} ${cy}`;
}

export function TerminalHub({ title, cta }: { title?: string; cta?: { text: string; link: string } }) {
  const lang = (useLang() || 'ru') as Lang;
  const pre = prefix(lang);
  const { pages } = usePages();
  const [active, setActive] = useState<string | null>(null);

  // Посты общие для всех языков — считаем по русским маршрутам (без префикса).
  const count = (id: string) =>
    pages.filter((p) => p.routePath.startsWith(`/${id}/`) && !p.routePath.endsWith('/')).length;

  const left = SECTIONS.slice(0, 4);
  const right = SECTIONS.slice(4);

  // Функция, а не компонент: иначе при смене hover React пересоздаёт ссылки и сбрасывает фокус.
  const cmd = (s: (typeof SECTIONS)[number], side: 'left' | 'right') => (
    <Link
      key={s.id}
      href={`${pre}/${s.id}/`}
      className={`th-cmd th-cmd--${side}${active === s.id ? ' is-active' : ''}`}
      onMouseEnter={() => setActive(s.id)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(s.id)}
      onBlur={() => setActive(null)}
    >
      <span className="th-cmd__name">
        /{s.id}
        <span className="th-cmd__count">{count(s.id)}</span>
      </span>
      <span className="th-cmd__desc">{s.short[lang]}</span>
    </Link>
  );

  return (
    <div className="th">
      <div className="th-window">
        <div className="th-bar">
          <i />
          <i />
          <i />
          <span>promptsklad — claude</span>
        </div>

        <div className="th-body">
          <div className="th-welcome">
            <p>
              <b>✻</b> {UI.welcome[lang]}
            </p>
            {title && <h1>{title}</h1>}
          </div>

          <nav className="th-hub" aria-label={UI.sections[lang]}>
            <div className="th-col">
              {left.map((s) => cmd(s, 'left'))}
            </div>
            <div className="th-center">
              <svg className="th-wires" viewBox={`0 0 ${W} ${ROW * 4}`} preserveAspectRatio="none" aria-hidden="true">
                {left.map((s, i) => (
                  <path key={s.id} d={wire('left', i)} className={active === s.id ? 'is-active' : ''} />
                ))}
                {right.map((s, i) => (
                  <path key={s.id} d={wire('right', i)} className={active === s.id ? 'is-active' : ''} />
                ))}
              </svg>
              <Mascot />
            </div>
            <div className="th-col">
              {right.map((s) => cmd(s, 'right'))}
            </div>
          </nav>

          {cta && (
            <Link href={cta.link} className="th-prompt">
              <span className="th-prompt__caret">&gt;</span>
              <span className="th-prompt__cmd">/share --experience</span>
              <span className="th-prompt__cursor" aria-hidden="true" />
              <span className="th-prompt__enter">
                {cta.text} <kbd>↵</kbd>
              </span>
            </Link>
          )}
          <p className="th-hint">? {UI.hint[lang]}</p>

          <div className="th-how">
            <p className="th-how__cmd">
              <span>$</span> promptsklad --how
            </p>
            {(['how1', 'how2', 'how3'] as const).map((k, i) => (
              <p key={k} className="th-how__step">
                <b>{['write', 'validate', 'publish'][i]}</b>
                <span>{UI[k][lang]}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
