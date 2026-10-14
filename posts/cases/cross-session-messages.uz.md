---
title: "Ikki Claude Code sessiyasi bitta vazifani hal qildi: yozishmada nima ishladi"
description: "Bir sessiya postlar tayyorladi, ikkinchisi saytni tuzatdi. Xabarlar turli ruxsat rejimlari sababli ushlab qolindi, ish esa ziddiyatsiz taqsimlandi."
topic: "dev"
tags: ["automation", "git"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Ikki Claude Code sessiyasi bitta vazifani hal qildi: yozishmada nima ishladi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/cases/cross-session-messages)

**Nima uchun:** Bitta kompyuterdagi ikkita parallel Claude Code sessiyasini qanday muvofiqlashtirish va bunday muvofiqlashtirish nimada qoqilishini tushunish.

Vazifa: A sessiyasi sayt uchun postlar tayyorladi, B sessiyasi xuddi shu saytning kodini tuzatdi. Sessiyalar sessiyalar o‘rtasida xabar yuborishning ichki funksiyasi orqali muloqot qildi.

Nima bo‘ldi va nima ishladi:
1. **Xabar «yuborilgan», lekin o‘qilmagan.** A’ning B’ga javobi ushlab qolindi: sessiyalarning ruxsat rejimlari turlicha edi va B foydalanuvchi tasdig‘ini kutardi. Yuborish muvaffaqiyatli o‘tdi, lekin B’dagi Claude xabarni ko‘rmadi. A sessiyasi avval foydalanuvchiga «javob berdim» dedi va buni tuzatishga to‘g‘ri keldi. Qoida: muvaffaqiyatli yuborish ≠ yetkazish; ushlab qolinganlik haqidagi bildirishnomani foydalanuvchiga yetkazish va qayta yubormaslik kerak.
2. **Fayllarni bo‘lish.** B o‘zi o‘zgartirayotgan fayllarni oldindan sanab berdi (API, forma komponenti, konfig, testlar) va o‘zi xabar bermaguncha ularga tegmaslikni so‘radi. Ziddiyatlar bo‘lmadi.
3. **«Buni siz o‘zgartirdingizmi?» savoli.** B notanish commitlarni ko‘rdi va ularni A qilmaganmi deb so‘radi. Qisqa to‘g‘ridan-to‘g‘ri javob «yo‘q, repozitoriyga tegmadik» shubhani darhol olib tashladi.
4. **Yuborishdan oldin formatni tekshirish.** B A’ning qoralamalarini o‘qib chiqdi va forma bilan ikkita nomuvofiqlik topdi: aslida mavzu bo‘lgan teg va majburiy maydonning yo‘qligi. Server rad etgandan keyin emas, yuborishdan oldin tuzatildi.
5. **Qarorlar — foydalanuvchida.** Bir paytda B «hozircha yubormang» deb so‘radi, holbuki foydalanuvchi A sessiyasida usulni allaqachon aniq tanlagan edi. A jim bo‘ysunmadi ham, bahslashmadi ham: B’ga foydalanuvchining qarori haqida aytdi va e’tirozni unga yetkazishni taklif qildi.
6. **Imkoniyatga ko‘ra mas’uliyat.** To‘siq hostingga kirishni talab qilardi, bu esa hech bir sessiyada yo‘q edi. B’da repozitoriyga yozish huquqi bor edi — postlarni branch va PR orqali u yetkazdi. A natijani GitHub API orqali tekshirdi: commitlar va fayllar soni. [Topilmalar verifikatori](/agents/finding-verifier) dagi kabi tamoyil: hisobotga tekshirmasdan ishonmaslik.

**Xulosalar:** Sessiyalar umumiy xotirasi yo‘q ikki xodim kabi ishlaydi: har bir muhim bilimni matn orqali yetkazish kerak. Fayllarni aniq bo‘lish, boshqa tomon natijasini so‘zga ishonmasdan tekshirish va bitta qoida yordam beradi — qo‘shni sessiya so‘rasa ham, qarorlar foydalanuvchida qoladi.

Bog‘liq materiallar:
- [Ishga o‘xshagan agent shovqini va undan qanday qutulish mumkin](/cases/agent-noise)
- [Forma 500 qaytardi, postlar esa yetkazildi: sinov yuborish va aylanma yo‘l](/cases/form-not-configured)
- [Sun’iy intellekt bilan chatlardagi g‘oyalar yo‘qolardi: nega bilimlar grafi emas](/cases/knowledge-graph-vs-notes)
