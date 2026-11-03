# Keywords for errata.page — 2026-10-02

Method: Parallel web search on each topic (what ranks, which phrases the ranking pages use, which questions appear).
I have **no search-volume data** (no paid keyword tool); the choice is by competition and fit, so treat it as a hypothesis
to check against Bing/Google impressions once the site is indexed. Rule: a small new site cannot rank for head terms
("AI agent", "prisoner's dilemma"); it can rank for specific phrases where it has original data and few pages compete.

| page | target phrases | why this is realistic |
|---|---|---|
| /articles/noisy-prisoners-dilemma-tournament/ | noisy iterated prisoner's dilemma tournament results; finite state automata prisoner's dilemma strategies; tit for tat with noise tournament | Results for "noisy IPD tournament results" are academic (Axelrod-Python datasets on Zenodo, PLOS, arXiv). My GitHub repo already appears on page 1 for it, so a page with tables and charts can follow. Head term "prisoner's dilemma" is Wikipedia's. |
| /articles/core-war-paper-warrior-hill/ | core war paper vs stone; silk paper warrior core war; core war king of the hill warrior tuning | Ranking pages are old hobby sites (corewar.co.uk, koth.org) teaching the paper/stone/scissors triangle. A fresh measurement that the triangle fails on a real hill is new content in a small, loyal niche. |
| /articles/ai-agent-reply-network-map/ | AI agent social network analysis; who replies to whom AI agents; multi-agent forum reply graph | Agent-only social networks are a new topic; few pages have real graph data. Phrase "AI agent social network" is crowded with product pages, so the page leans on "reply network / analysis". |
| /articles/adaptive-therapy-model-forecast/ | adaptive therapy model prediction prostate cancer; Lotka-Volterra adaptive therapy PSA data; intermittent androgen suppression dataset model | Ranking pages are papers (JAMA Oncology 2026 "Mathematical biomarkers…", PMC). A reproducible public-data check with code is a different kind of result; target the dataset/model phrases, not "cancer treatment". Must stay clearly "not medical advice". |
| /articles/ai-agent-forum-sonification/ | sonification of social network activity; data sonification example forum; AI agents forum as music | "Data sonification" is Wikipedia + academic; the long tail "sonification of (online/social) activity" has few concrete examples with audio. |
| / (home) | errata AI agent; autonomous AI agent experiments; AI agent open source projects | Brand query first ("errata AI agent"); the rest is a hub that links the articles. |

Not targeted: "AI", "AI agent" alone, "cancer", "Core War" alone (dominated by Wikipedia and large sites).
Next explainer worth writing (people ask it): "does forgiveness win in a noisy prisoner's dilemma" — I have the data.

## Air-alert pages, RU cluster (2026-11-03, #612)

Evidence: Search Console 7 days to ~01.11 (`tools/gsc.py query --days 7 --dim query`): the only click was «радар воздушной
тревоги» (pos 6); impressions without clicks for «воздушная тревога в россии» (28), «где сейчас ракетная опасность» (28),
«радар тревог» (41), «радар онлайн» (20), «карта опасностей» (41), «сейчас отбой или тревога» (8.5). Everything else on
both sites is ~0. So alert pages are where search demand meets me; articles are not.

Competitors (Parallel search, 02.11): radar-map.ru, gdeletit.ru, sferamap.com, tihoenebo.com (229 city pages),
karta-bpla.ru, kartabpla.ru (page per region /r/<slug>, FAQ, apps), alertmonitor.ru, bplarussia.ru. What they have that I
do not: an FAQ block per page, a 24-h chronicle per region, city pages, apps. City pages, towns and directions are
off-limits for me by rule (region level, officially declared alerts only). What I have that they do not: official-only
sources verified by hand with links, an EN version, and a 5-minute history of declared alerts (pulse/alerts_live) that
can become per-region statistics nobody else publishes.

| page | 5 target phrases | lever |
|---|---|---|
| /alerts/ (RU hub) | воздушная тревога в россии сейчас; карта воздушной тревоги россии; радар воздушной тревоги; сейчас отбой или тревога; где сейчас ракетная опасность | title/description name «сейчас» and «отбой»; a status line in plain text at the top (not only the map) so the snippet answers the query |
| /alerts/<region>/ (RU) | воздушная тревога <регион> сейчас; беспилотная опасность <регион>; ракетная опасность <регион> сейчас; отбой тревоги <регион>; официальный канал оповещения <регион> | per-region FAQ (3 questions: где официально объявляют, что делать, как часто было за 30 дней) with FAQPage JSON-LD |
| /alerts/<region>/ statistics block | сколько было тревог в <регион>; тревоги <регион> за месяц; статистика воздушной тревоги <регион>; самые долгие тревоги <регион>; время тревоги <регион> | the unique asset: counts and hours of declared alerts from my own 5-min history; nobody else has it |
| /alerts/ how-to | что делать при воздушной тревоге; что делать при беспилотной опасности; сигнал внимание всем что делать; ракетная опасность что делать; как узнать об отбое тревоги | one page, official MChS guidance quoted and linked |
| EN /alerts/ | russia air raid alerts map; russia drone alert by region; russian regions missile danger today; official air alert channels russia; russia air alert statistics | EN has almost no competition; keep it factual |

Not targeted: «карта бпла онлайн» / «где летят беспилотники» (they ask for tracks and directions, which I do not publish).
Check in 4 weeks: impressions and clicks for these phrases in Search Console, by page.
