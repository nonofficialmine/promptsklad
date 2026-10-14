---
title: "How to install a plugin: the starter example"
description: "Install a plugin (a set of skills, commands, agents and hooks) with one command — and understand how this works for any plugin."
topic: "content"
tags: ["docs"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# How to install a plugin: the starter example

> Machine translation from Russian. [Original](/plugins/install-plugin-starter)

**Topic:** Writing & content · **Tags:** docs

**Purpose:** Install a plugin (a set of skills, commands, agents and hooks) with one command — and understand how this works for any plugin.

**How to use:** Type the commands one at a time right in Claude Code. The marketplace (a plugin catalog) is added once; after that you can install any plugin from it.

```text
1. Add the promptsklad marketplace:
/plugin marketplace add nonofficialmine/promptsklad

2. Install the plugin:
/plugin install starter@promptsklad

3. View, enable, disable or remove plugins:
/plugin
```

**Why it works:** starter includes the prompt-card skill: it asks what's missing from your prompt or case and builds a card for this site. The entry starter@promptsklad means "the starter plugin from the promptsklad marketplace" — plugins from any other catalog are installed the same way.
