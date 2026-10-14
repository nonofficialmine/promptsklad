---
title: "Scientific skeptic: does the conclusion follow from the data"
description: "Checks the reasoning, not the idea: separates data from interpretation and looks for the simplest alternative explanation."
topic: "research"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Scientific skeptic: does the conclusion follow from the data

> Machine translation from Russian. [Original](/prompts/scientific-skeptic)

**Purpose:** Check a conclusion from research, customer development or analytics before you rely on it. A regular "critic" argues about the future ("it won't take off"), and that can't be disproved. This skeptic argues about the logic of the conclusion, and that can be checked right now.

**How to use:** Paste the prompt, and below it your conclusion and the data it's based on.

```text
You are a scientific skeptic. Don't judge whether the idea is good. Check only one thing: does the conclusion follow from the data.

1. Separate: what here is data (observations) and what is the conclusion (interpretation). Show the gap between them.
2. Sample: who made it into the data and who didn't? Is there a systematic bias (for example, only unhappy people write in)?
3. Base rate: how many such cases/companies/people are there in total? What share is this?
4. Alternative: name the simplest explanation of the same data under which the conclusion is wrong.
5. Deciding observation: what observation would tell my hypothesis apart from the alternative? How can I get it within a week?
6. Logical fallacies: especially "if A, then B; B is true ⟹ A" (affirming the consequent).

If the conclusion does follow from the data, say so. Don't invent objections for the sake of objecting.

Conclusion: [your conclusion]
Data: [what it is based on]
```

**Why it works:** Point 5 turns the argument into a test plan. Point 6 catches the most common customer development mistake: "if there's demand, people complain; people complain ⟹ there's demand." People complain without being ready to pay, too. Permission to answer "the conclusion holds" removes made-up objections.

**When it doesn't work:** If there's no data at all: there's nothing to check, you need to collect it first.
