// Переводит новые посты на остальные языки открытой моделью NLLB-200 (scripts/nllb.py).
// Полностью бесплатно: модель работает прямо на раннере GitHub Actions, без ключей и лимитов.
// Запуск: node scripts/translate.mjs   (PYTHON — интерпретатор с transformers, по умолчанию python3).
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  LANGS,
  assemble,
  collectTexts,
  detectLang,
  fromLeaves,
  isTranslationFile,
  splitFrontmatter,
  toLeaves,
  translationFile,
} from '../site/translations.mjs';

/** Все недостающие переводы: [{ file, section, slug, src, lang }]. */
export function pending(root = 'posts') {
  const jobs = [];
  for (const section of readdirSync(root)) {
    const dir = join(root, section);
    for (const name of readdirSync(dir).sort()) {
      if (!name.endsWith('.md') || isTranslationFile(name)) continue;
      const file = join(dir, name);
      const { fm, body } = splitFrontmatter(readFileSync(file, 'utf8'));
      const src = fm.match(/^lang:\s*"?(ru|uz|en)"?/m)?.[1] ?? detectLang(body);
      for (const lang of LANGS) {
        if (lang !== src && !existsSync(translationFile(file, lang))) jobs.push({ file, section, slug: name.slice(0, -3), src, lang });
      }
    }
  }
  return jobs;
}

/** Перевод списка чистых строк через NLLB (Python). Заменяемо в тестах. */
export function nllb(strings, src, lang) {
  const py = spawnSync(process.env.PYTHON ?? 'python3', [new URL('./nllb.py', import.meta.url).pathname], {
    input: JSON.stringify({ src, tgt: lang, texts: strings }),
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (py.status !== 0) throw new Error(`nllb.py: ${(py.stderr || py.error?.message || '').trim().split('\n').pop()}`);
  return JSON.parse(py.stdout).texts;
}

/** Сегменты поста -> переведённые сегменты; Markdown разбирается здесь, модель видит только текст. */
export function translateTexts(texts, src, lang, engine = nllb) {
  const split = texts.map(toLeaves);
  const leaves = split.flatMap((s) => s.leaves);
  const out = leaves.length ? engine(leaves, src, lang) : [];
  if (!Array.isArray(out) || out.length !== leaves.length) return { texts: null, reason: 'модель вернула не столько строк' };
  let k = 0;
  return { texts: split.map((s) => fromLeaves(s, s.leaves.map(() => out[k++]))) };
}

// В GitHub Actions строки ::error:: / ::notice:: становятся аннотациями — их видно даже без доступа к логам.
const annotate = (level, msg) => console.log(process.env.GITHUB_ACTIONS ? `::${level}::${msg}` : `[translate] ${msg}`);

export function run({ root = 'posts', max = Number(process.env.TRANSLATE_MAX ?? 60), engine = nllb } = {}) {
  const jobs = pending(root);
  let done = 0;
  let errors = 0;
  for (const job of jobs.slice(0, max)) {
    const parts = collectTexts(readFileSync(job.file, 'utf8'), job.section);
    let result;
    try {
      result = translateTexts(parts.texts, job.src, job.lang, engine);
    } catch (e) {
      errors++;
      annotate('error', `${job.file} -> ${job.lang}: ${e.message}`);
      continue;
    }
    const md = result.texts && assemble(parts, result.texts, job);
    if (!md) {
      errors++;
      annotate('error', `${job.file} -> ${job.lang}: ${result.reason ?? 'перевод не прошёл проверку безопасности (HTML/javascript:)'}`);
      continue;
    }
    writeFileSync(translationFile(job.file, job.lang), md);
    done++;
    console.log(`[translate] ${translationFile(job.file, job.lang)}`);
  }
  annotate('notice', `переведено ${done}, ошибок ${errors}, в очереди было ${jobs.length}`);
  return { done, errors, queued: jobs.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = run();
  // Ошибки без единого перевода — шаг красный, чтобы поломка не пряталась за «success».
  if (r.errors && !r.done) process.exit(1);
}
