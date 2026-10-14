type Plugin = {
  id: string;
  name: string;
  author: string;
  repo: string;
  install: string;
  stars: number;
  trust: number;
  safety: string;
  updated: string;
  hol: string;
  desc: Record<'ru' | 'uz' | 'en', string>;
};
export declare const catalog: {
  source: { name: string; url: string; dataset: string; license: string; snapshot: string; selection: string };
  plugins: Plugin[];
};
export declare const CATALOG_LANGS: string[];
export declare function catalogRoute(lang: string): string;
export declare function catalogLabel(lang: string): string;
export declare function catalogPage(lang: string): string;
export declare function catalogPages(): { routePath: string; content: string }[];
