// Переводы интерфейса. Посты не переводятся — показываются на языке автора во всех версиях.
export const LANGS = ['ru', 'uz', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/** Префикс маршрута: русский — по умолчанию, без префикса. */
export const prefix = (lang: string) => (lang === 'ru' || !LANGS.includes(lang as Lang) ? '' : `/${lang}`);

type T = Record<Lang, string>;

export const SECTIONS: { id: string; title: T; short: T; desc: T; extra?: T }[] = [
  {
    id: 'prompts',
    short: { ru: 'готовые промпты', uz: 'tayyor promptlar', en: 'ready-made prompts' },
    title: { ru: 'Промпты', uz: 'Promptlar', en: 'Prompts' },
    desc: {
      ru: 'Готовые промпты с контекстом: для чего, как использовать, почему работает.',
      uz: 'Kontekstli tayyor promptlar: nima uchun, qanday ishlatish, nega ishlaydi.',
      en: 'Ready-to-use prompts with context: purpose, usage, why it works.',
    },
  },
  {
    id: 'skills',
    short: { ru: 'SKILL.md под задачи', uz: 'vazifalar uchun SKILL.md', en: 'task-specific SKILL.md' },
    title: { ru: 'Скиллы', uz: 'Skillar', en: 'Skills' },
    desc: {
      ru: 'Скиллы Claude Code: SKILL.md с инструкциями для конкретных задач.',
      uz: 'Claude Code skillari: aniq vazifalar uchun ko‘rsatmalar bilan SKILL.md.',
      en: 'Claude Code skills: SKILL.md files with instructions for specific tasks.',
    },
    extra: {
      ru: 'Готовые скиллы склада ставятся одной командой:\n\n```text\n/plugin marketplace add nonofficialmine/promptsklad\n/plugin install starter@promptsklad\n```',
      uz: 'Ombordagi tayyor skillar bitta buyruq bilan o‘rnatiladi:\n\n```text\n/plugin marketplace add nonofficialmine/promptsklad\n/plugin install starter@promptsklad\n```',
      en: 'Ready-made skills from the library install with one command:\n\n```text\n/plugin marketplace add nonofficialmine/promptsklad\n/plugin install starter@promptsklad\n```',
    },
  },
  {
    id: 'cases',
    short: { ru: 'реальный опыт', uz: 'real tajriba', en: 'real-world experience' },
    title: { ru: 'Кейсы', uz: 'Keyslar', en: 'Cases' },
    desc: {
      ru: 'Опыт работы с ИИ: задача → подход → результат → выводы.',
      uz: 'AI bilan ishlash tajribasi: vazifa → yondashuv → natija → xulosalar.',
      en: 'Hands-on experience: task → approach → result → takeaways.',
    },
  },
  {
    id: 'hooks',
    short: { ru: 'автоматизация событий', uz: 'hodisalarni avtomatlashtirish', en: 'event automation' },
    title: { ru: 'Хуки', uz: 'Hooklar', en: 'Hooks' },
    desc: {
      ru: 'Хуки Claude Code: команды, которые срабатывают на события (до/после инструмента, старт сессии и т.д.).',
      uz: 'Claude Code hooklari: hodisalarda ishga tushadigan buyruqlar (tooldan oldin/keyin, sessiya boshlanishi va h.k.).',
      en: 'Claude Code hooks: commands that run on events (before/after a tool, session start, etc.).',
    },
  },
  {
    id: 'plugins',
    short: { ru: 'наборы расширений', uz: 'kengaytmalar to‘plami', en: 'extension bundles' },
    title: { ru: 'Плагины', uz: 'Plaginlar', en: 'Plugins' },
    desc: {
      ru: 'Плагины Claude Code: наборы скиллов, команд, агентов и хуков.',
      uz: 'Claude Code plaginlari: skillar, buyruqlar, agentlar va hooklar to‘plamlari.',
      en: 'Claude Code plugins: bundles of skills, commands, agents and hooks.',
    },
  },
  {
    id: 'settings',
    short: { ru: 'settings.json', uz: 'settings.json', en: 'settings.json' },
    title: { ru: 'Настройки', uz: 'Sozlamalar', en: 'Settings' },
    desc: {
      ru: 'Полезные настройки settings.json: разрешения, переменные окружения, модель, статус-строка.',
      uz: 'Foydali settings.json sozlamalari: ruxsatlar, muhit o‘zgaruvchilari, model, status satri.',
      en: 'Useful settings.json tweaks: permissions, env vars, model, status line.',
    },
  },
  {
    id: 'mcp',
    short: { ru: 'внешние инструменты', uz: 'tashqi vositalar', en: 'external tools' },
    title: { ru: 'MCP', uz: 'MCP', en: 'MCP' },
    desc: {
      ru: 'MCP-серверы: какие подключать, конфиги и для чего они нужны.',
      uz: 'MCP serverlar: qaysilarini ulash, konfiglar va ular nima uchun kerak.',
      en: 'MCP servers: which to connect, configs and what they are for.',
    },
  },
  {
    id: 'agents',
    short: { ru: 'сабагенты и роли', uz: 'subagentlar va rollar', en: 'subagents & roles' },
    title: { ru: 'Агенты', uz: 'Agentlar', en: 'Agents' },
    desc: {
      ru: 'Сабагенты: описания ролей и промпты для .claude/agents/.',
      uz: 'Subagentlar: rollar tavsifi va .claude/agents/ uchun promptlar.',
      en: 'Subagents: role descriptions and prompts for .claude/agents/.',
    },
  },
];

export const UI: Record<string, T> = {
  welcome: { ru: 'Добро пожаловать в promptsklad', uz: 'promptsklad’ga xush kelibsiz', en: 'Welcome to promptsklad' },
  hint: {
    ru: 'без регистрации · проверка и модерация · открыто для ИИ через llms.txt',
    uz: 'ro‘yxatdan o‘tishsiz · tekshiruv va moderatsiya · llms.txt orqali AI uchun ochiq',
    en: 'no sign-up · validation & moderation · open to AI via llms.txt',
  },
  how1: { ru: 'опишите промпт, скилл, хук, конфиг или кейс — в форме', uz: 'prompt, skill, hook, konfig yoki keysni formada yozing', en: 'describe a prompt, skill, hook, config or case in the form' },
  how2: { ru: 'автопроверка полей и капча отсекают мусор и спам', uz: 'maydonlarni avtotekshirish va kapcha spamni to‘xtatadi', en: 'automatic validation and a captcha keep out junk and spam' },
  how3: { ru: 'модератор одобряет — пост на сайте и в llms.txt', uz: 'moderator tasdiqlaydi — post saytda va llms.txt da', en: 'a moderator approves — the post goes live and into llms.txt' },
  howTitle: { ru: 'Как поделиться опытом', uz: 'Tajribani qanday ulashish', en: 'How to share' },
  recentTitle: { ru: 'Последние посты', uz: 'So‘nggi postlar', en: 'Recent posts' },
  noRecent: { ru: 'пока пусто — станьте первым', uz: 'hozircha bo‘sh — birinchi bo‘ling', en: 'nothing yet — be the first' },
  shareDesc: { ru: 'поделиться опытом — без регистрации', uz: 'tajriba ulashish — ro‘yxatdan o‘tishsiz', en: 'share your experience — no sign-up' },
  placeholder: { ru: 'введите / или название раздела', uz: '/ yoki bo‘lim nomini kiriting', en: 'type / or a section name' },
  keys: { ru: '↑↓ выбрать · ⏎ открыть · клик — тоже работает', uz: '↑↓ tanlash · ⏎ ochish · bosish ham ishlaydi', en: '↑↓ select · ⏎ open · click works too' },
  noMatch: { ru: 'нет такой команды', uz: 'bunday buyruq yo‘q', en: 'no matching command' },
  sectionsCount: { ru: 'разделов', uz: 'bo‘lim', en: 'sections' },
  sections: { ru: 'Разделы', uz: 'Bo‘limlar', en: 'Sections' },
  empty: { ru: 'Пока пусто.', uz: 'Hozircha bo‘sh.', en: 'Nothing here yet.' },
  shareVia: { ru: 'Поделиться своим — через [форму]', uz: 'O‘zingiznikini [forma] orqali ulashing', en: 'Share yours via the [form]' },
  authors: { ru: 'Авторы', uz: 'Mualliflar', en: 'Authors' },
  author: { ru: 'Автор', uz: 'Muallif', en: 'Author' },
  posts: { ru: 'Постов', uz: 'Postlar', en: 'Posts' },
  githubProfile: { ru: 'Профиль на GitHub', uz: 'GitHub profili', en: 'GitHub profile' },
};

/** «1 пост / 3 поста / 5 постов», «1 post / 2 posts». */
export function postsLabel(n: number, lang: Lang): string {
  if (lang === 'uz') return `${n} post`;
  if (lang === 'en') return `${n} ${n === 1 ? 'post' : 'posts'}`;
  const m10 = n % 10;
  const m100 = n % 100;
  const word = m10 === 1 && m100 !== 11 ? 'пост' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'поста' : 'постов';
  return `${n} ${word}`;
}

// Темы и теги — в taxonomy.mjs: их же читает post.mjs внутри Vercel Function.
export { TAGS, TOPICS } from './taxonomy.mjs';
