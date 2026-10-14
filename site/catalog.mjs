// Каталог чужих плагинов Claude Code: страница /catalog на каждом языке из site/catalog/plugins.json.
// Данные — открытый набор hol-plugin-security (Apache-2.0): лицензия требует указать источник — одна строка внизу страницы.
// Отбор: плагины для Claude Code с меткой «safe», у которых в репозитории есть .claude-plugin/marketplace.json.
import data from './catalog/plugins.json' with { type: 'json' };

export const catalog = data;
export const CATALOG_LANGS = ['ru', 'uz', 'en'];

const prefix = (lang) => (lang === 'ru' ? '' : `/${lang}`);
export const catalogRoute = (lang) => `${prefix(lang)}/catalog`;

// Страницы из addPages компилируются как MDX: экранируем HTML, выражения {} и квадратные скобки.
const esc = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/[[\]]/g, (c) => (c === '[' ? '&#91;' : '&#93;'));

const date = (iso, lang) => (lang === 'en' ? iso : iso.split('-').reverse().join('.'));

const T = {
  ru: {
    label: 'Каталог плагинов',
    title: 'Каталог плагинов Claude Code',
    description: 'Плагины других авторов для Claude Code: что делают и как поставить двумя командами.',
    intro:
      'Плагины других авторов, которые ставятся в Claude Code двумя командами. В каталоге только плагины, прошедшие автоматическую проверку кода, у которых в репозитории есть каталог для команды `/plugin`.',
    warn: 'promptsklad эти плагины не проверял. Автоматическая проверка — не гарантия безопасности. Перед установкой загляните в репозиторий.',
    author: 'Автор',
    updated: 'обновлён',
    repo: 'Репозиторий',
    source: (s, d) => `Данные: [hol-plugin-security](${s.dataset}), лицензия ${s.license}, снимок от ${d}. Описания на русском и узбекском — перевод promptsklad.`,
  },
  uz: {
    label: 'Plaginlar katalogi',
    title: 'Claude Code plaginlari katalogi',
    description: 'Boshqa mualliflarning Claude Code plaginlari: nima qiladi va ikki buyruq bilan qanday o‘rnatiladi.',
    intro:
      'Claude Code’ga ikki buyruq bilan o‘rnatiladigan boshqa mualliflarning plaginlari. Katalogda faqat kodni avtomatik tekshiruvdan o‘tgan va repozitoriyida `/plugin` buyrug‘i uchun katalogi bor plaginlar.',
    warn: 'promptsklad bu plaginlarni tekshirmagan. Avtomatik tekshiruv xavfsizlik kafolati emas. O‘rnatishdan oldin repozitoriyni ko‘rib chiqing.',
    author: 'Muallif',
    updated: 'yangilangan',
    repo: 'Repozitoriy',
    source: (s, d) => `Ma’lumotlar: [hol-plugin-security](${s.dataset}), ${s.license} litsenziyasi, ${d} holatiga ko‘ra. Rus va o‘zbek tillaridagi tavsiflar — promptsklad tarjimasi.`,
  },
  en: {
    label: 'Plugin catalog',
    title: 'Claude Code plugin catalog',
    description: 'Claude Code plugins by other authors: what they do and how to install them with two commands.',
    intro:
      'Plugins by other authors that install into Claude Code with two commands. The catalog lists only plugins that passed an automated code scan and whose repository has a catalog for the `/plugin` command.',
    warn: 'promptsklad has not reviewed these plugins. An automated scan is not a safety guarantee. Look through the repository before installing.',
    author: 'Author',
    updated: 'updated',
    repo: 'Repository',
    source: (s, d) => `Data: [hol-plugin-security](${s.dataset}), license ${s.license}, snapshot of ${d}. Descriptions are the authors' own.`,
  },
};

/** Подпись ссылки на каталог в боковой панели. */
export const catalogLabel = (lang) => (T[lang] ?? T.ru).label;

/** Markdown страницы каталога на нужном языке; плагины — по числу звёзд на GitHub. */
export function catalogPage(lang) {
  const t = T[lang] ?? T.ru;
  const s = catalog.source;
  const cards = [...catalog.plugins]
    .sort((a, b) => b.stars - a.stars)
    .flatMap((p) => [
      `## ${esc(p.name)}`,
      '',
      `**${t.author}:** ${esc(p.author)} · ★ ${p.stars} · ${t.updated} ${date(p.updated, lang)}`,
      '',
      esc(p.desc[lang] ?? p.desc.en),
      '',
      '```text',
      `/plugin marketplace add ${p.repo}`,
      `/plugin install ${p.install}`,
      '```',
      '',
      `[${t.repo}](https://github.com/${p.repo})`,
      '',
    ]);
  return [
    '---',
    `title: ${JSON.stringify(t.title)}`,
    `description: ${JSON.stringify(t.description)}`,
    '---',
    '',
    `# ${t.title}`,
    '',
    t.intro,
    '',
    `> ${t.warn}`,
    '',
    ...cards,
    '---',
    '',
    `<small>${t.source(s, date(s.snapshot, lang))}</small>`,
    '',
  ].join('\n');
}

/** Страницы каталога для всех языков (для addPages). */
export const catalogPages = () => CATALOG_LANGS.map((lang) => ({ routePath: catalogRoute(lang), content: catalogPage(lang) }));
