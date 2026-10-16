export declare function slugify(s: string): string;
export type Block =
  | { kind: 'title'; text: string }
  | { kind: 'meta'; items: [string, string][] }
  | { kind: 'field'; label: string; text: string }
  | { kind: 'code' | 'text'; text: string };
export declare function blocks(values: Record<string, string>): Block[];
export declare function render(values: Record<string, string>, now?: Date): string;
export declare function postPath(values: Record<string, string>, now?: Date, rand?: () => number): string;
