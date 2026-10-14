---
title: "Explain what was done in plain words"
description: "So Claude Code explains its work in a way people with no programming experience can follow."
topic: "learning"
tags: ["docs"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Explain what was done in plain words

> Machine translation from Russian. [Original](/skills/explain-simply)

**Topic:** Learning · **Tags:** docs

**Purpose:** So Claude Code explains its work in a way people with no programming experience can follow.

**How to use:** Create a folder .claude/skills/explain-simply in your project (or ~/.claude/skills/explain-simply for all projects) and put a SKILL.md file in it. Claude will turn the skill on by itself when you ask for an explanation. You can also call it manually: /explain-simply.

```text
---
name: explain-simply
description: Explains what was done in the code in plain words for a person with no programming experience. Use when asked to "explain simply", "what did you do", "what does this mean", and after large edits.
---

# Explain in plain words

1. The first line is the outcome: what changed for the person, not for the code.
2. Every term comes with a plain-words explanation in parentheses right next to it.
3. One thought, one sentence. No more than 5 sentences unless asked for more detail.
4. If you didn't check something, say so: "not checked". No empty hedges like "may be required".
5. End with one next step for the person.
```

**Why it works:** The description field tells Claude when to turn the skill on, so it lists real trigger phrases. The rules are short and checkable: you can tell from the answer whether they were followed.
