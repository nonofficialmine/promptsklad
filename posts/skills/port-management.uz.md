---
title: "Portlar: HTTP 200 hali sizning servisingiz javob berayotganini anglatmaydi"
description: "Mashinada boshqa loyihalar ishlayotgan va portlar band bo‘lganda lokal servislarni ishga tushirish va qayta ishga tushirish uchun skill."
topic: "dev"
tags: ["debugging", "automation"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Portlar: HTTP 200 hali sizning servisingiz javob berayotganini anglatmaydi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/skills/port-management)

**Nima uchun:** Bitta mashinada bir nechta loyiha ishlayotganda Claude muntazam ravishda uchta tuzoqqa tushadi: port band, qayta ishga tushirilgandan keyin eski versiya ishlayapti, `curl localhost:8000` 200 qaytaradi — lekin bu boshqa birovning servisi. Skill portni aslida kim tinglayotganini tekshirishga majbur qiladi.

**Qanday ishlatish:** .claude/skills/port-management/SKILL.md faylini loyihada yoki barcha loyihalar uchun ~/.claude/skills/ ichida yarating. Claude dev-server, backend yoki docker compose ishga tushirilayotganda skillni yoqadi.

```text
---
name: port-management
description: "Lokal servislarni ishga tushirish qoidalari. Frontend, backend, dev-server, docker compose har qanday ishga tushirilganda yoki qayta ishga tushirilganda ishlat: port bo‘shligini tekshir, qayta ishga tushirishda eski jarayonni o‘ldir, aynan sening servising javob berayotganiga ishonch hosil qil."
---

# Portlar

1. Ishga tushirishdan oldin portni tekshir:
   ss -tlnp | grep ":PORT " || lsof -iTCP:PORT -sTCP:LISTEN -P -n
   - begona jarayon band qilgan → keyingi bo‘sh portni ol va bu haqda xabar ber;
   - shu loyihaning eski jarayoni band qilgan → 2-band.

2. Qayta ishga tushirish = o‘ldirish + tekshirish + ishga tushirish. npm run dev ni qayta chaqirish eski jarayonni O‘LDIRMAYDI.
   PID=$(lsof -tiTCP:PORT -sTCP:LISTEN); [ -n "$PID" ] && kill $PID && sleep 1
   Agar hali tirik bo‘lsa — kill -9. Port bo‘shaganiga ishonch hosil qil va shundan keyingina ishga tushir.
   Uchta muvaffaqiyatsiz urinishdan keyin — to‘xta va foydalanuvchiga ayt.

3. HTTP 200 ≠ sening servising. Ishga tushirgandan keyin:
   - lsof / ps: jarayonning PID va ishchi papkasi loyihaga mos keladi;
   - backend: /health servis nomi va versiyasini qaytaradi;
   - frontend: <title> yoki <meta name="app-id"> mos keladi.

4. Port o‘zgardi → frontend to‘g‘ri backendga murojaat qilishi uchun .env va proksini yangila hamda foydalanuvchiga ayt: «backend :8003 da (8000–8002 band)». Portlarni kodda hardcode qilma.

5. Ildiz papkada PORTS.md yuritib bor: servis → asosiy port → zaxira portlar.

6. docker compose: portlar ${HOST_PORT:-8000}:8000 orqali; up dan oldin — down. down shu portlardagi begona jarayonlarga tegmaydi — ularni 1-band bo‘yicha tekshir.
```

**Nega ishlaydi:** «Eski buildni test qildim» xatosi eng qimmati: barcha tekshiruvlar o‘tadi, lekin boshqa kod tekshiriladi. PID va ishchi papkani solishtirish hamda /health dagi marker sizning jarayoningizni begonasidan ajratadi, aniq «o‘ldir va tekshir» esa npm run dev ni qayta chaqirish tuzog‘ini yopadi.

**Qachon ishlamaydi:** Agar servis konteyner ichida ishlasa, xostdagi lsof sizning ilovangizni emas, docker-proxy ni ko‘rsatadi. Bunday holda docker ps va /health orqali tekshiring.
