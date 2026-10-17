// Кнопка «♥ N» под постом. Счётчик общий для оригинала и переводов; что лайкнуто — помнит браузер.
// Если лайки не подключены (нет базы) или сервер недоступен — кнопки нет.
import { useEffect, useState } from 'react';
import { useLang, usePage } from '@rspress/core/runtime';
import { likedIds, postIdFromRoute, rememberLike, sectionFromRoute } from '../likes.mjs';
import './LikeButton.css';

const T: Record<string, { like: string; unlike: string; count: string }> = {
  ru: { like: 'Нравится', unlike: 'Убрать лайк', count: 'Лайков' },
  uz: { like: 'Yoqdi', unlike: 'Layk’ni olib tashlash', count: 'Layklar' },
  en: { like: 'Like', unlike: 'Remove like', count: 'Likes' },
};

export function LikeButton() {
  const { page } = usePage();
  const t = T[useLang() || 'ru'] ?? T.ru;
  const id = postIdFromRoute(page?.routePath);
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setCount(null);
    if (!id) return;
    setLiked(likedIds().has(id));
    let stale = false;
    fetch(`/api/likes?ids=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => !stale && d && setCount(d.counts?.[id] ?? 0))
      .catch(() => {});
    return () => {
      stale = true;
    };
  }, [id]);

  if (!id || count === null) return null;

  const toggle = async () => {
    if (busy) return;
    const next = !liked;
    setBusy(true);
    setLiked(next);
    setCount((c) => Math.max(0, (c ?? 0) + (next ? 1 : -1)));
    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, action: next ? 'like' : 'unlike' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setCount(data.count);
      rememberLike(id, next);
    } catch {
      // Не получилось — возвращаем как было.
      setLiked(!next);
      setCount((c) => Math.max(0, (c ?? 0) + (next ? -1 : 1)));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="psk-like-row">
      <button
        type="button"
        className="psk-like"
        aria-pressed={liked}
        aria-label={liked ? t.unlike : t.like}
        title={liked ? t.unlike : t.like}
        disabled={busy}
        onClick={toggle}
      >
        <span className="psk-like__icon" aria-hidden="true">
          {liked ? '♥' : '♡'}
        </span>
        <span>{t.like}</span>
        <span className="psk-like__count">{count}</span>
      </button>
    </div>
  );
}

/**
 * На странице-списке раздела дописывает к каждому посту число лайков: «♥ 3» (ноль — серым).
 * Список собирается из Markdown, поэтому числа добавляются после отрисовки, одним запросом на раздел.
 */
export function ListLikeCounts() {
  const { page } = usePage();
  const label = (T[useLang() || 'ru'] ?? T.ru).count;
  const section = sectionFromRoute(page?.routePath);

  useEffect(() => {
    if (!section) return;
    let stale = false;
    const t = setTimeout(async () => {
      const main = document.querySelector('main') ?? document.body;
      main.querySelectorAll('.psk-list-like').forEach((el) => el.remove());
      const links = [...main.querySelectorAll<HTMLAnchorElement>('li > a[href]')]
        .map((a) => ({ a, id: postIdFromRoute(new URL(a.href, location.href).pathname) }))
        .filter((x): x is { a: HTMLAnchorElement; id: string } => !!x.id && x.id.startsWith(`${section}/`));
      if (!links.length) return;
      const ids = [...new Set(links.map((x) => x.id))];
      const counts: Record<string, number> = {};
      try {
        for (let i = 0; i < ids.length; i += 100) {
          const res = await fetch(`/api/likes?ids=${encodeURIComponent(ids.slice(i, i + 100).join(','))}`);
          if (!res.ok) return;
          Object.assign(counts, (await res.json()).counts);
        }
      } catch {
        return;
      }
      if (stale) return;
      for (const { a, id } of links) {
        const n = counts[id] ?? 0;
        const badge = document.createElement('span');
        badge.className = n ? 'psk-list-like psk-list-like--hot' : 'psk-list-like';
        badge.textContent = `${n ? '♥' : '♡'} ${n}`;
        badge.setAttribute('aria-label', `${label}: ${n}`);
        a.after(badge);
      }
    });
    return () => {
      stale = true;
      clearTimeout(t);
    };
  }, [section, page?.routePath, label]);

  return null;
}
