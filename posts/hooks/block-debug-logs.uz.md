---
title: "Vaqtinchalik console.log va print bilan commit qilishga yo‘l qo‘ymaslik"
description: "Agar staged o‘zgarishlarda debug loglar qolgan bo‘lsa, hook git commit buyrug‘ini bloklaydi va Claude’ga ularni olib tashlash kerakligini aytadi."
topic: "dev"
tags: ["automation", "debugging", "git"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Vaqtinchalik console.log va print bilan commit qilishga yo‘l qo‘ymaslik

> Rus tilidan mashina tarjimasi. [Asl nusxa](/hooks/block-debug-logs)

**Nima uchun:** Debug paytida Claude `console.log` va `print` qo‘yib chiqadi, keyin ularni olib tashlashni unutadi. Qo‘shilgan qatorlarda shunday loglar qolar ekan, hook commitni to‘xtatadi.

**Qanday ishlatish:** Blokni loyihaning .claude/settings.json fayliga qo‘shing. jq kerak. Tekshirish: istalgan faylga `console.log(1)` qo‘shing va Claude’dan commit qilishni so‘rang — commit xabar bilan to‘xtatiladi.

```text
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r \".tool_input.command\" | grep -qE \"(^|[;&| ])git commit\" || exit 0; if git diff --cached -U0 | grep -E \"^\\+[^+]\" | grep -qE \"console\\.log\\(|(^|[^a-zA-Z_.])print\\(\"; then echo \"Staged o‘zgarishlarda console.log/print bor — commit qilishdan oldin vaqtinchalik loglarni o‘chiring\" >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

**Nega ishlaydi:** PreToolUse buyruq ishga tushishidan oldin ishlaydi. Hook `git commit` buyrug‘idan boshqa hamma narsani o‘tkazib yuboradi, `git diff --cached` natijasidagi faqat qo‘shilgan qatorlarni ko‘radi va topsa, 2-kod bilan chiqadi. 2-kod chaqiruvni bloklaydi, stderr oqimidagi matn esa Claude’ga boradi va u loglarni o‘zi olib tashlaydi. Loglari bor eski kod xalaqit bermaydi: faqat yangi qatorlar tekshiriladi. `blueprint(` va `obj.print(` hisobga olinmaydi.

**Qachon ishlamaydi:** `git commit -a` fayllarni buyruqning o‘zi ichida qo‘shadi, shuning uchun hook ularni ko‘rmaydi. Strukturaviy logger orqali yozilgan loglar (`logger.debug`) ushlanmaydi va bu to‘g‘ri: ular monitoring uchun qoladi.
