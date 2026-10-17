export declare function postIdFromRoute(routePath: string | undefined): string | null;
export declare function sectionFromRoute(routePath: string | undefined): string | null;
export declare function isPostId(id: unknown): id is string;
export declare function likedIds(): Set<string>;
export declare function rememberLike(id: string, liked: boolean): void;
