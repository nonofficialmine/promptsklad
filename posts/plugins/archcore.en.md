---
title: "Archcore: project specs and decisions in Git for the agent"
description: "For those tired of re-explaining the project's structure to the agent: Archcore keeps specs, decisions, rules and plans in Git, in the .archcore folder, and gives the agent"
topic: "dev"
tags: ["docs","code-review","git"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Archcore: project specs and decisions in Git for the agent

> Machine translation from Russian. [Original](/plugins/archcore)

**Topic:** Development · **Tags:** docs, code review, git

**Purpose:** For those tired of re-explaining the project's structure to the agent: Archcore keeps specs, decisions, rules and plans in Git, in the .archcore folder, and gives the agent what it needs so that edits match the architecture and past decisions.

**How to use:** First install the archcore utility: without it the plugin's MCP server and hooks don't work. It is installed by a script from the archcore.ai site (for macOS, Linux and WSL, and separately for Windows via PowerShell); the exact commands are in the README. Then type the two plugin install commands in Claude Code. In the project, run /archcore:init — it connects the project and offers the first documents in a single preview; if you already have CLAUDE.md or AGENTS.md, the /archcore:init import command turns them into documents. After that there are three main commands: /archcore:plan before working on a feature (a spec and a task plan), /archcore:document to record a decision or describe a module, /archcore:review before merging a branch. According to the author, plain phrases work too — for example, asking it to plan a feature or check a branch. Documents are stored in .archcore as Markdown.

```text
/plugin marketplace add archcore-ai/archcore
/plugin install archcore@archcore-plugins

/archcore:init
```

**Why it works:** Inside are the init, plan, document and review skills, two subagents — archcore-assistant for tasks involving several documents and archcore-auditor for checking the knowledge base (read-only) — and the archcore MCP server for searching and editing documents. /archcore:plan first reads the repository and existing documents, asks only about what's missing there, and estimates the size of the change itself, from S to XL: a small edit needs no documents, a new capability gets a spec and a plan, and a large initiative also gets a PRD. /archcore:review compares the branch with the documents in both directions and, for each mismatch, says what is wrong — the code or the spec. Hooks load context at session start, guard documents before files are written and hint whether an edit matches the rules, and check documents after they change. Project knowledge outlives the session and goes through review like ordinary code.

**Comment:** Third-party plugin by Archcore, github.com/archcore-ai/archcore. promptsklad has not reviewed it — look through the repository before installing. The plugin itself lives in the plugins/archcore folder. The archcore utility is installed by a script that runs straight from the internet — read it first. Hooks fire on their own at session start and before every file write. Under the author's privacy policy, documents stay in the repository, but the installer and the utility send anonymous install and update events (version and platform), and the utility updates itself in the background at most once a day. Analytics is turned off with the DO_NOT_TRACK=1 or ARCHCORE_TELEMETRY_OPTOUT=1 variable; these do not turn off self-updating. /archcore:init appends its own block to CLAUDE.md or AGENTS.md. License: Apache 2.0.
