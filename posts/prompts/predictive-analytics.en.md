---
title: "Predictive analytics: a forecast with an honest range"
description: "Builds a forecast with an interval and checks the key thing: whether the trend can be told apart from noise. Breaks the aggregate into components."
topic: "data"
tags: []
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Predictive analytics: a forecast with an honest range

> Machine translation from Russian. [Original](/prompts/predictive-analytics)

**Purpose:** Estimate where a metric is heading. A trend line on a chart looks like an answer, but if the forecast range is wider than the trend itself, the direction is unknown. The prompt forces you to check this and to break down the aggregate, where growth in one segment often masks a decline in another.

**How to use:** Paste the prompt and a time series: by month or week, ideally at least two years for seasonal data.

```text
Make a forecast for the series below.

1. Level, trend, seasonality: which of these are present in the data.
2. Forecast for [period] with a range (optimistic / likely / pessimistic) and an explanation of where the range comes from.
3. Noise check: compare the width of the range with the size of the trend over the whole history. If the range is wider, say so: "the direction is indistinguishable from flat".
4. Break down the metric: revenue = count × average order value; by segment or channel separately. Which components are moving and which are flat?
5. Assumptions: the forecast continues the past. List what must stay unchanged (prices, channels, competitors, discount policy), and which of these is already changing.
6. Inflation: if the series is in money over several years, estimate the real dynamics.
7. Signal: at what actual value next month should the forecast be revised.

Series: [data]
```

**Why it works:** Point 3 is the key one: a forecast whose interval covers the entire trend says "not enough data", not "the decline will continue". The breakdown in point 4 is often more important than the forecast itself, because the aggregate is the worst place to look for a trend. Point 7 turns the forecast into a monitoring tool: you can see when reality falls outside expectations.

**When it doesn't work:** When conditions change in a way the history never saw: a new competitor, a law, a price change. The model continues the past and structurally cannot see such events.
