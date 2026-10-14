---
title: "Archcore: loyiha spetsifikatsiyalari va qarorlari agent uchun Git’da"
description: "Agentga loyiha tuzilishini qayta-qayta tushuntirishdan charchaganlar uchun: Archcore spetsifikatsiyalar, qarorlar, qoidalar va rejalarni Git’da, .archcore papkasida saqlaydi va agentga kerakli narsani beradi"
topic: "dev"
tags: ["docs","code-review","git"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Archcore: loyiha spetsifikatsiyalari va qarorlari agent uchun Git’da

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/archcore)

**Mavzu:** Dasturlash · **Teglar:** hujjatlar, kod-review, git

**Nima uchun:** Agentga loyiha tuzilishini qayta-qayta tushuntirishdan charchaganlar uchun: Archcore spetsifikatsiyalar, qarorlar, qoidalar va rejalarni Git’da, .archcore papkasida saqlaydi va agentga kerakli narsani beradi, toki tahrirlar arxitektura va oldingi qarorlarga mos kelsin.

**Qanday ishlatish:** Avval archcore utilitasini o‘rnating: usiz plaginning MCP serveri va hooklari ishlamaydi. Uni archcore.ai saytidagi skript o‘rnatadi (macOS, Linux va WSL uchun, Windows uchun alohida — PowerShell orqali), aniq buyruqlar README’da bor. Keyin Claude Code’da plaginni o‘rnatishning ikkita buyrug‘ini kiriting. Loyihada /archcore:init buyrug‘ini bajaring — u loyihani ulaydi va birinchi hujjatlarni bitta oldindan ko‘rishda taklif qiladi; agar sizda allaqachon CLAUDE.md yoki AGENTS.md bo‘lsa, /archcore:init import buyrug‘i ularni hujjatlarga aylantiradi. Keyin uchta asosiy buyruq: funksiya ustida ishlashdan oldin /archcore:plan (spetsifikatsiya va vazifalar rejasi), qarorni yozib qo‘yish yoki modulni tasvirlash uchun /archcore:document, branchni birlashtirishdan oldin /archcore:review. Muallifning so‘zlariga ko‘ra, oddiy iboralar ham ishlaydi — masalan, funksiyani rejalashtirish yoki branchni tekshirishni so‘rash. Hujjatlar .archcore papkasida Markdown ko‘rinishida saqlanadi.

```text
/plugin marketplace add archcore-ai/archcore
/plugin install archcore@archcore-plugins

/archcore:init
```

**Nega ishlaydi:** Ichida init, plan, document va review skillari, ikkita subagent — bir nechta hujjat bilan ishlanadigan vazifalar uchun archcore-assistant va bilimlar bazasini tekshirish uchun archcore-auditor (faqat o‘qish) — hamda hujjatlarni qidirish va tahrirlash uchun archcore MCP serveri bor. /archcore:plan avval repozitoriy va mavjud hujjatlarni o‘qiydi, faqat ularda yo‘q narsani so‘raydi va o‘zgarish hajmini S’dan XL’gacha o‘zi baholaydi: mayda tahrirga hujjat kerak emas, yangi imkoniyatga — spetsifikatsiya va reja, yirik tashabbusga — yana PRD ham. /archcore:review branchni hujjatlar bilan ikki tomonlama solishtiradi va har bir nomuvofiqlik uchun nima noto‘g‘ri ekanini — kodmi yoki spetsifikatsiyami — aytadi. Hooklar sessiya boshlanganda kontekstni yuklaydi, fayllar yozilishidan oldin hujjatlarni qo‘riqlaydi va tahrir qoidalarga mos kelish-kelmasligini aytib turadi, hujjatlar o‘zgargandan keyin esa ularni tekshiradi. Loyiha bilimlari sessiyadan keyin ham saqlanib qoladi va oddiy kod kabi review’dan o‘tadi.

**Izoh:** Uchinchi tomon plagini: Archcore, github.com/archcore-ai/archcore. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. Plaginning o‘zi plugins/archcore papkasida joylashgan. archcore utilitasi to‘g‘ridan-to‘g‘ri internetdan ishga tushiriladigan skript bilan o‘rnatiladi — avval uni o‘qib chiqing. Hooklar sessiya boshlanganda va har bir fayl yozilishidan oldin o‘zi ishga tushadi. Muallifning maxfiylik siyosatiga ko‘ra, hujjatlar repozitoriyda qoladi, lekin o‘rnatuvchi va utilita o‘rnatish va yangilanish haqida anonim hodisalarni (versiya va platforma) yuboradi, utilitaning o‘zi esa fonda kuniga ko‘pi bilan bir marta yangilanadi. Analitika DO_NOT_TRACK=1 yoki ARCHCORE_TELEMETRY_OPTOUT=1 o‘zgaruvchisi bilan o‘chiriladi, avtoyangilanishni esa ular o‘chirmaydi. /archcore:init CLAUDE.md yoki AGENTS.md fayliga o‘z blokini qo‘shib yozadi. Litsenziya — Apache 2.0.
