---
title: "Banallik testi: hech narsa demaydigan xulosalarni olib tashlash"
description: "Har bir xulosani teskarisiga aylantiradi; agar teskari fikr bema’ni eshitilsa, asl xulosa hech qanday ma’lumot bermaydi."
topic: "content"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Banallik testi: hech narsa demaydigan xulosalarni olib tashlash

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/banality-test)

**Nima uchun:** Hisobot, tadqiqot yoki strategiyani har doim to‘g‘ri bo‘lgani uchun foydasiz bo‘lgan xulosalardan tozalash: «mijoz ehtiyojlarini hisobga olish kerak», «sifat muhim». AI javoblarida bu shovqinning eng ko‘p uchraydigan turi.

**Qanday ishlatish:** Promptni va xulosalar bor matnni qo‘ying.

```text
Quyidagi matndagi har bir xulosani banallik testidan o‘tkaz.

1. Xulosani teskarisiga aylantir: «mijoz uchun tezlik muhim» → «mijoz uchun tezlik muhim emas».
2. Agar teskarisi bema’ni eshitilsa va hech kim bunday demasa — asl xulosa banal: u hech narsa bildirmaydi.
3. Agar teskarisi kimdir egallashi mumkin bo‘lgan oqilona pozitsiya bo‘lsa, xulosa mazmunli.
4. Har bir banal xulosa uchun uni tekshirib bo‘ladigan qiladigan aniqlashtirish taklif qil: kim, qancha, nimaga nisbatan, qaysi paytda.

Jadval: xulosa → teskarisi → banalmi? → aniqlashtirish.

Matn: [matn]
```

**Nega ishlaydi:** Faqat noto‘g‘ri bo‘lib chiqishi mumkin bo‘lgan fikrgina ma’lumot beradi. Teskarisiga aylantirish xulosaning oqilona muqobili bor-yo‘qligini tez ko‘rsatadi. Aniqlashtirish «tezlik muhim»ni «rad etishlarning 60% i javob bir kundan uzoq cho‘zilganda sodir bo‘ladi»ga aylantiradi — buni endi tekshirsa bo‘ladi.

**Qachon ishlamaydi:** Ataylab umumiy yozilgan matnlarda: missiya, qadriyatlar, kirish qismi. U yerda banallik — janrning o‘zi.
