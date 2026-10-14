---
title: "Ilmiy skeptik: xulosa ma’lumotlardan kelib chiqadimi"
description: "G‘oyani emas, xulosa mantig‘ini tekshiradi: ma’lumotlarni talqindan ajratadi va eng oddiy muqobil tushuntirishni izlaydi."
topic: "research"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Ilmiy skeptik: xulosa ma’lumotlardan kelib chiqadimi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/prompts/scientific-skeptic)

**Nima uchun:** Tadqiqot, custdev yoki tahlildan chiqqan xulosaga tayanishdan oldin uni tekshirish. Oddiy «tanqidchi» kelajak haqida bahslashadi («bu ishlamaydi»), buni rad etib bo‘lmaydi. Bu skeptik esa xulosa mantig‘i haqida bahslashadi va buni hoziroq tekshirish mumkin.

**Qanday ishlatish:** Promptni qo‘ying, uning ostiga esa o‘z xulosangizni va u asoslangan ma’lumotlarni.

```text
Sen — ilmiy skeptik. G‘oya yaxshimi yoki yo‘qmi, baholama. Faqat bitta narsani tekshir: xulosa ma’lumotlardan kelib chiqadimi.

1. Ajrat: bu yerda nima ma’lumot (kuzatuvlar), nima xulosa (talqin). Ular orasidagi uzilishni ko‘rsat.
2. Tanlanma: ma’lumotlarga kim kirgan va kim kirmagan? Tizimli og‘ish bormi (masalan, faqat norozilar yozadi)?
3. Bazaviy chastota: jami nechta shunday holat/kompaniya/odam bor? Bu qancha ulush?
4. Muqobil: xuddi shu ma’lumotlarning xulosa noto‘g‘ri bo‘lib chiqadigan eng oddiy tushuntirishini ayt.
5. Hal qiluvchi kuzatuv: qaysi kuzatuv mening gipotezamni muqobildan ajratadi? Uni bir hafta ichida qanday olish mumkin?
6. Mantiqiy xatolar: ayniqsa «agar A bo‘lsa, B bo‘ladi; B bor ⟹ A» (natijani tasdiqlash xatosi).

Agar xulosa ma’lumotlardan kelib chiqsa — shunday deb ayt. E’tiroz uchun e’tiroz o‘ylab topma.

Xulosa: [sizning xulosangiz]
Ma’lumotlar: [u nimaga asoslangan]
```

**Nega ishlaydi:** 5-band bahsni tekshiruv rejasiga aylantiradi. 6-band custdevdagi eng ko‘p uchraydigan xatoni ushlaydi: «talab bo‘lsa, odamlar shikoyat qiladi; odamlar shikoyat qilyapti ⟹ talab bor». Odamlar to‘lashga tayyor bo‘lmasa ham shikoyat qilaveradi. «Xulosa to‘g‘ri» deb javob berishga ruxsat o‘ylab topilgan e’tirozlarni olib tashlaydi.

**Qachon ishlamaydi:** Agar ma’lumotlar umuman bo‘lmasa: tekshiradigan narsa yo‘q, avval ularni yig‘ish kerak.
