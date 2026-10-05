import { useState } from 'react';
import { spec, validate } from '../validate.mjs';
import './SubmitForm.css';

// Ссылки длиннее ~8000 символов GitHub обрезает.
const MAX_URL = 7500;

type Values = Record<string, string>;

function issueUrl(values: Values, skip: string[] = []): string {
  const params = new URLSearchParams({ template: spec.template, title: `[склад] ${values.post_title.trim()}` });
  for (const f of spec.fields) {
    const v = values[f.id]?.trim();
    if (v && !skip.includes(f.id)) params.set(f.id, v);
  }
  return `https://github.com/${spec.repo}/issues/new?${params}`;
}

export function SubmitForm() {
  const [values, setValues] = useState<Values>({ section: Object.keys(spec.sections)[0] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');

  const set = (id: string, v: string) => {
    setValues((s) => ({ ...s, [id]: v }));
    if (errors[id]) setErrors(({ [id]: _, ...rest }) => rest);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setNotice('');
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    let url = issueUrl(values);
    if (url.length > MAX_URL) {
      // Длинный текст не влезает в ссылку — копируем его, автор вставит на GitHub.
      url = issueUrl(values, ['post_body']);
      await navigator.clipboard.writeText(values.post_body.trim()).catch(() => {});
      setNotice('Текст длинный: он скопирован в буфер — вставьте его в поле «Промпт или описание кейса» на GitHub.');
    } else {
      setNotice('Откроется GitHub с заполненной формой — нажмите «Create». Публикация займёт пару минут.');
    }
    window.open(url, '_blank', 'noopener');
  };

  return (
    <form className="psk-form" onSubmit={submit} noValidate>
      {spec.fields.map((f) => {
        const common = {
          id: `f-${f.id}`,
          value: values[f.id] ?? '',
          'aria-invalid': !!errors[f.id],
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            set(f.id, e.target.value),
        };
        return (
          <label key={f.id} className="psk-field">
            <span>
              {f.label}
              {f.required && <b> *</b>}
            </span>
            {f.kind === 'select' ? (
              <select {...common}>
                {Object.keys(spec.sections).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            ) : f.kind === 'textarea' ? (
              <textarea {...common} rows={f.id === 'post_body' ? 10 : 3} maxLength={f.max} />
            ) : (
              <input {...common} maxLength={f.max} />
            )}
            {errors[f.id] && <small className="psk-error">{errors[f.id]}</small>}
          </label>
        );
      })}
      <button type="submit">Опубликовать через GitHub</button>
      {notice && <p className="psk-notice">{notice}</p>}
    </form>
  );
}
