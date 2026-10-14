---
title: "Krypton: a plan and evidence before the agent writes code"
description: "For developers who let AI agents into production code: the plugin forces a plan first — who owns the data, which old path is being replaced, how to prove"
topic: "dev"
tags: ["refactoring","code-review","ci-cd","docs"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Krypton: a plan and evidence before the agent writes code

> Machine translation from Russian. [Original](/plugins/krypton)

**Topic:** Development · **Tags:** refactoring, code review, CI/CD, docs

**Purpose:** For developers who let AI agents into production code: the plugin forces a plan first — who owns the data, which old path is being replaced, how to prove the result — so that the agent doesn't build a plausible but wrong feature.

**How to use:** Type the two install commands in Claude Code, then /reload-plugins. Skills are called with the plugin prefix. Start with /krypton:krypton-planning and describe the task — a feature, bug, refactoring or migration. The agent will build a goal package in the docs/goals/goal-name/ folder: PLAN.md (the full plan), GOAL.md (a short prompt for the next session) and EVIDENCE.md (where the evidence gets recorded). Then open a new session, paste the text of GOAL.md (or use /goal if your environment supports it) and bring in /krypton:krypton-execution — it keeps the agent within the plan until the evidence is collected. No separate programs need to be installed. The repository also has a Python 3 script for checking a goal package locally and a beta GitHub Action for pull requests.

```text
/plugin marketplace add jturntdev/krypton
/plugin install krypton@krypton-dev

/krypton:krypton-planning
```

**Why it works:** Inside are three skills. krypton-planning turns a request into a plan that names: what result is needed, what current behavior is replaced or removed, who is the source of truth, what contract crosses the module boundary and how the result will be proven. krypton-execution makes sure that during implementation the agent doesn't stray from the plan and records real evidence — an API response, browser state, command output. krypton-vps-codex-app (beta) is a step-by-step setup of a remote Linux server for Codex App. There are separate prompt templates for reviewer roles (plan-reviewer, reviewer, maintainer); it works best in an environment where you can run named subagents. The payoff: fewer duplicate paths in the code and fewer features that seem to work but live on the wrong layer.

**Comment:** Third-party plugin by jturntdev, github.com/jturntdev/krypton. promptsklad has not reviewed it — look through the repository before installing. The plugin consists only of skills: it has no hooks or MCP servers, and it runs nothing by itself. The VPS skill (beta) is designed for Codex App and touches the SSH config, GitHub access and Codex CLI authorization; according to the author's description, it asks for permission before each such step — still, read what the agent is about to run. Version 0.3.2, which the author calls the first public release. License: MIT.
