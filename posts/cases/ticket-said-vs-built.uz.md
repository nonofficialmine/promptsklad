---
title: "Tiket batafsil yozilgan, lekin talablar taxminlar bilan aralashgan"
description: "Agent buyurtmachining uchta jumlasidan 12 qadamli QA-tiket tuzdi. Tahlil: tiketda nima ortiqcha, nima yetishmaydi va aytilganni o‘ylab qo‘shilgandan qanday ajratish kerak."
topic: "dev"
tags: ["docs", "tests"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Tiket batafsil yozilgan, lekin talablar taxminlar bilan aralashgan

> Rus tilidan mashina tarjimasi. [Asl nusxa](/cases/ticket-said-vs-built)

**Nima uchun:** Agent buyurtmachi o‘rniga yozib bergan «yaxshi», batafsil tiketning xavfi nimada ekanini va unda qaysi maydonlar haqiqatan kerakligini tushunish.

Vazifa: buyurtmachi uch jumlada marketpleysdagi xaridor va sotuvchi chatini tasvirlab berdi. Xaridor sotuvchining do‘konidan yoki mahsulot kartochkasidan yozadi — har qanday holda bu sotuvchi bilan bitta chat. Mahsulotdan murojaat qilinganda chatga mahsulot kartochkasi keladi. Agent QA-tiket tuzdi: Environment, Preconditions, 12 ta tekshiruv qadami, Impact, Out of scope, Notes.

Nima yaxshi edi:
- **Preconditions** («xaridor va sotuvchi o‘rtasida avval yozishma bo‘lmagan»). Bu qatorsiz «ikkinchi chat yaratilmaydi» tekshiruvi hech narsani isbotlamaydi.
- **Manbali Notes** («talablar buyurtmachining so‘zlaridan, sana»). Bir oydan keyin talab qayerdan kelgani ko‘rinadi.

Nima noto‘g‘ri edi:
- **Aytilgan va o‘ylab qo‘shilgan farqlanmaydi.** Buyurtmachi ikkita kirish nuqtasi, bitta chat va mahsulot kartochkasi haqida gapirgan. Ilovalar, o‘qilmaganlar hisoblagichi, push va email bildirishnomalar, o‘qilganlik holatini agent o‘zi qo‘shgan. Dasturchi buni talab sifatida o‘qiydi va ortiqcha narsa qiladi, QA esa hech kim so‘ramagan narsa uchun vazifani qaytaradi.
- **«Nima uchun» yo‘q.** Nega mahsulotga emas, sotuvchiga bitta chat? Ayriliqlardagi xatti-harakat javobga bog‘liq, masalan xaridor yarim yildan keyin ikkinchi mahsulot haqida yozsa nima qilish kerak. 5W1H tekshiruvi bu bo‘shliqni mexanik tarzda topadi, [bir daraja yuqoriga ko‘tarilish](/prompts/level-up) esa uni to‘ldirishga yordam beradi.
- **Out of scope shishirilgan.** Guruh chatlari, qo‘ng‘iroqlar, avtojavoblarni hech kim qilmoqchi ham emasdi. Faqat bitta qator qimmatli edi: xizmatlar bo‘yicha chat — alohida jarayon. Qolgani — shovqin, shu sababli bo‘limni o‘qishni to‘xtatishadi.
- **Ochiq savollar oxirida yashiringan.** Ilovalar limiti va push bildirishnomalar kanali — to‘siqlar: javobsiz qadamlarning bir qismini tekshirib bo‘lmaydi. Ularni buyurtmachiga tiket yozishdan oldin berish kerak edi: [Avval savollar, keyin ish](/prompts/clarify-before-start).

Nima qildik:
1. Har bir talabni belgiladik: «buyurtmachi aytgan» yoki «o‘ylab qo‘shilgan, tasdiq talab qiladi».
2. Ochiq savollarni to‘siq sifatida yuqoriga ko‘tardik va ularga bog‘liq qadamlar bilan bog‘ladik.
3. Out of scope’da faqat aqlli odam aks holda qo‘shib qo‘yishi mumkin bo‘lgan narsani qoldirdik.

Tiketni shu tarzda prompt bilan tekshirish mumkin: [Tiketni tekshirish: 5W1H va «aytilgan vs o‘ylab qo‘shilgan»](/prompts/ticket-5w1h).

**Xulosalar:** Tiketning batafsilligi uning sifatiga teng emas. Xavf maydonlar yetishmasligida emas, fakt va taxminning aralashib ketishida: agent o‘ylab qo‘shgan narsa buyurtmachining so‘zlari kabi ishonarli ko‘rinadi va ishga ketadi. Yana: buyurtmachi uch jumlada agent bir sahifali ilovaning skrinshotidan oladiganidan ko‘proq narsa berdi — bunday ma’lumot yig‘ishni to‘xtatib, shunchaki so‘z bilan tushuntirish to‘g‘ri edi.

Bog‘liq materiallar:
- [Nosozliklar daraxti (FTA) orqali negativ test-keyslar](/prompts/fta-negative-cases)
- [Reja analizatori: ishlab chiqishdan oldin blast radius va to‘liqlik](/agents/plan-analyzer)
- [Banallik testi: hech narsa demaydigan xulosalarni olib tashlash](/prompts/banality-test)
