---
title: "Agent noise that looks like work, and how to get rid of it"
description: "Why QA and review agents produce made-up findings and what actually helps: evidence, verification, canaries."
topic: "dev"
tags: ["code-review", "tests"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Agent noise that looks like work, and how to get rid of it

> Machine translation from Russian. [Original](/cases/agent-noise)

**Purpose:** Understand where made-up problems, rephrasings and a false "everything is tested" come from in agent reports, and which measures help.

Setup: several agents review code and test features. The reports are long, but after manual checking a noticeable share of the findings don't hold up.

Where the noise comes from:
- **A quota in the prompt.** "Find at least 5 problems" guarantees five, even if there are only two real ones.
- **No requirement for evidence.** "Tested, works" with no test output.
- **All findings weigh the same.** 20 comments about naming weigh as much as one about data loss.
- **The prompt suggests the answer.** "Confirm that the form works" instead of "check the form".
- **False independence.** Three agents "agree", but they share one model and one context: that's a single opinion.

What we did:
1. Removed the quotas and added the phrase "an empty list is a valid answer".
2. Every finding is file:line plus an "input → wrong output" scenario. Without that, the finding isn't accepted.
3. A severity threshold: only what will break in real use goes into the main report.
4. A separate verifier agent tries to refute each finding: CONFIRMED / PLAUSIBLE / REJECTED.
5. Canary: every few runs, a known bug is planted. If it isn't found, "no problems" means nothing.

What not to do: demand "be more careful" and rerun the same prompt. The noise will stay the same.

**Takeaways:** An agent's key metric isn't how much it found but what share of its findings were confirmed. If that share is low, change the prompt and the structure, not the number of runs. And watch for the opposite skew: overly strict verification filters out real but hard-to-reproduce problems, which is why you need the PLAUSIBLE verdict.
