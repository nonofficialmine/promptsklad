---
title: "A detailed ticket, but requirements mixed with guesses"
description: "An agent wrote a 12-step QA ticket from three sentences by the client. A breakdown: what's redundant, what's missing, and how to separate what was said from what was filled in."
topic: "dev"
tags: ["docs", "tests"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# A detailed ticket, but requirements mixed with guesses

> Machine translation from Russian. [Original](/cases/ticket-said-vs-built)

**Purpose:** Understand why a "good", detailed ticket that an agent wrote on the client's behalf is risky, and which fields it actually needs.

Task: in three sentences, the client described a buyer–seller chat on a marketplace. The buyer writes from the seller's shop or from a product card — either way it's one chat with the seller. When contacting from a product, the product card is posted into the chat. The agent produced a QA ticket: Environment, Preconditions, 12 verification steps, Impact, Out of scope, Notes.

What was good:
- **Preconditions** ("the buyer and the seller have never chatted before"). Without this line, the check "no second chat is created" proves nothing.
- **Notes with a source** ("requirements as stated by the client, date"). A month later you can see where a requirement came from.

What was wrong:
- **What was said and what was filled in are indistinguishable.** The client talked about two entry points, one chat and a product card. Attachments, unread counters, push and email notifications, read receipts — the agent added those itself. A developer will read them as requirements and build extra things, and QA will fail the task over things nobody asked for.
- **No "why".** Why one chat per seller rather than per product? The answer determines behaviour at the forks, for example what to do if the buyer writes about a second product six months later. A 5W1H check finds this gap mechanically, and [going up a level](/prompts/level-up) helps fill it.
- **Bloated Out of scope.** Group chats, calls, auto-replies — nobody was going to build those anyway. Only one line was valuable: chat for services is a separate process. The rest is noise that makes people stop reading the section.
- **Open questions hidden at the end.** The attachment limit and the push notification channel are blockers: without answers, some steps can't be verified. They should have been asked before writing the ticket: [Questions first, then work](/prompts/clarify-before-start).

What we did:
1. Marked every requirement as "stated by the client" or "filled in, needs confirmation".
2. Moved open questions to the top as blockers and linked them to the steps that depend on them.
3. Left in Out of scope only what a reasonable person would otherwise have included.

You can check a ticket this way with the prompt [Ticket check: 5W1H and "stated vs. filled in"](/prompts/ticket-5w1h).

**Takeaways:** A detailed ticket isn't the same as a good one. The danger isn't missing fields but mixing fact with guesswork: what the agent filled in looks just as convincing as the client's words and goes into the work. One more thing: in three sentences the client gave more than the agent would have got from a snapshot of a single-page app — interrupting that data collection and just explaining in words was the right call.

Related:
- [Negative test cases from a fault tree (FTA)](/prompts/fta-negative-cases)
- [Plan analyzer: blast radius and completeness before development](/agents/plan-analyzer)
- [Banality test: remove conclusions that say nothing](/prompts/banality-test)
