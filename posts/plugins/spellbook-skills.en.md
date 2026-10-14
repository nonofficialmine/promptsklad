---
title: "Spellbook Skills: worktrees, commits, TDD and code review"
description: "Ten skills for everyday development: git worktrees and finishing branches, clean commits and PRs/MRs, TDD, review of changed code, DDD for Java and Spring Boot."
topic: "dev"
tags: ["git","code-review","tests","refactoring","docs"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Spellbook Skills: worktrees, commits, TDD and code review

> Machine translation from Russian. [Original](/plugins/spellbook-skills)

**Topic:** Development · **Tags:** git, code review, tests, refactoring, docs

**Purpose:** Ten skills for everyday development: git worktrees and finishing branches, clean commits and PRs/MRs, TDD, review of changed code, DDD for Java and Spring Boot. For those who want ready-made workflows instead of explaining them to Claude from scratch every time.

**How to use:** In Claude Code run /plugin marketplace add yyykf/spellbook-skills and /plugin install spellbook-skills@spellbook-marketplace, then /reload-plugins. Skills are invoked with the plugin prefix: /spellbook-skills:skill-name. For example, /spellbook-skills:git-commit prepares a commit from the actual diff, /spellbook-skills:test-driven-development runs the work through the "red — green — refactor" cycle, /spellbook-skills:simplify reviews and cleans up changed code. The git-commit skill also triggers on a plain request to make a commit. Requirements: Claude Code 1.0.33 or newer; the startup hook needs bash and Python 3. The reviewing-gitlab-mr-comments skill works through the glab tool, and yapi-skill through Python scripts and your YApi server, in dry-run mode by default.

```text
/plugin marketplace add yyykf/spellbook-skills
/plugin install spellbook-skills@spellbook-marketplace

/spellbook-skills:git-commit
```

**Why it works:** Skills: using-git-worktrees-lite and finishing-a-development-branch-lite create a worktree and finish a branch (merge, open a PR, keep or delete), checking only the build, without running tests; git-commit splits changes into atomic commits with Conventional Commits-style messages; git-merge-request commits, pushes and opens a PR on GitHub or an MR on GitLab in one command; reviewing-gitlab-mr-comments goes through MR comments and proposes a plan; simplify runs three parallel reviews (reuse, quality, efficiency) and fixes what they find; test-driven-development — TDD with Kent Beck's Tidy First approach; ddd-best-practices — DDD for Java and Spring Boot; yapi-skill searches and updates API docs in YApi; agents-md-improver maintains AGENTS.md. For review there are three agents: code-reuse-reviewer, code-quality-reviewer and code-efficiency-reviewer. At the start of a session, the Project Context hook adds rules for keeping a "project memory" in the .project_context folder.

**Comment:** Third-party plugin by code4j, github.com/yyykf/spellbook-skills. promptsklad has not reviewed it — look through the repository before installing. The hook fires automatically at the start of every session and every subagent: it runs a Python script that adds rules about the .project_context folder to the context — the agent may create this folder in your project and put notes there. The hook's rules and some of the skill descriptions are written in Chinese. According to PRIVACY.md, there is no telemetry; only the skills you yourself ask to work with GitHub, GitLab or YApi go online. The project is based on obra/superpowers, MIT license.
