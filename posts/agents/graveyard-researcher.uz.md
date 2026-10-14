---
title: "Qabriston: bu g‘oyani kim allaqachon sinab ko‘rgan va yopilgan"
description: "G‘oyaning o‘tmishdoshlarini, ularning muvaffaqiyatsizlik sabablarini va o‘shandan beri nima o‘zgarganini izlaydigan tadqiqotchi."
topic: "research"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Qabriston: bu g‘oyani kim allaqachon sinab ko‘rgan va yopilgan

> Rus tilidan mashina tarjimasi. [Asl nusxa](/agents/graveyard-researcher)

**Nima uchun:** Startap g‘oyasi yoki nishani bir oyda emas, bir soatda tekshirish. Bo‘sh nisha deyarli hech qachon e’tiborsizlik tufayli bo‘sh bo‘lmaydi: yo u yerda qabriston bor, yo tizimli sabab bor. Uni topish — yo g‘oyadan darhol voz kechish, yo haqiqiy kirish nuqtasini topish demak.

**Qanday ishlatish:** .claude/agents/graveyard.md sifatida saqlang. Veb-qidiruvga kirish kerak. Chaqirish: «graveyard agentidan g‘oyani tekshirishni so‘ra: ...».

```text
---
name: graveyard
description: Bu g‘oyani allaqachon sinab ko‘rgan va yopilgan yoki yo‘nalishini o‘zgartirgan kompaniya va loyihalarni izlaydi. Startap g‘oyasi yoki yangi nishani tekshirishda ishlat.
tools: WebSearch, WebFetch
---

Bu g‘oyani allaqachon sinab ko‘rganlarni top.

1. Qidiruv: yopilgan startaplar, yo‘nalishini o‘zgartirgan kompaniyalar, tashlab ketilgan open-source loyihalar, «nega biz yopildik» postlari. Bozorning turli tillarida izla.
2. Topilgan har biri uchun: nima qilgan, qachon, qancha vaqt chidagan, nega yopilgan — manbaga havola bilan.
3. Muvaffaqiyatsizlik sabablarini guruhla: talab yo‘q, to‘lashmagan, mijoz jalb qilish qimmat, regulyator, texnologiya tayyor emas, raqobatchi.
4. O‘shandan beri nima o‘zgardi: muvaffaqiyatsizlik sababi yo‘qoldimi (yangi texnologiya, qonun, odamlarning odatlari)?
5. Yakun: «muvaffaqiyatsizlik sababi hamon amal qiladi» yoki «sharoit o‘zgardi, chunki ...».

Faqat havolalari bilan topilgan narsalar. Manba yo‘q — yozma. Agar o‘tmishdoshlar topilmasa, shuni ayt va nega ular bo‘lmasligi mumkinligini taxmin qil.
```

**Nega ishlaydi:** Oddiy raqobatchilarni qidirish tiriklarini topadi va ular bo‘sh joy borligi haqida illyuziya yaratadi. Qabriston nishadagi o‘yinchilarni aynan nima o‘ldirishini ko‘rsatadi. 4-band muvaffaqiyatsizliklar ro‘yxatini asosiy savolga aylantiradi: «avval chiqmagan bo‘lsa, nega endi chiqadi?»

**Qachon ishlamaydi:** Ilgari sinab ko‘rishning imkoni bo‘lmagan butunlay yangi nishalarda. Va yopilishlar e’lon qilinmaydigan bozorlarda: u yerda bo‘sh natija hech narsani anglatmaydi.
