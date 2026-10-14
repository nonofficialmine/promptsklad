---
title: "Negative test cases from a fault tree (FTA)"
description: "Systematically derives negative scenarios from a \"how can this break\" tree instead of inventing them at random."
topic: "dev"
tags: ["tests"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Negative test cases from a fault tree (FTA)

> Machine translation from Russian. [Original](/prompts/fta-negative-cases)

**Purpose:** Get a complete list of negative and edge cases for a feature. Usually people come up with them by intuition and miss half of them. A fault tree (Fault Tree Analysis) produces them systematically: every leaf of the tree is a test case.

**How to use:** Paste the prompt, followed by the feature description or ticket.

```text
Build a fault tree (FTA) for the feature below.

1. The root is the undesired event: "the user didn't get the result of the feature".
2. Break it down using OR (any cause is enough) and AND (failure only when causes coincide).
3. Cover these layers: user input, UI, network, backend, data, concurrent actions (two tabs, double click), access permissions, deleted/changed related objects.
4. Stop a branch when its leaf can be checked with a single test.
5. At the end, a table: leaf → test case (steps, expected result) → priority.

Don't add branches that can't happen in this system.

Feature: [description]
```

**Why it works:** Unlike "5 Whys", which gives a single chain, the tree forces you to go through every branch and catches combinations (failure only when A and B happen together). The explicit layers in step 3 keep you from getting stuck on one layer, for example only on form validation.

**When it doesn't work:** It won't find failures that nobody suspects exist. For that you need hands-on exploratory testing.
