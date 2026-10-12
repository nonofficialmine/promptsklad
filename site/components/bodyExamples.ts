// Серый пример в поле «Содержимое» — свой для каждого раздела. Ключи — разделы из fields.json.
import type { Lang } from '../i18n';

const HOOK = `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": "npm run lint" }]
    }]
  }
}`;

const SETTINGS = `{
  "permissions": {
    "allow": ["Bash(npm run test:*)"],
    "deny": ["Read(./.env)"]
  }
}`;

// Токен — заглушкой: настоящие ключи форма не пропустит.
const mcp = (token: string) => `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<${token}>" }
    }
  }
}`;

const PLUGIN = `/plugin marketplace add owner/repo
/plugin install my-plugin@my-marketplace`;

export const BODY_EXAMPLES: Record<Lang, Record<string, string>> = {
  ru: {
    Промпт: `Например:
Ты — опытный редактор. Ниже письмо клиенту.
Сделай его короче и понятнее, сохрани смысл.
Убери канцелярит и пассивный залог.
Верни: исправленный текст и список правок.

{вставьте текст}`,
    Скилл: `Например, файл SKILL.md:
---
name: commit-message
description: Пишет сообщение коммита по изменениям. Используй, когда просят сделать коммит.
---
1. Посмотри изменения: git diff --staged
2. Первая строка — что сделано, до 60 символов.
3. Ниже — зачем, 1–3 строки.`,
    Кейс: `Например:
Задача: разобрать 200 отзывов клиентов за неделю.
Что сделал: выгрузил в CSV, попросил Claude сгруппировать жалобы по темам.
Результат: 6 тем, отчёт за 15 минут вместо дня.
Что не сработало: длинный файл целиком — пришлось делить на части.`,
    Хук: `Например, кусок settings.json:\n${HOOK}`,
    Плагин: `Например:
Репозиторий: github.com/owner/repo
Установка:
${PLUGIN}
Внутри: 3 скилла, команда /review, хук на линтер.`,
    Настройка: `Например, кусок settings.json:\n${SETTINGS}`,
    MCP: `Например, файл .mcp.json:\n${mcp('ваш токен')}`,
    Агент: `Например, файл .claude/agents/reviewer.md:
---
name: reviewer
description: Проверяет код после правок. Вызывай после изменений.
tools: Read, Grep, Glob
---
Ты — строгий ревьюер. Найди баги и дыры в безопасности.
Для каждой: файл:строка, что сломается, как исправить.`,
  },
  uz: {
    Промпт: `Masalan:
Sen — tajribali muharrirsan. Quyida mijozga xat.
Uni qisqaroq va tushunarliroq qil, ma’nosini saqla.
Rasmiyatchilik va murakkab iboralarni olib tashla.
Qaytar: tuzatilgan matn va o‘zgarishlar ro‘yxati.

{matnni qo‘ying}`,
    Скилл: `Masalan, SKILL.md fayli:
---
name: commit-message
description: O‘zgarishlar bo‘yicha commit xabarini yozadi. Commit qilishni so‘rashganda ishlat.
---
1. O‘zgarishlarni ko‘r: git diff --staged
2. Birinchi qator — nima qilingani, 60 belgigacha.
3. Pastda — nima uchun, 1–3 qator.`,
    Кейс: `Masalan:
Vazifa: bir haftalik 200 ta mijoz sharhini tahlil qilish.
Nima qildim: CSV’ga yukladim, Claude’dan shikoyatlarni mavzular bo‘yicha guruhlashni so‘radim.
Natija: 6 ta mavzu, hisobot bir kun o‘rniga 15 daqiqada.
Nima ishlamadi: uzun faylni birdaniga berib bo‘lmadi — qismlarga bo‘lishga to‘g‘ri keldi.`,
    Хук: `Masalan, settings.json’dan parcha:\n${HOOK}`,
    Плагин: `Masalan:
Repozitoriy: github.com/owner/repo
O‘rnatish:
${PLUGIN}
Ichida: 3 ta skill, /review buyrug‘i, linter uchun hook.`,
    Настройка: `Masalan, settings.json’dan parcha:\n${SETTINGS}`,
    MCP: `Masalan, .mcp.json fayli:\n${mcp('tokeningiz')}`,
    Агент: `Masalan, .claude/agents/reviewer.md fayli:
---
name: reviewer
description: Tahrirlardan keyin kodni tekshiradi. O‘zgarishlardan keyin chaqir.
tools: Read, Grep, Glob
---
Sen — qattiqqo‘l reviewersan. Xatolar va xavfsizlik teshiklarini top.
Har biri uchun: fayl:qator, nima buziladi, qanday tuzatish kerak.`,
  },
  en: {
    Промпт: `For example:
You are an experienced editor. Below is a letter to a client.
Make it shorter and clearer, keep the meaning.
Remove jargon and passive voice.
Return: the edited text and a list of changes.

{paste the text}`,
    Скилл: `For example, a SKILL.md file:
---
name: commit-message
description: Writes a commit message from the changes. Use when asked to commit.
---
1. Look at the changes: git diff --staged
2. First line — what was done, up to 60 characters.
3. Below — why, 1–3 lines.`,
    Кейс: `For example:
Task: sort 200 customer reviews from one week.
What I did: exported them to CSV, asked Claude to group complaints by topic.
Result: 6 topics, a report in 15 minutes instead of a day.
What didn't work: the whole long file at once — had to split it into parts.`,
    Хук: `For example, part of settings.json:\n${HOOK}`,
    Плагин: `For example:
Repository: github.com/owner/repo
Install:
${PLUGIN}
Inside: 3 skills, a /review command, a linter hook.`,
    Настройка: `For example, part of settings.json:\n${SETTINGS}`,
    MCP: `For example, a .mcp.json file:\n${mcp('your token')}`,
    Агент: `For example, a .claude/agents/reviewer.md file:
---
name: reviewer
description: Reviews code after edits. Call it after changes.
tools: Read, Grep, Glob
---
You are a strict reviewer. Find bugs and security holes.
For each: file:line, what breaks, how to fix.`,
  },
};
