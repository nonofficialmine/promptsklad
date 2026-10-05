// Общая валидация поста: используется и формой на сайте, и GitHub Action.
import spec from './fields.json' with { type: 'json' };

export { spec };

const FORBIDDEN = [/javascript:/i, /data:text\/html/i];

const MSG = {
  ru: { required: 'Обязательное поле', min: (n) => `Минимум ${n} символов`, max: (n) => `Максимум ${n} символов`, bad: 'Недопустимое содержимое', section: 'Неизвестный раздел', tags: 'Не больше 5 тегов' },
  uz: { required: 'Majburiy maydon', min: (n) => `Kamida ${n} ta belgi`, max: (n) => `Ko‘pi bilan ${n} ta belgi`, bad: 'Ruxsat etilmagan mazmun', section: 'Noma’lum bo‘lim', tags: '5 tadan ko‘p teg bo‘lmasin' },
  en: { required: 'Required field', min: (n) => `At least ${n} characters`, max: (n) => `At most ${n} characters`, bad: 'Content not allowed', section: 'Unknown section', tags: 'No more than 5 tags' },
};

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
    if (f.min && v.length < f.min) errors[f.id] = m.min(f.min);
    else if (f.max && v.length > f.max) errors[f.id] = m.max(f.max);
    else if (FORBIDDEN.some((re) => re.test(v))) errors[f.id] = m.bad;
  }
  const section = (values.section ?? '').trim();
  if (section && !spec.sections[section]) errors.section = m.section;
  if (splitList(values.tags).length > 5) errors.tags = m.tags;
  return errors;
}

/** "a, b ,c" -> ["a","b","c"], только буквы/цифры/пробел/дефис */
export function splitList(s) {
  return (s ?? '')
    .split(',')
    .map((t) => t.replace(/[^\p{L}\p{N} -]/gu, '').trim())
    .filter(Boolean);
}
