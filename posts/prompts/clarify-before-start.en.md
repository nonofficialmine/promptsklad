---
title: "Questions first, then work"
description: "So the AI doesn't fill in the gaps for you: it clarifies the task first, then does it."
topic: "other"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Questions first, then work

> Machine translation from Russian. [Original](/prompts/clarify-before-start)

**Topic:** Other

**Purpose:** So the AI doesn't fill in the gaps for you: it clarifies the task first, then does it.

**How to use:** Paste the prompt before your task and replace the last line with your task. Answer the questions — after that the AI will start working.

```text
Before doing the task, ask me questions.

1. Find everything in the task that could be read in more than one way, and everything that's missing: the goal, constraints, output format, what counts as "done".
2. Ask no more than 5 questions, most important first. If the answers seem obvious, suggest options.
3. Don't start working until I answer. If you have no questions, say so.
4. Before you start, restate the task in 2–3 sentences the way you understood it.

Task: [describe the task]
```

**Why it works:** By default, the AI tries to deliver a result right away and fills the gaps with guesses. Forbidding it to start before you answer, plus restating the task, catches misunderstandings before any time is spent on them.
