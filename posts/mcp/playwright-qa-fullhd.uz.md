---
title: "QA uchun Playwright MCP: qat’iy FULLHD va skrinshotlar uchun papka"
description: "Playwright MCP ni tekshiruvlar bitta o‘lchamda o‘tadigan va skrinshotlar loyiha bo‘ylab sochilib ketmaydigan qilib sozlash."
topic: "dev"
tags: ["tests", "frontend"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# QA uchun Playwright MCP: qat’iy FULLHD va skrinshotlar uchun papka

> Rus tilidan mashina tarjimasi. [Asl nusxa](/mcp/playwright-qa-fullhd)

**Nima uchun:** Claude interfeysni Playwright MCP orqali test qilganda oynaning standart o‘lchami o‘zgarib turadi va verstka baglari goh takrorlanadi, goh yo‘q. Skrinshotlar loyiha ildizida to‘planib qoladi. Ikkita flag buni tuzatadi.

**Qanday ishlatish:** Loyiha papkasida bajaring. .gitignore ga `.tmp/` ni qo‘shing. Tekshirish: Claude’dan saytni ochib, skrinshot olishni so‘rang — u .tmp/screenshots ichida 1920×1080 o‘lchamda paydo bo‘ladi.

```text
claude mcp add playwright --scope project -- npx @playwright/mcp@latest --viewport-size "1920,1080" --output-dir .tmp/screenshots

.mcp.json da bu shunday ko‘rinadi:
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--viewport-size", "1920,1080", "--output-dir", ".tmp/screenshots"]
    }
  }
}

Qoidaga agentlar ham rioya qilishi uchun CLAUDE.md ga qator:
UI testlash — faqat playwright-mcp orqali FULLHD da; skrinshotlar — faqat .tmp/screenshots/ ichida, nomi <funksiya>-<qadam>-<vaqt>.png.
```

**Nega ishlaydi:** `--viewport-size` oyna o‘lchamini qotiradi va tekshiruvlar har safar bir xil takrorlanadi. `--output-dir` server saqlaydigan fayllar uchun papkani belgilaydi. CLAUDE.md dagi qator kerak, chunki subagentlar MCP sozlamalarini emas, aynan uni o‘qiydi.

**Qachon ishlamaydi:** Mobil verstkani bu usulda tekshirib bo‘lmaydi: buning uchun boshqa o‘lcham yoki qurilma emulyatsiyasi bilan alohida ishga tushirish kerak.
