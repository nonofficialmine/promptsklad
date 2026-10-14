---
title: "Allow read-only commands so Claude asks less often"
description: "An allowlist for commands that only read state: git status/diff/log, ls, port and process checks."
topic: "dev"
tags: ["automation", "git"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Allow read-only commands so Claude asks less often

> Machine translation from Russian. [Original](/settings/readonly-allow)

**Purpose:** Claude keeps asking permission for harmless commands: viewing a diff, checking whether a port is taken, finding a process. An allowlist removes those prompts and keeps confirmation for commands that change something.

**How to use:** Add the block to your project's .claude/settings.json (or to ~/.claude/settings.json for all projects). To check: ask Claude to show git diff — it will run the command without asking.

```text
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git show:*)",
      "Bash(ls:*)",
      "Bash(lsof -iTCP:*)",
      "Bash(ss -tlnp:*)",
      "Bash(ps -o:*)"
    ]
  }
}
```

**Why it works:** The rule `Bash(git diff:*)` allows the command with any arguments. The list only has commands that read state, so the risk is minimal. lsof, ss and ps are there to check ports before starting a dev server: 3000 or 5173 is often already taken on your machine.

**When it doesn't work:** The rule allows any arguments, so build the list deliberately. For example, `git diff --output=file` writes to a file. If you need to be strict, list full commands without `:*`.
