---
title: "Cognitive analytics: causes from reviews, tickets and conversations"
description: "Analyses unstructured text: keywords in context, themes from the data, then coding against a framework. Accounts for sample bias and severity, not just frequency."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Cognitive analytics: causes from reviews, tickets and conversations

> Machine translation from Russian. [Original](/prompts/cognitive-analytics)

**Purpose:** Find the answer that isn't in the numbers. The reason a client didn't buy rarely sits in the CRM: there it's just "lost" with no explanation. It sits in tickets, reviews and conversations. The prompt analyses texts so as to find the unexpected, not just confirm the expected.

**How to use:** Paste the prompt and the texts (reviews, requests, conversations, comments). If there are hundreds, start with a sample of 50–100.

```text
Analyse the texts below. Question: [what we want to understand — from the diagnostic step].

1. Keywords in context: for the words [list], show 5–10 mentions with the surrounding text. How do people actually talk about them?
2. Themes from the data: read the texts and pick out themes that are not in my question. Don't fit them to expectations.
3. Framework: turn the themes into a list of categories, each with a definition. Code every text against it: category, sentiment, quote.
4. Frequency and severity separately: how many mentions and how serious each is (inconvenience / lost money / lost client). 500 complaints about packaging and 5 about lost data are different problems.
5. Sample bias: who writes such texts, and who stays silent? What does that mean for the conclusions?
6. Quotes: 2–3 verbatim quotes for every conclusion. No quote, no conclusion.

Texts: [texts]
```

**Why it works:** Points 1–3 follow an order proven in research: first themes grow out of the texts (inductively), then a coding framework is built from them (deductively). If you start with a ready-made framework, you'll only find what you expected. Point 4 keeps frequent trivia from overshadowing rare serious issues, and point 6 cuts out themes the model made up.

**When it doesn't work:** If there are few texts (under 20), the themes will be random. And if only people at the extremes write (delighted and angry), the conclusions will be skewed without point 5.
