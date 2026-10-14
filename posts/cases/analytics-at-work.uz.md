---
title: "Bitta ish vazifasida tahlilning besh turi: tartib va promptlar"
description: "«Nega metrika o‘smayapti» tahlilini tavsifdan qarorgacha qanday o‘tish kerak: qaysi qadamda qaysi prompt va har bir qadam qaysi xatoni ushlaydi."
topic: "data"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Bitta ish vazifasida tahlilning besh turi: tartib va promptlar

> Rus tilidan mashina tarjimasi. [Asl nusxa](/cases/analytics-at-work)

**Nima uchun:** «Nega metrika o‘smayapti» kabi tahlilni boshidan qarorgacha qadamlarni o‘tkazib yubormasdan o‘tish. Har bir qadam uchun promptsklad’da alohida prompt bor.

Vazifa (misol): marketpleysda xaridor va sotuvchi o‘rtasida chat ishga tushirildi. Ikki oydan keyin sotuvchilar nega sotuvlar ko‘paymaganini so‘rashmoqda. Quyida qadam-baqadam tahlil; bu darslikdagi bayon tartibi emas, ish tartibi.

1. **Tavsifiy — nima bo‘ldi.** Prompt: [Tavsifiy tahlil](/prompts/descriptive-analytics). Buyurtmalar va chatlarni eksport qilamiz: nechta dialog, ulardan nechtasi buyurtma bilan tugagan, kategoriyalar va haftalar bo‘yicha. «Taqqoslashsiz raqam» xatosini ushlaydi: ishga tushirishdan oldingi davrsiz bu ko‘pmi yoki kammi, aytib bo‘lmaydi. Natija — xulosa emas, savol: «qaysi kategoriyalarda va qaysi haftadan boshlab dialoglar buyurtma bilan tugamay qoldi?».
2. **Diagnostik — nega.** Prompt: [Diagnostik tahlil](/prompts/diagnostic-analytics). Natija nima bilan bog‘liqligini izlaymiz: sotuvchining javob berish vaqti, chatga mahsulot kartochkasidan yoki do‘kondan kirish, kategoriya. «Bog‘liqlik = sabab» xatosini ushlaydi. Masalan, sekin javob rad etish bilan bog‘liq, lekin ehtimol taqchil mahsulotli sotuvchilar sekin javob berishadi va xaridorlar mahsulot yo‘qligi sababli ketishadi.
3. **Sababiylikni tekshirish — har qanday qarordan oldin.** Prompt: [Korrelyatsiya yoki sabab](/prompts/causality-check). Bu qadam klassik zinapoyada yo‘q, usiz esa 2-qadamdagi xato davom etadi.
4. **Kognitiv — agar sabab raqamlarda bo‘lmasa.** Prompt: [Kognitiv tahlil](/prompts/cognitive-analytics). CRMda «nega sotib olmadi» maydoni yo‘q, lekin u chat xabarlarining o‘zida bor. Yozishmalardagi mavzular hech kim so‘ramagan narsani ko‘rsatishi mumkin: masalan, xaridorlar kartochkada umuman yo‘q narsani so‘rashadi. Bu qadam oxirida emas, diagnostika bosqichida bo‘ladi.
5. **Bashoratli — qayoqqa ketyapti.** Prompt: [Bashoratli tahlil](/prompts/predictive-analytics). Faqat mexanizm tushunilgandan keyin. Prognoz oralig‘i trendning o‘zidan kengroq bo‘lganda «trend chizig‘i = yo‘nalish» xatosini ushlaydi.
6. **Preskriptiv — nima qilish kerak.** Prompt: [Preskriptiv tahlil](/prompts/prescriptive-analytics). Variantlarni solishtiramiz: sotuvchiga javob vaqti haqida eslatmalar, javob shablonlari, mahsulot borligini to‘g‘ridan-to‘g‘ri chatda ko‘rsatish. «Model = qaror» xatosini ushlaydi: natija hamma uchun o‘zgarish emas, sotuvchilarning bir qismida tekshiruv.

Tartibda nima muhim:
- Tavsifiy → diagnostik → (sababiylikni tekshirish) → bashoratli → preskriptiv. Kognitiv raqamlar yetmaganda diagnostika qadamida ulanadi.
- Sabab noma’lum ekan, bashoratli tahlil erta: mexanizmsiz prognoz shunchaki o‘tmishni davom ettiradi.
- Har bir qadam qaror bilan emas, keyingisiga savol bilan tugaydi.

**Xulosalar:** Ishonchlilik qadamdan qadamga pasayadi, taqdimotning ishonchliligi esa o‘sadi: kamtarona jadval — fakt, «optimal qaror» esa farazlar zanjiriga tayanadi. Shuning uchun eng qimmatli bo‘g‘in — «bog‘liq» dan «keltirib chiqaradi» ga o‘tish (3-qadam), oxirgi qadam esa doimo eksperiment. Xuddi shu effekt boshqa ma’lumotlarda: [Isbotlanmagan korrelyatsiya qanday qilib narx bo‘yicha tavsiyaga aylandi](/cases/analytics-ladder).
