---
title: "falsegreen: nosozliklarni ushlamaydigan testlarni topish"
description: "«Soxta yashil» testlarni qidiradi — kod buzilgan bo‘lsa ham o‘tib ketadigan testlarni: tekshiruv bajarilmaydi, mok o‘zi bilan solishtiriladi, kutilgan qiymat o‘"
topic: "dev"
tags: ["tests","code-review"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# falsegreen: nosozliklarni ushlamaydigan testlarni topish

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/falsegreen)

**Mavzu:** Dasturlash · **Teglar:** testlar, kod-review

**Nima uchun:** «Soxta yashil» testlarni qidiradi — kod buzilgan bo‘lsa ham o‘tib ketadigan testlarni: tekshiruv bajarilmaydi, mok o‘zi bilan solishtiriladi, kutilgan qiymat o‘sha kodning o‘zidan olingan. Python, TypeScript, JavaScript yoki Robot Framework’da test yozadiganlar uchun.

**Qanday ishlatish:** Claude Code’da /plugin marketplace add vinicq/falsegreen-skill va /plugin install falsegreen-skill@falsegreen buyruqlarini bajaring. Keyin skillni /falsegreen-skill:falsegreen-skill buyrug‘i bilan chaqiring yoki shunchaki Claude’dan test fayli yoki papkasini soxta ijobiy testlarga tekshirishni so‘rang: skill so‘rov mazmuniga qarab ishga tushadi va fayllarni o‘zi topadi. pytest va unittest, Jest, Vitest, Mocha, Jasmine, Testing Library va Robot Framework qo‘llab-quvvatlanadi. Teskarisini ham so‘rash mumkin — funksiya uchun spetsifikatsiya bo‘yicha test yozish: skill kutilgan qiymatlarni joriy koddan emas, spetsifikatsiyadan oladi. Katta Python loyihalarida avval statik skanerni ishga tushirib (pip install falsegreen, keyin falsegreen tests/), uning natijasini skillga berish mumkin — shunday tezroq. Alohida API kaliti Claude Code’dagi skillga emas, faqat npx falsegreen-skill konsol utilitasiga kerak.

```text
/plugin marketplace add vinicq/falsegreen-skill
/plugin install falsegreen-skill@falsegreen

/falsegreen-skill:falsegreen-skill
```

**Nega ishlaydi:** Bu bitta falsegreen-skill skilli, hooklar va MCP-serverlarsiz. U testni matn sifatida o‘qiydi va J1–J6 oltita savolni beradi: tekshiruv umuman bajariladimi, kutilgan qiymat mustaqil manbadan olinganmi, uning moki emas, haqiqiy kod test qilinyaptimi, tekshiruv yetarlicha qat’iymi, test realizatsiyaning ichki tuzilishiga bog‘lanib qolmaganmi, u boshqa testlarsiz o‘zi alohida o‘tadimi. Har bir topilma katalogdan kod (125 ga yaqin shablon: Python uchun C seriyasi, TypeScript va JavaScript uchun JS, Robot Framework uchun R va mazmuniy holatlar uchun S), HIGH yoki LOW ishonch darajasi, qator raqami, tushuntirish va tuzatish bo‘yicha maslahat oladi. Muallif aniqlikni to‘liqlikdan ustun qo‘yadi: joriy xatti-harakatni ataylab qayd etadigan testlar kabi bahsli holatlar belgilanmaydi. Skill ruff kabi linterlar va mutatsion testlash orasidagi bo‘shliqni to‘ldiradi: linter tushunmaydigan narsani ko‘radi va kodni ishga tushirishni talab qilmaydi.

**Izoh:** Uchinchi tomon plagini: Vinicius Queiroz, github.com/vinicq/falsegreen-skill. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. Claude Code’da bu faqat agent uchun ko‘rsatmalar: PRIVACY.md’ga ko‘ra, skill o‘zi tarmoqqa hech narsa yubormaydi, telemetriya va hooklar yo‘q. O‘sha repozitoriyda alohida npx falsegreen-skill konsol utilitasi bor (Node 18+ kerak): u ko‘rsatilgan fayllar mazmunini sizning API kalitingiz bilan tanlangan model provayderiga yuboradi, uning fix buyrug‘i esa pytest’ni ishga tushiradi va model yaratgan testni sizning kompyuteringizda bajaradi. Bu plaginga taalluqli emas, lekin utilitani o‘rnatishga qaror qilsangiz, buni hisobga oling. Litsenziya MIT.
