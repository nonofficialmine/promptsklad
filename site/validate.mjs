// Общая валидация поста: используется и формой на сайте, и GitHub Action.
import spec from './fields.json' with { type: 'json' };

export { spec };

const FORBIDDEN = [/javascript:/i, /data:text\/html/i];

// Ключи и пароли. Репозиторий публичный: PR с постом виден всем ещё до модерации.
const SECRETS = [
  /\bsk-[A-Za-z0-9_-]{20,}/g, // OpenAI, Anthropic (sk-ant-…)
  /\bgh[pousr]_[A-Za-z0-9]{30,}/g, // GitHub
  /\bgithub_pat_[A-Za-z0-9_]{22,}/g,
  /\bglpat-[A-Za-z0-9_-]{20,}/g, // GitLab
  /\bAKIA[0-9A-Z]{16}\b/g, // AWS
  /\bAIza[0-9A-Za-z_-]{35}/g, // Google
  /\bxox[abprs]-[A-Za-z0-9-]{10,}/g, // Slack
  /\b[rs]k_live_[A-Za-z0-9]{16,}/g, // Stripe
  /\b\d{8,10}:AA[A-Za-z0-9_-]{30,}/g, // Telegram-бот
  /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, // JWT
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/g,
  /\b[a-z][a-z0-9+.-]*:\/\/[^\s:/@]+:[^\s/@]{3,}@/gi, // postgres://user:пароль@host
  // API_KEY=…, "password": "…", Bearer … — значение длинное, в нём и буквы, и цифры
  /(?:api[_-]?key|secret|token|passw(?:or)?d)["']?\s*[:=]\s*["']?(?=[\w\-./+]*\d)(?=[\w\-./+]*[A-Za-z])[\w\-./+]{12,}/gi,
  /\bBearer\s+(?=[\w\-./+=]*\d)[\w\-./+=]{20,}/g,
];
// Заглушки из документации и примеров — не ключи.
const PLACEHOLDER = /x{4,}|\.{3}|example|your|dummy|placeholder|[<>]|:(?:password|pass|pwd|secret|changeme|postgres|root|admin)@/i;

const MSG = {
  ru: { required: 'Обязательное поле', min: (n) => `Минимум ${n} символов`, max: (n) => `Максимум ${n} символов`, bad: 'Недопустимое содержимое', section: 'Неизвестный раздел', tags: 'Не больше 5 тегов', option: 'Выберите из списка', secret: (s) => `Похоже на ключ или пароль («${s}…»). Уберите его: пост увидят все` },
  uz: { required: 'Majburiy maydon', min: (n) => `Kamida ${n} ta belgi`, max: (n) => `Ko‘pi bilan ${n} ta belgi`, bad: 'Ruxsat etilmagan mazmun', section: 'Noma’lum bo‘lim', tags: '5 tadan ko‘p teg bo‘lmasin', option: 'Ro‘yxatdan tanlang', secret: (s) => `Kalit yoki parolga o‘xshaydi («${s}…»). Uni olib tashlang: postni hamma ko‘radi` },
  en: { required: 'Required field', min: (n) => `At least ${n} characters`, max: (n) => `At most ${n} characters`, bad: 'Content not allowed', section: 'Unknown section', tags: 'No more than 5 tags', option: 'Pick from the list', secret: (s) => `Looks like a key or password ("${s}…"). Remove it: everyone will see the post` },
};

/** Первый кусок текста, похожий на ключ или пароль (заглушки вроде sk-xxxx пропускаем), или null. */
export function findSecret(text) {
  for (const re of SECRETS) {
    for (const [hit] of text.matchAll(re)) if (!PLACEHOLDER.test(hit)) return hit;
  }
  return null;
}

/** @param {Record<string, string>} values @param {'ru'|'uz'|'en'} [lang] @returns {Record<string, string>} id -> ошибка */
export function validate(values, lang = 'ru') {
  const m = MSG[lang] ?? MSG.ru;
  const errors = {};
  for (const f of spec.fields) {
    const v = (values[f.id] ?? '').trim();
    if (!v) {
      if (f.required) errors[f.id] = m.required;
      continue;
    }
    if (f.kind === 'multiselect') {
      const picked = splitList(v);
      if (picked.length > f.max) errors[f.id] = m.tags;
      else if (picked.some((t) => !spec[f.options].includes(t))) errors[f.id] = m.option;
      continue;
    }
    if (f.kind === 'select') {
      const allowed = f.options === 'sections' ? Object.keys(spec.sections) : spec[f.options];
      if (!allowed.includes(v)) errors[f.id] = f.id === 'section' ? m.section : m.option;
      continue;
    }
    const secret = findSecret(v);
    if (f.min && v.length < f.min) errors[f.id] = m.min(f.min);
    else if (f.max && v.length > f.max) errors[f.id] = m.max(f.max);
    else if (FORBIDDEN.some((re) => re.test(v))) errors[f.id] = m.bad;
    else if (secret) errors[f.id] = m.secret(secret.slice(0, 8));
  }
  return errors;
}

/** "a, b ,c" -> ["a","b","c"], только буквы/цифры/пробел/дефис */
export function splitList(s) {
  return (s ?? '')
    .split(',')
    .map((t) => t.replace(/[^\p{L}\p{N} -]/gu, '').trim())
    .filter(Boolean);
}
