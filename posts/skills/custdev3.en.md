---
title: "custdev3: testing an idea with three independent methods"
description: "Pain from forums, the real market from registries and tax data, the forecast from analyst reports — and bringing the three pictures together."
topic: "research"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# custdev3: testing an idea with three independent methods

> Machine translation from Russian. [Original](/skills/custdev3)

**Purpose:** To check that an idea solves a real pain and that the market exists and can be measured. Each method on its own lies in its own way: forums about market size, registries say nothing about pain, analyst reports inflate forecasts. Together they cover each other's weak spots.

**How to use:** Create .claude/skills/custdev3/SKILL.md. Call it with "/custdev3 idea: ...". Method 1 needs network access through Bash (curl).

```text
---
name: custdev3
description: Testing a startup idea with three methods — pain from forums, the market from registries and tax data, the forecast from analyst reports. Use at the idea validation stage, after a prototype.
---

# custdev3

Goal: (a) the pain is real, (b) the market is real and measurable, (c) analysts confirm the trend.

## Method 1 — forums: pain in people's own words
- Reddit via curl on .json: /r/{sub}/search.json?q=...&restrict_sr=1, /r/{sub}/top.json?t=year&limit=100, /r/{sub}/comments/{id}.json. About 60 requests per minute.
- If it doesn't respond — write out the search queries; the user will open them in a browser and send back the links.
- Hacker News: hn.algolia.com/api/v1/search?query=...&tags=story. GitHub issues, Stack Exchange API.
- Collect: verbatim quote + link + score/votes + date + pain cluster + willingness-to-pay signals.

## How to analyze the collected texts
1. KWIC: every mention of the keywords with context — how people actually talk about the problem.
2. Inductive coding of the first ~50 texts: themes grow out of the data.
3. Build a coding frame from the themes and tag the rest of the texts with it.
Don't start with a ready-made frame: you'll only find what you expected.

## Method 2 — registries and tax data: the market now
- USA: SEC EDGAR, IRS SOI, Census. EU: Eurostat, Companies House (UK). Russia: FNS, SPARK, Rusprofile. Uzbekistan: stat.uz. Kazakhstan: stat.gov.kz. World: OpenCorporates.
- Collect: number of active companies in the niche by OKVED/NAICS codes, registration and closure trends, revenue of public competitors, geography.
- Every number gets a link and the date it was pulled. Don't estimate by eye.

## Method 3 — analyst reports: the forecast
- Big 4 (KPMG, Deloitte, EY, PwC), McKinsey, BCG, Gartner, IDC, Forrester, CB Insights.
- Collect: TAM/SAM/SOM with year and source, CAGR, list of players.
- These are estimates, not facts. The Big 4 sell consulting, so their forecasts are optimistic. Trust a 2–3 year horizon, not 10. Cross-check with method 2.

## Synthesis
- Forums complain + registries show many companies + analysts see growth → confirmed.
- Forums complain, but there are few companies → the market is small → partial.
- Forums are silent, analysts are enthusiastic → possibly artificial hype.

## Rules
- Every claim comes with a verifiable link. No source — no claim. Don't make up links or numbers.
- One source is a weak signal.
- State the date of the data. Keep fact (method 2) separate from forecast (method 3).

## Output
Pain (30–60 quotes by cluster) · market now · forecast from 2–3 sources · verdict: confirmed / partial / no · risks: what may turn out to be false.
```

**Why it works:** The methods cover different gaps: forums show pain and willingness to pay, registries show the real market size, reports show the direction. A mismatch between them is information in itself, for example hype without pain. The "no source — no claim" rule cuts off the made-up numbers AI is prone to.

**When it doesn't work:** In B2B niches where buyers don't post on forums, method 1 comes back empty. That can't be read as "there's no pain" — you need interviews.
