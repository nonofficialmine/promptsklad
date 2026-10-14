---
title: "Suhbatdagi g‘oyalarni «uyum» faylga avtomatik yozib borish"
description: "Har bir promptingiz sana bilan .claude/idea-inbox.md fayliga qo‘shib boriladi — uzun chatlardagi g‘oyalar kontekst siqilganda yo‘qolib ketmasligi uchun."
topic: "dev"
tags: ["automation", "docs"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Suhbatdagi g‘oyalarni «uyum» faylga avtomatik yozib borish

> Rus tilidan mashina tarjimasi. [Asl nusxa](/hooks/idea-inbox)

**Nima uchun:** Claude bilan uzoq muhokamalarda g‘oyalar yo‘qoladi: kontekst siqiladi, yon mavzular unutiladi. «Faqat muhimini» yozib borish ishlamaydi — fikr kelgan paytda nima muhimligini hal qilishga vaqt yo‘q. Hook hammasini yozib boradi, saralashni esa keyin bir yo‘la qilish mumkin.

**Qanday ishlatish:** Blokni loyihaning .claude/settings.json fayliga qo‘shing. jq kerak. `.claude/idea-inbox.md` faylini .gitignore ro‘yxatiga qo‘shing. Tekshirish: istalgan prompt yuboring va faylni oching — u yerda sanasi bilan yozuv paydo bo‘ladi.

```text
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "mkdir -p .claude && jq -r \"\\\"\\n## \\\" + (now|strflocaltime(\\\"%Y-%m-%d %H:%M\\\")) + \\\"\\n\\\" + .prompt\" >> .claude/idea-inbox.md"
          }
        ]
      }
    ]
  }
}
```

**Nega ishlaydi:** UserPromptSubmit har bir promptingizda, Claude uni ko‘rishidan oldin ishga tushadi. Prompt matni hookka `prompt` maydonida keladi. Natija stdout oqimiga emas, faylga yoziladi, shuning uchun suhbat kontekstiga hech narsa qo‘shilmaydi. Bir necha kunda bir marta uyumdan qarorlar, sababi ko‘rsatilgan rad etilgan g‘oyalar va ochiq savollar ajratib olinadi.

**Qachon ishlamaydi:** Faqat sizning promptlaringiz saqlanadi, Claude javoblarisiz. Agar promptga kalit yoki parol tushib qolsa, u faylga ham yoziladi, shuning uchun fayl git repozitoriyga tushmasligi kerak.
