// Кастомная тема: своя главная (терминал Claude Code) и горячая клавиша поиска «/».
import { useEffect } from 'react';
import { usePage, usePages } from '@rspress/core/runtime';
import { Layout as BasicLayout } from '@rspress/core/theme-original';
import { HomeHub } from './HomeHub';
import { track } from '../site/track';
import { LikeButton } from '../site/components/LikeButton';
import './index.css';

// «/» открывает поиск, как в терминале и на GitHub (если фокус не в поле ввода).
function useSlashSearch() {
  useEffect(() => {
    let slash = false;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key !== '/' || e.ctrlKey || e.metaKey || el?.closest?.('input, textarea, select, [contenteditable]')) return;
      e.preventDefault();
      track('search_open', { via: 'slash' });
      slash = true;
      document.querySelector<HTMLButtonElement>('.rp-search-button')?.click();
    };
    // Клик по строке поиска мышью (программный клик из «/» не считаем дважды).
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest?.('.rp-search-button')) return;
      if (!slash) track('search_open', { via: 'click' });
      slash = false;
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick, true);
    };
  }, []);
}

// В меню у постов короткие названия (до «:») — полный заголовок показываем во всплывающей подсказке.
function useSidebarTooltips() {
  const { pages } = usePages();
  const { page } = usePage();
  useEffect(() => {
    const full = new Map(pages.map((p) => [p.routePath, p.title]));
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLAnchorElement>('a.rp-sidebar-item--group-item').forEach((a) => {
        const title = full.get(a.getAttribute('href') ?? '');
        if (title) a.title = title;
      });
    });
    return () => clearTimeout(t);
  }, [pages, page.routePath]);
}

const Layout = () => {
  useSlashSearch();
  useSidebarTooltips();
  // Лайк — под текстом каждого поста (на остальных страницах кнопка сама не рисуется).
  return <BasicLayout HomeLayout={HomeHub} afterDocContent={<LikeButton />} />;
};

export { Layout };
export * from '@rspress/core/theme-original';
