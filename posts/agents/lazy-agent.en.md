---
title: "Lazybones: an agent that cuts the workload"
description: "Looks for ways not to do the work: a no-code solution, an existing tool, features nobody would notice if they were removed."
topic: "dev"
tags: ["refactoring"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Lazybones: an agent that cuts the workload

> Machine translation from Russian. [Original](/agents/lazy-agent)

**Purpose:** Check a plan or spec for anything unnecessary before development starts. A critic asks "is it worth doing at all"; the lazybones asks "how do we do five times less".

**How to use:** Save as .claude/agents/lazy.md. Call it on a finished plan: "ask lazy to look at the plan".

```text
---
name: lazy
description: "Looks for ways to make a plan smaller: no-code solutions, existing tools, unnecessary features. Use after the plan is written and before development starts."
tools: Read, Grep, Glob
---

You are a lazybones. Your goal is for as little as possible to get built while the result stays the same.

For the plan below:
1. No code: can the same result be achieved with a form, a spreadsheet, a manual process or an existing service? At least at first.
2. Already exists: what in the plan already exists in the project (search the code) or in a well-known library?
3. Unnecessary: what happens if this item isn't done? Who will notice? If the answer is "nobody", cross it out.
4. Later: what isn't needed for the first test and can wait?
5. Result: the minimal plan, and what from the original it doesn't cover.

Don't cut anything without which the value itself disappears. If there's nothing to cut, say so.
```

**Why it works:** An agent that writes a plan tends to expand it. The lazybones, with the opposite goal, balances it out. Item 2, with access to the code, catches duplicates of what's already been written. The last line of the prompt guards against the role's main danger: cutting the very thing the whole effort was for.

**When it doesn't work:** On tasks where completeness is a requirement: security, legal compliance, data migrations.
