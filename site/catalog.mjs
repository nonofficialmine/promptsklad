// Каталог чужих плагинов Claude Code: страница /catalog на каждом языке из site/catalog/hol-plugins.json.
// Данные — открытый набор HOL Registry (Apache-2.0), поэтому на странице указаны источник и лицензия.
// Отбор: плагины для Claude Code с меткой «safe», у которых в репозитории есть .claude-plugin/marketplace.json.
import data from './catalog/hol-plugins.json' with { type: 'json' };

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
    label: 'Каталог плагинов (HOL)',
    title: 'Каталог плагинов Claude Code',
    description: 'Плагины других авторов для Claude Code: что делают и как поставить двумя командами. Отбор из HOL Registry.',
    intro: (s) =>
      `Плагины других авторов, которые ставятся в Claude Code двумя командами. Отбор из открытого набора данных [${s.name}](${s.url}): только плагины для Claude Code с меткой безопасности «safe», у которых в репозитории есть каталог для команды \`/plugin\`.`,
    warn: 'promptsklad эти плагины не проверял. Метка HOL — результат автоматической проверки кода, а не гарантия безопасности. Перед установкой загляните в репозиторий.',
    author: 'Автор',
    trust: 'доверие',
    updated: 'обновлён',
    repo: 'Репозиторий',
    hol: 'Страница на HOL',
    source: (s, d) =>
      `Источник: [${s.name}](${s.url}), набор данных [hol-plugin-security](${s.dataset}), лицензия ${s.license}, снимок от ${d}. Описания на русском и узбекском — перевод promptsklad.`,
  },
  uz: {
    label: 'Plaginlar katalogi (HOL)',
    title: 'Claude Code plaginlari katalogi',
    description: 'Boshqa mualliflarning Claude Code plaginlari: nima qiladi va ikki buyruq bilan qanday o‘rnatiladi. HOL Registry’dan tanlov.',
    intro: (s) =>
      `Claude Code’ga ikki buyruq bilan o‘rnatiladigan boshqa mualliflarning plaginlari. [${s.name}](${s.url}) ochiq ma’lumotlar to‘plamidan tanlov: faqat «safe» xavfsizlik belgisiga ega va repozitoriyida \`/plugin\` buyrug‘i uchun katalogi bor Claude Code plaginlari.`,
    warn: 'promptsklad bu plaginlarni tekshirmagan. HOL belgisi — kodni avtomatik tekshirish natijasi, xavfsizlik kafolati emas. O‘rnatishdan oldin repozitoriyni ko‘rib chiqing.',
    author: 'Muallif',
    trust: 'ishonch',
    updated: 'yangilangan',
    repo: 'Repozitoriy',
    hol: 'HOL’dagi sahifa',
    source: (s, d) =>
      `Manba: [${s.name}](${s.url}), [hol-plugin-security](${s.dataset}) ma’lumotlar to‘plami, ${s.license} litsenziyasi, ${d} holatiga ko‘ra. Rus va o‘zbek tillaridagi tavsiflar — promptsklad tarjimasi.`,
  },
  en: {
    label: 'Plugin catalog (HOL)',
    title: 'Claude Code plugin catalog',
    description: 'Claude Code plugins by other authors: what they do and how to install them with two commands. Selected from HOL Registry.',
    intro: (s) =>
      `Plugins by other authors that install into Claude Code with two commands. Selected from the open [${s.name}](${s.url}) dataset: only Claude Code plugins with the "safe" label whose repository has a catalog for the \`/plugin\` command.`,
    warn: 'promptsklad has not reviewed these plugins. The HOL label comes from an automated code scan, not a safety guarantee. Look through the repository before installing.',
    author: 'Author',
    trust: 'trust',
    updated: 'updated',
    repo: 'Repository',
    hol: 'HOL page',
    source: (s, d) =>
      `Source: [${s.name}](${s.url}), dataset [hol-plugin-security](${s.dataset}), license ${s.license}, snapshot of ${d}. Descriptions are the authors' own as listed on HOL.`,
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
      `**${t.author}:** ${esc(p.author)} · ★ ${p.stars} · HOL: ${p.safety}, ${t.trust} ${p.trust} · ${t.updated} ${date(p.updated, lang)}`,
      '',
      esc(p.desc[lang] ?? p.desc.en),
      '',
      '```text',
      `/plugin marketplace add ${p.repo}`,
      `/plugin install ${p.install}`,
      '```',
      '',
      `[${t.repo}](https://github.com/${p.repo}) · [${t.hol}](${p.hol})`,
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
    t.intro(s),
    '',
    `> ${t.warn}`,
    '',
    ...cards,
    '---',
    '',
    t.source(s, date(s.snapshot, lang)),
    '',
  ].join('\n');
}

/** Страницы каталога для всех языков (для addPages). */
export const catalogPages = () => CATALOG_LANGS.map((lang) => ({ routePath: catalogRoute(lang), content: catalogPage(lang) }));
