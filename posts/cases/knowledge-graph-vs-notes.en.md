---
title: "Ideas from AI chats kept getting lost: why not a knowledge graph"
description: "Important points from long discussions kept getting lost. A knowledge graph turned out to be premature; what helped was unfiltered capture and a mandatory reason for every rejection."
topic: "other"
tags: ["docs"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Ideas from AI chats kept getting lost: why not a knowledge graph

> Machine translation from Russian. [Original](/cases/knowledge-graph-vs-notes)

**Purpose:** Decide how to stop losing ideas, decisions and conclusions from long conversations with AI without drowning in building a system.

Setup: long discussions with Claude produce a lot of important material: ideas, decisions, rejected options. The context gets compressed, threads die off, and a week later you can't find a point from the middle of the conversation. The first thought is to build a knowledge graph.

Why not a graph (at the start):
- A graph needs an ontology: types of nodes and links. You can't design it properly before the material has piled up. The types usually end up badly chosen, and the graph gets abandoned.
- The problem isn't storage, it's capture. A graph won't save an idea that was never written down, and one that was written down can be found even by searching flat files.

What worked:
1. **Capture without a filter.** Everything goes into a single "dump" file automatically (for example, via a hook on every prompt). Deciding "important or not" at the moment of the thought is exactly the discipline that breaks down.
2. **Review in batches.** Every few days, entries are pulled out of the dump and given a type: decision, rejected idea, open question, fact from the user, hypothesis.
3. **A reason for rejection is mandatory.** A rejected idea without a reason will come back a month later, and you'll spend time on it all over again.
4. **Facts kept separate from interpretation.** Otherwise, a month later your guess looks like "but we know that".
5. **Links as plain references** `[[name]]` between notes. The graph will grow on its own if you ever need it.

**Takeaways:** The order is: reliable capture first, then review, links last. The most valuable part of the base isn't the accepted ideas but the rejected ones with a reason: they keep you from going around the same circle again.
