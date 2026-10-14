---
title: "Qilingan ishni oddiy so‘zlar bilan tushuntirish"
description: "Claude Code o‘z ishini dasturlash tajribasi yo‘q odamlarga tushunarli qilib tushuntirishi uchun."
topic: "learning"
tags: ["docs"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Qilingan ishni oddiy so‘zlar bilan tushuntirish

> Rus tilidan mashina tarjimasi. [Asl nusxa](/skills/explain-simply)

**Mavzu:** Ta’lim · **Teglar:** hujjatlar

**Nima uchun:** Claude Code o‘z ishini dasturlash tajribasi yo‘q odamlarga tushunarli qilib tushuntirishi uchun.

**Qanday ishlatish:** Loyihada .claude/skills/explain-simply papkasini yarating (yoki barcha loyihalar uchun ~/.claude/skills/explain-simply) va unga SKILL.md faylini qo‘ying. Tushuntirib berishni so‘raganingizda Claude skillni o‘zi yoqadi. Uni qo‘lda ham chaqirish mumkin: /explain-simply.

```text
---
name: explain-simply
description: Kodda qilingan ishni dasturlash tajribasi yo‘q odam uchun oddiy so‘zlar bilan tushuntiradi. «Oddiy qilib tushuntir», «nima qilding», «bu nimani anglatadi» deb so‘ralganda va katta tahrirlardan keyin ishlat.
---

# Oddiy so‘zlar bilan tushuntirish

1. Birinchi qator — natija: kod uchun emas, odam uchun nima o‘zgardi.
2. Har bir atama — darhol yonida qavs ichida oddiy so‘zlar bilan izohi.
3. Bitta fikr — bitta gap. Batafsilroq so‘ralmasa, 5 ta gapdan oshmasin.
4. Tekshirmagan bo‘lsang — shuni ayt: «tekshirmadim». «Kerak bo‘lishi mumkin» kabi bo‘sh izohlarsiz.
5. Oxirida — odam uchun bitta keyingi qadam.
```

**Nega ishlaydi:** description maydoni skillni qachon yoqish kerakligini Claude’ga aytadi, shuning uchun unda jonli trigger-iboralar sanab o‘tilgan. Qoidalar qisqa va tekshirsa bo‘ladigan: javobdan ularga rioya qilingan-qilinmagani ko‘rinib turadi.
