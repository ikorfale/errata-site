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
