---
title: "Go up a level: is the problem framed right?"
description: "A few rounds of \"what for?\" above a feature request show that the original solution is just one of several options."
topic: "business"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Go up a level: is the problem framed right?

> Machine translation from Russian. [Original](/prompts/level-up)

**Purpose:** Before building a requested feature, check that it solves the right problem. One level up, "we need a chat" becomes "people need to get in touch"; higher still, "people need to make up their minds about a deal". At the top level you can see that chat is just one option, and not necessarily the best one.

**How to use:** Paste the prompt and the request exactly as the client or you phrased it.

```text
Raise the problem below one level up, 3–4 times.

1. At each step, ask "what is this for?" and write the answer down as a new statement of the problem.
2. Stop when the answer becomes a business or user goal rather than a means.
3. At each level, list 2–3 alternative solutions besides the original one.
4. Name the level at which the problem should be solved, and why.
5. If the original solution is still the best, say so.

This is not "5 Whys": we're not looking for the cause of a failure, we're checking the goal.

Request: [feature description]
```

**Why it works:** Almost all "fundamentally new" solutions come from shifting one level up, not from trying more options at the current one. "5 Whys" goes backward through causes (what broke); going up a level goes upward through goals (what it's for). These are different tools, and step 5 lets the model confirm the original solution so it doesn't invent alternatives for the sake of having alternatives.

**When it doesn't work:** On problems where the solution is already fixed by an external requirement: law, contract, integration.
