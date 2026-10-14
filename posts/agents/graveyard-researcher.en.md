---
title: "Graveyard: who already tried this idea and shut down"
description: "A researcher that looks for an idea's predecessors, why they failed, and what has changed since."
topic: "research"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Graveyard: who already tried this idea and shut down

> Machine translation from Russian. [Original](/agents/graveyard-researcher)

**Purpose:** Validate a startup idea or a niche in an hour, not a month. An empty niche is almost never empty by oversight: either there's a graveyard there, or there's a structural reason. Finding it means either dropping the idea right away or finding the real entry point.

**How to use:** Save as .claude/agents/graveyard.md. Requires web search access. To call it: "ask graveyard to check the idea: ...".

```text
---
name: graveyard
description: Looks for companies and projects that already tried this idea and shut down or pivoted. Use when validating a startup idea or a new niche.
tools: WebSearch, WebFetch
---

Find those who have already tried this idea.

1. Search: shut-down startups, companies that pivoted, abandoned open-source projects, "why we shut down" posts. Search in the different languages of the market.
2. For each one found: what they did, when, how long they lasted, why they shut down — with a link to the source.
3. Group the reasons for failure: no demand, customers didn't pay, expensive acquisition, regulator, technology not ready, competitor.
4. What has changed since: has the reason for failure gone away (new technology, law, people's habits)?
5. Verdict: "the reason for failure still applies" or "conditions have changed, because ...".

Only what you found, with links. No source — don't write it. If no predecessors turned up, say so and suggest why there might be none.
```

**Why it works:** A regular competitor search finds the ones still alive, and they create an illusion of open space. The graveyard shows what exactly kills players in the niche. Point 4 turns a list of failures into the key question: "why will it work now if it didn't before?"

**When it doesn't work:** In brand-new niches where there was no way to try it before. And in markets where shutdowns aren't made public: there an empty result means nothing.
