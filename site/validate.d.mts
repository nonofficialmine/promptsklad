type Field = { id: string; label: string; kind: 'select' | 'input' | 'textarea'; required: boolean; min?: number; max?: number };
export declare const spec: { repo: string; template: string; sections: Record<string, string>; fields: Field[] };
export declare function validate(values: Record<string, string>): Record<string, string>;
export declare function splitList(s: string | undefined): string[];
