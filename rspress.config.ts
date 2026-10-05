import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { authorsPlugin } from './site/authors-plugin';

export default defineConfig({
  root: path.join(__dirname, 'content'),
  lang: 'ru',
  title: 'promptsklad',
  description: 'Общий склад промптов, скиллов и кейсов работы с ИИ',
  icon: '/icon.png',
  // llms.txt + .md-версии страниц — чтобы ИИ сам находил нужное
  llms: true,
  plugins: [authorsPlugin(path.join(__dirname, 'content'))],
  builderConfig: {
    server: { port: 4310, strictPort: true },
  },
});
