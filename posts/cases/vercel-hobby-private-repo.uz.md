---
title: "Vercel ikkinchi muallifning commitlarini deploy qilmadi"
description: "Vercelda turgan sayt xatolar bo‘lmasa ham ba’zi commitlardan keyin nega yangilanmasligini tushunish."
topic: "dev"
tags: ["ci-cd","git"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Vercel ikkinchi muallifning commitlarini deploy qilmadi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/cases/vercel-hobby-private-repo)

**Mavzu:** Dasturlash · **Teglar:** CI/CD, git

**Nima uchun:** Vercelda turgan sayt xatolar bo‘lmasa ham ba’zi commitlardan keyin nega yangilanmasligini tushunish.

Vazifa: Vercelda (bepul Hobby tarifi) joylashgan sayt main branchiga har bir commitdan keyin o‘zi yangilanadi. Loyiha ustida ikki kishi ishlaydi.

Nima bo‘ldi: Vercel akkaunti egasining commitlari deploy qilinardi, ikkinchi ishtirokchiniki esa yo‘q. Build loglarida xato yo‘q edi: bunday commitlar bo‘yicha build shunchaki boshlanmasdi.

Sabab: repozitoriy yopiq (private) edi. Hobby tarifida Vercel yopiq repozitoriylarda birgalikda ishlashni qo‘llab-quvvatlamaydi: faqat egasining commitlarini deploy qiladi, qolganlarini esa bloklaydi.

Nima qildik: repozitoriyni ochdik (public qildik). Ochiq repozitoriylarda bu cheklov amal qilmaydi. Boshqa muallifning nazorat commiti bilan tekshirdik — sayt yangilandi.

Boshqa variantlar: pullik Pro tarifi yoki faqat ega akkauntidan deploy qilish. Cheklovni chetlab o‘tish uchun commit muallifini almashtirish yaramaydi: bu tarif shartlarini aylanib o‘tish bo‘ladi.

**Xulosalar:** Agar deploy xatosiz «jim» qolsa, avval commit muallifi kimligini va loyiha qaysi tarifda ekanini tekshiring. Deploy holati GitHubda commit yonida ko‘rinadi: Vercel belgisi va ustiga kursor olib borilganda chiqadigan izoh.
