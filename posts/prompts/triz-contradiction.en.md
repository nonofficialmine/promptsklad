---
title: "Resolve a contradiction without compromise (TRIZ)"
description: "The three parts of TRIZ most applicable to software and product: the contradiction, the four separations and the ideal final result."
topic: "business"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Resolve a contradiction without compromise (TRIZ)

> Machine translation from Russian. [Original](/prompts/triz-contradiction)

**Purpose:** For when two requirements pull in opposite directions: onboarding has to be thorough and short, the product simple and powerful. A compromise ("medium length") is usually bad both ways. TRIZ looks for a way to remove the contradiction itself.

**How to use:** Paste the prompt and describe the problem.

```text
Help me solve the problem using TRIZ, with no compromises.

1. State the contradiction: "We need X so that ___, and we need not-X so that ___". If there are several contradictions, pick the main one.
2. Name the compromise solution and explain why it's bad both ways.
3. Propose a resolution through each separation:
   - in time (X now, not-X later);
   - in space (X here, not-X there);
   - by condition (X under some circumstances, not-X under others);
   - by level (X in the part, not-X in the whole).
4. Ideal final result: "the function is performed, but whatever performs it doesn't exist". How close can we get to this?
5. Resources: what's already in the system and not being used (data, user actions, context)?

Problem: [description]
```

**Why it works:** All the difficulty of TRIZ lies in stating the contradiction correctly, so that's the first step. The four separations give four different directions instead of one obvious one. The 40 principles and the contradiction matrix are deliberately left out: they were built for physical systems and only fit software metaphorically.

**When it doesn't work:** If there's no contradiction and the task is simply laborious.
