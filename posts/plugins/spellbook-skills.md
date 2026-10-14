---
title: "Spellbook Skills: ворктри, коммиты, TDD и ревью кода"
description: "Десять навыков для ежедневной разработки: git-ворктри и завершение веток, аккуратные коммиты и PR/MR, TDD, ревью изменённого кода, DDD для Java и Spring Boot. Д"
topic: "dev"
tags: ["git","code-review","tests","refactoring","docs"]
models: []
---

# Spellbook Skills: ворктри, коммиты, TDD и ревью кода

**Тема:** Разработка · **Теги:** git, код-ревью, тесты, рефакторинг, документация

**Для чего:** Десять навыков для ежедневной разработки: git-ворктри и завершение веток, аккуратные коммиты и PR/MR, TDD, ревью изменённого кода, DDD для Java и Spring Boot. Для тех, кто хочет готовые рабочие процессы, а не объяснять их Claude каждый раз заново.

**Как использовать:** В Claude Code выполните /plugin marketplace add yyykf/spellbook-skills и /plugin install spellbook-skills@spellbook-marketplace, затем /reload-plugins. Навыки вызываются с префиксом плагина: /spellbook-skills:имя-навыка. Например, /spellbook-skills:git-commit готовит коммит по реальному diff, /spellbook-skills:test-driven-development ведёт работу по циклу «красный — зелёный — рефакторинг», /spellbook-skills:simplify проверяет и чистит изменённый код. Навык git-commit срабатывает и на обычную просьбу сделать коммит. Требования: Claude Code 1.0.33 или новее; для стартового хука нужны bash и Python 3. Навык reviewing-gitlab-mr-comments работает через утилиту glab, yapi-skill — через Python-скрипты и ваш сервер YApi, по умолчанию в режиме пробного прогона.

```text
/plugin marketplace add yyykf/spellbook-skills
/plugin install spellbook-skills@spellbook-marketplace

/spellbook-skills:git-commit
```

**Почему работает:** Навыки: using-git-worktrees-lite и finishing-a-development-branch-lite создают ворктри и завершают ветку (слить, открыть PR, оставить или удалить), проверяя только сборку, без прогона тестов; git-commit разбивает изменения на атомарные коммиты с сообщениями в стиле Conventional Commits; git-merge-request одной командой делает коммит, пуш и PR на GitHub или MR на GitLab; reviewing-gitlab-mr-comments разбирает комментарии к MR и предлагает план; simplify запускает три параллельных ревью (переиспользование, качество, эффективность) и исправляет найденное; test-driven-development — TDD с подходом Tidy First Кента Бека; ddd-best-practices — DDD для Java и Spring Boot; yapi-skill ищет и обновляет документацию API в YApi; agents-md-improver поддерживает AGENTS.md. Для ревью есть три агента: code-reuse-reviewer, code-quality-reviewer и code-efficiency-reviewer. Хук Project Context в начале сессии добавляет правила ведения «памяти проекта» в папке .project_context.

**Комментарий:** Плагин стороннего автора: code4j, github.com/yyykf/spellbook-skills. promptsklad его не проверял — перед установкой посмотрите репозиторий. Хук срабатывает автоматически при старте каждой сессии и каждого субагента: запускает Python-скрипт, который добавляет в контекст правила про папку .project_context — агент может создавать её в проекте и складывать туда заметки. Правила хука и часть описаний навыков написаны на китайском. По PRIVACY.md телеметрии нет; в сеть ходят только навыки, которые вы сами попросите работать с GitHub, GitLab или YApi. Проект основан на obra/superpowers, лицензия MIT.
