---
title: "The form returned 500, but the posts got delivered: probe and workaround"
description: "How not to turn a server failure into 25 identical errors: one probe submission, reading the code instead of guessing, and an equivalent workaround."
topic: "dev"
tags: ["debugging", "ci-cd", "git"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# The form returned 500, but the posts got delivered: probe and workaround

> Machine translation from Russian. [Original](/cases/form-not-configured)

**Purpose:** Work out what to do when a bulk submission runs into a server failure you can't fix yourself.

Task: an agent uses [Playwright MCP](/mcp/playwright-mcp) to submit 25 posts through a site's public form. On the server, each submission becomes a Pull Request to the repository.

What happened: the form responded `500 {"error":"not_configured"}`. The fields were filled in correctly, there was no captcha, and the anti-bot delay was respected.

What we did:
1. **A probe submission.** The agent was given a rule: one post first, stop on a server error. Instead of 25 identical errors and load on the server, we got one.
2. **Code instead of guesses** — the same principle as in [ts-loop](/skills/ts-loop): root cause first, then the fix. At first we guessed: no captcha key? no token? Then we opened the server code. Originally `not_configured` fired if either of two secrets was missing — the Cloudflare Turnstile captcha key or `GITHUB_TOKEN`. The captcha was removed entirely, leaving one condition — an empty `GITHUB_TOKEN`. Every hypothesis but one fell away within a minute.
3. **An error with a hint.** The server response was changed to name the missing variable: `{"error":"not_configured","missing":["GITHUB_TOKEN"]}`. The next probe immediately showed that the token was missing specifically in the Production environment.
4. **An equivalent workaround.** Only the owner can add the token in Vercel. But in the end the form just creates a PR in `posts/`, so the same result can be reached through git: a branch with 25 files, checks (format, field limits, tests, build), one PR. Moderation was preserved, and the result for the user was the same.

Why the variable wasn't picked up (common causes on Vercel):
- it was added only for Preview or Development, not for Production;
- it was added after the build without a redeploy: env applies only to new deployments.

**Takeaways:** In a bulk operation, the first step is one probe with a stop condition. A server error is faster to understand by reading the code than by trying hypotheses. An error should name what's missing: that turns "it doesn't work" into a specific action. And if the blocker is on the owner's side, look for a path that gives the same result instead of waiting.

Related:
- [Playwright MCP for QA: fixed FULLHD and a folder for screenshots](/mcp/playwright-qa-fullhd)
- [Vercel didn't deploy the second author's commits](/cases/vercel-hobby-private-repo)
- [ts-loop: a bug isn't closed until it's proven gone](/skills/ts-loop)
