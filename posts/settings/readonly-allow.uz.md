---
title: "Claude kamroq so‘rashi uchun read-only buyruqlarga ruxsat berish"
description: "Faqat holatni o‘qiydigan buyruqlar uchun allowlist: git status/diff/log, ls, portlar va jarayonlarni tekshirish."
topic: "dev"
tags: ["automation", "git"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Claude kamroq so‘rashi uchun read-only buyruqlarga ruxsat berish

> Rus tilidan mashina tarjimasi. [Asl nusxa](/settings/readonly-allow)

**Nima uchun:** Claude zararsiz buyruqlar uchun ham doim ruxsat so‘raydi: diffni ko‘rish, port bandligini tekshirish, jarayonni topish. Allowlist bu savollarni olib tashlaydi va tasdiqlashni faqat nimanidir o‘zgartiradigan buyruqlar uchun qoldiradi.

**Qanday ishlatish:** Blokni loyihaning .claude/settings.json fayliga (yoki barcha loyihalar uchun ~/.claude/settings.json fayliga) qo‘shing. Tekshirish: Claude’dan git diff natijasini ko‘rsatishni so‘rang — u buyruqni so‘ramasdan bajaradi.

```text
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git show:*)",
      "Bash(ls:*)",
      "Bash(lsof -iTCP:*)",
      "Bash(ss -tlnp:*)",
      "Bash(ps -o:*)"
    ]
  }
}
```

**Nega ishlaydi:** `Bash(git diff:*)` qoidasi buyruqni istalgan argumentlar bilan bajarishga ruxsat beradi. Bu yerda faqat holatni o‘qiydigan buyruqlar bor, shuning uchun xavf minimal. lsof, ss va ps dev-serverni ishga tushirishdan oldin portlarni tekshirish uchun kerak: kompyuterda 3000 yoki 5173 porti ko‘pincha allaqachon band bo‘ladi.

**Qachon ishlamaydi:** Qoida istalgan argumentlarga ruxsat beradi, shuning uchun ro‘yxatni o‘ylab tuzing. Masalan, `git diff --output=fayl` faylga yozadi. Qat’iylik kerak bo‘lsa, to‘liq buyruqlarni `:*` belgisisiz sanab chiqing.
