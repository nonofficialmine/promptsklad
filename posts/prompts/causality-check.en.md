---
title: "Correlation or cause: checking an analytics conclusion"
description: "Before you change a policy based on dashboard data, it walks through alternative explanations for the same relationship."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Correlation or cause: checking an analytics conclusion

> Machine translation from Russian. [Original](/prompts/causality-check)

**Purpose:** Check a conclusion of the form "X affects Y" before making a decision. A typical case: a tool showed that a discount triples the probability of closing a deal, and the team wants to give more discounts. But the same chart can be explained by several mechanisms.

**How to use:** Paste the prompt, the conclusion and a description of the data.

```text
Check whether the relationship in the conclusion below is causal.

1. List the explanations that produce the same picture in the data:
   - direct cause: X causes Y;
   - reverse cause: Y causes X (or X is recorded at the moment of Y);
   - third factor: Z causes both X and Y;
   - selection: only certain cases made it into the data.
2. For each: what we would have to do as a result if that explanation is the true one.
3. Which checks would tell the explanations apart: when X is recorded, how cases with and without X differ, whether an experiment can be run on part of the sample.
4. Bottom line in one sentence, in the format "There is a relationship. The mechanism is [known / unknown]. Before deciding, check: ...".

Conclusion: [conclusion]
Data: [where it comes from and how it was collected]
```

**Why it works:** All four explanations produce the same chart, but their consequences are opposite. If the causality runs in reverse, more discounts mean lower margins with no growth in sales. A mistake here is expensive, because forecasts and pricing models get built on an unproven relationship, and there it already looks like a calculation.

**When it doesn't work:** If an experiment is impossible and the alternatives can't be told apart in the data. Then the honest bottom line is "mechanism unknown", and the decision is made as a bet, not as a conclusion.
