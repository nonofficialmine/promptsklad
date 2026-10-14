---
title: "ts-loop: bag yo‘qligi isbotlanmaguncha u yopilmaydi"
description: "Bagni yopish sikli: tub sabab → minimal tuzatish → takrorlashni qaytarish → bag qolsa, yana boshidan."
topic: "dev"
tags: ["debugging", "tests"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# ts-loop: bag yo‘qligi isbotlanmaguncha u yopilmaydi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/skills/ts-loop)

**Nima uchun:** Claude simptomni davolamasligi va tekshirmasdan «tuzatildi» deb e’lon qilmasligi uchun. Skill bag aynan o‘sha takrorlashda yo‘qolmaguncha qaytariladigan siklni belgilaydi.

**Qanday ishlatish:** Loyihada .claude/skills/ts-loop/SKILL.md faylini yarating (yoki barcha loyihalar uchun ~/.claude/skills/ts-loop). Bag topilganda Claude skillni o‘zi yoqadi. Qo‘lda: /ts-loop.

```text
---
name: ts-loop
description: Bagni yopish sikli. Bag topilishi bilan ishlat — test, QA-agent yoki foydalanuvchi tomonidan. Tub sabab → minimal tuzatish → takrorlashni qaytarish → bag qolsa, sikl qaytadan.
---

# ts-loop

Bag yo‘qligi isbotlanmaguncha u yopilmaydi.

1. INVESTIGATE — simptomni emas, tub sababni top.
   - Bagni barqaror takrorla, qadamlarni yozib ol.
   - Sabab haqida gipoteza tuz.
   - Uni asosiy nuqtalardagi vaqtinchalik loglar bilan tasdiqla: funksiyaga kirish, tarmoqlanishlar, holat o‘zgarishidan oldin va keyin, API javobi, xatoning to‘liq obyekti.
   - UI uchun: konsol, tarmoq so‘rovlari, DOM (Playwright MCP yoki DevTools orqali).
2. RESEARCH — tuzatish variantlari; sababga yo‘naltirilgan eng minimalini tanla.
3. APPLY — minimal o‘zgarish, yo‘l-yo‘lakay refaktoringsiz.
4. TEST — 1-banddagi aynan o‘sha qadamlarni takrorla. Isbot: test natijasi, skrinshot, log, javob statusi. Yondosh negativ holatlarni ham tekshir.
5. Qaror:
   - bag qoldi → gipoteza noto‘g‘ri yoki to‘liq emas edi → yana 1-band;
   - bag yo‘qoldi → vaqtinchalik loglarni olib tashla, nima tuzatilganini va nima bilan isbotlanganini yozib qo‘y.

Sababni tekshirish: topilgan sababni olib tashlasang, bag yo‘qolishi kerak. Yo‘qolmadi — sabab topilmagan.

Commitdan oldin: git diff da yangi console.log / print bo‘lmasligi kerak. Faqat strukturaviy logger qoladi.

Halollik: «tuzatilganga o‘xshaydi» deb yozma. Isbot yo‘q — bag yopilmagan.

Limit: 3–5 ta to‘liq sikl. Yopilmadi — to‘xta va tasvirlab ber: qaysi gipotezalar tekshirildi, nima istisno qilindi, hozirgi eng yaxshi gipoteza qaysi.
```

**Nega ishlaydi:** Siklsiz Claude birinchi ishonarli joyni tuzatadi va muvaffaqiyat haqida xabar beradi. Takrorlashning aynan o‘sha qadamlarini qaytarish va «sababni olib tashladim — bag yo‘qoldi» tekshiruvi topilgan sababni tasodifdan ajratadi. Sikllar limiti noto‘g‘ri gipoteza atrofida cheksiz aylanishga yo‘l qo‘ymaydi.

**Qachon ishlamaydi:** Vaqti-vaqti bilan chiqadigan baglarda (race condition, beqaror tarmoq) bitta takrorlash hech narsani isbotlamaydi. Ko‘p marta takrorlash va qanchalik tez-tez chiqishiga qarash kerak.
