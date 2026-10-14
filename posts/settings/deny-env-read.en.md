---
title: "Block Claude from reading .env and secrets"
description: "So that keys and passwords from .env don't accidentally end up in a conversation with the AI. Plus: allow tests without extra prompts."
topic: "dev"
tags: ["security"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Block Claude from reading .env and secrets

> Machine translation from Russian. [Original](/settings/deny-env-read)

**Topic:** Development · **Tags:** security

**Purpose:** So that keys and passwords from .env don't accidentally end up in a conversation with the AI. Plus: allow tests without extra prompts.

**How to use:** Add the block to your project's .claude/settings.json and commit it: the rule will apply to the whole team. To check: ask Claude to read .env — the request will be denied.

```text
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "allow": [
      "Bash(npm run test:*)",
      "Bash(npm run lint:*)"
    ]
  }
}
```

**Why it works:** Deny is stronger than allow: once a rule is in deny, no other setting can override it. This protects against accidents, not attacks: a terminal command like cat .env isn't covered by a Read rule.
