---
title: "Kognitiv tahlil: sharhlar, tiketlar va yozishmalardan sabablar"
description: "Tuzilmagan matnlarni tahlil qiladi: kalit so‘zlar kontekstda, ma’lumotlardan mavzular, so‘ng ramka bo‘yicha belgilash. Faqat chastotani emas, tanlanma siljishi va jiddiylikni ham hisobga oladi."
topic: "data"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Kognitiv tahlil: sharhlar, tiketlar va yozishmalardan sabablar

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/cognitive-analytics)

**Nima uchun:** Raqamlarda yo‘q javobni topish. Mijozning nega sotib olmagani kamdan-kam CRMda bo‘ladi: u yerda izohsiz «yutqazildi» holati turadi. Sabab tiketlarda, sharhlarda va yozishmalarda. Prompt matnlarni kutilganni tasdiqlash uchun emas, kutilmaganni topish uchun tahlil qiladi.

**Qanday ishlatish:** Promptni va matnlarni (sharhlar, murojaatlar, yozishmalar, izohlar) qo‘ying. Matnlar yuzlab bo‘lsa, 50–100 talik tanlanmadan boshlang.

```text
Quyidagi matnlarni tahlil qil. Savol: [nimani tushunmoqchimiz — diagnostik qadamdan].

1. Kontekstdagi kalit so‘zlar: [ro‘yxat] so‘zlari uchun atrofidagi matn bilan 5–10 ta eslatmani ko‘rsat. Odamlar ular haqida aslida qanday gapiradi?
2. Ma’lumotlardan mavzular: matnlarni o‘qi va mening savolimda yo‘q mavzularni ajrat. Kutilganga moslashtirma.
3. Ramka: mavzulardan har birining ta’rifi bilan kategoriyalar ro‘yxatini tuz. Barcha matnlarni unga ko‘ra belgila: kategoriya, ohang, iqtibos.
4. Chastota va jiddiylik alohida: nechta eslatma va har biri qanchalik jiddiy (noqulaylik / pul yo‘qotish / mijozning ketishi). Qadoq haqidagi 500 ta shikoyat va ma’lumot yo‘qolishi haqidagi 5 ta — turli muammolar.
5. Tanlanma siljishi: bunday matnlarni kim yozadi, kim jim turadi? Bu xulosalar uchun nimani anglatadi?
6. Iqtiboslar: har bir xulosaga 2–3 ta so‘zma-so‘z iqtibos. Iqtibos yo‘q — xulosa yo‘q.

Matnlar: [matnlar]
```

**Nega ishlaydi:** 1–3-bandlar tadqiqotlarda sinalgan tartibni takrorlaydi: avval mavzular matnlardan o‘sib chiqadi (induktiv), keyin ular asosida belgilash uchun ramka quriladi (deduktiv). Tayyor ramkadan boshlansa, faqat kutilgan narsa topiladi. 4-band tez-tez uchraydigan mayda narsalar kam uchraydigan jiddiy muammoni to‘sib qo‘yishiga yo‘l qo‘ymaydi, 6-band esa model o‘ylab topgan mavzularni kesib tashlaydi.

**Qachon ishlamaydi:** Matnlar kam bo‘lsa (20 tagacha), mavzular tasodifiy chiqadi. Agar faqat chekkadagilar (juda xursand va jahli chiqqanlar) yozsa, 5-bandsiz xulosalar qiyshayib ketadi.
