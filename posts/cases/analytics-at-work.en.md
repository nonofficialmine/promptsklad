---
title: "Five kinds of analytics in one work task: order and prompts"
description: "How to work through \"why isn't the metric growing\" from description to decision: which prompt at which step, and which mistake each step catches."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Five kinds of analytics in one work task: order and prompts

> Machine translation from Russian. [Original](/cases/analytics-at-work)

**Purpose:** Work through an analysis like "why isn't the metric growing" from start to decision without skipping steps. Each step has its own prompt on promptsklad.

Task (example): a marketplace launched a chat between buyers and sellers. Two months later, sellers ask why sales haven't gone up. Below is the analysis step by step; this is the order of work, not the textbook order of presentation.

1. **Descriptive — what happened.** Prompt: [Descriptive analytics](/prompts/descriptive-analytics). Export orders and chats: how many conversations, how many ended in an order, by category and by week. Catches the "number without comparison" mistake: without the period before launch, you can't say whether this is a lot or a little. The output is not a conclusion but a question: "in which categories and since which week did conversations stop ending in orders?".
2. **Diagnostic — why.** Prompt: [Diagnostic analytics](/prompts/diagnostic-analytics). Look for what the outcome is associated with: seller response time, entering the chat from a product card or from the shop, category. Catches the "association = cause" mistake. For example, slow replies are associated with lost sales, but perhaps the slow responders are sellers with scarce stock, and buyers leave because of availability.
3. **Causality check — before any decision.** Prompt: [Correlation or cause](/prompts/causality-check). This step isn't in the classic ladder, and without it the mistake from step 2 travels further.
4. **Cognitive — if the cause isn't in the numbers.** Prompt: [Cognitive analytics](/prompts/cognitive-analytics). The CRM has no "why didn't they buy" field, but the answer is in the chat messages themselves. Themes from the conversations can reveal what nobody asked about: for example, buyers ask for information that isn't on the product card at all. This step belongs to the diagnostic stage, not the end.
5. **Predictive — where it's heading.** Prompt: [Predictive analytics](/prompts/predictive-analytics). Only once the mechanism is understood. Catches the "trend line = direction" mistake, when the forecast range is wider than the trend itself.
6. **Prescriptive — what to do.** Prompt: [Prescriptive analytics](/prompts/prescriptive-analytics). Compare options: response-time hints for sellers, reply templates, showing availability right in the chat. Catches the "model = decision" mistake: the output is a test on some sellers, not a change for everyone.

What matters about the order:
- Descriptive → diagnostic → (causality check) → predictive → prescriptive. Cognitive joins at the diagnostic step when the numbers aren't enough.
- Predictive is premature while the cause is unknown: a forecast without a mechanism just continues the past.
- Each step ends with a question for the next one, not with a decision.

**Takeaways:** Reliability drops from step to step while the confidence of the presentation rises: a modest table is a fact, while "the optimal decision" rests on a chain of assumptions. That's why the most valuable link is the move from "associated" to "causes" (step 3), and the last step is always an experiment. The same effect on someone else's data: [How an unproven correlation turned into a pricing recommendation](/cases/analytics-ladder).
