---
title: "Playwright MCP for QA: fixed FULLHD and a folder for screenshots"
description: "Setting up Playwright MCP so checks run at one resolution and screenshots don't get scattered across the project."
topic: "dev"
tags: ["tests", "frontend"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Playwright MCP for QA: fixed FULLHD and a folder for screenshots

> Machine translation from Russian. [Original](/mcp/playwright-qa-fullhd)

**Purpose:** When Claude tests the UI through Playwright MCP, the default window size drifts, and layout bugs reproduce one time and not the next. Screenshots pile up in the project root. Two flags fix this.

**How to use:** Run this in the project folder. Add `.tmp/` to .gitignore. To check: ask Claude to open the site and take a screenshot — it will land in .tmp/screenshots at 1920×1080.

```text
claude mcp add playwright --scope project -- npx @playwright/mcp@latest --viewport-size "1920,1080" --output-dir .tmp/screenshots

In .mcp.json it looks like this:
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--viewport-size", "1920,1080", "--output-dir", ".tmp/screenshots"]
    }
  }
}

A line for CLAUDE.md so agents follow the rule too:
UI testing — only via playwright-mcp in FULLHD; screenshots — only in .tmp/screenshots/, named <feature>-<step>-<time>.png.
```

**Why it works:** `--viewport-size` fixes the window size, so checks reproduce the same way every time. `--output-dir` sets the folder for files the server saves. The CLAUDE.md line is needed because subagents read it, not the MCP settings.

**When it doesn't work:** You can't check mobile layout this way: that needs a separate run with a different size or device emulation.
