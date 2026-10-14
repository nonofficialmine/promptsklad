---
title: "Diagnostic analytics: candidate causes, not the cause"
description: "Finds where a metric diverges and what the divergence is associated with. Each factor found comes with alternative explanations and a way to test them."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Diagnostic analytics: candidate causes, not the cause

> Machine translation from Russian. [Original](/prompts/diagnostic-analytics)

**Purpose:** Understand why a metric is what it is. Tools like "key influencers" show associations, and it's easy to mistake them for causes. The prompt produces a ranked list of candidates and, for each one, how to tell a cause from a coincidence.

**How to use:** Paste the prompt, the question from the descriptive step (what changed and where), and data with related fields: segments, sources, staff, deal terms.

```text
Do a diagnostic analysis. Question: [what changed and where — from the descriptive step].

1. Where the divergence is: in which breakdowns does the metric differ most?
2. What it's associated with: which fields in the data are associated with the outcome, and how strongly. Sort by strength of association.
3. For each of the top three factors, list explanations of the same association:
   - the factor causes the outcome;
   - the outcome causes the factor (or the factor is recorded at the moment of the outcome);
   - a third factor causes both;
   - selection: only certain cases made it into the data.
4. Test: what data or experiment would tell these explanations apart.
5. If the association is with a person ("manager X has higher conversion"), check whether it's really about how clients are distributed.

Bottom-line format: "The factor is associated with the outcome. The mechanism is not proven. To check: ...". Use the word "because" only if the mechanism is proven by the data.

Data: [table or field description]
```

**Why it works:** Diagnostics produces hypotheses, while tools present them as answers. Point 3 forces you to see that the same chart is explained by four mechanisms with opposite consequences. Banning "because" without proof stops a hypothesis from turning into a fact at the next step.

**When it doesn't work:** If the field you need isn't in the data at all, for example the reason a client said no. Then diagnostics based on numbers hits a wall, and you need to analyse texts — cognitive analytics.
