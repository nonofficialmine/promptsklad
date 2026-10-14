---
title: "Claude Code Harness: a harness blueprint for your own AI agent"
description: "For developers building their own AI agent: the skill helps you think through not the prompt but everything around the model — how the request is assembled, how the work loop runs,"
topic: "dev"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Claude Code Harness: a harness blueprint for your own AI agent

> Machine translation from Russian. [Original](/plugins/claude-code-harness)

**Topic:** Development

**Purpose:** For developers building their own AI agent: the skill helps you think through not the prompt but everything around the model — how the request is assembled, how the work loop runs, what tools and access permissions there are, what is kept in memory and how to recover after a failure.

**How to use:** Type the two install commands in Claude Code. The skill is called with the /claude-code-harness:claude-code-harness command — you can add a task description right away, for example ask it to design a harness for an agent that writes code in a repository, with access permissions and recovery. The output is a text blueprint: the system's goal and delegation boundaries, layers, request assembly, the turn loop, tools and permissions, memory and context, the log and recovery, extension points (plugins, MCP, subagents) and the build order. Nothing extra needs to be installed. The author states explicitly that the skill is not for simple prompts, product brainstorming or ordinary code writing.

```text
/plugin marketplace add dadwadw233/claude-code-harness
/plugin install claude-code-harness@claude-code-harness

/claude-code-harness:claude-code-harness
```

**Why it works:** Inside are one skill, claude-code-harness, and four reference files: harness principles (harness-principles.md), a vocabulary of patterns such as the request assembler and the recovery plane (harness-pattern-language.md), a template for the final blueprint (harness-blueprint-template.md) and insights generalized from how Claude Code is built (claude-code-derived-insights.md). The skill makes you spell out what usually gets put off: where permissions and confirmations live, what to do on a partial failure, which memory survives a restart, how a person sees and stops the agent's work. This helps you not get stuck on the "prompt plus a list of tools" scheme and honestly decide whether you need a complex harness or a simple script will do.

**Comment:** Third-party plugin by Yuanhong Yu, github.com/dadwadw233/claude-code-harness. promptsklad has not reviewed it — look through the repository before installing. It is just Markdown instructions: no hooks, MCP servers or executable scripts. The project is unofficial and not affiliated with Anthropic. Version 0.1.0. License: MIT.
