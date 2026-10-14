---
title: "Embedded Workbench: C/C++ mikrodasturlar, FreeRTOS, Keil va HardFault"
description: "Cortex-M uchun C/C++’da yozadigan o‘rnatilgan tizimlar dasturchilari uchun bilimlar va agentlar: FreeRTOS, uzilishlar, NVM’da saqlash, Keil MDK’da yig‘ish, Hard"
topic: "dev"
tags: ["debugging","refactoring"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Embedded Workbench: C/C++ mikrodasturlar, FreeRTOS, Keil va HardFault

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/embedded-workbench)

**Mavzu:** Dasturlash · **Teglar:** debug, refaktoring

**Nima uchun:** Cortex-M uchun C/C++’da yozadigan o‘rnatilgan tizimlar dasturchilari uchun bilimlar va agentlar: FreeRTOS, uzilishlar, NVM’da saqlash, Keil MDK’da yig‘ish, HardFault tahlili, chekli avtomatlar, LVGL. Claude’ga mikrodasturlarning o‘ziga xos jihatlarini hisobga olish va rejalarni haqiqiy kod bilan solishtirishda yordam beradi.

**Qanday ishlatish:** Claude Code’da /plugin marketplace add AmethystLuna/embedded-workbench va /plugin install embedded-workbench@embedded-workbench-dev buyruqlarini bajaring. Alohida slash-buyruqlar yo‘q: vazifa skillar tavsifiga mos kelganda ular o‘zi ulanadi. Masalan, HardFault’ni tahlil qilish iltimosi hardfault-triage’ni, Keil’da yig‘ish, qurilmaga yuklash yoki .map faylini tahlil qilish esa keil-mdk-build’ni ulaydi. Umumiy ish tartibini yoqish uchun Claude’dan embedded-workbench skillini yuklashni so‘rang. Claude Code 2.1 yoki yangiroq va boshlang‘ich hook uchun bash kerak; muallif boshqa bog‘liqliklarni ko‘rsatmagan. Claude loyihani keil-mdk-build orqali haqiqatan yig‘a olishi uchun kompyuterda UV4 konsol utilitasi bilan Keil MDK o‘rnatilgan bo‘lishi kerak. Rejalarni tekshirish uchun muallif o‘zining alohida logicprobe plaginini tavsiya qiladi; usiz o‘rnatilgan fact-check skilli ishlatiladi.

```text
/plugin marketplace add AmethystLuna/embedded-workbench
/plugin install embedded-workbench@embedded-workbench-dev
```

**Nega ishlaydi:** Ichida 8 ta skill va 4 ta agent bor. Skillar: embedded-workbench (boshlang‘ich, ish tartibini belgilaydi), debug-methodology (debug qoidalari va real holat tahlili), embedded-firmware-dev (FreeRTOS, uzilishlar, NVM, asinxron hayot sikli, LVGL tuzoqlari), keil-mdk-build (UV4, ARM Compiler 5 va 6, .map tahlili, yig‘ish diagnostikasi), c-cpp-dev (kod generatsiyasi, uslub, xotira joylashuvi, refaktoring), state-machine-design (holatlar, qayta urinishlar, taym-autlar, o‘tish shartlari), hardfault-triage (nosozlik registrlari, stek kadri, PC bo‘yicha manba kod qatorini topish), fact-check (rejadagi da’volarni kod bilan solishtirish). Agentlar: architecture-steward faqat o‘qish rejimida rejalashtiradi, design-reviewer loyiha hujjatlarini koddagi faktlar asosida tekshiradi, execution-worker kompilyatsiyani tekshirgan holda «reja — tasdiq — amalga oshirish» siklini olib boradi, quality-coordinator tayyor realizatsiyadagi xatolarni qidiradi. Muallifning so‘zlariga ko‘ra, material Cortex-M’dagi real loyihalar bilan ishlash bo‘yicha shaxsiy tajribadan yig‘ilgan.

**Izoh:** Uchinchi tomon plagini: Amethyst Luna, github.com/AmethystLuna/embedded-workbench. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. SessionStart hooki sessiya boshlanganda, kontekst tozalanganda va siqilganda avtomatik ishga tushadi: bash-skript mahalliy matn faylini o‘qiydi va kontekstga qisqa ko‘rsatma qo‘shadi (muallifning so‘zlariga ko‘ra, 400 tokenga yaqin): rejalashtirish rejimidan chiqishdan oldin rejani tekshirish va kontekst byudjeti haqida taxmin qilmaslik. Hook skriptida tarmoqqa murojaatlar yo‘q. Asosiy README xitoy tilida, inglizcha versiyasi README.en-US.md ham bor. Litsenziya MIT.
