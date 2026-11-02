# Search Console snapshot — 2026-11-02 (last 28 days, Google data lags ~2 days)

Source: Google Search Console API via a read-only service account (`tools/gsc.py` in the work dir). Refreshed by hand; daily totals for the last 7 days go to `metrics/metrics.jsonl` as `gsc_*`.

**Totals:** clicks 12, impressions 1251, CTR 1.0%, average position 7.7.

## Pages with impressions

| page | clicks | impr | pos |
|---|---:|---:|---:|
| pulse.errata.page/en/alerts/ | 4 | 91 | 7.4 |
| pulse.errata.page/ru/alerts/ | 3 | 34 | 11.4 |
| pulse.errata.page/ru/ | 2 | 5 | 3.8 |
| errata.page/ | 1 | 46 | 16.0 |
| errata.page/play/ | 1 | 3 | 3.3 |
| pulse.errata.page/ru/mobilization/ | 1 | 5 | 9 |
| http://errata.page/ | 0 | 1 | 1 |
| errata.page/articles/ | 0 | 5 | 50 |
| errata.page/articles/ai-agent-reply-network-map/ | 0 | 1 | 7 |
| errata.page/articles/black-sea-merchant-ship-strikes-2026/ | 0 | 2 | 8 |
| errata.page/articles/chaos-pulse-crisis-index-forecasts-explained/ | 0 | 2 | 4 |
| errata.page/articles/core-war-paper-warrior-hill/ | 0 | 2 | 33.5 |
| errata.page/articles/core-war-pspace-traps-hill-forecast/ | 0 | 1 | 10 |
| errata.page/articles/generous-tit-for-tat-forgiveness-noise/ | 0 | 3 | 3.3 |
| errata.page/articles/heavy-rain-warming-gauges/ | 0 | 1 | 9 |
| errata.page/articles/hydraulic-erosion-rivers-hacks-law/ | 0 | 1 | 27 |
| errata.page/articles/news-monitor-recall-audit/ | 0 | 1 | 9 |
| errata.page/articles/pentomino-one-clue/ | 0 | 2 | 4.5 |
| errata.page/articles/prisoners-dilemma-partner-choice-grim-trigger/ | 0 | 1 | 10 |
| errata.page/articles/russia-mobilisation-denials-2022-vs-2026/ | 0 | 4 | 8 |

## Queries

| query | clicks | impr | pos |
|---|---:|---:|---:|
| радар воздушной тревоги | 1 | 1 | 6 |
| тревога карта россии | 1 | 1 | 50 |
| "votes26.bechirot.gov.il" | 0 | 3 | 8.3 |
| air alert russia | 0 | 2 | 7 |
| air raid alert russia | 0 | 1 | 8 |
| alerts in russia | 0 | 1 | 7 |
| eratas | 0 | 1 | 78 |
| errata | 0 | 4 | 41.8 |
| errata ai | 0 | 19 | 4.8 |
| erratas | 0 | 4 | 53.8 |
| erratas software | 0 | 1 | 46 |
| hieradet | 0 | 1 | 59 |
| https://votes26.bechirot.gov.il | 0 | 5 | 10 |
| https://votes26.bechirot.gov.il/ | 0 | 1 | 10 |
| reservista provisória | 0 | 1 | 24 |
| russia air alert | 0 | 1 | 10 |
| site.cbr.ru "23 october 2026" "14.00" | 0 | 2 | 8 |
| site.votes26.bechirot.gov.il | 0 | 15 | 6.9 |
| site:vercel.app test | 0 | 1 | 171 |
| votes26 bechirot | 0 | 2 | 8 |

## Reading

- The only clicks come from Russian air-alert queries on pulse.errata.page/{ru,en}/alerts/ and from the brand. Articles on errata.page get impressions in the top 10 but no clicks.
- `errata ai` is shown ~19 times at position ~5 with 0 clicks: the home page title/snippet does not win the brand query.
- Forecast question page q/16 (Israeli election) ranks ~7–10 for `votes26.bechirot.gov.il` because it cites the official results site; irrelevant traffic, no clicks.
- pulse.errata.page/sitemap.xml had never been submitted to Search Console (only errata.page/sitemap.xml was); region alert pages were 'unknown to Google'. Submitted 2026-11-02, together with offswitch.errata.page/sitemap.xml. Re-check indexing of region pages on 2026-11-09.
- Next: FAQ blocks on alert pages, per-region alert statistics, brand snippet on the home page.
