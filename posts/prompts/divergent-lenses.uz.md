---
title: "Noodatiy g‘oyalarni izlash: bir-biriga zid linzalar, yangisi qolmaguncha"
description: "Taqsimot dumigacha yetib boradigan g‘oya generatsiyasi: turli linzalar, yangi narsa chiqmay qolguncha raundlar va mohiyat bo‘yicha takrorlarni birlashtirish."
topic: "research"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Noodatiy g‘oyalarni izlash: bir-biriga zid linzalar, yangisi qolmaguncha

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/divergent-lenses)

**Nima uchun:** Hamma ko‘rib chiqmagan variantlarni topish. «10 ta g‘oya ber» degan so‘rov 10 ta shablon beradi, oxirgi 3 tasi esa birinchilarining qayta ifodasi bo‘ladi. Bu yerda uchta mexanizm ishlaydi: bir-biriga zid nuqtai nazarlar, yangisi qolmaguncha davom etadigan raundlar va mohiyat bo‘yicha takrorlarni birlashtirish.

**Qanday ishlatish:** Promptni va vazifani qo‘ying. Bu bosqichda g‘oyalarni tanqid qilishni so‘ramang — baholash alohida, keyin bo‘ladi.

```text
Quyidagi vazifa uchun g‘oyalar yarat. Tanqid qilma — faqat izla.

Linzalar (har biri orqali alohida qara):
- regulyator: qonun yoki hisobot talab qiladigan narsalar;
- iqtisodiy: pul allaqachon qayerda chetga oqib ketyapti;
- xulq-atvor: odamlar har kuni qayerda qo‘lda ish qilyapti;
- texnologik: yaqinda nima mumkin bo‘ldi va hali qo‘llanilmagan;
- qabriston: buni kim sinab ko‘rgan va yopilgan, nega, o‘shandan beri nima o‘zgardi.

Qoidalar:
1. Har bir g‘oya uchun kalitni ko‘rsat: kim to‘laydi + kimning muammosi + hozir u nima bilan hal qilinmoqda.
2. Kaliti bir xil g‘oyalar — bitta g‘oya. Takrorlama, birlashtir; u nechta linzadan kelganini yoz.
3. Raundlar bilan ishla. Har bir raund yangi kalitli g‘oyalar berishi kerak. Ketma-ket ikki raund yangi narsa bermasa, to‘xta.
4. G‘oyalarning kamida uchdan biri yig‘ilishda aytilsa, e’tiroz uyg‘otishi kerak.

Vazifa: [tavsif]
```

**Nega ishlaydi:** Linzalar turli narsalarga qaraydi, shuning uchun ularning natijalari kam kesishadi. Uch qismli kalit turlicha eshitiladigan takrorlarni ushlaydi va o‘xshash, lekin har xil g‘oyalarni bir-biriga qo‘shib yubormaydi. Bir nechta linzada mos kelish — axlat emas, g‘oya kuchliligining belgisi. «Ikki bo‘sh raund» to‘xtash sharti noodatiy narsalar yotgan dumgacha olib boradi. Noqulaylik kvotasi modelning o‘z-o‘zini senzura qilishini chetlab o‘tadi.

**Qachon ishlamaydi:** Agar birdaniga ham generatsiyani, ham tanqidni so‘rasangiz — tanqid g‘alati narsalarning hammasini ular paydo bo‘lishidan oldin o‘ldiradi.
