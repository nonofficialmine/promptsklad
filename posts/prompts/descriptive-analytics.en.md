---
title: "Descriptive analytics: what happened, no explanations"
description: "Compresses a data export into a picture of how much, where and when, and ends not with a conclusion but with a precisely framed question."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Descriptive analytics: what happened, no explanations

> Machine translation from Russian. [Original](/prompts/descriptive-analytics)

**Purpose:** The first step of any analysis of numbers: understand what exactly happened before looking for causes. The model tends to explain right away. This prompt forbids explanations and demands a point of comparison, without which a number means nothing.

**How to use:** Paste the prompt and the data: an export, a table or a description of the metrics. If there is a lot of data, provide aggregates by period and by segment.

```text
Do a descriptive analysis of the data below. Answer only the question "what happened". Do not name causes.

1. Totals: the key figures for the period — sum, count, mean, median.
2. Breakdowns: by channel, product, segment, region — whatever the data has. Shares of the whole.
3. Dynamics: by month or week; vs. the previous period and vs. the same period a year ago, if available.
4. Point of comparison: what to compare against (plan, last year, industry norm). If it's not in the data, say plainly that "a lot" or "a little" cannot be judged.
5. Money and units: if both are present, separate them. Revenue falling while units grow is about price, not demand.
6. Anomalies: what stands out from the overall picture and where exactly.
7. Bottom line in one sentence — not a conclusion but a question: "where exactly and since when did ... change?".

List separately what the data is missing for the next step.

Data: [export or description]
```

**Why it works:** Descriptive analytics stays honest only as long as it describes. Forbidding causes stops the model from passing a guess off as a fact. Point 4 catches the most common dashboard mistake: a figure with no comparison looks like a conclusion. The result of this step is a narrower search: from "what's wrong with the business" to "what's happening in channel X since June".

**When it doesn't work:** If the data was collected incorrectly (duplicates, a metric defined differently in different periods). The description will be accurate, but it will accurately describe wrong data. Check the source first.
