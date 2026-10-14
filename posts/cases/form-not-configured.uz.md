---
title: "Forma 500 qaytardi, postlar esa yetkazildi: sinov yuborish va aylanma yo‘l"
description: "Server nosozligini 25 ta bir xil xatoga aylantirmaslik: bitta sinov yuborish, taxmin o‘rniga kodni o‘qish va teng qiymatli aylanma yo‘l."
topic: "dev"
tags: ["debugging", "ci-cd", "git"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Forma 500 qaytardi, postlar esa yetkazildi: sinov yuborish va aylanma yo‘l

> Rus tilidan mashina tarjimasi. [Asl nusxa](/cases/form-not-configured)

**Nima uchun:** Ommaviy yuborish o‘zingiz tuzata olmaydigan server nosozligiga duch kelganda qanday harakat qilishni tahlil qilish.

Vazifa: agent [Playwright MCP](/mcp/playwright-mcp) orqali saytning ochiq formasi bilan 25 ta post yuboradi. Serverda har bir yuborish repozitoriyga Pull Request’ga aylanadi.

Nima bo‘ldi: forma `500 {"error":"not_configured"}` qaytardi. Maydonlar to‘g‘ri to‘ldirilgan, kapcha yo‘q, antibot kutish vaqti saqlangan.

Nima qildik:
1. **Sinov yuborish.** Agentga qoida berildi: avval bitta post, server xatosida — to‘xtash. 25 ta bir xil xato va serverga yuklama o‘rniga bittasini oldik.
2. **Taxmin o‘rniga kod** — [ts-loop](/skills/ts-loop) dagi kabi tamoyil: avval asosiy sabab, keyin tuzatish. Avval taxmin qildik: kapcha kaliti yo‘qmi? token yo‘qmi? Keyin server kodini ochdik. Dastlab `not_configured` ikki sirdan biri berilmagan bo‘lsa ishlardi — Cloudflare Turnstile kapcha kaliti yoki `GITHUB_TOKEN`. Kapcha butunlay olib tashlandi va bitta shart qoldi — bo‘sh `GITHUB_TOKEN`. Bittasidan boshqa barcha versiyalar bir daqiqada tushib qoldi.
3. **Maslahatli xato.** Server javobiga yetishmayotgan o‘zgaruvchi nomi qo‘shildi: `{"error":"not_configured","missing":["GITHUB_TOKEN"]}`. Keyingi sinov token aynan Production muhitida yo‘qligini darhol ko‘rsatdi.
4. **Teng qiymatli aylanma yo‘l.** Tokenni Vercel’ga faqat egasi qo‘shadi. Lekin forma oxir-oqibat `posts/` ga PR qiladi — demak, xuddi shu natijaga git orqali erishish mumkin: 25 ta faylli branch, tekshiruvlar (format, maydon cheklovlari, testlar, build), bitta PR. Moderatsiya saqlandi, foydalanuvchi uchun natija bir xil.

O‘zgaruvchi nega olinmadi (Vercel’dagi keng tarqalgan sabablar):
- faqat Preview yoki Development uchun qo‘shilgan, Production uchun emas;
- build’dan keyin redeploy’siz qo‘shilgan: env faqat yangi deploy’larga qo‘llaniladi.

**Xulosalar:** Ommaviy operatsiyada birinchi qadam — to‘xtash sharti bilan bitta sinov. Server xatosini gipotezalarni saralashdan ko‘ra kodni o‘qib tushunish tezroq. Xato nima yetishmayotganini aytishi kerak: bu «ishlamayapti» ni aniq harakatga aylantiradi. Agar to‘siq egasida bo‘lsa, kutmasdan, xuddi shu natijani beradigan yo‘lni izlang.

Bog‘liq materiallar:
- [QA uchun Playwright MCP: qat’iy FULLHD va skrinshotlar uchun papka](/mcp/playwright-qa-fullhd)
- [Vercel ikkinchi muallifning commitlarini deploy qilmadi](/cases/vercel-hobby-private-repo)
- [ts-loop: bag yo‘qligi isbotlanmaguncha u yopilmaydi](/skills/ts-loop)
