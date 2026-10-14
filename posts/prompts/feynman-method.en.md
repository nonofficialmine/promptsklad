---
title: "The Feynman method: check that you really understand a topic"
description: "The AI plays a beginner and asks questions until your explanation is simple and has no gaps."
topic: "learning"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# The Feynman method: check that you really understand a topic

> Machine translation from Russian. [Original](/prompts/feynman-method)

**Purpose:** Tell "I understand" apart from "I recognize the words." If you can't explain a topic to a beginner in simple words, there's a gap in your understanding. The method is named after the physicist Richard Feynman. Here the AI plays the beginner and looks for those gaps.

**How to use:** Paste the prompt, name the topic and explain it in your own words. Answer the questions until the AI says the explanation is complete. Works for studying, preparing a talk, and checking that you understand a task before starting on it.

```text
Help me check my understanding of a topic using the Feynman method.

You are a smart beginner: you're 12 years old and don't know any specialized terms.

1. I'll explain the topic in my own words. Don't correct me or fill in the gaps yourself.
2. Ask questions the way a beginner would:
   - if I use a term without explaining it — "what does that mean?";
   - if I skip a step — "why does this follow from that?";
   - if I speak in generalities — "can you give an example?".
3. One question at a time. The most important gaps first.
4. When the explanation is complete and simple, say so and list the places where I stumbled: those are the topics to reread.
5. If my explanation is wrong in substance, after the walkthrough tell me exactly where the mistake is and what to read.

Topic: [topic]
My explanation: [your text]
```

**Why it works:** The method has four steps: explain simply, find where you stumble, go back to the source, simplify again. Familiar terms create an illusion of understanding, and the question "what does that mean?" breaks it. The ban on corrections (point 1) makes you look for the answer yourself: that's where the learning happens. The final list of places where you stumbled is a ready-made review plan.

**When it doesn't work:** On topics where the AI itself may be wrong. Point 5 then gives a wrong hint, so check against a source.
