---
title: "Playwright MCP: Claude checks your site in a browser on its own"
description: "So Claude opens your site in a browser, clicks around, fills in forms and tells you what's broken."
topic: "dev"
tags: ["frontend","tests"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Playwright MCP: Claude checks your site in a browser on its own

> Machine translation from Russian. [Original](/mcp/playwright-mcp)

**Topic:** Development · **Tags:** frontend, tests

**Purpose:** So Claude opens your site in a browser, clicks around, fills in forms and tells you what's broken.

**How to use:** Run the command in a terminal, in the project folder (Node.js is required). In Claude Code, type /mcp — the playwright server should be in the list. Then ask, for example: "Open localhost:3000 and check the login form".

```text
claude mcp add playwright -- npx @playwright/mcp@latest

To make the server available to the whole team, add it to the project:
claude mcp add playwright --scope project -- npx @playwright/mcp@latest

The command creates a .mcp.json file — you can commit it:
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

**Why it works:** Claude sees the page as a list of elements (buttons, fields, text), not as a picture, so it clicks precisely. The browser runs with a separate profile: it can't see your regular tabs or saved passwords.
