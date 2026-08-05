# SolarSense India — website

A static, multi-page site. No build step, no backend (yet). Deploys to Vercel or any static host.

## Structure

```
index.html              Home / landing
calculator.html         The interactive calculator (was SolarSense_v4)
subsidy.html            PM Surya Ghar subsidy explainer
privacy.html            Privacy policy (AdSense + DPDP ready)
guides/
  index.html            Guides hub
  on-grid.html          On-grid explainer
  off-grid.html         Off-grid explainer
  hybrid.html           Hybrid explainer
  surplus-space.html    Earning from surplus space
  panel-types.html      Panel technology comparison
tariffs/
  index.html            All states, sortable
  <state>.html          One SEO page per state (auto-generated)
assets/
  data.js               ← THE ONLY FILE YOU EDIT TO UPDATE RATES
  style.css             Shared styles
  site.js               Shared nav + footer
sitemap.xml, robots.txt, vercel.json
```

## Deploy to Vercel (first time, ~15 min)

1. Create a GitHub repo, upload this whole folder.
2. Go to vercel.com → sign in with GitHub → Add New Project → import the repo.
3. Deploy. Live at `yourproject.vercel.app`.
4. (Optional) Add your custom domain in Vercel → Settings → Domains.

Every `git push` after that redeploys automatically.

## Updating tariffs / zones / panel specs

Edit **`assets/data.js`** only. It holds `TARIFFS`, `ZONES`, `PANELS`, `BATTS`.
The calculator reads it live, so calculator changes are instant on save.

**Important:** the per-state pages in `/tariffs/` are pre-generated HTML. After
changing a tariff in `data.js`, regenerate them by re-running the generator
(the Node script used to build them). If you don't want to run Node, you can
also edit the specific `/tariffs/<state>.html` file by hand — the number appears
in a few clearly-labelled places. Long term, the cleanest fix is to move these
to a framework that renders them from `data.js` at build time.

Update the `DATA_UPDATED` constant in `data.js` when you refresh rates — it shows
as "Data updated ..." across the tariff pages.

## Before going live

1. **AdSense:** after approval, paste your AdSense `<script>` into the `<head>`
   of each page (or better, add it once to `site.js`). Replace the `.adslot`
   placeholder divs with real ad units.
2. **Privacy policy:** replace `privacy@solarsense.in` with a real, monitored
   email address. The DPDP Act requires a reachable grievance contact.
3. **Domain:** buy the domain and update the `<link rel="canonical">` URLs and
   `sitemap.xml` / `robots.txt` if your domain differs from `solarsense.in`.
4. **Submit sitemap** to Google Search Console once live.

## Future backend (Pillar 2 — vendor leads)

When you add lead capture (OTP, storing leads by pincode), create an `/api`
folder — Vercel runs those as serverless functions on the same project. The
calculator's Step 5 is where the lead-capture flow slots in. No migration needed.
