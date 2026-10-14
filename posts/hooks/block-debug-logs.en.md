---
title: "Keep temporary console.log and print out of commits"
description: "A hook blocks git commit if debug logs remain in the staged changes and tells Claude to remove them."
topic: "dev"
tags: ["automation", "debugging", "git"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Keep temporary console.log and print out of commits

> Machine translation from Russian. [Original](/hooks/block-debug-logs)

**Purpose:** While debugging, Claude sprinkles `console.log` and `print` around and then forgets to remove them. The hook stops the commit as long as the added lines still contain such logs.

**How to use:** Add the block to your project's .claude/settings.json. You need jq. To check: add `console.log(1)` to any file and ask Claude to commit — the commit will be stopped with a message.

```text
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r \".tool_input.command\" | grep -qE \"(^|[;&| ])git commit\" || exit 0; if git diff --cached -U0 | grep -E \"^\\+[^+]\" | grep -qE \"console\\.log\\(|(^|[^a-zA-Z_.])print\\(\"; then echo \"Staged changes contain console.log/print — remove temporary logs before committing\" >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

**Why it works:** PreToolUse fires before the command runs. The hook lets everything through except `git commit`, looks only at the added lines in `git diff --cached`, and exits with code 2 if it finds a match. Code 2 blocks the call, and the stderr text goes to Claude, which then removes the logs itself. Old code with logs doesn't get in the way: only new lines are checked. `blueprint(` and `obj.print(` don't count.

**When it doesn't work:** `git commit -a` stages files inside the command itself, so the hook doesn't see them. Logs written through a structured logger (`logger.debug`) aren't caught, and that's correct: they stay for monitoring.
