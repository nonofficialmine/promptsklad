---
title: "Ticket check: 5W1H and \"stated vs. filled in\""
description: "Finds gaps in a task description and separates the client's requirements from what the implementer filled in on their own."
topic: "dev"
tags: ["docs"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Ticket check: 5W1H and "stated vs. filled in"

> Machine translation from Russian. [Original](/prompts/ticket-5w1h)

**Purpose:** Check a ticket or task description before handing it to a developer or QA. It catches two common problems: the ticket has no "why", and filled-in requirements look exactly like the ones the client actually stated.

**How to use:** Paste the prompt, followed by the ticket. If you have the client's original words, attach them separately.

```text
Check the ticket below.

1. 5W1H: does the ticket have Who, What, Where, When (under what conditions), Why (the purpose), How (how to verify)? For each: "present / missing / vague" plus a quote.
2. Why: what problem does the task solve? If no reason is given, suggest 2–3 hypotheses and say which of them determines the behavior at the decision points.
3. Stated vs. filled in: compare the ticket with the client's words. Mark each requirement as "stated" or "filled in by the implementer". List the filled-in ones separately as "needs confirmation".
4. Open questions: which verification steps can't be done until the question is answered? These are blockers, not notes.
5. Out of scope: keep only what a reasonable person would otherwise include in the task.

Don't rewrite the whole ticket — just list the problems.

Ticket: [text]
Client's words: [text or "none"]
```

**Why it works:** 5W1H is a mechanical completeness check; it doesn't require understanding the subject. Step 3 prevents a costly mistake: a developer builds push notifications nobody asked for, or QA fails a task over something that was never in scope.

**When it doesn't work:** If you don't have the client's original words, step 3 turns into guesswork. Then it's more honest to mark everything as "unconfirmed".
