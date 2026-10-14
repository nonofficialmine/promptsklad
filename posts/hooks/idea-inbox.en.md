---
title: "Auto-capture ideas from a conversation into a dump file"
description: "Each of your prompts is appended with a timestamp to .claude/idea-inbox.md, so ideas from long chats aren't lost when the context gets compacted."
topic: "dev"
tags: ["automation", "docs"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Auto-capture ideas from a conversation into a dump file

> Machine translation from Russian. [Original](/hooks/idea-inbox)

**Purpose:** In long discussions with Claude, ideas get lost: the context gets compacted, side threads get forgotten. Writing down "only the important stuff" doesn't work — there's no time to decide what matters in the middle of a thought. The hook records everything, and you can sort through it later in one go.

**How to use:** Add the block to your project's .claude/settings.json. You need jq. Add `.claude/idea-inbox.md` to .gitignore. To check: send any prompt and open the file — a dated entry will appear there.

```text
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "mkdir -p .claude && jq -r \"\\\"\\n## \\\" + (now|strflocaltime(\\\"%Y-%m-%d %H:%M\\\")) + \\\"\\n\\\" + .prompt\" >> .claude/idea-inbox.md"
          }
        ]
      }
    ]
  }
}
```

**Why it works:** UserPromptSubmit fires on each of your prompts before Claude sees it. The prompt text reaches the hook in the `prompt` field. The output goes to a file, not to stdout, so nothing is added to the conversation context. Every few days you pull decisions, rejected ideas with the reason, and open questions out of the dump.

**When it doesn't work:** Only your prompts are saved, without Claude's replies. If a key or password ends up in a prompt, it will land in the file, so the file must never get into git.
