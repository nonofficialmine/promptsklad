---
title: "Diff bo‘yicha kod review"
description: "Merge qilishdan oldin o‘zgarishlarni tez review qilish uchun prompt — faqat haqiqiy xatolar, didga bog‘liq izohlarsiz."
tags: [код, ревью]
models: [любая]
author_name: "nonofficialmine"
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Diff bo‘yicha kod review

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/code-review)

**Muallif:** nonofficialmine

**Nima uchun:** merge qilishdan oldin o‘zgarishlarni tez review qilish — faqat haqiqiy xatolar, didga bog‘liq izohlarsiz.

**Qanday ishlatish:** promptni qo‘ying, uning ostiga — `git diff` natijasini.

```text
Sen — qattiqqo‘l reviewer. Quyida — diff.
Faqat ishlayotganda buziladigan narsalarni top: xatolar, poyga holatlari (race condition), resurs oqishlari, xavfsizlikdagi teshiklar.
Uslub va nomlashga tegma.
Har bir topilma uchun: fayl:qator, nima buziladi, qanday kirish ma’lumotlarida, qanday tuzatish kerak.
Agar topilma bo‘lmasa — shuni ayt, o‘ylab topma.
```

**Nega ishlaydi:** uslubga taqiq va buzilish ssenariysini talab qilish «shovqin»ni kesib tashlaydi.
