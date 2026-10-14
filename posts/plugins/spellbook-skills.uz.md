---
title: "Spellbook Skills: worktree, commitlar, TDD va kod review"
description: "Kundalik dasturlash uchun o‘nta skill: git worktree va branchlarni yakunlash, tartibli commitlar va PR/MR, TDD, o‘zgargan kodni review qilish, Java va Spring Bo"
topic: "dev"
tags: ["git","code-review","tests","refactoring","docs"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Spellbook Skills: worktree, commitlar, TDD va kod review

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/spellbook-skills)

**Mavzu:** Dasturlash · **Teglar:** git, kod-review, testlar, refaktoring, hujjatlar

**Nima uchun:** Kundalik dasturlash uchun o‘nta skill: git worktree va branchlarni yakunlash, tartibli commitlar va PR/MR, TDD, o‘zgargan kodni review qilish, Java va Spring Boot uchun DDD. Ish jarayonlarini har safar Claude’ga qaytadan tushuntirib o‘tirmasdan, tayyorini olishni istaganlar uchun.

**Qanday ishlatish:** Claude Code’da /plugin marketplace add yyykf/spellbook-skills va /plugin install spellbook-skills@spellbook-marketplace buyruqlarini, keyin /reload-plugins buyrug‘ini bajaring. Skillar plagin prefiksi bilan chaqiriladi: /spellbook-skills:skill-nomi. Masalan, /spellbook-skills:git-commit haqiqiy diff bo‘yicha commit tayyorlaydi, /spellbook-skills:test-driven-development ishni «qizil — yashil — refaktoring» sikli bo‘yicha olib boradi, /spellbook-skills:simplify o‘zgargan kodni tekshiradi va tozalaydi. git-commit skilli commit qilish haqidagi oddiy iltimosga ham ishga tushadi. Talablar: Claude Code 1.0.33 yoki yangiroq; boshlang‘ich hook uchun bash va Python 3 kerak. reviewing-gitlab-mr-comments skilli glab utilitasi orqali, yapi-skill esa Python-skriptlar va sizning YApi serveringiz orqali ishlaydi, standart bo‘yicha sinov rejimida.

```text
/plugin marketplace add yyykf/spellbook-skills
/plugin install spellbook-skills@spellbook-marketplace

/spellbook-skills:git-commit
```

**Nega ishlaydi:** Skillar: using-git-worktrees-lite va finishing-a-development-branch-lite worktree yaratadi va branchni yakunlaydi (birlashtirish, PR ochish, qoldirish yoki o‘chirish), bunda testlarni ishga tushirmasdan faqat build’ni tekshiradi; git-commit o‘zgarishlarni Conventional Commits uslubidagi xabarlar bilan atomar commitlarga ajratadi; git-merge-request bitta buyruq bilan commit, push qiladi va GitHub’da PR yoki GitLab’da MR ochadi; reviewing-gitlab-mr-comments MR’ga yozilgan izohlarni tahlil qiladi va reja taklif qiladi; simplify uchta parallel review (qayta foydalanish, sifat, samaradorlik) ishga tushiradi va topilganini tuzatadi; test-driven-development — Kent Beck’ning Tidy First yondashuvi asosidagi TDD; ddd-best-practices — Java va Spring Boot uchun DDD; yapi-skill YApi’da API hujjatlarini qidiradi va yangilaydi; agents-md-improver AGENTS.md’ni yuritadi. Review uchun uchta agent bor: code-reuse-reviewer, code-quality-reviewer va code-efficiency-reviewer. Project Context hooki sessiya boshida .project_context papkasida «loyiha xotirasi»ni yuritish qoidalarini qo‘shadi.

**Izoh:** Uchinchi tomon plagini: code4j, github.com/yyykf/spellbook-skills. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. Hook har bir sessiya va har bir subagent boshlanganda avtomatik ishga tushadi: Python-skriptni ishga tushiradi, u esa kontekstga .project_context papkasi haqidagi qoidalarni qo‘shadi — agent bu papkani loyihada yaratishi va u yerga eslatmalar joylashi mumkin. Hook qoidalari va skillar tavsiflarining bir qismi xitoy tilida yozilgan. PRIVACY.md’ga ko‘ra, telemetriya yo‘q; tarmoqqa faqat siz o‘zingiz GitHub, GitLab yoki YApi bilan ishlashni so‘ragan skillar chiqadi. Loyiha obra/superpowers asosida qurilgan, litsenziya MIT.
