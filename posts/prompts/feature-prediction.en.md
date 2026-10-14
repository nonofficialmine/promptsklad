---
title: "A prediction before starting a feature"
description: "Catches \"because I like it\" features: what should happen and what result would make you admit a mistake, written down before the work starts."
topic: "business"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# A prediction before starting a feature

> Machine translation from Russian. [Original](/prompts/feature-prediction)

**Purpose:** Tell a feature the market needs from one that's just interesting to the founder or the developer. After the fact, any feature is easy to justify. A prediction written down in advance isn't.

**How to use:** Before you start working on a feature, paste the prompt and answer the questions. Save the answers next to the task and check them after the stated period.

```text
Before I start building the feature, ask me these questions one at a time. Don't accept vague answers — ask again.

1. Who exactly asked for it? Names or a count, not "users".
2. What do they do now instead of this feature? (No workaround — no pain.)
3. What breaks if we don't build it?
4. Which metric will move, and by how much?
5. What result after N weeks would make me admit the feature was a mistake?
6. What will I stop doing to free up time for it?
7. Did the idea come from watching people or from thinking about technology?

At the end, put the answers into a 7-line card. If questions 1–3 have no answers, say so plainly.
```

**Why it works:** The questions are obvious; the strength is that the answers are locked in before the work and later checked against the facts. A couple of "I was sure — nobody uses it" cycles calibrate you better than any rules. Question 7 separates insider intuition (valuable) from technical curiosity (which passes itself off as intuition).

**When it doesn't work:** When checking costs more than building: then it's cheaper to build it and see. That's fine — the main thing is to honestly write down that it's an experiment.
