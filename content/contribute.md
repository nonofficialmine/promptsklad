# Как добавить

Всё добавляется через Pull Request в репозиторий.

| Что | Куда |
|---|---|
| Промпт | `content/prompts/<slug>.md` + ссылка в `content/prompts/index.md` |
| Кейс | `content/cases/<slug>.md` + ссылка в `content/cases/index.md` |
| Скилл | `plugins/<plugin>/skills/<skill>/SKILL.md` + строка в `content/skills/index.md` |

## Шаблон карточки

````md
---
title: Короткое название
tags: [тема1, тема2]
models: [claude, gpt, любая]
author: ваш ник
---

# Короткое название

**Для чего:** одна строка — какую задачу решает.

**Как использовать:** что подставить, куда вставить.

```text
сам промпт
```

**Почему работает:** что в промпте делает результат хорошим.
````

В Claude Code карточку может оформить скилл `prompt-card` из плагина `starter`.
