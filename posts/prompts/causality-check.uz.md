---
title: "Korrelyatsiya yoki sabab: tahlil xulosasini tekshirish"
description: "Dashboard ma’lumotlari asosida siyosatni o‘zgartirishdan oldin o‘sha bog‘liqlikning muqobil izohlarini ko‘rib chiqadi."
topic: "data"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Korrelyatsiya yoki sabab: tahlil xulosasini tekshirish

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/causality-check)

**Nima uchun:** «X Y ga ta’sir qiladi» ko‘rinishidagi xulosani qaror qabul qilishdan oldin tekshirish. Odatiy holat: vosita chegirma bitim tuzilish ehtimolini uch baravar oshirishini ko‘rsatdi va jamoa ko‘proq chegirma bermoqchi. Ammo bitta grafikni bir nechta mexanizm bilan tushuntirish mumkin.

**Qanday ishlatish:** Promptni, xulosani va ma’lumotlar tavsifini qo‘ying.

```text
Quyidagi xulosadagi bog‘liqlik sababiy ekanini tekshir.

1. Ma’lumotlarda xuddi shunday manzara beradigan izohlarni sanab o‘t:
   - to‘g‘ri sabab: X Y ni keltirib chiqaradi;
   - teskari sabab: Y X ni keltirib chiqaradi (yoki X Y sodir bo‘lgan paytda yoziladi);
   - uchinchi omil: Z ham X ni, ham Y ni keltirib chiqaradi;
   - saralash: ma’lumotlarga faqat ma’lum holatlar tushgan.
2. Har biri uchun: aynan u to‘g‘ri bo‘lsa, natijada nima qilish kerak bo‘lardi.
3. Qaysi tekshiruvlar izohlarni bir-biridan ajratadi: X qachon yoziladi, X bor va X yo‘q holatlar nimasi bilan farq qiladi, tanlanmaning bir qismida eksperiment o‘tkazish mumkinmi.
4. Bir gapda xulosa, ushbu formatda: «Bog‘liqlik bor. Mexanizm [ma’lum / noma’lum]. Qarordan oldin tekshirish kerak: ...».

Xulosa: [xulosa]
Ma’lumotlar: [qayerdan va qanday yig‘ilgan]
```

**Nega ishlaydi:** To‘rttala izoh ham bir xil grafik beradi, oqibatlari esa qarama-qarshi. Agar sababiylik teskari bo‘lsa, ko‘proq chegirma — sotuvlar o‘smasdan kamroq marja. Bu yerda xato qimmatga tushadi, chunki isbotlanmagan bog‘liqlik ustiga prognozlar va narx belgilash modellari quriladi, u yerda esa u allaqachon hisob-kitobdek ko‘rinadi.

**Qachon ishlamaydi:** Agar eksperiment o‘tkazib bo‘lmasa va muqobillar ma’lumotlarda farqlanmasa. Unda halol xulosa — «mexanizm noma’lum», va qaror xulosa sifatida emas, tavakkal sifatida qabul qilinadi.
