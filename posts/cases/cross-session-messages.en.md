---
title: "Two Claude Code sessions worked on one task: what worked in their messaging"
description: "One session prepared posts, the other fixed the site. Messages were held because of different permission modes, yet the work was split without conflicts."
topic: "dev"
tags: ["automation", "git"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Two Claude Code sessions worked on one task: what worked in their messaging

> Machine translation from Russian. [Original](/cases/cross-session-messages)

**Purpose:** Understand how to coordinate two parallel Claude Code sessions on one machine, and where that coordination stumbles.

Task: session A prepared posts for a site, session B was changing the code of the same site. The sessions communicated through the built-in cross-session messaging.

What happened and what worked:
1. **A message "sent" but not read.** A's reply to B was held: the sessions were in different permission modes, and B was waiting for the user's approval. The send succeeded, but Claude in B never saw the message. Session A first told the user "replied", and that had to be corrected. Rule: a successful send ≠ delivery; pass the hold notice on to the user and don't resend.
2. **Splitting files.** B listed in advance the files it was changing (API, form component, config, tests) and asked that they not be touched until it said so. There were no conflicts.
3. **The question "did you change this?".** B noticed unfamiliar commits and asked whether A had made them. A short, direct "no, we didn't touch the repository" cleared the suspicion at once.
4. **Checking the format before submitting.** B read A's drafts and found two mismatches with the form: a tag that was really a topic, and a missing required field. They were fixed before submitting, not after the server rejected them.
5. **Decisions belong to the user.** At one point B asked to "hold off on submitting", although the user had already chosen the method explicitly in session A. A neither silently complied nor argued: it told B about the user's decision and offered to pass the objection on to the user.
6. **Responsibility by capability.** The blocker required hosting access that neither session had. B had write access to the repository, so it delivered the posts through a branch and a PR. A verified the result via the GitHub API: the number of commits and files. The same principle as the [finding verifier](/agents/finding-verifier): don't trust a report without checking it.

**Takeaways:** Sessions work like two colleagues with no shared memory: every important piece of knowledge has to be passed on as text. What helps: an explicit split of files, checking the other side's result instead of taking it on trust, and one rule — decisions stay with the user, even when the neighbouring session asks otherwise.

Related:
- [Agent noise that looks like work, and how to get rid of it](/cases/agent-noise)
- [The form returned 500, but the posts got delivered: probe and workaround](/cases/form-not-configured)
- [Ideas from AI chats kept getting lost: why not a knowledge graph](/cases/knowledge-graph-vs-notes)
