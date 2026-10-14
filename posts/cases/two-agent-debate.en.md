---
title: "Why a \"for\" vs \"against\" debate between two agents doesn't validate an idea"
description: "A look at a popular technique: one agent argues, the other counter-argues. Its hidden flaws, and where the technique is still useful."
topic: "research"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Why a "for" vs "against" debate between two agents doesn't validate an idea

> Machine translation from Russian. [Original](/cases/two-agent-debate)

**Purpose:** Decide whether it's worth testing an idea or a fact with a debate between two agents. The technique looks convincing, but it has non-obvious defects.

Setup: test an idea or a fact like this: agent A argues "for", agent B argues "against", and a judge decides.

What's wrong, beyond the obvious (eloquence wins, you need a judge):

1. **Both debaters are the same model.** Same blind spots, same clichés. That's not two opinions but one distribution cut in two by a prompt.
2. **Arguments are generated, not found.** The "for" agent will find arguments even for a dead idea. Persuasive text comes out whatever the answer, so the strength of an argument stops meaning anything.
3. **Debate narrows things down.** The discussion stays inside the "A or not-A" frame. But the most valuable answer is usually a third one: "the question is framed wrong" or "the pain is real, but for a different segment".
4. **Debate converges to the middle.** The outcome is almost always "there are pros and cons, it needs checking".
5. **Being wrong costs nothing.** An agent's "no" risks nothing, so it carries little weight.

What works instead:

- Debate not the verdict but **which facts you need to find out** for the answer to become obvious. The output is a list of real-world checks.
- Require each side to make a **falsifiable claim**: "I'm wrong if it turns out that X".
- Give the sides **different data**, not different roles. That's when real disagreement appears.
- For finding new options, debate doesn't work at all: it's a narrowing mechanism. What broadens the search is incompatible lenses, inversion, and analogies from other industries.

**Takeaways:** An agent debate generates a list of checks; it isn't a way to establish the truth. If the output is a verdict rather than a list of what needs to be found out, the technique is being misused.
