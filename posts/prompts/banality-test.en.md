---
title: "Banality test: remove conclusions that say nothing"
description: "Flips every conclusion; if the opposite statement sounds absurd, the original conclusion carries no information."
topic: "content"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Banality test: remove conclusions that say nothing

> Machine translation from Russian. [Original](/prompts/banality-test)

**Purpose:** Clean a report, study or strategy of conclusions that are always true and therefore useless: "customer needs must be taken into account", "quality matters". This is the most common kind of noise in AI output.

**How to use:** Paste the prompt and the text with the conclusions.

```text
Check every conclusion in the text below with the banality test.

1. Flip the conclusion: "speed matters to the customer" → "speed doesn't matter to the customer".
2. If the flipped version sounds absurd and nobody would ever say it, the original conclusion is banal: it tells us nothing.
3. If the flipped version is a reasonable position someone might hold, the conclusion has substance.
4. For each banal conclusion, suggest a more specific version that makes it testable: who, how much, compared to what, at what point.

Table: conclusion → flipped → banal? → specific version.

Text: [text]
```

**Why it works:** Only a statement that could have turned out to be false carries information. Flipping quickly shows whether a conclusion has a reasonable alternative. Making it specific turns "speed matters" into "60% of drop-offs happen when a reply takes longer than a day" — and that can be checked.

**When it doesn't work:** On deliberately general texts: mission, values, introductions. There, banality is the genre.
