---
title: "Embedded Workbench: C/C++ firmware, FreeRTOS, Keil and HardFault"
description: "Knowledge and agents for embedded developers writing C/C++ for Cortex-M: FreeRTOS, interrupts, NVM storage, building in Keil MDK, HardFault analysis, state mach"
topic: "dev"
tags: ["debugging","refactoring"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Embedded Workbench: C/C++ firmware, FreeRTOS, Keil and HardFault

> Machine translation from Russian. [Original](/plugins/embedded-workbench)

**Topic:** Development · **Tags:** debugging, refactoring

**Purpose:** Knowledge and agents for embedded developers writing C/C++ for Cortex-M: FreeRTOS, interrupts, NVM storage, building in Keil MDK, HardFault analysis, state machines, LVGL. Helps Claude take the specifics of firmware into account and check plans against the real code.

**How to use:** In Claude Code run /plugin marketplace add AmethystLuna/embedded-workbench and /plugin install embedded-workbench@embedded-workbench-dev. There are no separate slash commands: skills load on their own when a task matches their description. For example, a request to analyze a HardFault brings in hardfault-triage, and building, flashing or analyzing a .map file in Keil brings in keil-mdk-build. To turn on the overall workflow, ask Claude to load the embedded-workbench skill. Requires Claude Code 2.1 or newer and bash for the startup hook; the author lists no other dependencies. For Claude to actually build the project through keil-mdk-build, the machine needs Keil MDK with the UV4 command-line tool. To check plans, the author recommends their own separate logicprobe plugin; without it, the built-in fact-check skill is used.

```text
/plugin marketplace add AmethystLuna/embedded-workbench
/plugin install embedded-workbench@embedded-workbench-dev
```

**Why it works:** Inside are 8 skills and 4 agents. Skills: embedded-workbench (the starting one, sets the workflow), debug-methodology (debugging rules and a walkthrough of a real case), embedded-firmware-dev (FreeRTOS, interrupts, NVM, async lifecycle, LVGL pitfalls), keil-mdk-build (UV4, ARM Compiler 5 and 6, .map analysis, build diagnostics), c-cpp-dev (code generation, style, memory layout, refactoring), state-machine-design (states, retries, timeouts, transition conditions), hardfault-triage (fault registers, stack frame, finding the source line from the PC), fact-check (checking claims in a plan against the code). Agents: architecture-steward plans in read-only mode, design-reviewer checks design documents against facts from the code, execution-worker runs the "plan — approval — implementation" cycle with a compile check, quality-coordinator looks for bugs in a finished implementation. According to the author, the material comes from personal experience with real Cortex-M projects.

**Comment:** Third-party plugin by Amethyst Luna, github.com/AmethystLuna/embedded-workbench. promptsklad has not reviewed it — look through the repository before installing. The SessionStart hook runs automatically on session start, clear and context compaction: a bash script reads a local text file and adds a short instruction to the context (about 400 tokens, according to the author): check the plan before leaving plan mode and don't guess about the context budget. The hook script makes no network calls. The main README is in Chinese; there is an English version, README.en-US.md. MIT license.
