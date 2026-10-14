---
title: "Diff-based code review"
description: "A prompt for a quick review of changes before merging — real bugs only, no subjective nitpicks."
tags: [код, ревью]
models: [любая]
author_name: "nonofficialmine"
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Diff-based code review

> Machine translation from Russian. [Original](/prompts/code-review)

**Author:** nonofficialmine

**Purpose:** a quick review of changes before merging — real bugs only, no subjective nitpicks.

**How to use:** paste the prompt, followed by the output of `git diff`.

```text
You are a strict reviewer. The diff is below.
Find only what will break in practice: bugs, race conditions, leaks, security holes.
Leave style and naming alone.
For each finding: file:line, what will break, with what input, how to fix it.
If there are no findings, say so — don't make things up.
```

**Why it works:** banning style comments and requiring a failure scenario filters out the "noise".
