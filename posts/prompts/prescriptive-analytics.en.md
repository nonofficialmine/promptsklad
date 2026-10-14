---
title: "Prescriptive analytics: compare options and end with an experiment"
description: "Compares decision options, shows which assumption flips the conclusion, and ends with a plan for a cheap test rather than an order."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Prescriptive analytics: compare options and end with an experiment

> Machine translation from Russian. [Original](/prompts/prescriptive-analytics)

**Purpose:** Decide what to do: what price to set, where to move budget, which channel to grow. "What if" models look like calculations but rest on one or two assumptions. The prompt brings them into the open and proposes a test on a small part before deciding for everyone.

**How to use:** Paste the prompt, the goal (revenue, profit, retention), the options and what is known about how the market reacts.

```text
Compare the decision options below.

1. Goal: which metric are we maximising? If goals conflict (revenue vs. profit), show the trade-off between them instead of choosing silently.
2. For each option: expected result on the goal and on risks.
3. Assumptions: what the calculation rests on (price elasticity of demand, competitor reaction, churn). Where does each come from: an experiment, history, a benchmark or a rough guess?
4. Sensitivity: which assumption, if wrong, flips the choice? By how much would it have to be wrong?
5. Flat optimum: if several options give almost the same result, choose by risk, not by the peak.
6. Segments: is the decision the same for all segments, or should it be split?
7. Bottom line: not "do X" but "test X on [part of the market] for [period], metric [Y], we decide if [condition]".

Goal: [metric]
Options: [list]
What is known: [demand data, past changes]
```

**Why it works:** A mistake from the lower levels (correlation instead of cause in diagnostics) turns into a number here and looks like the result of a calculation. Point 3 shows what it rests on, and point 4 shows how fragile the conclusion is. Ending with an experiment closes the loop: the market's real reaction goes back into the model and corrects the assumptions.

**When it doesn't work:** If an experiment is impossible (the decision is made once and cannot be undone). Then the honest bottom line is to pick the option with the least bad worst case, not the highest expected value.
