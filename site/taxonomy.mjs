// Темы и теги постов. Отдельный .mjs, а не часть i18n.ts: его импортирует post.mjs
// внутри Vercel Function, а там .ts компилируется в .js и импорт './i18n.ts' не находится.

// Тема — сфера работы (одна). Теги — конкретные задачи и инструменты (несколько). Не пересекаются.
export const TOPICS = {
  dev: { ru: 'Разработка', uz: 'Dasturlash', en: 'Development' },
  research: { ru: 'Исследования', uz: 'Tadqiqot', en: 'Research' },
  design: { ru: 'Дизайн', uz: 'Dizayn', en: 'Design' },
  data: { ru: 'Данные и аналитика', uz: 'Ma’lumotlar va tahlil', en: 'Data & analytics' },
  content: { ru: 'Тексты и контент', uz: 'Matn va kontent', en: 'Writing & content' },
  business: { ru: 'Бизнес и продукт', uz: 'Biznes va mahsulot', en: 'Business & product' },
  learning: { ru: 'Обучение', uz: 'Ta’lim', en: 'Learning' },
  other: { ru: 'Другое', uz: 'Boshqa', en: 'Other' },
};

export const TAGS = {
  'code-review': { ru: 'код-ревью', uz: 'kod-review', en: 'code review' },
  refactoring: { ru: 'рефакторинг', uz: 'refaktoring', en: 'refactoring' },
  debugging: { ru: 'отладка', uz: 'debug', en: 'debugging' },
  tests: { ru: 'тесты', uz: 'testlar', en: 'tests' },
  security: { ru: 'безопасность', uz: 'xavfsizlik', en: 'security' },
  docs: { ru: 'документация', uz: 'hujjatlar', en: 'docs' },
  automation: { ru: 'автоматизация', uz: 'avtomatlashtirish', en: 'automation' },
  'ci-cd': { ru: 'CI/CD', uz: 'CI/CD', en: 'CI/CD' },
  git: { ru: 'git', uz: 'git', en: 'git' },
  sql: { ru: 'SQL', uz: 'SQL', en: 'SQL' },
  frontend: { ru: 'frontend', uz: 'frontend', en: 'frontend' },
  backend: { ru: 'backend', uz: 'backend', en: 'backend' },
  tokens: { ru: 'экономия токенов', uz: 'token tejash', en: 'token savings' },
};
