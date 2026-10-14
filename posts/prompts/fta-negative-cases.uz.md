---
title: "Nosozliklar daraxti (FTA) orqali negativ test-keyslar"
description: "Negativ ssenariylarni tasodifan o‘ylab topmasdan, «bu qanday buzilishi mumkin» daraxtidan tizimli ravishda chiqaradi."
topic: "dev"
tags: ["tests"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Nosozliklar daraxti (FTA) orqali negativ test-keyslar

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/fta-negative-cases)

**Nima uchun:** Funksiya uchun negativ va chegaraviy keyslarning to‘liq ro‘yxatini olish. Odatda ular intuitiv tarzda o‘ylab topiladi va yarmi tushib qoladi. Nosozliklar daraxti (Fault Tree Analysis) ularni tizimli beradi: daraxtning har bir bargi — test-keys.

**Qanday ishlatish:** Promptni qo‘ying, uning ostiga — funksiya tavsifi yoki tiket.

```text
Quyidagi funksiya uchun nosozliklar daraxtini (FTA) qur.

1. Ildiz — nomaqbul hodisa: «foydalanuvchi funksiya natijasini olmadi».
2. Pastga qarab YOKI (istalgan sabab yetarli) va VA (nosozlik faqat sabablar bir vaqtda yuz berganda) orqali tarmoqlab bor.
3. Quyidagi qatlamlarni qamrab ol: foydalanuvchi kiritadigan ma’lumotlar, interfeys, tarmoq, backend, ma’lumotlar, parallel harakatlar (ikkita tab, ikki marta bosish), kirish huquqlari, o‘chirilgan/o‘zgartirilgan bog‘liq obyektlar.
4. Bargni bitta test bilan tekshirish mumkin bo‘lganda tarmoqni to‘xtat.
5. Oxirida — jadval: barg → test-keys (qadamlar, kutilgan natija) → ustuvorlik.

Bu tizimda bo‘lishi mumkin bo‘lmagan tarmoqlarni qo‘shma.

Funksiya: [tavsif]
```

**Nega ishlaydi:** Bitta zanjir beradigan «5 nega» usulidan farqli o‘laroq, daraxt barcha tarmoqlarni ko‘rib chiqishga majbur qiladi va kombinatsiyalarni ko‘radi (nosozlik faqat A va B birga bo‘lganda). 3-banddagi aniq qatlamlar bitta qatlamda, masalan faqat forma validatsiyasida qotib qolishga yo‘l qo‘ymaydi.

**Qachon ishlamaydi:** Hech kim mavjudligidan shubhalanmagan nosozliklarni topmaydi. Buning uchun qo‘lda tadqiqotchi (exploratory) testlash kerak.
