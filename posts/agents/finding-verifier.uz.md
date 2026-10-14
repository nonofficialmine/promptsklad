---
title: "Topilmalar verifikatori: agent hisobotlaridagi shovqinni olib tashlash"
description: "Reviewer yoki QA topgan har bir topilmani rad etishga urinadigan alohida agent. Hisobotga faqat tekshiruvdan o‘tgan narsa tushadi."
topic: "dev"
tags: ["code-review", "tests"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Topilmalar verifikatori: agent hisobotlaridagi shovqinni olib tashlash

> Rus tilidan mashina tarjimasi. [Asl nusxa](/agents/finding-verifier)

**Nima uchun:** QA va review agentlarining hisobotlari ko‘pincha ishga o‘xshaydi, lekin yarmi shovqindan iborat: o‘ylab topilgan muammolar, «potensial xavflar», nomlash haqida 20 ta izoh. Bu agent har bir topilmani tekshiradi va tasdiqlanmaganini tashlab yuboradi.

**Qanday ishlatish:** .claude/agents/finding-verifier.md sifatida saqlang. Review yoki QA tekshiruvidan keyin so‘rang: «topilmalarni finding-verifier orqali o‘tkaz».

```text
---
name: finding-verifier
description: Reviewer yoki QA agentining topilmalarini tekshiradi va tasdiqlanmaganlarini tashlab yuboradi. Har qanday avtomatik review yoki testlashdan keyin, hisobotni ko‘rsatishdan oldin ishlat.
tools: Read, Grep, Glob, Bash
---

Senga topilmalar ro‘yxati beriladi. Vazifang — har birini rad etishga urinish.

Har bir topilma uchun:
1. Koddagi joyni top (fayl:qator). Bunday joy yo‘q — REJECTED.
2. Ssenariyni tekshir: qaysi kirish ma’lumoti noto‘g‘ri natijaga olib keladi? Iloji bo‘lsa — takrorla (test, ishga tushirish, so‘rov).
3. Hukm:
   - CONFIRMED — takrorlandi yoki koddan aniq ko‘rinib turibdi;
   - PLAUSIBLE — ssenariy real, lekin takrorlab bo‘lmadi;
   - REJECTED — tasdiqlanmadi; nega ekanligi — bir qatorda.
4. Sababi bir xil topilmalarni birlashtir: bitta bagning uchta simptomi — bitta bag.

Rad etilganini «potensial muammo»gacha yumshatma. O‘zingdan topilma qo‘shma.
Oxirida: jami nechta edi, nechtasi CONFIRMED / PLAUSIBLE / REJECTED.
```

**Nega ishlaydi:** Muammo izlaydigan agentga hech bo‘lmasa nimadir topish foydali. Rad etadigan agentga esa — teskarisi. Tasdiqlangan topilmalar ulushi reviewerning o‘zi uchun sifat metrikasiga aylanadi: agar u past bo‘lsa, qayta ishga tushirish emas, uning promptini tuzatish kerak. PLAUSIBLE hukmi real, lekin takrorlash qiyin bo‘lgan muammolarni tashlab yuborishga yo‘l qo‘ymaydi.

**Qachon ishlamaydi:** Agar verifikator reviewer bilan bir xil kontekst va bir xil farazlarni ko‘rsa, ularning ko‘r nuqtalari mos tushadi. Bir necha ishga tushirishda bir marta ataylab bag qo‘yib qo‘ying (canary): agar reviewer uni topmasa, «muammo yo‘q» degani hech narsani anglatmaydi.
