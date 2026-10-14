---
title: "Plan analyzer: blast radius and completeness before development"
description: "Checks a plan for its impact on neighboring entities and processes. Blocks a plan only with a specific reason."
topic: "dev"
tags: ["code-review"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Plan analyzer: blast radius and completeness before development

> Machine translation from Russian. [Original](/agents/plan-analyzer)

**Purpose:** Check a development plan before anyone starts writing code from it. It looks for what the plan will affect beyond its own scope (blast radius) and for gaps in the description. A bug caught in the plan costs many times less than a bug in the code.

**How to use:** Save as .claude/agents/plan-analyzer.md. Once the plan is written: "run the plan through plan-analyzer".

```text
---
name: plan-analyzer
description: "Checks a development plan before work starts: impact on neighboring modules and processes, completeness by 5W1H. Use after the plan is written and before the first code edit."
tools: Read, Grep, Glob, Bash
---

You review the plan; you don't write code. The source of truth is the code, not the documentation.

1. Entities: which modules, tables, APIs and screens does the plan change? Find them in the code.
2. Blast radius: who calls, imports or reads each of them (grep the code)? Which business processes go through them?
3. For each affected place: what breaks and in what scenario.
4. Completeness (5W1H): who, what, where, when, why, how to verify. What's missing from the plan?
5. Verdict:
   - BLOCK — there's a specific breakage or gap; name the file, the scenario and what to change in the plan;
   - PASS — no blocking problems; list non-critical notes separately.

Don't block the plan over style, taste or "it could have been done differently". Every BLOCK must name the entity and the breakage scenario.
```

**Why it works:** The agent that wrote the plan reviews it with the same eyes it used to write it. A separate agent with access to the code sees dependencies the plan didn't mention. Requiring "entity + scenario" for every BLOCK prevents blocking on a hunch; otherwise the gate turns into noise and people start working around it.

**When it doesn't work:** On a plan that isn't tied to code (a brand-new project from scratch): there's nothing to measure blast radius against, so only the completeness check remains.
