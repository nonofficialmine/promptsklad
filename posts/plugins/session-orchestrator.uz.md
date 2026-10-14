---
title: "Session Orchestrator: reja, agentlar to‘lqinlari va commitdan oldin tekshiruv"
description: "Claude Code bilan uzun sessiyalar olib boradigan va tartib istaganlar uchun: avval kelishilgan reja, keyin parallel agentlar to‘lqinlari bilan ish va har bir to‘lqindan keyin testlar"
topic: "dev"
tags: ["automation","tests","git"]
models: []
lang: "uz"
translated_from: "ru"
machine_translation: true
---

# Session Orchestrator: reja, agentlar to‘lqinlari va commitdan oldin tekshiruv

> Rus tilidan mashina tarjimasi. [Asl nusxa](/plugins/session-orchestrator)

**Mavzu:** Dasturlash · **Teglar:** avtomatlashtirish, testlar, git

**Nima uchun:** Claude Code bilan uzun sessiyalar olib boradigan va tartib istaganlar uchun: avval kelishilgan reja, keyin parallel agentlar to‘lqinlari bilan ish va har bir to‘lqindan keyin testlar, oxirida reja bilan solishtirish, commit va qolgan ishlar uchun vazifalar.

**Qanday ishlatish:** Node.js 24 yoki undan yangisi va git repozitoriy kerak. Claude Code’da ikkita o‘rnatish buyrug‘ini kiriting. Keyin bir marta /bootstrap buyrug‘ini bajaring: u .orchestrator xizmat papkasini yaratadi va CLAUDE.md fayliga Session Config blokini qo‘shib yozadi — undagi testlar, tiplarni tekshirish va linter buyruqlarini (test-command, typecheck-command, lint-command) tekshiring. Savollarsiz qisqa yo‘l: /bootstrap --fast --no-interview. Keyin ish sikli: /session feature — agent repozitoriy va vazifalarni o‘qiydi va ish hajmini taklif qiladi, siz uni tuzatasiz; /go — har bir to‘lqindan keyin testlar bilan to‘lqinlab bajarish; /close — solishtirish, commit va qolgan ishlar uchun vazifalar. Vazifalar ochish uchun tizimga kirilgan gh (GitHub) yoki glab (GitLab) kerak. Muallif plaginni Windows’da test qilmaydi: hooklarga Git Bash yoki WSL kerak. Ixtiyoriy: /plugin install so-hud@kanevry sessiya holati qatorini qo‘shadi.

```text
/plugin marketplace add Kanevry/session-orchestrator
/plugin install session-orchestrator@kanevry

/bootstrap
```

**Nega ishlaydi:** Muallifning hisobiga ko‘ra, ichida 51 ta skill, 30 ta slash-buyruq, 14 ta subagent va 10 turdagi hodisalar uchun hooklar, shuningdek faqat o‘qish uchun ikkita vositasi bor MCP server mavjud. Asosiysi — /session, /go, /close sikli. To‘lqindagi har bir agentga u o‘zgartirishi mumkin bo‘lgan fayllar ro‘yxati beriladi, bir-biri bilan kesishadigan ro‘yxatlar esa oldindan rad etiladi, shuning uchun agentlar bir-birining ishini ustidan yozib yubormaydi. Qo‘riqchi hook 12 ta xavfli buyruq shablonini bloklaydi (qattiq reset, rm -rf, force-push, DROP TABLE va boshqalar). Progress .claude/STATE.md fayliga yoziladi, shuning uchun nosozlikdan keyin navbatdagi /session oxirgi tugallangan to‘lqindan davom ettirishni taklif qiladi. Qo‘shimcha buyruqlar ham bor: xom g‘oyalar uchun /plan, /brainstorm va /grill, xato sababini topish uchun /debug, testlar uchun /test va /test-audit, repozitoriyni baholash uchun /repo-audit, o‘tgan sessiyalardan xulosa chiqarish uchun /evolve, sessiyalar zanjiri uchun /autopilot.

**Izoh:** Uchinchi tomon plagini: Bernhard Goetzendorfer, github.com/Kanevry/session-orchestrator. promptsklad uni tekshirmagan — o‘rnatishdan oldin repozitoriyni ko‘rib chiqing. Hooklar o‘zi ishga tushadi: sessiya boshlanishi va tugashida, vositalar chaqirilishidan oldin va keyin, subagentlar ishga tushganda va to‘xtaganda. /close o‘zi commit qiladi va gh yoki glab orqali sizning GitHub yoki GitLab’ingizda vazifalar ochadi. Sessiya boshlanganda plagin yangilanishlarni tekshirish uchun npm reyestriga anonim so‘rov yuboradi; bu SO_DISABLE_UPDATE_CHECK=1 yoki DO_NOT_TRACK=1 o‘zgaruvchisi bilan o‘chiriladi. Anonim telemetriya bor, lekin siz aniq rozilik bermaguningizcha o‘chirilgan. Xizmat fayllari (.orchestrator, .claude/STATE.md) repozitoriyga yoziladi va plagin o‘chirilgandan keyin ham qoladi. Litsenziya — MIT.
