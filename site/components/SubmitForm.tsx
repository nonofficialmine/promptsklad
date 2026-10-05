import { useEffect, useRef, useState } from 'react';
import { useLang } from '@rspress/core/runtime';
import type { Lang } from '../i18n';
import { spec, validate } from '../validate.mjs';
import './SubmitForm.css';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const SITE_KEY = process.env.TURNSTILE_SITE_KEY as string;
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// Подписи формы по языкам. Значения, уходящие на сервер (ключи разделов, id полей), не переводятся.
const T = {
  ru: {
    labels: { author_name: 'Имя (необязательно)' } as Record<string, string>,
    sections: {} as Record<string, string>,
    submit: 'Отправить на публикацию',
    sending: 'Отправляем…',
    done: 'Готово! Пост отправлен на модерацию — после одобрения он появится на сайте.',
    doneDry: 'Локальный режим: пост прошёл проверку, на GitHub ничего не отправлено.',
    another: 'Отправить ещё',
    captcha: 'Подтвердите, что вы не робот.',
    failed: 'Не удалось отправить. Попробуйте ещё раз чуть позже.',
    fix: 'Исправьте поля, отмеченные красным.',
  },
  uz: {
    labels: {
      section: 'Bo‘lim', post_title: 'Nomi', purpose: 'Nima uchun', post_body: 'Mazmuni: prompt, konfig, SKILL.md yoki keys tavsifi',
      usage: 'Qanday ishlatish', why: 'Nega ishlaydi / xulosalar', tags: 'Teglar', models: 'Modellar', author_name: 'Ism (ixtiyoriy)',
    } as Record<string, string>,
    sections: { Промпт: 'Prompt', Скилл: 'Skill', Кейс: 'Keys', Хук: 'Hook', Плагин: 'Plagin', Настройка: 'Sozlama', MCP: 'MCP', Агент: 'Agent' } as Record<string, string>,
    submit: 'Chop etishga yuborish',
    sending: 'Yuborilmoqda…',
    done: 'Tayyor! Post moderatsiyaga yuborildi — tasdiqlangach saytda paydo bo‘ladi.',
    doneDry: 'Lokal rejim: post tekshiruvdan o‘tdi, GitHub’ga hech narsa yuborilmadi.',
    another: 'Yana yuborish',
    captcha: 'Robot emasligingizni tasdiqlang.',
    failed: 'Yuborib bo‘lmadi. Birozdan so‘ng qayta urinib ko‘ring.',
    fix: 'Qizil bilan belgilangan maydonlarni tuzating.',
  },
  en: {
    labels: {
      section: 'Section', post_title: 'Title', purpose: 'Purpose', post_body: 'Content: prompt, config, SKILL.md or case description',
      usage: 'How to use', why: 'Why it works / takeaways', tags: 'Tags', models: 'Models', author_name: 'Name (optional)',
    } as Record<string, string>,
    sections: { Промпт: 'Prompt', Скилл: 'Skill', Кейс: 'Case', Хук: 'Hook', Плагин: 'Plugin', Настройка: 'Setting', MCP: 'MCP', Агент: 'Agent' } as Record<string, string>,
    submit: 'Submit for publishing',
    sending: 'Sending…',
    done: 'Done! Your post is in moderation — it will appear on the site once approved.',
    doneDry: 'Local mode: the post passed validation, nothing was sent to GitHub.',
    another: 'Submit another',
    captcha: 'Please confirm you are not a robot.',
    failed: 'Could not submit. Please try again a bit later.',
    fix: 'Fix the fields marked in red.',
  },
};

type Values = Record<string, string>;
type Status = { kind: 'idle' | 'sending' | 'done' | 'error'; text?: string; link?: string };

/** ?section=hooks -> «Хук» */
function initialSection(): string {
  const keys = Object.keys(spec.sections);
  if (typeof window === 'undefined') return keys[0];
  const id = new URLSearchParams(window.location.search).get('section');
  return keys.find((k) => spec.sections[k] === id) ?? keys[0];
}

export function SubmitForm() {
  const lang = (useLang() || 'ru') as Lang;
  const t = T[lang] ?? T.ru;
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [captcha, setCaptcha] = useState('');
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useEffect(() => setValues((v) => ({ section: initialSection(), ...v })), []);

  // Капча Cloudflare Turnstile: грузим скрипт один раз, рендерим явно (заново — после «Отправить ещё»).
  const formShown = status.kind !== 'done';
  useEffect(() => {
    if (!formShown) return;
    const mount = () => {
      if (!widget.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(widget.current, {
        sitekey: SITE_KEY,
        theme: 'auto',
        callback: (token: string) => setCaptcha(token),
        'expired-callback': () => setCaptcha(''),
      });
    };
    if (window.turnstile) return mount();
    let s = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!s) {
      s = document.createElement('script');
      s.src = TURNSTILE_SRC;
      s.async = true;
      document.head.appendChild(s);
    }
    s.addEventListener('load', mount);
    return () => {
      s?.removeEventListener('load', mount);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [formShown]);

  const set = (id: string, v: string) => {
    setValues((s) => ({ ...s, [id]: v }));
    if (errors[id]) setErrors(({ [id]: _, ...rest }) => rest);
  };

  const reset = () => {
    setValues({ section: values.section });
    setStatus({ kind: 'idle' });
    setCaptcha('');
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(values, lang);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ kind: 'error', text: t.fix });
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (!captcha) return setStatus({ kind: 'error', text: t.captcha });
    setStatus({ kind: 'sending' });
    const website = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ values, captcha, lang, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return setStatus({ kind: 'done', text: data.dryRun ? t.doneDry : t.done, link: data.prUrl });
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        return setStatus({ kind: 'error', text: t.fix });
      }
      setCaptcha('');
      window.turnstile?.reset(widgetId.current);
      setStatus({ kind: 'error', text: res.status === 403 ? t.captcha : t.failed });
    } catch {
      setStatus({ kind: 'error', text: t.failed });
    }
  };

  if (status.kind === 'done') {
    return (
      <div className="psk-done" role="status">
        <p>{status.text}</p>
        {status.link && (
          <a href={status.link} target="_blank" rel="noreferrer">
            {status.link}
          </a>
        )}
        <button type="button" onClick={reset}>
          {t.another}
        </button>
      </div>
    );
  }

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
              {t.labels[f.id] ?? f.label}
              {f.required && <b> *</b>}
            </span>
            {f.kind === 'select' ? (
              <select {...common}>
                {Object.keys(spec.sections).map((s) => (
                  <option key={s} value={s}>
                    {t.sections[s] ?? s}
                  </option>
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
      {/* honeypot: скрыто от людей, боты заполняют */}
      <input className="psk-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div ref={widget} className="psk-captcha" />
      <button type="submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? t.sending : t.submit}
      </button>
      {status.kind === 'error' && (
        <p className="psk-notice psk-notice--error" role="alert">
          {status.text}
        </p>
      )}
    </form>
  );
}
