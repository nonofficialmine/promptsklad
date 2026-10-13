// Черновик формы в браузере автора: закрыл вкладку — текст не пропал. Удаляется после отправки.
// localStorage может быть недоступен (приватный режим, запрет cookies) — тогда форма просто без черновика.
import { spec } from '../validate.mjs';

const KEY = 'psk-draft';
const IDS = new Set(spec.fields.map((f) => f.id));
// Раздел и тема выбраны всегда или почти всегда — без текста это ещё не черновик.
const NOT_TEXT = new Set(['section', 'topic']);

export function loadDraft(): Record<string, string> | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (!raw || typeof raw !== 'object') return null;
    const values = Object.fromEntries(Object.entries(raw).filter(([k, v]) => IDS.has(k) && typeof v === 'string')) as Record<string, string>;
    if (values.section && !(values.section in spec.sections)) delete values.section;
    return Object.keys(values).some((k) => !NOT_TEXT.has(k)) ? values : null;
  } catch {
    return null;
  }
}

export function saveDraft(values: Record<string, string>) {
  try {
    if (Object.entries(values).some(([k, v]) => !NOT_TEXT.has(k) && v.trim())) localStorage.setItem(KEY, JSON.stringify(values));
    else localStorage.removeItem(KEY);
  } catch {}
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
