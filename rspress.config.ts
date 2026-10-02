import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'content'),
  lang: 'ru',
  title: 'promptsklad',
  description: 'Общий склад промптов, скиллов и кейсов работы с ИИ',
  icon: '/icon.png',
  // llms.txt + .md-версии страниц — чтобы ИИ сам находил нужное
  llms: true,
  builderConfig: {
    server: { port: 4310, strictPort: true },
  },
});
