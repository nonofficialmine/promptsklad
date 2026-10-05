# promptsklad

[English](README.md) · [Русский](README.ru.md) · **O‘zbekcha**

Sun’iy intellekt uchun promptlar, Claude Code skillari va amaliy keyslarning umumiy ombori.
Yagona git-repozitoriy — haqiqat manbai: odamlar saytni o‘qiydi, AI-agentlar `llms.txt` ni o‘qiydi.

Sayt rus, o‘zbek va ingliz tillarida (almashtirgich sarlavhada). Postlar muallif tilida ko‘rsatiladi.

## Ichida nima bor

| Bo‘lim | Nima | Qayerda |
|---|---|---|
| Promptlar | Kontekstli tayyor promptlar: nima uchun, qaysi modellarda, nega ishlaydi | `posts/prompts/` |
| Skillar | Claude Code skillari, bitta buyruq bilan o‘rnatiladi | `plugins/` |
| Keyslar | Tajriba: vazifa → yondashuv → natija → xulosalar | `posts/cases/` |
| Hooklar, plaginlar, sozlamalar, MCP, agentlar | Claude Code konfiglari va sozlamalari | `posts/<bo‘lim>/` |

## Skillarni o‘rnatish (Claude Code)

```
/plugin marketplace add nonofficialmine/promptsklad
/plugin install starter@promptsklad
```

| Plagin | Skillar | Nima uchun |
|---|---|---|
| `starter` | `prompt-card` | Prompt yoki keysni promptsklad kartochkasiga aylantiradi |

## AI-agentlar uchun

Yig‘ilgan sayt `/llms.txt`, `/llms-full.txt` va har bir sahifaning `.md` versiyasini beradi.

## Qanday qo‘shish mumkin

**Har qanday material** (prompt, skill, keys, hook, plagin, sozlama, MCP, agent) — saytdagi forma orqali (`/new`). Ro‘yxatdan o‘tishsiz va gitsiz:
forma → tekshiruv + kapcha → Vercel funksiyasi Pull Request ochadi → moderator birlashtiradi → Vercel chop etadi.

**Git orqali** — `posts/<bo‘lim>/<slug>.md` fayli bilan Pull Request. O‘rnatiladigan skillar: `plugins/<plugin>/skills/<skill>/SKILL.md`.

Bo‘lim ro‘yxatlari va yon panel avtomatik yig‘iladi.

### Chop etishni sozlash (Vercel env)

| O‘zgaruvchi | Nima |
|---|---|
| `GITHUB_TOKEN` | Ushbu repozitoriy uchun fine-grained token: Contents + Pull requests = Read and write |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile) kalitlari (bepul) |

Lokal (`npm run dev`) `/api/submit` Turnstile test kalitlari bilan quruq rejimda ishlaydi — GitHub’ga hech narsa yuborilmaydi.

## Lokal ishga tushirish

```bash
npm install
npm run dev        # http://localhost:4310
npm run build      # statik sayt -> doc_build/
```

Docker:

```bash
docker build -t promptsklad .
docker run --rm -p 4320:80 promptsklad   # http://localhost:4320, health: /health
```

## Stek

[Rspress 2](https://rspress.rs/) (statik sayt + qidiruv + llms.txt) · Claude Code plagin marketpleysi · Docker ichida nginx.
