---
title: "Krypton: agent kod yozishidan oldin reja va dalillar"
description: "AI agentlarni ishchi kodga qo‘yadigan dasturchilar uchun: plagin avval reja tuzishga majbur qiladi — ma’lumotlarga kim egalik qiladi, qaysi eski yo‘l almashtiriladi, natija nima bilan isbotlanadi"
topic: "dev"
tags: ["refactoring","code-review","ci-cd","docs"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Krypton: agent kod yozishidan oldin reja va dalillar

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/krypton)

**Mavzu:** Dasturlash · **Teglar:** refaktoring, kod-review, CI/CD, hujjatlar

**Nima uchun:** AI agentlarni ishchi kodga qo‘yadigan dasturchilar uchun: plagin avval reja tuzishga majbur qiladi — ma’lumotlarga kim egalik qiladi, qaysi eski yo‘l almashtiriladi, natija nima bilan isbotlanadi — toki agent ishonarli ko‘rinadigan, lekin noto‘g‘ri funksiyani yig‘ib qo‘ymasin.

**Qanday ishlatish:** Claude Code’da ikkita o‘rnatish buyrug‘ini kiriting, keyin /reload-plugins. Skillar plagin prefiksi bilan chaqiriladi. Ishni /krypton:krypton-planning buyrug‘idan boshlang va vazifani tasvirlang — funksiya, xato, refaktoring yoki migratsiya. Agent docs/goals/maqsad-nomi/ papkasida maqsad paketini yig‘adi: PLAN.md (to‘liq reja), GOAL.md (keyingi sessiya uchun qisqa so‘rov) va EVIDENCE.md (bu yerga dalillar yoziladi). Keyin yangi sessiya oching, GOAL.md matnini qo‘ying (yoki muhitingiz qo‘llab-quvvatlasa, /goal buyrug‘idan foydalaning) va /krypton:krypton-execution skillini ulang — u dalillar to‘planmaguncha agentni reja doirasida ushlab turadi. Alohida dasturlar o‘rnatish shart emas. Repozitoriyda maqsad paketini lokal tekshirish uchun Python 3 skripti va pull-requestlar uchun beta versiyadagi GitHub Action ham bor.

```text
/plugin marketplace add jturntdev/krypton
/plugin install krypton@krypton-dev

/krypton:krypton-planning
```

**Nega ishlaydi:** Ichida uchta skill bor. krypton-planning so‘rovni rejaga aylantiradi, unda quyidagilar aniq aytiladi: qanday natija kerak, qaysi joriy xatti-harakat almashtiriladi yoki o‘chiriladi, haqiqat manbai kim, modullar chegarasidan qaysi kontrakt o‘tadi va natija nima bilan isbotlanadi. krypton-execution amalga oshirish paytida agent rejadan chetga chiqmasligini va haqiqiy dalillarni — API javobi, brauzer holati, buyruq natijasini — yozib borishini kuzatadi. krypton-vps-codex-app (beta) — Codex App uchun masofaviy Linux serverni bosqichma-bosqich sozlash. Tekshiruvchi rollar (plan-reviewer, reviewer, maintainer) uchun alohida prompt shablonlari bor; nomlangan subagentlarni ishga tushirish mumkin bo‘lgan muhitda eng yaxshi ishlaydi. Foydasi — kodda takrorlanuvchi yo‘llar kamroq, go‘yo ishlaydigan, lekin noto‘g‘ri qatlamda yashaydigan funksiyalar ham kamroq bo‘ladi.

**Izoh:** Uchinchi tomon plagini: jturntdev, github.com/jturntdev/krypton. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. Plagin faqat skillardan iborat: unda hooklar va MCP serverlar yo‘q, o‘zi hech narsani ishga tushirmaydi. VPS uchun skill (beta) Codex App uchun mo‘ljallangan va SSH konfiguratsiyasi, GitHub’ga kirish va Codex CLI avtorizatsiyasiga tegadi; muallif tavsifiga ko‘ra, u har bir shunday qadamdan oldin ruxsat so‘raydi — baribir agent nimani bajarmoqchi ekanini o‘qing. Versiya 0.3.2, muallif uni birinchi ommaviy reliz deb ataydi. Litsenziya — MIT.
