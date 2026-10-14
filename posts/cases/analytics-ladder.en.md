---
title: "How an unproven correlation turned into a pricing recommendation"
description: "A walkthrough of a textbook case across five types of analytics: an error on a lower rung doesn't disappear, it gets amplified higher up."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# How an unproven correlation turned into a pricing recommendation

> Machine translation from Russian. [Original](/cases/analytics-ladder)

**Purpose:** See by example how the analytics chain (descriptive, diagnostic, predictive, prescriptive) turns a hypothesis into a "calculation", and where to check it.

Setup: a textbook case about a trading company whose sales aren't growing. The analysts go through every rung.

1. **Descriptive (what happened):** a dashboard: online brings in 46% of revenue, there's no growth, there's seasonality. This is a fact.
2. **Diagnostic (why):** the "key influencers" tool shows that a +2% discount triples the probability of closing a deal. This is presented as a cause, even though it's a correlation. The same chart could come from: reverse causality (the discount is recorded in the CRM at the moment of closing), a third factor (discounts go to those who were about to buy anyway), selection (weak leads don't get a discount approved).
3. **Predictive (what will happen):** the forecast shows "the decline continues". But the confidence interval (about 400k) is five times wider than the decline itself over two years (about 80k). The decline is indistinguishable from a flat trend.
4. **Prescriptive (what to do):** the model says a 7–10% price increase maximizes profit. The elasticity in the model was most likely estimated from discount history, that is, from the same unproven relationship as in step 2. On top of that, the maximum is flat: +5% and +10% give almost the same profit, but +5% is noticeably safer.

What's wrong: each rung looks more confident than the one before, while reliability drops. The modest dashboard is a fact; the pretty "optimal price" chart rests on a chain of unverified assumptions.

What to do differently:
- Between the diagnostic and prescriptive rungs, check causality: when the discount gets recorded, and how deals with and without a discount differ.
- Read the confidence interval, not just the forecast line.
- When the maximum is flat, choose by risk, not by the peak.
- The output of prescriptive analytics is an experiment on part of the market, not an order.

**Takeaways:** An error on a lower rung doesn't stay at the bottom: it carries over into the recommendation, where it already looks like a calculation. The link worth checking is the most modest one: the step from "is related to" to "causes".
