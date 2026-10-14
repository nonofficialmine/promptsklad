// Переводит новые посты на остальные языки через GitHub Models (бесплатно, лимит запросов в день).
// Запуск: GITHUB_TOKEN=... node scripts/translate.mjs   (в Action токен с правом models: read).
// На 429 (лимит) останавливается без ошибки — следующий запуск продолжит с того же места.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { LANGS, assemble, collectTexts, detectLang, isTranslationFile, splitFrontmatter, translationFile } from '../site/translations.mjs';

const ENDPOINT = 'https://models.github.ai/inference/chat/completions';
const MODEL = process.env.TRANSLATE_MODEL ?? 'openai/gpt-4o-mini';
const NAMES = { ru: 'Russian', uz: 'Uzbek (Latin script)', en: 'English' };

/** Все недостающие переводы: [{ file, section, slug, src, lang }]. */
export function pending(root = 'posts') {
  const jobs = [];
  for (const section of readdirSync(root)) {
    const dir = join(root, section);
    for (const name of readdirSync(dir).sort()) {
      if (!name.endsWith('.md') || isTranslationFile(name)) continue;
      const file = join(dir, name);
      const md = readFileSync(file, 'utf8');
      const src = splitFrontmatter(md).fm.match(/^lang:\s*"?(ru|uz|en)"?/m)?.[1] ?? detectLang(splitFrontmatter(md).body);
      for (const lang of LANGS) {
        if (lang !== src && !existsSync(translationFile(file, lang))) jobs.push({ file, section, slug: name.slice(0, -3), src, lang });
      }
    }
  }
  return jobs;
}

export async function translateTexts(texts, src, lang, token) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            `Translate every string in the JSON array "t" from ${NAMES[src]} to ${NAMES[lang]}. ` +
            'Keep Markdown formatting, links and URLs, inline code, file paths, commands, placeholders like <...> or {...}, ' +
            'and product names (Claude Code, MCP, GitHub, SKILL.md) unchanged. Keep leading/trailing whitespace and line breaks. ' +
            'Return ONLY {"t": [...]} with the same number of strings in the same order.',
        },
        { role: 'user', content: JSON.stringify({ t: texts }) },
      ],
    }),
  });
  if (res.status === 429) return { rateLimited: true };
  if (!res.ok) throw new Error(`models ${res.status}`);
  const data = await res.json();
  const out = JSON.parse(data.choices?.[0]?.message?.content ?? '{}').t;
  return { texts: Array.isArray(out) && out.length === texts.length && out.every((x) => typeof x === 'string') ? out : null };
}

export async function run({ token, root = 'posts', max = Number(process.env.TRANSLATE_MAX ?? 40) } = {}) {
  const jobs = pending(root);
  let done = 0;
  for (const job of jobs.slice(0, max)) {
    const parts = collectTexts(readFileSync(job.file, 'utf8'), job.section);
    let result;
    try {
      result = await translateTexts(parts.texts, job.src, job.lang, token);
    } catch (e) {
      console.error(`[translate] ${job.file} -> ${job.lang}: ${e.message}`);
      continue;
    }
    if (result.rateLimited) {
      console.log('[translate] лимит GitHub Models — продолжу при следующем запуске');
      break;
    }
    const md = result.texts && assemble(parts, result.texts, job);
    if (!md) {
      console.error(`[translate] ${job.file} -> ${job.lang}: ответ модели не прошёл проверку, пропуск`);
      continue;
    }
    writeFileSync(translationFile(job.file, job.lang), md);
    done++;
    console.log(`[translate] ${translationFile(job.file, job.lang)}`);
  }
  console.log(`[translate] готово ${done}, в очереди было ${jobs.length}`);
  return { done, queued: jobs.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.env.GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN не задан');
    process.exit(1);
  }
  await run({ token: process.env.GITHUB_TOKEN });
}
