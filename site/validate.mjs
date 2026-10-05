// Общая валидация поста: используется и формой на сайте, и GitHub Action.
import spec from './fields.json' with { type: 'json' };

export { spec };

const FORBIDDEN = [/javascript:/i, /data:text\/html/i];

/** @param {Record<string, string>} values @returns {Record<string, string>} id -> ошибка */
export function validate(values) {
  const errors = {};
  for (const f of spec.fields) {
    const v = (values[f.id] ?? '').trim();
    if (!v) {
      if (f.required) errors[f.id] = 'Обязательное поле';
      continue;
    }
    if (f.min && v.length < f.min) errors[f.id] = `Минимум ${f.min} символов`;
    else if (f.max && v.length > f.max) errors[f.id] = `Максимум ${f.max} символов`;
    else if (FORBIDDEN.some((re) => re.test(v))) errors[f.id] = 'Недопустимое содержимое';
  }
  const section = (values.section ?? '').trim();
  if (section && !spec.sections[section]) errors.section = 'Неизвестный раздел';
  if (splitList(values.tags).length > 5) errors.tags = 'Не больше 5 тегов';
  return errors;
}

/** "a, b ,c" -> ["a","b","c"], только буквы/цифры/пробел/дефис */
export function splitList(s) {
  return (s ?? '')
    .split(',')
    .map((t) => t.replace(/[^\p{L}\p{N} -]/gu, '').trim())
    .filter(Boolean);
}
