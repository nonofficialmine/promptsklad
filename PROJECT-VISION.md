# PROJECT-VISION — promptsklad

## Что
Общий склад промптов, скиллов и кейсов работы с ИИ. Один git-репозиторий = источник правды.

## Зачем
Промпты и опыт теряются в чатах. Нужно место, где люди находят готовое, а ИИ-агенты — сами находят нужное.

## Сценарии
1. Человек ищет промпт → сайт, поиск, копирует.
2. ИИ-агент ищет промпт → `/llms.txt`, `.md`-версии страниц.
3. Пользователь Claude Code ставит скилл → `/plugin marketplace add` + `/plugin install`.
4. Автор делится → форма `/new` → Issue на GitHub → Action проверяет и публикует (1 шаг автора, ~1 мин). Скиллы — через PR.

## Ожидаемый результат
- Сайт со всеми разделами, поиском и `llms.txt`.
- Маркетплейс проходит `claude plugin validate`.
- Обсуждение — в TG-канале с группой (анонс на каждый мерж).

## Архитектура
- Rspress 2 (SSG): `content/` → `doc_build/`.
- `.claude-plugin/marketplace.json` + `plugins/*` — скиллы.
- Публикация: `content/new.mdx` (форма) → Issue Form → `.github/workflows/submission.yml` + `scripts/submission.mjs`. Валидация общая: `site/validate.mjs`.
- Профили = GitHub-аккаунты, страницы `/authors/*` генерирует `site/authors-plugin.ts`.
- Хостинг: Vercel (`vercel.json`, деплой на каждый пуш). `ci.yml` — тесты + сборка.
- Docker: node build → nginx static, `/health`.
- FSD/Effector/VSA не применимы: нет бизнес-состояния и бэкенда.

## Анти-скоуп (пока)
Свой логин, лайки, БД, свой бэкенд, TG-бот (нет ресурсов на хостинг), публикация в npm/PyPI.

## Текущая итерация
v0.2 — публикация через форму (вариант A): форма + Issue Form + Action, профили авторов, хостинг на Vercel.
Дальше: вход через GitHub без лишнего клика (вариант B, Cloudflare Worker), если клик на GitHub будет мешать.
