---
title: "Boss: nine agents take a feature from idea to deployment"
description: "For those who want Claude Code to run a task like a small team: requirements, architecture, code, tests and pre-deployment checks — with documents and a log"
topic: "dev"
tags: ["automation","code-review","tests","ci-cd"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Boss: nine agents take a feature from idea to deployment

> Machine translation from Russian. [Original](/plugins/boss)

**Topic:** Development · **Tags:** automation, code review, tests, CI/CD

**Purpose:** For those who want Claude Code to run a task like a small team: requirements, architecture, code, tests and pre-deployment checks — with documents and a log of every step right in the project folder.

**How to use:** Type the two install commands in Claude Code. The safest first run is /boss:review on an existing project: it only reads the code, and the result is a tech-review.md report in the .boss folder. A test run with a report — /boss:qa. The full pipeline — /boss plus a task description; the --roles core flag keeps only the PM, architect, developer and QA, and the --skip-deploy flag stops the work before deployment. There are also /boss:plan (PRD and architecture before code), /boss:ship (build and pre-deployment checks), /boss:extend (your own agents and checks) and /boss:upgrade (update). You need Node.js 22.18 or newer — the plugin's built-in utility runs on it; without Node the pipeline runs in a simplified mode, with Markdown files only. Intermediate snapshots of the work need git.

```text
/plugin marketplace add echoVic/boss-skill
/plugin install boss@boss-skill

/boss:review
```

**Why it works:** Inside are the boss skill and the roles of nine agents: boss-pm, boss-architect, boss-ui-designer, boss-tech-lead, boss-scrum-master, boss-frontend, boss-backend, boss-qa and boss-devops. The work goes through four stages: requirements and architecture, breakdown into tasks, development with tests, deployment and a final report. There are checks between the stages: Gate 0 (types, linter, build), Gate 1 (test results and no critical bugs), Gate 2 (page and API speed, where applicable). Everything produced — the PRD, architecture, task list, QA and deployment reports — sits in .boss/feature-name/, and the event log lets you resume from the right stage via --continue-from. Hooks stop the agent from editing the internal state file directly and intercept dangerous commands like rm -rf, git push --force or DROP TABLE.

**Comment:** Third-party plugin by echoVic, github.com/echoVic/boss-skill. promptsklad has not reviewed it — look through the repository before installing. The plugin installs hooks that run on their own: at session start and end, before file writes and terminal commands, and while subagents work; one of them automatically makes an intermediate snapshot via git (stash, commit or branch) after an agent finishes. You can loosen the hooks with the BOSS_HOOK_PROFILE=minimal or BOSS_DISABLED_HOOKS variables. According to the author, the plugin sends nothing over the network; the exception is a local design preview server on 127.0.0.1, which only starts manually. Note: per the skill's instructions, documents in .boss are written in Chinese by default. License: MIT.
