---
title: "Tavsifiy tahlil: nima bo‘ldi, izohlarsiz"
description: "Ma’lumotlar eksportini «qancha, qayerda, qachon» manzarasiga siqadi va xulosa bilan emas, aniq qo‘yilgan savol bilan yakunlaydi."
topic: "data"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Tavsifiy tahlil: nima bo‘ldi, izohlarsiz

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/descriptive-analytics)

**Nima uchun:** Raqamlarni har qanday tahlil qilishning birinchi qadami: sabablarni izlashdan oldin aynan nima bo‘lganini tushunish. Model darhol izohlashga moyil. Bu prompt izohlarni taqiqlaydi va taqqoslash nuqtasini talab qiladi — usiz raqam hech narsani anglatmaydi.

**Qanday ishlatish:** Promptni va ma’lumotlarni qo‘ying: eksport, jadval yoki metrikalar tavsifi. Ma’lumot ko‘p bo‘lsa, davrlar va kesimlar bo‘yicha agregatlarni bering.

```text
Quyidagi ma’lumotlar bo‘yicha tavsifiy tahlil qil. Faqat «nima bo‘ldi» degan savolga javob ber. Sabablarni aytma.

1. Yakun: davr bo‘yicha asosiy raqamlar — summa, soni, o‘rtacha, mediana.
2. Kesimlar: kanallar, mahsulotlar, segmentlar, hududlar bo‘yicha — ma’lumotlarda nima bo‘lsa. Umumiydan ulushlar.
3. Dinamika: oylar yoki haftalar bo‘yicha; oldingi davrga va o‘tgan yilning shu davriga nisbatan, agar bo‘lsa.
4. Taqqoslash nuqtasi: nima bilan solishtirish kerak (reja, o‘tgan yil, soha normasi). Agar u ma’lumotlarda bo‘lmasa — «ko‘p» yoki «kam» deb baholab bo‘lmasligini to‘g‘ridan-to‘g‘ri ayt.
5. Pul va dona: ikkala ko‘rsatkich bo‘lsa, ularni ajrat. Dona o‘sgani holda tushumning tushishi — talab haqida emas, narx haqida.
6. Anomaliyalar: umumiy manzaradan nima ajralib turadi va aynan qayerda.
7. Bir jumlada yakun — xulosa emas, savol: «aynan qayerda va qachondan beri ... o‘zgardi?».

Keyingi qadam uchun ma’lumotlarda nima yetishmasligini alohida ro‘yxat qilib ber.

Ma’lumotlar: [eksport yoki tavsif]
```

**Nega ishlaydi:** Tavsifiy tahlil faqat tavsiflayotgan paytdagina halol bo‘ladi. Sabablarni taqiqlash modelga taxminni fakt sifatida berishga yo‘l qo‘ymaydi. 4-band dashbordlarning eng keng tarqalgan xatosini ushlaydi: taqqoslashsiz raqam xulosaga o‘xshab ko‘rinadi. Bu qadamning natijasi — qidiruvni «biznesda nima noto‘g‘ri» dan «iyundan beri X kanalida nima bo‘lyapti» gacha toraytirish.

**Qachon ishlamaydi:** Agar ma’lumotlar xato bilan yig‘ilgan bo‘lsa (dublikatlar, turli davrlarda metrikaning turlicha ta’rifi). Tavsif aniq bo‘ladi, lekin noto‘g‘ri ma’lumotlarni aniq tavsiflaydi. Avval manbani tekshiring.
