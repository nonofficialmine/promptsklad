---
title: "ts-loop: a bug isn't closed until it's proven gone"
description: "A bug-closing loop: root cause → minimal fix → rerun the reproduction → start over if the bug is still there."
topic: "dev"
tags: ["debugging", "tests"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# ts-loop: a bug isn't closed until it's proven gone

> Machine translation from Russian. [Original](/skills/ts-loop)

**Purpose:** So Claude doesn't treat the symptom and doesn't declare "fixed" without checking. The skill sets up a loop that repeats until the bug disappears under the same reproduction.

**How to use:** Create .claude/skills/ts-loop/SKILL.md in your project (or ~/.claude/skills/ts-loop for all projects). Claude will turn the skill on by itself when a bug is found. Manually: /ts-loop.

```text
---
name: ts-loop
description: Bug-closing loop. Use as soon as a bug is found — by a test, a QA agent or the user. Root cause → minimal fix → rerun the reproduction → if the bug remains, loop again.
---

# ts-loop

A bug isn't closed until it's proven gone.

1. INVESTIGATE — find the root cause, not the symptom.
   - Reproduce the bug reliably, write down the steps.
   - Form a hypothesis about the cause.
   - Confirm it with temporary logs at key points: function entry, branches, before and after state changes, the API response, the full error object.
   - For UI: console, network requests, DOM (via Playwright MCP or DevTools).
2. RESEARCH — options for the fix; pick the minimal one aimed at the cause.
3. APPLY — a minimal change, no refactoring along the way.
4. TEST — repeat exactly the same steps from step 1. Proof: test output, screenshot, log, response status. Check nearby negative cases.
5. Decision:
   - bug remains → the hypothesis was wrong or incomplete → back to step 1;
   - bug is gone → remove the temporary logs, write down what was fixed and what proves it.

Cause check: if you remove the cause you found, the bug must disappear. If it doesn't, the cause hasn't been found.

Before committing: git diff must contain no new console.log / print. Only the structured logger stays.

Honesty: don't write "seems fixed". No proof — the bug isn't closed.

Limit: 3–5 full loops. Still not closed — stop and describe: which hypotheses were tested, what was ruled out, the current best hypothesis.
```

**Why it works:** Without a loop, Claude edits the first plausible spot and reports success. Repeating the same reproduction steps and the check "removed the cause — the bug is gone" tell a real cause apart from a coincidence. The loop limit keeps it from spinning forever on a wrong hypothesis.

**When it doesn't work:** With flaky bugs (race conditions, an unstable network) one reproduction proves nothing. You need to repeat it many times and look at how often it happens.
