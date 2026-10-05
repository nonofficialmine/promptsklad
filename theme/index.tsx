// Кастомная тема: своя главная (терминал Claude Code) и горячая клавиша поиска «/».
import { useEffect } from 'react';
import { Layout as BasicLayout } from '@rspress/core/theme-original';
import { HomeHub } from './HomeHub';
import './index.css';

// «/» открывает поиск, как в терминале и на GitHub (если фокус не в поле ввода).
function useSlashSearch() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key !== '/' || e.ctrlKey || e.metaKey || el.closest('input, textarea, select, [contenteditable]')) return;
      e.preventDefault();
      document.querySelector<HTMLButtonElement>('.rp-search-button')?.click();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

const Layout = () => {
  useSlashSearch();
  return <BasicLayout HomeLayout={HomeHub} />;
};

export { Layout };
export * from '@rspress/core/theme-original';
