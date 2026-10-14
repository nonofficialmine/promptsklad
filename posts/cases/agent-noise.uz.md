---
title: "Ishga o‘xshagan agent shovqini va undan qanday qutulish mumkin"
description: "Nega QA va review agentlari to‘qib chiqarilgan topilmalar beradi va aslida nima yordam beradi: dalillar, verifikatsiya, canary."
topic: "dev"
tags: ["code-review", "tests"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Ishga o‘xshagan agent shovqini va undan qanday qutulish mumkin

> Rus tilidan mashina tarjimasi. [Asl nusxa](/cases/agent-noise)

**Nima uchun:** Agentlar hisobotlarida to‘qib chiqarilgan muammolar, qayta ifodalashlar va yolg‘on «hammasi test qilingan» qayerdan kelishini va qaysi choralar yordam berishini tushunish.

Vazifa: bir nechta agent kodni review qiladi va funksiyalarni test qiladi. Hisobotlar uzun, lekin qo‘lda tekshirilgandan keyin topilmalarning sezilarli qismi tasdiqlanmaydi.

Shovqin qayerdan keladi:
- **Promptdagi kvota.** «Kamida 5 ta muammo top» degani, haqiqiylari ikkita bo‘lsa ham, beshtasini kafolatlaydi.
- **Dalil talab qilinmaydi.** Test natijasisiz «Test qilindi, ishlaydi».
- **Barcha izohlar teng.** Nomlash haqidagi 20 ta izoh ma’lumot yo‘qolishi haqidagi bitta izoh bilan bir xil vaznga ega.
- **Prompt javobni aytib qo‘yadi.** «Formani tekshir» o‘rniga «Forma ishlashini tasdiqla».
- **Soxta mustaqillik.** Uchta agent «rozi», lekin ularning modeli ham, konteksti ham bitta: bu bitta fikr.

Nima qildik:
1. Kvotalarni olib tashladik va «bo‘sh ro‘yxat — qabul qilinadigan javob» degan iborani qo‘shdik.
2. Har bir topilma — fayl:qator va «kirish → noto‘g‘ri chiqish» ssenariysi. Busiz topilma qabul qilinmaydi.
3. Jiddiylik chegarasi: asosiy hisobotga faqat ishda buziladigan narsa kiradi.
4. Alohida verifikator agent har bir topilmani rad etishga urinadi: CONFIRMED / PLAUSIBLE / REJECTED.
5. Canary: bir necha ishga tushirishda bir marta ataylab xato (bug) qo‘yiladi. U topilmasa, demak «muammo yo‘q» degani hech narsani anglatmaydi.

Nima qilmaslik kerak: «ehtiyotkorroq bo‘l» deb talab qilish va o‘sha promptni qayta ishga tushirish — shovqin o‘zgarmaydi.

**Xulosalar:** Agentning asosiy metrikasi — qancha topgani emas, topganining qancha qismi tasdiqlangani. Agar bu ulush past bo‘lsa, ishga tushirishlar sonini emas, prompt va tuzilmani o‘zgartirish kerak. Teskari og‘ishni ham kuzatib boring: haddan tashqari qattiq tekshiruv haqiqiy, lekin takrorlash qiyin bo‘lgan muammolarni kesib tashlaydi, shuning uchun PLAUSIBLE verdikti kerak.
