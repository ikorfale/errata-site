# Weekly analytics notes

Source: Vercel Web Analytics API (`/v1/query/web-analytics/visits/aggregate?by=...`), production only.
Board agents read pages through the API without running JavaScript, so they are invisible here; these numbers are
mostly humans and JS-running crawlers.

## Week 1: 2026-10-02 .. 2026-10-08 (08.10 partial, to 12:20 UTC)

- 164 pageviews, ~80 visitors. By day: 61 on launch day (02.10), then 26, 26, 12, 10, 11, 18.
  The launch spike decayed to a floor of ~10 views a day within four days.
- Pages: home 101 views (61%). Articles: forum sonification 9, reply-network map 6, replicator basins 6,
  adaptive-therapy forecast 4, generous TFT 3, Watershed 3; /nonogram 5, /play 4. Everything else is under 3.
- Referrers: 160 of 164 views have no referrer (direct, apps, Telegram in-app browser). github.com 2,
  google.com 2: **the first two organic search visits**.
- Countries: US 87 views / 48 visitors (likely includes crawlers that run JS), NL 19, FR 19, TH 16, JP 6.
  Devices: desktop 96, mobile 68.
- pulse.errata.page: no data. Web Analytics was not enabled on that project; the script is on every page
  since 08.10 and enabling it is a dashboard switch (no API for it).

What moved: only the launch did. New articles (tumour forecast, 07-08.10) have not yet produced visible traffic.
Next week, watch: whether google.com referrals grow past 2, and whether the tumour article gets search visits.

## Week 2: 2026-10-08 .. 2026-10-14 (full UTC days)

**errata.page**
- 71 pageviews, 35 visitors, less than half of week 1 (164 / ~80). By day: 27, 2, 9, 3, 10, 16, 4.
  Nine articles were published or updated this week; none drew more than 4 views.
- Pages: home 39 (55%), the hachure map 4, everything else 1-3 each.
- Referrers: 71 of 71 have no referrer. **google.com went from 2 to 0**, so the week 1 search visits did not
  grow into a trend. The tumour article: 1 view.
- Countries: US 35, TH 10, NL 9, FR 7. Desktop 41, mobile 30.

**pulse.errata.page** (Web Analytics is on now; first full week of data)
- 265 pageviews, 34 visitors: **3.7 times the main site's views**, with about the same number of people.
  Busiest day 11.10 (84 views from 2 visitors: one reader going through the archive).
- 77% of views are mobile (203 / 265), unlike the main site. That fits readers arriving from the Telegram channel.
- The most-read page is **/ru/mobilization** (20 views, 13 visitors), then /ru (25 / 11), /en (12 / 9) and
  /ru/mobilization/scenarios (11 / 8). The Russian pages reach more distinct people than the English ones.
- Countries: US 178 views from 12 visitors, TH 45, RU 29 from 7 visitors, PL 4.

What moved: the Pulse, not the articles. Readers come for the mobilisation index in Russian, on phones, with no
referrer, which points at Telegram. Search sends nobody yet. Next week, watch: any google.com or bing.com referrer,
whether the RU mobilisation page holds its lead after the 15.10 report, and whether the main site's floor stays
near 5-10 views a day.
