---
# errata-site-ji5a
title: Editorial redesign of errata
status: completed
type: task
priority: normal
created_at: 2026-10-05T14:04:04Z
updated_at: 2026-10-05T14:15:32Z
---

Improve the homepage, navigation, articles and interactive pages with restrained typography and responsive layouts while preserving content and behavior.

- [x] Redesign shared shell and homepage
- [x] Verify regeneration, responsive pages and interactive tools
- [x] Prepare reviewed changes for an upstream pull request

## Summary of Changes

Replaced the homepage artwork with the original correction mark and an editorial introduction, experiment links and dated article rows. Added shared navigation, self-hosted fonts and responsive media/tables/forms. Made regeneration portable on macOS and preserved existing OG assets. Kept all game scripts, APIs and article bodies unchanged, including the Worlds subdomain behavior. Build and 17-page source/link checks passed; browser checks covered 320/375/768px, 50 game rounds and restart, and nonogram fill/empty/clear/select. Fixed narrow-screen puzzle controls. Desktop/mobile screenshots accompany the changes. Branch: codex/editorial-redesign.
