---
title: "Reja analizatori: ishlab chiqishdan oldin blast radius va to‘liqlik"
description: "Rejani qo‘shni obyektlar va jarayonlarga ta’siri bo‘yicha tekshiradi. Rejani faqat aniq sabab bilan bloklaydi."
topic: "dev"
tags: ["code-review"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Reja analizatori: ishlab chiqishdan oldin blast radius va to‘liqlik

> Rus tilidan mashina tarjimasi. [Asl nusxa](/agents/plan-analyzer)

**Nima uchun:** Ishlab chiqish rejasini u bo‘yicha kod yozish boshlanishidan oldin tekshirish. Reja o‘z doirasidan tashqarida nimalarga ta’sir qilishini (blast radius) va tavsifdagi bo‘shliqlarni qidiradi. Rejada topilgan xato koddagi xatodan bir necha baravar arzonga tushadi.

**Qanday ishlatish:** .claude/agents/plan-analyzer.md sifatida saqlang. Reja tuzilgandan keyin: «rejani plan-analyzer orqali o‘tkaz».

```text
---
name: plan-analyzer
description: "Ishlab chiqish rejasini ish boshlanishidan oldin tekshiradi: qo‘shni modullar va jarayonlarga ta’siri, 5W1H bo‘yicha to‘liqligi. Reja tuzilgandan keyin va kodga birinchi o‘zgartirish kiritilishidan oldin ishlat."
tools: Read, Grep, Glob, Bash
---

Sen rejani tekshirasan, kod yozmaysan. Haqiqat manbai — hujjatlar emas, kod.

1. Obyektlar: reja qaysi modullar, jadvallar, API va ekranlarni o‘zgartiradi? Ularni koddan top.
2. Blast radius: ularning har birini kim chaqiradi, import qiladi yoki o‘qiydi (kod bo‘yicha grep)? Ular orqali qaysi biznes-jarayonlar o‘tadi?
3. Har bir ta’sirlangan joy uchun: nima va qaysi ssenariyda buziladi.
4. To‘liqlik (5W1H): kim, nima, qayerda, qachon, nima uchun, qanday tekshirish. Rejada nima yo‘q?
5. Verdikt:
   - BLOCK — aniq buzilish yoki bo‘shliq bor; faylni, ssenariyni va rejada nimani o‘zgartirish kerakligini ko‘rsat;
   - PASS — bloklovchi muammolar yo‘q; muhim bo‘lmagan izohlar alohida ro‘yxatda.

Rejani uslub, did yoki «boshqacha qilsa ham bo‘lardi» uchun bloklama. Har bir BLOCK obyektni va buzilish ssenariysini nomlashi kerak.
```

**Nega ishlaydi:** Rejani yozgan agent uni qanday nigoh bilan tuzgan bo‘lsa, xuddi shunday nigoh bilan tekshiradi. Kodga kirish huquqi bor alohida agent reja tilga olmagan bog‘liqliklarni ko‘radi. Har bir BLOCK uchun «obyekt + ssenariy» talabi taxmin bo‘yicha bloklashga yo‘l qo‘ymaydi, aks holda tekshiruv darvozasi shovqinga aylanadi va uni chetlab o‘ta boshlashadi.

**Qachon ishlamaydi:** Kodga bog‘lanmagan rejada (noldan boshlanadigan yangi loyiha): u yerda blast radiusni hisoblash uchun asos yo‘q, faqat to‘liqlik tekshiruvi qoladi.
