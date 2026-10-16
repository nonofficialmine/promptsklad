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
form → validation + anti-spam (honeypot, fill time) → Vercel Function opens a Pull Request → a moderator merges → Vercel publishes.

**Via git** — a Pull Request with `posts/<section>/<slug>.md`. Installable skills: `plugins/<plugin>/skills/<skill>/SKILL.md`.

Section lists and the sidebar are generated automatically.

### Publishing setup (Vercel env)

| Variable | What |
|---|---|
| `GITHUB_TOKEN` | Fine-grained token for this repo: Contents + Pull requests = Read and write |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Likes on posts: added automatically when you connect **Upstash for Redis** in Vercel → Storage (free tier). Without them the like button is hidden |

Locally (`npm run dev`) `/api/submit` runs in dry-run mode — nothing is sent to GitHub.

## Translations

Authors post in their own language. After a post reaches `main`, the **Translate posts** GitHub Action translates it into the other two languages via GitHub Models (free, no card; daily request limit — leftovers are picked up by the daily run). Translations are saved next to the original as `posts/<section>/<slug>.<lang>.md` with a "machine translation" note; code and configs are never translated. Until a translation exists, the original is shown (with `noindex`). Manual run: Actions → Translate posts → Run workflow.

## What's new feed and analytics

- `/news` — new material by day (from the `date` field in each post; form posts get it automatically, posts added via git need `date: "YYYY-MM-DD"` — a test checks this).
- Analytics: built-in **Vercel Web Analytics** — no external service, script served from our own domain, no cookies. Turn on: Vercel → project → Analytics → Enable, then redeploy. Free plan: visits, pages, referrers, countries, devices.

## SEO

Built in: absolute `canonical` and `hreflang`, `sitemap.xml`, `robots.txt`, Open Graph image (`og.png`), per-page `description`. Uzbek/English copies of posts are `noindex` with `canonical` to the Russian original (no duplicates).

To get indexed by Google:
1. [Google Search Console](https://search.google.com/search-console) → add the site → verify via meta tag: put the code into the `GOOGLE_SITE_VERIFICATION` env var in Vercel and redeploy (or verify via DNS).
2. Sitemaps → submit `sitemap.xml`.

Custom domain: set `SITE_URL` (e.g. `https://promptsklad.uz`) and update `content/public/robots.txt`.

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
