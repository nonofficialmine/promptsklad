---
title: "Playwright MCP: Claude saytni brauzerda o‘zi tekshiradi"
description: "Claude saytingizni brauzerda ochishi, tugmalarni bosib ko‘rishi, formalarni to‘ldirishi va nima buzilganini aytib berishi uchun."
topic: "dev"
tags: ["frontend","tests"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Playwright MCP: Claude saytni brauzerda o‘zi tekshiradi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/mcp/playwright-mcp)

**Mavzu:** Dasturlash · **Teglar:** frontend, testlar

**Nima uchun:** Claude saytingizni brauzerda ochishi, tugmalarni bosib ko‘rishi, formalarni to‘ldirishi va nima buzilganini aytib berishi uchun.

**Qanday ishlatish:** Buyruqni terminalda, loyiha papkasida bajaring (Node.js kerak). Claude Code’da /mcp ni kiriting — playwright serveri ro‘yxatda bo‘lishi kerak. Keyin, masalan, shunday so‘rang: «localhost:3000 ni och va kirish formasini tekshir».

```text
claude mcp add playwright -- npx @playwright/mcp@latest

Server butun jamoada bo‘lishi uchun uni loyihaga qo‘shing:
claude mcp add playwright --scope project -- npx @playwright/mcp@latest

Buyruq .mcp.json faylini yaratadi — uni commit qilish mumkin:
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

**Nega ishlaydi:** Claude sahifani rasm sifatida emas, elementlar ro‘yxati (tugmalar, maydonlar, matn) sifatida ko‘radi, shuning uchun aniq bosadi. Brauzer alohida profil bilan ishga tushadi: u sizning odatiy tablaringizni va saqlangan parollaringizni ko‘rmaydi.
