# promptsklad

[English](README.md) · [Русский](README.ru.md) · **O‘zbekcha**

Sun’iy intellekt uchun promptlar, Claude Code skillari va amaliy keyslarning umumiy ombori.
Yagona git-repozitoriy — haqiqat manbai: odamlar saytni o‘qiydi, AI-agentlar `llms.txt` ni o‘qiydi.

## Ichida nima bor

| Bo‘lim | Nima | Qayerda |
|---|---|---|
| Promptlar | Kontekstli tayyor promptlar: nima uchun, qaysi modellarda, nega ishlaydi | `content/prompts/` |
| Skillar | Claude Code skillari, bitta buyruq bilan o‘rnatiladi | `plugins/` |
| Keyslar | Tajriba: vazifa → yondashuv → natija → xulosalar | `content/cases/` |

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

**Prompt yoki keys** — saytdagi forma orqali (`/new`): to‘ldiring → GitHub tayyor arizani ochadi → **Create** tugmasini bosing.
GitHub Action postni tekshiradi, chop etadi va arizani yopadi. GitHub akkauntingiz — muallif profilingiz (`/authors/<nik>`). Git kerak emas.

**Skill yoki tuzatish** — Pull Request orqali:

| Nima | Qayerga |
|---|---|
| Prompt | `content/prompts/<slug>.md` |
| Keys | `content/cases/<slug>.md` |
| Skill | `plugins/<plugin>/skills/<skill>/SKILL.md` + `content/skills/index.md` ga qator |

Bo‘lim ro‘yxatlari va muallif sahifalari avtomatik yig‘iladi. Kartochka shabloni: [`content/contribute.md`](content/contribute.md).

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
