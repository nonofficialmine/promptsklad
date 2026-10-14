---
title: "Claude uchun .env va maxfiy ma’lumotlarni o‘qishni taqiqlash"
description: ".env fayldagi kalitlar va parollar tasodifan AI bilan suhbatga tushib qolmasligi uchun. Shu bilan birga — testlarni ortiqcha savolsiz ishga tushirishga ruxsat berish."
topic: "dev"
tags: ["security"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Claude uchun .env va maxfiy ma’lumotlarni o‘qishni taqiqlash

> Rus tilidan mashina tarjimasi. [Asl nusxa](/settings/deny-env-read)

**Mavzu:** Dasturlash · **Teglar:** xavfsizlik

**Nima uchun:** .env fayldagi kalitlar va parollar tasodifan AI bilan suhbatga tushib qolmasligi uchun. Shu bilan birga — testlarni ortiqcha savolsiz ishga tushirishga ruxsat berish.

**Qanday ishlatish:** Blokni loyihaning .claude/settings.json fayliga qo‘shing va commit qiling: qoida butun jamoada ishlaydi. Tekshirish: Claude’dan .env faylini o‘qishni so‘rang — u rad javobini oladi.

```text
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ],
    "allow": [
      "Bash(npm run test:*)",
      "Bash(npm run lint:*)"
    ]
  }
}
```

**Nega ishlaydi:** Taqiq (deny) ruxsatdan (allow) kuchliroq: agar qoida deny ro‘yxatiga tushgan bo‘lsa, uni boshqa hech qanday sozlama bekor qila olmaydi. Bu buzib kirishdan emas, tasodifdan himoya: terminaldagi cat .env kabi buyruq Read qoidasi bilan yopilmaydi.
