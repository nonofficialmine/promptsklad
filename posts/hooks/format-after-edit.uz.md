---
title: "Har bir tahrirdan keyin faylni avtomatik formatlash"
description: "Claude tahrirlagan fayllar alohida buyruqsiz darhol yagona uslubga keltirilishi uchun."
topic: "dev"
tags: ["automation","frontend"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Har bir tahrirdan keyin faylni avtomatik formatlash

> Rus tilidan mashina tarjimasi. [Asl nusxa](/hooks/format-after-edit)

**Mavzu:** Dasturlash · **Teglar:** avtomatlashtirish, frontend

**Nima uchun:** Claude tahrirlagan fayllar alohida buyruqsiz darhol yagona uslubga keltirilishi uchun.

**Qanday ishlatish:** Blokni loyihaning .claude/settings.json fayliga qo‘shing. jq (terminalda JSON o‘qish uchun utilita) va loyihada Prettier kerak: npm i -D prettier. Tekshirish: Claude’dan istalgan .js faylni tuzatishni so‘rang — tahrirdan keyin u formatlangan bo‘ladi.

```text
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I{} npx prettier --write --ignore-unknown {}"
          }
        ]
      }
    ]
  }
}
```

**Nega ishlaydi:** PostToolUse instrument ishini tugatgandan keyin ishga tushadi. Tahrir haqidagi ma’lumotlar hookka JSON ko‘rinishida keladi, fayl yo‘li — tool_input.file_path maydonida. --ignore-unknown flagi Prettier formatlay olmaydigan fayllarda xato bilan to‘xtab qolishiga yo‘l qo‘ymaydi.
