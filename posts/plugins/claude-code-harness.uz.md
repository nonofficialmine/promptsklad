---
title: "Claude Code Harness: o‘z AI agentingiz uchun harness chizmasi"
description: "O‘z AI agentini quradigan dasturchilar uchun: skill promptni emas, model atrofidagi hamma narsani o‘ylab chiqishga yordam beradi — so‘rov qanday yig‘iladi, ish sikli qanday boradi,"
topic: "dev"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Claude Code Harness: o‘z AI agentingiz uchun harness chizmasi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/claude-code-harness)

**Mavzu:** Dasturlash

**Nima uchun:** O‘z AI agentini quradigan dasturchilar uchun: skill promptni emas, model atrofidagi hamma narsani o‘ylab chiqishga yordam beradi — so‘rov qanday yig‘iladi, ish sikli qanday boradi, qanday vositalar va kirish huquqlari bor, xotirada nima saqlanadi va nosozlikdan keyin qanday tiklanish kerak.

**Qanday ishlatish:** Claude Code’da ikkita o‘rnatish buyrug‘ini kiriting. Skill /claude-code-harness:claude-code-harness buyrug‘i bilan chaqiriladi — darhol vazifa tavsifi bilan ham mumkin, masalan, repozitoriyda kod yozadigan agent uchun kirish huquqlari va tiklanishni hisobga olgan harness loyihalashni so‘rash. Natijada matnli chizma olinadi: tizim maqsadi va delegatsiya chegaralari, qatlamlar, so‘rovni yig‘ish, qadam sikli, vositalar va huquqlar, xotira va kontekst, jurnal va tiklanish, kengaytirish nuqtalari (plaginlar, MCP, subagentlar) va yig‘ish tartibi. Qo‘shimcha hech narsa o‘rnatish shart emas. Muallif skill oddiy promptlar, mahsulot haqidagi brainstorming yoki oddiy kod yozish uchun emasligini ochiq aytadi.

```text
/plugin marketplace add dadwadw233/claude-code-harness
/plugin install claude-code-harness@claude-code-harness

/claude-code-harness:claude-code-harness
```

**Nega ishlaydi:** Ichida bitta claude-code-harness skilli va to‘rtta ma’lumotnoma fayli bor: harness tamoyillari (harness-principles.md), so‘rov yig‘uvchi va tiklanish tekisligi kabi shablonlar lug‘ati (harness-pattern-language.md), yakuniy chizma shabloni (harness-blueprint-template.md) va Claude Code tuzilishidan umumlashtirilgan xulosalar (claude-code-derived-insights.md). Skill odatda keyinga qoldiriladigan narsalarni aniq tasvirlashga majbur qiladi: ruxsatlar va tasdiqlar qayerda turadi, qisman nosozlikda nima qilish kerak, qaysi xotira qayta ishga tushirishdan keyin ham saqlanadi, inson agent ishini qanday ko‘radi va to‘xtatadi. Bu «prompt va vositalar ro‘yxati» sxemasida qotib qolmaslikka va murakkab harness kerakmi yoki oddiy skript yetarlimi — halol hal qilishga yordam beradi.

**Izoh:** Uchinchi tomon plagini: Yuanhong Yu, github.com/dadwadw233/claude-code-harness. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. Bu faqat Markdown’dagi ko‘rsatmalar: hooklar, MCP serverlar va bajariladigan skriptlar yo‘q. Loyiha norasmiy va Anthropic bilan bog‘liq emas. Versiya 0.1.0. Litsenziya — MIT.
