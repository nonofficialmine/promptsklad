---
title: "Diagnostik tahlil: sabab emas, sababga nomzodlar"
description: "Ko‘rsatkich qayerda farq qilishini va bu farq nima bilan bog‘liqligini topadi. Topilgan har bir omil muqobil izohlar va tekshirish usuli bilan beriladi."
topic: "data"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Diagnostik tahlil: sabab emas, sababga nomzodlar

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/diagnostic-analytics)

**Nima uchun:** Ko‘rsatkich nega aynan shunday ekanini tushunish. «Asosiy omillar» kabi vositalar bog‘liqliklarni ko‘rsatadi, ularni sabab deb qabul qilish oson. Prompt nomzodlarning tartiblangan ro‘yxatini va har biri uchun sababni tasodifdan qanday ajratishni beradi.

**Qanday ishlatish:** Promptni, tavsifiy tahlildan kelgan savolni (nima va qayerda o‘zgardi) va qo‘shimcha maydonlari bor ma’lumotlarni qo‘ying: segmentlar, manbalar, xodimlar, bitim shartlari.

```text
Diagnostik tahlil qil. Savol: [nima va qayerda o‘zgardi — tavsifiy qadamdan].

1. Farq qayerda: qaysi kesimlarda ko‘rsatkich eng kuchli farq qiladi?
2. Nima bilan bog‘liq: ma’lumotlardagi qaysi maydonlar natija bilan bog‘liq va qanchalik kuchli. Bog‘liqlik kuchi bo‘yicha tartibla.
3. Uchta asosiy omilning har biri uchun shu bog‘liqlikning izohlarini sanab chiq:
   - omil natijani keltirib chiqaradi;
   - natija omilni keltirib chiqaradi (yoki omil natija paytida yoziladi);
   - uchinchi omil ikkalasini ham keltirib chiqaradi;
   - tanlanish: ma’lumotlarga faqat ma’lum holatlar tushgan.
4. Tekshiruv: qaysi ma’lumotlar yoki eksperiment bu izohlarni bir-biridan ajratadi.
5. Agar bog‘liqlik inson bilan bo‘lsa («X menejerning konversiyasi yuqoriroq») — gap mijozlarning taqsimlanishida emasligini tekshir.

Yakun formati: «Omil natija bilan bog‘liq. Mexanizm isbotlanmagan. Tekshirish kerak: ...». «Chunki» so‘zini faqat mexanizm ma’lumotlar bilan isbotlangan bo‘lsa ishlat.

Ma’lumotlar: [jadval yoki maydonlar tavsifi]
```

**Nega ishlaydi:** Diagnostika gipotezalar beradi, vositalar esa ularni javob sifatida ko‘rsatadi. 3-band bitta grafik qarama-qarshi oqibatlarga ega to‘rtta mexanizm bilan izohlanishini ko‘rishga majbur qiladi. Isbotsiz «chunki» ni taqiqlash gipotezaning keyingi qadamda faktga aylanib qolishiga yo‘l qo‘ymaydi.

**Qachon ishlamaydi:** Agar kerakli maydon ma’lumotlarda umuman bo‘lmasa, masalan mijozning rad etish sababi. Unda raqamlar bo‘yicha diagnostika devorga taqaladi va matnlarni tahlil qilish — kognitiv tahlil kerak bo‘ladi.
