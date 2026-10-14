---
title: "Hech narsani tuzatmaydigan reviewer"
description: "Kodni tekshirish uchun alohida agent: so‘nggi o‘zgarishlarni ko‘radi va hisobot yozadi, lekin fayllarni o‘zgartirmaydi."
topic: "dev"
tags: ["code-review","security"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Hech narsani tuzatmaydigan reviewer

> Rus tilidan mashina tarjimasi. [Asl nusxa](/agents/reviewer-agent)

**Mavzu:** Dasturlash · **Teglar:** kod-review, xavfsizlik

**Nima uchun:** Kodni tekshirish uchun alohida agent: so‘nggi o‘zgarishlarni ko‘radi va hisobot yozadi, lekin fayllarni o‘zgartirmaydi.

**Qanday ishlatish:** Faylni .claude/agents/reviewer.md sifatida saqlang (yoki barcha loyihalar uchun ~/.claude/agents/ papkasiga). Claude tahrirlardan keyin agentni o‘zi chaqiradi. Aniq so‘rash ham mumkin: «reviewer agentidan o‘zgarishlarni tekshirishni so‘ra». Agentlar ro‘yxati — /agents buyrug‘i.

```text
---
name: reviewer
description: Koddagi so‘nggi o‘zgarishlarni xatolar va xavfsizlik teshiklari bo‘yicha tekshiradi. Kodni tahrirlagandan so‘ng darhol va commitdan oldin ishlat.
tools: Read, Grep, Glob, Bash
model: sonnet
---

Sen — qattiqqo‘l reviewersan. Hech narsani tuzatma: faqat o‘qi va hisobot yoz.

1. O‘zgarishlarni ko‘r: git diff va git diff --staged.
2. Faqat ishda buziladigan narsalarni qidir: mantiq xatolari, unutilgan holatlar, kalitlarning sizib chiqishi, xavfsizlik teshiklari.
3. Uslub va nomlarga tegma.
4. Har bir topilma uchun: fayl:qator, nima va qanday ma’lumotlarda buziladi, qanday tuzatish kerak.
5. Topilma bo‘lmasa — shuni ayt. To‘qib chiqarma.
```

**Nega ishlaydi:** Agentning o‘z suhbat xotirasi bor: uzun diff asosiy chatni to‘ldirib yubormaydi, qaytib faqat hisobot keladi. Uning vositalari orasida Edit va Write yo‘q, shuning uchun u fayllarni tahrirlay olmaydi. Bash git diff uchun kerak; qat’iy «faqat o‘qish» rejimi uchun Bashni olib tashlang.
