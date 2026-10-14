---
title: "Sun’iy intellekt bilan chatlardagi g‘oyalar yo‘qolardi: nega bilimlar grafi emas"
description: "Uzun muhokamalardagi muhim fikrlar yo‘qolib ketardi. Bilimlar grafi bevaqt bo‘lib chiqdi; filtrsiz yozib olish va rad etish sababini majburiy qilish yordam berdi."
topic: "other"
tags: ["docs"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Sun’iy intellekt bilan chatlardagi g‘oyalar yo‘qolardi: nega bilimlar grafi emas

> Rus tilidan mashina tarjimasi. [Asl nusxa](/cases/knowledge-graph-vs-notes)

**Nima uchun:** Sun’iy intellekt bilan uzun suhbatlardagi g‘oyalar, qarorlar va xulosalarni yo‘qotmaslik yo‘lini topish — va tizim qurishga g‘arq bo‘lib ketmaslik.

Vazifa: Claude bilan uzun muhokamalarda ko‘p muhim narsa paydo bo‘ladi: g‘oyalar, qarorlar, rad etilgan variantlar. Kontekst siqiladi, muhokama tarmoqlari so‘nadi, bir haftadan keyin suhbat o‘rtasidagi bandni endi topib bo‘lmaydi. Birinchi fikr — bilimlar grafini qurish.

Nega graf emas (boshlanishida):
- Graf ontologiyani talab qiladi: tugunlar va bog‘lanishlar turlarini. Material to‘planmasdan oldin uni to‘g‘ri loyihalab bo‘lmaydi. Odatda turlar noto‘g‘ri tanlanadi va graf tashlab qo‘yiladi.
- Muammo saqlashda emas, yozib olishda. Yozilmagan g‘oyani graf qutqarmaydi, yozilganini esa oddiy fayllar bo‘yicha qidiruv ham topadi.

Nima ish berdi:
1. **Filtrsiz yozib olish.** Hammasi avtomatik ravishda bitta «axlatxona» faylga yoziladi (masalan, har bir promptga ilingan hook orqali). Fikr kelgan paytda «muhimmi yoki yo‘qmi» deb hal qilish — aynan buziladigan intizom shu.
2. **To‘plab ko‘rib chiqish.** Bir necha kunda bir marta axlatxonadan yozuvlar turi bilan ajratib olinadi: qaror, rad etilgan g‘oya, ochiq savol, foydalanuvchidan kelgan fakt, gipoteza.
3. **Rad etish sababi majburiy.** Sababsiz rad etilgan g‘oya bir oydan keyin qaytib keladi va unga yana vaqt ketadi.
4. **Fakt talqindan alohida.** Aks holda bir oydan keyin sizning taxminingiz «buni-ku bilamiz» bo‘lib ko‘rinadi.
5. **Bog‘lanishlar — oddiy havolalar bilan** `[[nom]]` qaydlar orasida. Graf kerak bo‘lsa, o‘zi o‘sib chiqadi.

**Xulosalar:** Tartib shunday: avval ishonchli yozib olish, keyin ko‘rib chiqish, bog‘lanishlar — eng oxirida. Bazadagi eng qimmatli narsa — qabul qilingan g‘oyalar emas, sababi bilan rad etilganlari: ular bir xil aylanaga qayta tushishdan himoya qiladi.
