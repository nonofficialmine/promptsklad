---
title: "custdev3: g‘oyani uchta mustaqil usul bilan tekshirish"
description: "Forumlardan og‘riq, reyestrlar va soliq ma’lumotlaridan real bozor, tahlilchilar hisobotlaridan prognoz — va uchta manzarani birlashtirish."
topic: "research"
tags: []
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# custdev3: g‘oyani uchta mustaqil usul bilan tekshirish

> Rus tilidan mashina tarjimasi. [Asl nusxa](/skills/custdev3)

**Nima uchun:** G‘oya real og‘riqni hal qilishini, bozor esa mavjud va o‘lchab bo‘ladigan ekanini tekshirish. Har bir usul alohida olinganda o‘zicha aldaydi: forumlar bozor hajmi haqida, reyestrlar og‘riq haqida jim, tahlilchilar hisobotlari prognozlarni oshirib ko‘rsatadi. Birgalikda ular bir-birining zaif joylarini yopadi.

**Qanday ishlatish:** .claude/skills/custdev3/SKILL.md faylini yarating. Chaqirish: «/custdev3 g‘oya: ...». 1-usul uchun Bash (curl) orqali tarmoqqa kirish kerak.

```text
---
name: custdev3
description: Startap g‘oyasini uchta usul bilan tekshirish — forumlardan og‘riq, reyestrlar va soliq ma’lumotlaridan bozor, tahlilchilar hisobotlaridan prognoz. G‘oyani validatsiya qilish bosqichida, prototipdan keyin ishlat.
---

# custdev3

Maqsad: (a) og‘riq real, (b) bozor real va o‘lchab bo‘ladigan, (c) tahlilchilar trendni tasdiqlaydi.

## 1-usul — forumlar: so‘zma-so‘z og‘riq
- Reddit, curl orqali .json ga: /r/{sub}/search.json?q=...&restrict_sr=1, /r/{sub}/top.json?t=year&limit=100, /r/{sub}/comments/{id}.json. Daqiqasiga taxminan 60 ta so‘rov.
- Javob bermasa — qidiruv so‘rovlarini yozib chiq, foydalanuvchi ularni brauzerda ochib, havolalarni qaytaradi.
- Hacker News: hn.algolia.com/api/v1/search?query=...&tags=story. GitHub issues, Stack Exchange API.
- Yig‘: so‘zma-so‘z iqtibos + havola + reyting/ovozlar + sana + og‘riq klasteri + to‘lashga tayyorlik signallari.

## Yig‘ilgan matnlarni qanday tahlil qilish
1. KWIC: kalit so‘zlarning kontekst bilan barcha uchrashlari — odamlar muammo haqida aslida qanday gapiradi.
2. Dastlabki ~50 ta matnni induktiv kodlash: mavzular ma’lumotlarning o‘zidan o‘sib chiqadi.
3. Mavzulardan kodlash ramkasini tuz va qolgan matnlarni u bo‘yicha belgila.
Tayyor ramkadan boshlama: faqat kutganingni topasan.

## 2-usul — reyestrlar va soliq ma’lumotlari: hozirgi bozor
- AQSH: SEC EDGAR, IRS SOI, Census. YI: Eurostat, Companies House (UK). Rossiya: FNS, SPARK, Rusprofile. O‘zbekiston: stat.uz. Qozog‘iston: stat.gov.kz. Dunyo: OpenCorporates.
- Yig‘: OKVED/NAICS kodlari bo‘yicha nishadagi faol kompaniyalar soni, ro‘yxatdan o‘tish va yopilishlar dinamikasi, ommaviy raqobatchilar tushumi, geografiya.
- Har bir raqam — havola va yuklab olingan sana bilan. Chamalab baholama.

## 3-usul — tahlilchilar hisobotlari: prognoz
- Big 4 (KPMG, Deloitte, EY, PwC), McKinsey, BCG, Gartner, IDC, Forrester, CB Insights.
- Yig‘: yili va manbasi ko‘rsatilgan TAM/SAM/SOM, CAGR, o‘yinchilar ro‘yxati.
- Bular faktlar emas, baholar. Big 4 konsalting sotadi, ularning prognozlari optimistik. 10 yillik emas, 2–3 yillik gorizontga ishon. 2-usul bilan solishtir.

## Birlashtirish
- Forumlar shikoyat qiladi + reyestrlar ko‘p kompaniyani ko‘rsatadi + tahlilchilar o‘sishni ko‘radi → tasdiqlandi.
- Forumlar shikoyat qiladi, lekin kompaniyalar kam → bozor kichik → qisman.
- Forumlar jim, tahlilchilar maqtaydi → ehtimol, sun’iy xayp.

## Qoidalar
- Har bir da’vo — tekshirsa bo‘ladigan havola bilan. Manba yo‘q — da’vo yo‘q. Havola va raqamlarni o‘ylab topma.
- Bitta manba — zaif signal.
- Ma’lumotlar sanasini ko‘rsat. Faktni (2-usul) prognozdan (3-usul) ajrat.

## Natija
Og‘riq (klasterlar bo‘yicha 30–60 ta iqtibos) · hozirgi bozor · 2–3 manbadan prognoz · xulosa: tasdiqlandi / qisman / yo‘q · xavflar: nima noto‘g‘ri bo‘lib chiqishi mumkin.
```

**Nega ishlaydi:** Usullar turli bo‘shliqlarni yopadi: forumlar og‘riq va to‘lashga tayyorlikni, reyestrlar bozorning real hajmini, hisobotlar esa yo‘nalishni ko‘rsatadi. Ular orasidagi nomuvofiqlikning o‘zi ham ma’lumot, masalan, og‘riqsiz xayp. «Manba yo‘q — da’vo yo‘q» qoidasi sun’iy intellekt o‘ylab topishga moyil bo‘lgan raqamlarni kesib tashlaydi.

**Qachon ishlamaydi:** Xaridorlar forumlarda yozmaydigan B2B nishalarda 1-usul bo‘sh natija beradi. Buni «og‘riq yo‘q» deb o‘qib bo‘lmaydi — intervyular kerak.
