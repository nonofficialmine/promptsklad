---
title: "Session Orchestrator: a plan, waves of agents and a check before the commit"
description: "For those who run long sessions with Claude Code and want order: first an agreed plan, then work in waves of parallel agents with tests after each wave"
topic: "dev"
tags: ["automation","tests","git"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Session Orchestrator: a plan, waves of agents and a check before the commit

> Machine translation from Russian. [Original](/plugins/session-orchestrator)

**Topic:** Development · **Tags:** automation, tests, git

**Purpose:** For those who run long sessions with Claude Code and want order: first an agreed plan, then work in waves of parallel agents with tests after each wave, and at the end a check against the plan, a commit and issues for the remaining work.

**How to use:** You need Node.js 24 or newer and a git repository. Type the two install commands in Claude Code. Then run /bootstrap once: it creates the internal .orchestrator folder and appends a Session Config block to CLAUDE.md — check the test, type-check and linter commands in it (test-command, typecheck-command, lint-command). A quick path with no questions: /bootstrap --fast --no-interview. After that, the working cycle: /session feature — the agent reads the repository and the issues and proposes a scope of work, which you adjust; /go — execution in waves with tests after each one; /close — the check, a commit and issues for the remaining work. To create issues you need gh (GitHub) or glab (GitLab), logged in. The author doesn't test the plugin on Windows: the hooks need Git Bash or WSL. Optionally, /plugin install so-hud@kanevry adds a session status line.

```text
/plugin marketplace add Kanevry/session-orchestrator
/plugin install session-orchestrator@kanevry

/bootstrap
```

**Why it works:** By the author's count, inside are 51 skills, 30 slash commands, 14 subagents and hooks on 10 event types, plus an MCP server with two read-only tools. The core is the /session, /go, /close cycle. Each agent in a wave is given a list of files it may change, and overlapping lists are rejected up front, so agents don't overwrite each other's work. A guard hook blocks 12 dangerous command patterns (hard reset, rm -rf, force-push, DROP TABLE and others). Progress is written to .claude/STATE.md, so after a crash the next /session offers to continue from the last completed wave. There are also extra commands: /plan, /brainstorm and /grill for raw ideas, /debug for finding the cause of an error, /test and /test-audit for tests, /repo-audit for assessing a repository, /evolve for lessons from past sessions, /autopilot for a chain of sessions.

**Comment:** Third-party plugin by Bernhard Goetzendorfer, github.com/Kanevry/session-orchestrator. promptsklad has not reviewed it — look through the repository before installing. Hooks fire on their own: at session start and end, before and after tool calls, and when subagents start and stop. /close makes commits by itself and creates issues in your GitHub or GitLab via gh or glab. At session start the plugin makes an anonymous request to the npm registry to check for updates; this is turned off with the SO_DISABLE_UPDATE_CHECK=1 or DO_NOT_TRACK=1 variable. Anonymous telemetry exists but stays off until you explicitly opt in. Internal files (.orchestrator, .claude/STATE.md) are written to the repository and remain after the plugin is removed. License: MIT.
