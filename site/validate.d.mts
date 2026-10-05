type Field = { id: string; label: string; kind: 'select' | 'multiselect' | 'input' | 'textarea'; options?: 'sections' | 'topics' | 'tags'; required: boolean; min?: number; max?: number };
export declare const spec: { repo: string; sections: Record<string, string>; topics: string[]; tags: string[]; fields: Field[] };
export declare function validate(values: Record<string, string>, lang?: 'ru' | 'uz' | 'en'): Record<string, string>;
export declare function splitList(s: string | undefined): string[];
