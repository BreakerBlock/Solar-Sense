# SolarSense India — SEO Progress

Goal: rank https://solarsense.dev at the top of Google (India) for "solar calculator" and related queries —
"solar calculator India", "rooftop solar calculator", "solar panel cost calculator", "solar subsidy calculator",
and state variants ("solar calculator Maharashtra", "rooftop solar calculator Delhi", …).

Ground rules: surgical changes only, keep substantive explanatory content, no named vendor listings,
every canonical / sitemap / OG / structured-data URL uses `https://solarsense.dev`.

---

## Roadmap (prioritised)

Status: ✅ done · 🟡 partial · ⬜ todo

### P0 — Technical foundations
- ✅ Fix wrong domain: all canonicals, sitemap `<loc>`s and robots.txt `Sitemap:` pointed at `solarsense.in` (2026-10-17)
- ✅ Canonical tag on every page, self-referencing and matching the sitemap URL exactly (2026-10-17)
- ✅ sitemap.xml + robots.txt on the correct domain (2026-10-17)
- ⬜ Confirm apex `solarsense.dev` is the primary Vercel domain and `www.` 308-redirects to it (see Owner action items)
- ⬜ Consider `cleanUrls` in vercel.json (e.g. `/calculator`) — only together with 301s from `.html`, canonical + sitemap + internal link updates in one change. Low priority; `.html` URLs are fine for ranking.

### P1 — Money page: calculator.html
- ✅ Keyword-targeted `<title>` + meta description (2026-10-17)
- ✅ Visible H1 "Solar Calculator India: Rooftop Solar Cost, Subsidy & Payback" + intro paragraph with internal links (2026-10-17)
- ✅ WebApplication + BreadcrumbList JSON-LD (2026-10-17)
- ✅ Open Graph / Twitter tags (2026-10-17)
- ⬜ Below-the-tool explanatory content: "How this solar calculator works" (inputs, assumptions, formulas, tariff sources) — long-form, for smart consumers
- ⬜ FAQ section on calculator ("How many kW do I need for a ₹3,000 bill?", "How much does a 3 kW system cost after subsidy?", "Payback period in India?" …) + FAQPage JSON-LD (note: Google only shows FAQ rich results for gov/health sites since 2023, but the content itself targets long-tail queries)
- ⬜ Step questions (`.step-q`) → semantic `<h2>` (keep same styling)
- ⬜ Performance: jsPDF (~350 KB) is render-blocking in `<head>`; load it lazily on "Download PDF" click or with `defer`

### P2 — Structured data & social sitewide
- ✅ Organization + WebSite JSON-LD on homepage (2026-10-17)
- 🟡 OG/Twitter tags: home + calculator done; add to subsidy, guides, tariffs, privacy
- ⬜ Shareable OG image (1200×630 PNG, `assets/og-image.png`) and `og:image` / `twitter:card=summary_large_image` sitewide
- ⬜ BreadcrumbList on guides/* and tariffs/*
- ⬜ Article (with `dateModified`) on guides/* and subsidy.html
- ⬜ Raster logo (PNG ≥112×112) for Organization `logo` (currently SVG)

### P3 — On-page & content
- ⬜ Tariff page titles still say "(January 2026)" — refresh data date and retitle toward "Solar Calculator {State}: Tariff, Subsidy & Payback" variants
- ⬜ Per-state calculator entry points: link each tariff page to `calculator.html` with state preselected (needs a small `?state=` handler in the calculator)
- ⬜ Subsidy page: add a "solar subsidy calculator" section (slab maths, worked examples) linking to the calculator
- ⬜ New content: "solar panel cost in India (per kW, 2026)", "how many solar panels do I need", "net metering explained", commercial/business rooftop solar sizing
- ⬜ Homepage: anchor-text variety on calculator links ("rooftop solar calculator", "solar panel cost calculator")

### P4 — Internal linking
- ⬜ Every guide and tariff page links to calculator.html with a varied "solar calculator" anchor in body copy (not just nav)
- ⬜ Related-guides block at the end of guides; neighbouring-state links on tariff pages

### P5 — Performance / Core Web Vitals
- ⬜ Measure LCP/CLS/INP with PageSpeed Insights for home + calculator
- ⬜ Calculator: ~500 lines of inline CSS; consider moving to cached stylesheet
- ⬜ Set longer cache + `immutable` for versioned assets

---

## Log

### 2026-10-17 (run 1)
Audit findings: all 33 canonicals, the sitemap and robots.txt pointed at `https://solarsense.in` (wrong domain, 66 URLs);
calculator.html — the main target page — had no meta description, no canonical, no H1, no OG tags and a generic title;
no structured data anywhere; guides/ and tariffs/ index canonicals (`/guides/`) didn't match sitemap/internal links (`/guides/index.html`).

Done:
1. Domain fix: `solarsense.in` → `solarsense.dev` in every canonical, sitemap `<loc>` and robots.txt; sitemap `lastmod` → 2026-10-17;
   guides/ + tariffs/ index canonicals aligned with sitemap (`…/index.html`).
2. calculator.html: new title, meta description, canonical, OG/Twitter, WebApplication + BreadcrumbList JSON-LD,
   visible H1 + intro paragraph (links to subsidy + tariffs). Styling added as a small `.calc-intro` block; nothing removed.
3. index.html: og:url/site_name/locale, Twitter tags, Organization + WebSite JSON-LD.

Verification: JSON-LD parses; html5lib parse errors 0 before/after on changed pages; one `<title>`/canonical/description/H1 per page;
no duplicate script tags; all relative internal links resolve; sitemap is well-formed XML; all 33 pages load in headless Chromium
with 0 console/page errors; calculator on-grid / off-grid / surplus flows produce identical results to the previous version;
no horizontal scroll at 390px.

**Not deployed:** the push was refused — this run's session was not authorised to write to BreakerBlock/Solar-Sense
(the git proxy rejected the push with 403). The commit was prepared and delivered to the owner as a patch file instead.
Next run should re-check that `SEO_PROGRESS.md` exists on the default branch; if it doesn't, today's patch was not applied.

Next: P1 calculator explanatory content + FAQ; OG image; BreadcrumbList/Article schema on guides & tariffs; lazy-load jsPDF.

---

## Owner action items
- [ ] **Grant this scheduled task push access to BreakerBlock/Solar-Sense** (add the repo to the task's sources/repositories), or apply the patch from the 2026-10-17 run manually (`git am`). Without this nothing reaches the live site.
- [ ] In Vercel → Domains: make `solarsense.dev` (apex) the primary domain and redirect `www.solarsense.dev` → apex (or tell the SEO run to use www, but don't mix).
- [ ] Google Search Console: add a Domain property for `solarsense.dev`, submit `https://solarsense.dev/sitemap.xml`, and request indexing for `/` and `/calculator.html` after the fix is live.
- [ ] If `solarsense.in` is owned, 301-redirect it to `solarsense.dev`; if it isn't, nothing else needed after the canonical fix.
- [ ] Bing Webmaster Tools: import from Search Console.
- [ ] README/privacy: check the privacy contact address (README still mentions `privacy@solarsense.in`).
- [ ] Backlinks: list the calculator on Indian solar/energy forums, Reddit r/india / r/IndiaInvestments answers, Quora, and local RWA/housing-society newsletters; reach out to personal-finance bloggers.
