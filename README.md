# promptsklad

**English** · [Русский](README.ru.md) · [O‘zbekcha](README.uz.md)

A shared library of AI prompts, Claude Code skills, and real-world cases.
One git repository is the source of truth: people browse the website, AI agents read `llms.txt`.

The site is available in Russian, Uzbek and English (switcher in the header). Posts are shown in the author's language.

## What's inside

| Section | What | Where |
|---|---|---|
| Prompts | Ready-to-use prompts with context: purpose, models, why it works | `posts/prompts/` |
| Skills | Claude Code skills, installable with one command | `plugins/` |
| Cases | Experience: task → approach → result → takeaways | `posts/cases/` |
| Hooks, plugins, settings, MCP, agents | Claude Code configs and setups | `posts/<section>/` |

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

**Any material** (prompt, skill, case, hook, plugin, setting, MCP, agent) — use the form on the site (`/new`). No sign-up, no git:
form → validation + captcha → Vercel Function opens a Pull Request → a moderator merges → Vercel publishes.

**Via git** — a Pull Request with `posts/<section>/<slug>.md`. Installable skills: `plugins/<plugin>/skills/<skill>/SKILL.md`.

Section lists and the sidebar are generated automatically.

### Publishing setup (Vercel env)

| Variable | What |
|---|---|
| `GITHUB_TOKEN` | Fine-grained token for this repo: Contents + Pull requests = Read and write |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) keys (free) |

Locally (`npm run dev`) `/api/submit` runs in dry-run mode with Turnstile test keys — nothing is sent to GitHub.

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
