# promptsklad

[English](README.md) · **Русский** · [O‘zbekcha](README.uz.md)

Общий склад промптов, скиллов для Claude Code и кейсов работы с ИИ.
Один git-репозиторий — источник правды: люди читают сайт, ИИ-агенты читают `llms.txt`.

Сайт на русском, узбекском и английском (переключатель в шапке). Посты показываются на языке автора.

## Что внутри

| Раздел | Что | Где |
|---|---|---|
| Промпты | Готовые промпты с контекстом: для чего, на каких моделях, почему работает | `posts/prompts/` |
| Скиллы | Скиллы для Claude Code, ставятся одной командой | `plugins/` |
| Кейсы | Опыт: задача → подход → результат → выводы | `posts/cases/` |
| Хуки, плагины, настройки, MCP, агенты | Конфиги и настройки Claude Code | `posts/<раздел>/` |

## Установка скиллов (Claude Code)

```
/plugin marketplace add nonofficialmine/promptsklad
/plugin install starter@promptsklad
```

| Плагин | Скиллы | Для чего |
|---|---|---|
| `starter` | `prompt-card` | Оформляет промпт или кейс в карточку promptsklad |

## Для ИИ-агентов

Собранный сайт отдаёт `/llms.txt`, `/llms-full.txt` и `.md`-версию каждой страницы.

## Как добавить

**Любой материал** (промпт, скилл, кейс, хук, плагин, настройка, MCP, агент) — через форму на сайте (`/new`). Без регистрации и без git:
форма → проверка + капча → функция Vercel открывает Pull Request → модератор мержит → Vercel публикует.

**Через git** — Pull Request с файлом `posts/<раздел>/<slug>.md`. Устанавливаемые скиллы: `plugins/<plugin>/skills/<skill>/SKILL.md`.

Списки разделов и боковая панель собираются автоматически.

### Настройка публикации (env в Vercel)

| Переменная | Что |
|---|---|
| `GITHUB_TOKEN` | Fine-grained токен на этот репозиторий: Contents + Pull requests = Read and write |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Ключи [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) (бесплатно) |

Локально (`npm run dev`) `/api/submit` работает всухую с тестовыми ключами Turnstile — на GitHub ничего не уходит.

## SEO

Уже настроено: абсолютные `canonical` и `hreflang`, `sitemap.xml`, `robots.txt`, картинка превью (`og.png`), `description` на каждой странице. Узбекские и английские копии постов — `noindex` с `canonical` на русский оригинал (без дублей).

Чтобы сайт попал в Google:
1. [Google Search Console](https://search.google.com/search-console) → добавить сайт → подтвердить через meta-тег: код — в env `GOOGLE_SITE_VERIFICATION` в Vercel и передеплоить (или через DNS).
2. «Файлы Sitemap» → отправить `sitemap.xml`.

Свой домен: задать `SITE_URL` (например `https://promptsklad.uz`) и обновить `content/public/robots.txt`.

## Локальный запуск

```bash
npm install
npm run dev        # http://localhost:4310
npm run build      # статический сайт -> doc_build/
```

Docker:

```bash
docker build -t promptsklad .
docker run --rm -p 4320:80 promptsklad   # http://localhost:4320, health: /health
```

## Стек

[Rspress 2](https://rspress.rs/) (статический сайт + поиск + llms.txt) · маркетплейс плагинов Claude Code · nginx в Docker.
