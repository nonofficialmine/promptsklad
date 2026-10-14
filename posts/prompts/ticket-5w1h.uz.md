---
title: "Tiketni tekshirish: 5W1H va «aytilgan vs o‘ylab qo‘shilgan»"
description: "Vazifa tavsifidagi bo‘shliqlarni topadi va buyurtmachi talablarini ijrochi o‘zi o‘ylab qo‘shgan narsalardan ajratadi."
topic: "dev"
tags: ["docs"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Tiketni tekshirish: 5W1H va «aytilgan vs o‘ylab qo‘shilgan»

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/ticket-5w1h)

**Nima uchun:** Tiket yoki vazifa tavsifini dasturchi yoki QA mutaxassisiga topshirishdan oldin tekshirish. Ikki keng tarqalgan muammoni ushlaydi: tiketda «nima uchun» yo‘q, va o‘ylab qo‘shilgan talablar buyurtmachi aytganlari bilan bir xil ko‘rinadi.

**Qanday ishlatish:** Promptni qo‘ying, uning ostiga — tiket. Agar buyurtmachining asl so‘zlari bo‘lsa, ularni alohida ilova qiling.

```text
Quyidagi tiketni tekshir.

1. 5W1H: tiketda Who (kim), What (nima), Where (qayerda), When (qanday sharoitda), Why (nima uchun), How (qanday tekshirish) bormi? Har biri uchun — «bor / yo‘q / noaniq» va iqtibos.
2. Nima uchun: vazifa qaysi muammoni hal qiladi? Agar sabab ko‘rsatilmagan bo‘lsa — 2–3 ta gipoteza taklif qil va tarmoqlanish nuqtalaridagi xatti-harakat ulardan qaysi biriga bog‘liqligini ayt.
3. Aytilgan vs o‘ylab qo‘shilgan: tiketni buyurtmachining so‘zlari bilan solishtir. Har bir talabni «aytilgan» yoki «ijrochi o‘ylab qo‘shgan» deb belgila. O‘ylab qo‘shilganlarni alohida «tasdiqlash talab etiladi» ro‘yxatiga chiqar.
4. Ochiq savollar: savolga javob bo‘lmaguncha tekshirishning qaysi qadamlarini bajarib bo‘lmaydi? Bular eslatmalar emas, blokerlar.
5. Out of scope: faqat oqilona fikrlaydigan odam aks holda vazifaga kiritib yuborishi mumkin bo‘lgan narsalarni qoldir.

Tiketni to‘liq qayta yozma — faqat muammolar ro‘yxatini ber.

Tiket: [matn]
Buyurtmachining so‘zlari: [matn yoki «yo‘q»]
```

**Nega ishlaydi:** 5W1H — to‘liqlikni mexanik tekshirish, u mavzuni tushunishni talab qilmaydi. 3-band qimmatga tushadigan xatoning oldini oladi: dasturchi hech kim so‘ramagan push-bildirishnomalarni qiladi yoki QA vazifani doiraga (scope) kirmagan narsa uchun qabul qilmaydi.

**Qachon ishlamaydi:** Agar buyurtmachining asl so‘zlari bo‘lmasa, 3-band taxminlarga aylanadi. Unda hammasini «tasdiqlanmagan» deb belgilash halolroq.
