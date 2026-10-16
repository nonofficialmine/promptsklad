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

Locally (`npm run dev`) `/api/submit` runs in dry-run mode — nothing is sent to GitHub.

## Translations

Authors post in their own language. After a post reaches `main`, the **Translate posts** GitHub Action translates it into the other two languages via GitHub Models (free, no card; daily request limit — leftovers are picked up by the daily run). Translations are saved next to the original as `posts/<section>/<slug>.<lang>.md` with a "machine translation" note; code and configs are never translated. Until a translation exists, the original is shown (with `noindex`). Manual run: Actions → Translate posts → Run workflow.

## Analytics

[Umami Cloud](https://cloud.umami.is) (free: 100k events/month, no cookies, no consent banner). Enabled when `UMAMI_WEBSITE_ID` is set in Vercel env; counts only the production domain. Besides visits, pages, referrers, countries and devices, the site sends custom events: `post_submitted` / `post_submit_failed` (form), `terminal_command` (home terminal: which section, click or keyboard), `search_open` (`/` or click).

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
