// Кастомная тема: своя главная с кольцом разделов вместо стандартного hero.
import { Layout as BasicLayout } from '@rspress/core/theme-original';
import { HomeHub } from './HomeHub';
import './index.css';

const Layout = () => <BasicLayout HomeLayout={HomeHub} />;

export { Layout };
export * from '@rspress/core/theme-original';
