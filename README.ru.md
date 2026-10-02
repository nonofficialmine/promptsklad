# promptsklad

[English](README.md) · **Русский** · [O‘zbekcha](README.uz.md)

Общий склад промптов, скиллов для Claude Code и кейсов работы с ИИ.
Один git-репозиторий — источник правды: люди читают сайт, ИИ-агенты читают `llms.txt`.

## Что внутри

| Раздел | Что | Где |
|---|---|---|
| Промпты | Готовые промпты с контекстом: для чего, на каких моделях, почему работает | `content/prompts/` |
| Скиллы | Скиллы для Claude Code, ставятся одной командой | `plugins/` |
| Кейсы | Опыт: задача → подход → результат → выводы | `content/cases/` |

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

Через Pull Request:

| Что | Куда |
|---|---|
| Промпт | `content/prompts/<slug>.md` + ссылка в `content/prompts/index.md` |
| Кейс | `content/cases/<slug>.md` + ссылка в `content/cases/index.md` |
| Скилл | `plugins/<plugin>/skills/<skill>/SKILL.md` + строка в `content/skills/index.md` |

Шаблон карточки: [`content/contribute.md`](content/contribute.md).

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
