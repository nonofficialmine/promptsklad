---
title: "Auto-format a file after every edit"
description: "So that files Claude edits are brought to a consistent style right away — no separate command needed."
topic: "dev"
tags: ["automation","frontend"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Auto-format a file after every edit

> Machine translation from Russian. [Original](/hooks/format-after-edit)

**Topic:** Development · **Tags:** automation, frontend

**Purpose:** So that files Claude edits are brought to a consistent style right away — no separate command needed.

**How to use:** Add the block to your project's .claude/settings.json. You need jq (a command-line tool for reading JSON) and Prettier in the project: npm i -D prettier. To check: ask Claude to edit any .js file — after the edit it will be formatted.

```text
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I{} npx prettier --write --ignore-unknown {}"
          }
        ]
      }
    ]
  }
}
```

**Why it works:** PostToolUse fires after the tool has finished. The hook receives the edit details as JSON, with the file path in tool_input.file_path. The --ignore-unknown flag keeps Prettier from failing on files it can't format.
