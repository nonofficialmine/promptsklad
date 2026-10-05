# promptsklad

**English** · [Русский](README.ru.md) · [O‘zbekcha](README.uz.md)

A shared library of AI prompts, Claude Code skills, and real-world cases.
One git repository is the source of truth: people browse the website, AI agents read `llms.txt`.

## What's inside

| Section | What | Where |
|---|---|---|
| Prompts | Ready-to-use prompts with context: purpose, models, why it works | `content/prompts/` |
| Skills | Claude Code skills, installable with one command | `plugins/` |
| Cases | Experience: task → approach → result → takeaways | `content/cases/` |

## Install skills (Claude Code)

```
/plugin marketplace add nonofficialmine/promptsklad
/plugin install starter@promptsklad
```

| Plugin | Skills | Purpose |
|---|---|---|
| `starter` | `prompt-card` | Turns a prompt or case into a promptsklad card |

## For AI agents

The built site serves `/llms.txt`, `/llms-full.txt`, and a `.md` version of every page.

## Contributing

**Prompt or case** — use the form on the site (`/new`): fill it in → GitHub opens a prefilled issue → click **Create**.
A GitHub Action validates the post, publishes it, and closes the issue. Your GitHub account is your author profile (`/authors/<nick>`). No git required.

**Skill or edit** — open a Pull Request:

| What | Where |
|---|---|
| Prompt | `content/prompts/<slug>.md` |
| Case | `content/cases/<slug>.md` |
| Skill | `plugins/<plugin>/skills/<skill>/SKILL.md` + row in `content/skills/index.md` |

Section lists and author pages are generated automatically. Card template: [`content/contribute.md`](content/contribute.md).

## Run locally

```bash
npm install
npm run dev        # http://localhost:4310
npm run build      # static site -> doc_build/
```

Docker:

```bash
docker build -t promptsklad .
docker run --rm -p 4320:80 promptsklad   # http://localhost:4320, health: /health
```

## Stack

[Rspress 2](https://rspress.rs/) (static site + search + llms.txt) · Claude Code plugin marketplace · nginx in Docker.
