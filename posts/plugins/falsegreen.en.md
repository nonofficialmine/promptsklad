---
title: "falsegreen: find tests that don't catch breakage"
description: "Finds \"false-green\" tests — ones that pass even when the code is broken: the assertion never runs, a mock is compared with itself, the expected value is taken f"
topic: "dev"
tags: ["tests","code-review"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# falsegreen: find tests that don't catch breakage

> Machine translation from Russian. [Original](/plugins/falsegreen)

**Topic:** Development · **Tags:** tests, code review

**Purpose:** Finds "false-green" tests — ones that pass even when the code is broken: the assertion never runs, a mock is compared with itself, the expected value is taken from the same code. For people who write tests in Python, TypeScript, JavaScript or Robot Framework.

**How to use:** In Claude Code run /plugin marketplace add vinicq/falsegreen-skill and /plugin install falsegreen-skill@falsegreen. Then invoke the skill with /falsegreen-skill:falsegreen-skill or simply ask Claude to check a test file or folder for false-positive tests: the skill triggers on the meaning of the request and finds the files itself. Supported: pytest and unittest, Jest, Vitest, Mocha, Jasmine, Testing Library and Robot Framework. You can also ask for the reverse — write a test for a function from its spec: the skill will take the expected values from the spec, not from the current code. For large Python projects you can first run the static scanner (pip install falsegreen, then falsegreen tests/) and pass its output to the skill — that is faster. A separate API key is needed only by the npx falsegreen-skill console tool, not by the skill in Claude Code.

```text
/plugin marketplace add vinicq/falsegreen-skill
/plugin install falsegreen-skill@falsegreen

/falsegreen-skill:falsegreen-skill
```

**Why it works:** It is a single skill, falsegreen-skill, with no hooks or MCP servers. It reads the test as text and asks six questions, J1–J6: does the assertion run at all, is the expected value taken from an independent source, is the real code being tested rather than its mock, is the assertion strict enough, is the test tied to implementation internals, does it pass on its own, without other tests. Each finding gets a code from the catalog (about 125 patterns: the C series for Python, JS for TypeScript and JavaScript, R for Robot Framework, and S for semantic cases), a HIGH or LOW confidence level, a line number, an explanation and a fix hint. The author puts precision above recall: borderline cases, such as tests that intentionally pin current behavior, are not flagged. The skill fills the gap between linters like ruff and mutation testing: it sees what a linter does not understand and does not require running the code.

**Comment:** Third-party plugin by Vinicius Queiroz, github.com/vinicq/falsegreen-skill. promptsklad has not reviewed it — look through the repository before installing. In Claude Code it is only instructions for the agent: according to PRIVACY.md, the skill sends nothing over the network itself, and there is no telemetry and no hooks. The same repository has a separate console tool, npx falsegreen-skill (needs Node 18+): it sends the contents of the specified files to the model provider you choose under your API key, and its fix command runs pytest and executes a model-generated test on your machine. This does not apply to the plugin, but keep it in mind if you decide to install the tool. MIT license.
