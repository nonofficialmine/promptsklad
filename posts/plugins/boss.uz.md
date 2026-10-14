---
title: "Boss: to‘qqiz agent funksiyani g‘oyadan deploygacha olib boradi"
description: "Claude Code vazifani kichik jamoa kabi olib borishini istaganlar uchun: talablar, arxitektura, kod, testlar va deploydan oldingi tekshiruvlar — hujjatlar va jurnal bilan"
topic: "dev"
tags: ["automation","code-review","tests","ci-cd"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Boss: to‘qqiz agent funksiyani g‘oyadan deploygacha olib boradi

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/boss)

**Mavzu:** Dasturlash · **Teglar:** avtomatlashtirish, kod-review, testlar, CI/CD

**Nima uchun:** Claude Code vazifani kichik jamoa kabi olib borishini istaganlar uchun: talablar, arxitektura, kod, testlar va deploydan oldingi tekshiruvlar — hujjatlar va har bir qadam jurnali bilan, to‘g‘ridan-to‘g‘ri loyiha papkasida.

**Qanday ishlatish:** Claude Code’da ikkita o‘rnatish buyrug‘ini kiriting. Eng xavfsiz birinchi ishga tushirish — mavjud loyihada /boss:review: u faqat kodni o‘qiydi, natijasi — .boss papkasidagi tech-review.md hisoboti. Testlar bilan tekshirish va hisobot — /boss:qa. To‘liq konveyer — /boss va vazifa tavsifi; --roles core bayrog‘i faqat PM, arxitektor, dasturchi va QA’ni qoldiradi, --skip-deploy bayrog‘i esa ishni deploydan oldin to‘xtatadi. Shuningdek /boss:plan (koddan oldin PRD va arxitektura), /boss:ship (yig‘ish va deploydan oldingi tekshiruvlar), /boss:extend (o‘z agentlaringiz va tekshiruvlaringiz) va /boss:upgrade (yangilash) bor. Node.js 22.18 yoki undan yangisi kerak — plaginning ichki utilitasi shunda ishlaydi; Node’siz konveyer soddalashtirilgan rejimda, faqat Markdown fayllar bilan ishlaydi. Ishning oraliq snapshotlari uchun git kerak.

```text
/plugin marketplace add echoVic/boss-skill
/plugin install boss@boss-skill

/boss:review
```

**Nega ishlaydi:** Ichida boss skilli va to‘qqiz agent roli bor: boss-pm, boss-architect, boss-ui-designer, boss-tech-lead, boss-scrum-master, boss-frontend, boss-backend, boss-qa va boss-devops. Ish to‘rt bosqichda boradi: talablar va arxitektura, vazifalarga bo‘lish, testlar bilan ishlab chiqish, deploy va yakuniy hisobot. Bosqichlar orasida tekshiruvlar turadi: Gate 0 (tiplar, linter, yig‘ish), Gate 1 (test natijalari va jiddiy xatolar yo‘qligi), Gate 2 (sahifalar va API tezligi, qo‘llash mumkin bo‘lgan joyda). Natijada hosil bo‘lgan hamma narsa — PRD, arxitektura, vazifalar ro‘yxati, QA va deploy hisobotlari — .boss/funksiya-nomi/ papkasida turadi, hodisalar jurnali esa --continue-from orqali kerakli bosqichdan davom ettirish imkonini beradi. Hooklar agentga xizmat holat faylini to‘g‘ridan-to‘g‘ri tahrirlashga yo‘l qo‘ymaydi va rm -rf, git push --force yoki DROP TABLE kabi xavfli buyruqlarni ushlab qoladi.

**Izoh:** Uchinchi tomon plagini: echoVic, github.com/echoVic/boss-skill. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. Plagin o‘zi ishga tushadigan hooklarni o‘rnatadi: sessiya boshlanishi va tugashida, fayllarni yozish va terminal buyruqlaridan oldin, subagentlar ishlayotganda; ulardan biri agent ishidan keyin git orqali avtomatik ravishda oraliq snapshot yaratadi (stash, commit yoki branch). Hooklarni BOSS_HOOK_PROFILE=minimal yoki BOSS_DISABLED_HOOKS o‘zgaruvchilari bilan yumshatish mumkin. Muallifning so‘zlariga ko‘ra, plagin tarmoqqa hech narsa yubormaydi; istisno — 127.0.0.1 manzilidagi lokal dizaynni oldindan ko‘rish serveri, u faqat qo‘lda ishga tushiriladi. E’tibor bering: skill ko‘rsatmasiga ko‘ra .boss papkasidagi hujjatlar sukut bo‘yicha xitoy tilida yoziladi. Litsenziya — MIT.
