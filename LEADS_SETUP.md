# SolarSense — Lead Capture Setup

The calculator has an **optional** "Get free quotes" form after the results.
When a visitor fills it in (name, phone, pincode) and ticks the consent box, the
form POSTs to `/api/lead`, which validates and stores the lead in Supabase along
with the solar estimate the calculator produced. That combined record is your
sellable, verified lead.

The code is already wired for Supabase — you just need to set environment
variables (below). Until they're set, leads are written to your Vercel logs and
cached in the visitor's browser as a backup, so nothing breaks on first deploy.

## Where secrets go (IMPORTANT — do not commit keys)

**Never put your Supabase keys in any file you commit to GitHub.** GitHub is
public; a leaked `service_role` key gives anyone full read/write on your database.

There are two places secrets live, and neither is your git repo:

1. **Production (Vercel):** Vercel → your project → **Settings** →
   **Environment Variables**. Add each key there. Vercel injects them at runtime.
   This is Vercel's built-in secrets manager — you do **not** need GitHub Secrets.
2. **Local development (optional):** a file named `.env.local` in the project
   root. This file is listed in `.gitignore`, so git ignores it. Copy
   `.env.example` to `.env.local` and fill in real values there.

`.env.example` is committed on purpose — it documents *which* variables exist
without exposing their values. Anyone cloning the repo copies it to `.env.local`
and fills in their own keys.

### Do I need GitHub Secrets?

**No — not for this setup.** GitHub Secrets are only for GitHub Actions (CI/CD
pipelines running inside GitHub). Your app runs on Vercel, and Vercel reads its
env vars from its own settings, not from GitHub. So: put the keys in Vercel's
Environment Variables and you're done. GitHub never sees them, which is exactly
what you want.

(If you later add a GitHub Action that itself needs the keys — say, a nightly
job — then you'd add them under GitHub → repo → Settings → Secrets and variables
→ Actions. Not needed today.)

## Environment variables to set in Vercel

| Variable | Where to get it | Notes |
|---|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL | e.g. `https://abcd.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase → Project Settings → API → `service_role` key | Secret. Server-side only. Never expose to the browser. |
| `LEADS_ADMIN_TOKEN` | You invent it | Any long random string. Guards the export URL. |

After adding them, **redeploy** so the functions pick them up.

## Supabase table

Table name: `leads`. If you haven't created it yet, run this in Supabase →
**SQL Editor**:

```sql
CREATE TABLE leads (
  id            BIGSERIAL PRIMARY KEY,
  ts            TIMESTAMPTZ DEFAULT now(),
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  pincode       TEXT NOT NULL,
  state         TEXT,
  tariff        NUMERIC,
  system_kwp    NUMERIC,
  system_type   TEXT,
  daily_kwh     NUMERIC,
  est_gross     INTEGER,
  est_net       INTEGER,
  est_subsidy   INTEGER,
  payback_yrs   TEXT,
  lead_type     TEXT,
  ip            TEXT,
  ua            TEXT,
  received_at   TIMESTAMPTZ DEFAULT now()
);

-- Lock down direct client access; only the service_role key (used by the
-- serverless function) can read/write. This keeps leads private.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

With RLS enabled and **no policies added**, the public/anon key cannot touch the
table at all — only your server functions (using the service_role key, which
bypasses RLS) can. That's the safe default for lead data.

## Retrieving leads to sell

Once env vars are set, download all leads as CSV:

```
https://YOURDOMAIN.com/api/leads-export?token=YOUR_ADMIN_TOKEN&format=csv
```

Or JSON (drop `&format=csv`). Each row includes name, phone, pincode, state,
tariff, system size, type, estimated gross/net cost, subsidy, and payback — a
fully qualified lead.

## Compliance notes

- The form requires an explicit consent checkbox before submission.
- `privacy.html` discloses what's collected, that it's optional, and that details
  are shared with installers on consent — aligned with India's DPDP Act (2023).
- Only share leads with real installers, honour deletion requests, and don't
  resell to unrelated third parties. That's the law and it protects lead quality.

## Selling the leads

- Line up one or two installer buyers **before** driving traffic — leads go stale
  in 24–48h.
- Qualified + geo-tagged (pincode + system size + your cost estimate) sells for
  more than a bare name and number: ₹200–800 per verified lead is typical.
- Exclusive (one lead → one installer) commands more than shared.
