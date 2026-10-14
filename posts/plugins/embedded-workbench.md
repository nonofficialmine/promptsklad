---
title: "Embedded Workbench: прошивки на C/C++, FreeRTOS, Keil и HardFault"
description: "Знания и агенты для разработчиков встраиваемых систем на C/C++ под Cortex-M: FreeRTOS, прерывания, хранение в NVM, сборка в Keil MDK, разбор HardFault, конечные"
topic: "dev"
tags: ["debugging","refactoring"]
models: []
---

# Embedded Workbench: прошивки на C/C++, FreeRTOS, Keil и HardFault

**Тема:** Разработка · **Теги:** отладка, рефакторинг

**Для чего:** Знания и агенты для разработчиков встраиваемых систем на C/C++ под Cortex-M: FreeRTOS, прерывания, хранение в NVM, сборка в Keil MDK, разбор HardFault, конечные автоматы, LVGL. Помогает Claude учитывать специфику прошивок и сверять планы с реальным кодом.

**Как использовать:** В Claude Code выполните /plugin marketplace add AmethystLuna/embedded-workbench и /plugin install embedded-workbench@embedded-workbench-dev. Отдельных слэш-команд нет: навыки подключаются сами, когда задача совпадает с их описанием. Например, просьба разобрать HardFault подключит hardfault-triage, а сборка, прошивка или разбор .map-файла в Keil — keil-mdk-build. Чтобы включить общий порядок работы, попросите Claude загрузить навык embedded-workbench. Требуется Claude Code 2.1 или новее и bash для стартового хука; других зависимостей автор не заявляет. Чтобы Claude реально собирал проект через keil-mdk-build, на машине должен стоять Keil MDK с консольной утилитой UV4. Для проверки планов автор советует свой отдельный плагин logicprobe; без него используется встроенный навык fact-check.

```text
/plugin marketplace add AmethystLuna/embedded-workbench
/plugin install embedded-workbench@embedded-workbench-dev
```

**Почему работает:** Внутри 8 навыков и 4 агента. Навыки: embedded-workbench (стартовый, задаёт порядок работы), debug-methodology (правила отладки и разбор реального случая), embedded-firmware-dev (FreeRTOS, прерывания, NVM, асинхронный жизненный цикл, ловушки LVGL), keil-mdk-build (UV4, ARM Compiler 5 и 6, разбор .map, диагностика сборки), c-cpp-dev (генерация кода, стиль, раскладка памяти, рефакторинг), state-machine-design (состояния, повторы, тайм-ауты, условия переходов), hardfault-triage (регистры отказа, кадр стека, поиск строки исходника по PC), fact-check (сверка утверждений в плане с кодом). Агенты: architecture-steward планирует в режиме только чтения, design-reviewer проверяет проектные документы по фактам из кода, execution-worker ведёт цикл «план — одобрение — реализация» с проверкой компиляции, quality-coordinator ищет баги в готовой реализации. По словам автора, материал собран из личного опыта работы с реальными проектами на Cortex-M.

**Комментарий:** Плагин стороннего автора: Amethyst Luna, github.com/AmethystLuna/embedded-workbench. promptsklad его не проверял — перед установкой посмотрите репозиторий. Хук SessionStart запускается автоматически при старте сессии, очистке и сжатии контекста: bash-скрипт читает локальный текстовый файл и добавляет в контекст короткую инструкцию, по словам автора около 400 токенов, — проверять план перед выходом из режима планирования и не гадать о бюджете контекста. Сетевых обращений в скрипте хука нет. Основной README на китайском, есть английская версия README.en-US.md. Лицензия MIT.
