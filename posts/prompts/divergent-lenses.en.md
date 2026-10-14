---
title: "Finding non-obvious ideas: incompatible lenses until exhausted"
description: "Idea generation that reaches the tail of the distribution: different lenses, rounds until nothing new appears, and deduplication by substance."
topic: "research"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Finding non-obvious ideas: incompatible lenses until exhausted

> Machine translation from Russian. [Original](/prompts/divergent-lenses)

**Purpose:** Find options that not everyone has already gone through. Asking for "10 ideas" gets you 10 templates, and the last 3 are rewordings of the first ones. Three mechanisms work here: incompatible points of view, rounds until exhaustion, and deduplication by substance.

**How to use:** Paste the prompt and the task. Don't ask for critique of the ideas at this step — evaluation comes separately, afterwards.

```text
Generate ideas for the task below. Don't apply criticism — search only.

Lenses (look through each one separately):
- regulatory: what is required by law or by reporting rules;
- economic: where money is already slipping away;
- behavioral: where people do manual work every day;
- technological: what has recently become possible and isn't used yet;
- graveyard: who tried this and shut down, why, and what has changed since.

Rules:
1. For each idea, give a key: who pays + whose pain + how it is handled today.
2. Ideas with the same key are one idea. Merge them, don't repeat; note how many lenses it came from.
3. Work in rounds. Each round must produce ideas with a new key. Stop when two rounds in a row produce nothing new.
4. At least a third of the ideas should draw an objection if voiced at a meeting.

Task: [description]
```

**Why it works:** The lenses look at different things, so their outputs barely overlap. The three-part key catches duplicates that sound different and doesn't merge ideas that are similar but distinct. A match across several lenses is a sign of a strong idea, not noise. The "two empty rounds" stopping rule pushes into the tail, which is where the non-obvious lives. The discomfort quota gets around the model's self-censorship.

**When it doesn't work:** If you ask for generation and critique at the same time, the critique kills everything strange before it appears.
