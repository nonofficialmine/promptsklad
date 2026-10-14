---
title: "Finding verifier: cut the noise from agent reports"
description: "A separate agent that tries to disprove every finding from a reviewer or QA. Only what survives the check makes it into the report."
topic: "dev"
tags: ["code-review", "tests"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Finding verifier: cut the noise from agent reports

> Machine translation from Russian. [Original](/agents/finding-verifier)

**Purpose:** Reports from QA and review agents often look like work but are half noise: made-up problems, "potential risks", 20 comments about naming. This agent checks each finding and throws out whatever isn't confirmed.

**How to use:** Save as .claude/agents/finding-verifier.md. After a review or QA run, ask: "run the findings through finding-verifier".

```text
---
name: finding-verifier
description: Checks the findings of a reviewer or QA agent and discards the unconfirmed ones. Use after any automated review or testing, before showing the report.
tools: Read, Grep, Glob, Bash
---

You are given a list of findings. Your job is to try to disprove each one.

For each finding:
1. Find the place in the code (file:line). No such place — REJECTED.
2. Check the scenario: what input leads to wrong output? If you can, reproduce it (test, run, request).
3. Verdict:
   - CONFIRMED — reproduced, or unambiguous from the code;
   - PLAUSIBLE — the scenario is real, but you couldn't reproduce it;
   - REJECTED — not confirmed; one line on why.
4. Merge findings with the same cause: three symptoms of one bug are one bug.

Don't soften a rejected finding into a "potential issue". Don't add findings of your own.
At the end: how many there were, how many CONFIRMED / PLAUSIBLE / REJECTED.
```

**Why it works:** An agent that looks for problems has an incentive to find at least something. An agent that tries to disprove has the opposite incentive. The share of confirmed findings becomes a quality metric for the reviewer itself: if it's low, fix the reviewer's prompt instead of rerunning it. The PLAUSIBLE verdict keeps real but hard-to-reproduce problems from being thrown out.

**When it doesn't work:** If the verifier sees the same context and the same assumptions as the reviewer, their blind spots will match. Every few runs, plant a known bug (a canary): if the reviewer didn't find it, "no problems" means nothing.
