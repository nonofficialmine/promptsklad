export declare const LANGS: string[];
export declare function isTranslationFile(name: string): boolean;
export declare function translationFile(file: string, lang: string): string;
export declare function detectLang(text: string): 'ru' | 'uz' | 'en';
export declare function originalRoute(src: string, section: string, slug: string): string;
