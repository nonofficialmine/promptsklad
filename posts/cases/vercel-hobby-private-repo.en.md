---
title: "Vercel didn't deploy the second author's commits"
description: "Figure out why a Vercel site doesn't update after some commits even though there are no errors."
topic: "dev"
tags: ["ci-cd","git"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Vercel didn't deploy the second author's commits

> Machine translation from Russian. [Original](/cases/vercel-hobby-private-repo)

**Topic:** Development · **Tags:** CI/CD, git

**Purpose:** Figure out why a Vercel site doesn't update after some commits even though there are no errors.

Setup: a site on Vercel (free Hobby plan) redeploys itself after every commit to main. Two people work on the project.

What happened: commits by the Vercel account owner were deployed, but commits by the second contributor were not. The build logs showed no errors: builds for those commits simply never started.

Cause: the repository was private. On the Hobby plan, Vercel doesn't support collaboration on private repositories: it deploys only the owner's commits and blocks the rest.

What we did: opened up the repository (made it public). The restriction doesn't apply to public repositories. We checked with a test commit from the other author, and the site updated.

Other options: the paid Pro plan, or deploying only from the owner's account. Don't spoof the commit author to get around it: that's circumventing the plan's terms.

**Takeaways:** If a deployment "goes silent" without an error, first check who authored the commit and which plan the project is on. The deployment status is visible on GitHub next to the commit: the Vercel icon and its tooltip on hover.
