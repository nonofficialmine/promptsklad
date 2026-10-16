// Лайки постов: общее для браузера (кнопка) и сервера (api/likes.ts).
// id поста — «раздел/slug», один на все языки: перевод и оригинал делят счётчик.
import spec from './fields.json' with { type: 'json' };

const SECTIONS = Object.values(spec.sections);
const ROUTE = new RegExp(`^(?:/(?:uz|en))?/(${SECTIONS.join('|')})/([a-z0-9][a-z0-9-]*)$`);
const ID = new RegExp(`^(${SECTIONS.join('|')})/([a-z0-9][a-z0-9-]*)$`);

/** /en/prompts/level-up -> "prompts/level-up"; не пост (список раздела, главная, форма) -> null. */
export function postIdFromRoute(routePath) {
  const m = ROUTE.exec((routePath ?? '').replace(/\.html$/, ''));
  return m && m[2] !== 'index' ? `${m[1]}/${m[2]}` : null;
}

/** Похоже ли значение на id поста (без проверки, что пост существует). */
export const isPostId = (id) => typeof id === 'string' && id.length <= 120 && ID.test(id) && !id.endsWith('/index');

const KEY = 'psk-liked';

/** Что этот браузер уже лайкнул. localStorage может быть недоступен — тогда просто пусто. */
export function likedIds() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return new Set(Array.isArray(v) ? v.filter(isPostId) : []);
  } catch {
    return new Set();
  }
}

export function rememberLike(id, liked) {
  try {
    const ids = likedIds();
    if (liked) ids.add(id);
    else ids.delete(id);
    localStorage.setItem(KEY, JSON.stringify([...ids]));
  } catch {}
}
