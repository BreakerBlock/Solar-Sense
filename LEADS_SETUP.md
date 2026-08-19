# SolarSense — Lead Capture Setup

The calculator now has an **optional** "Get free quotes" form that appears after
the results. When a visitor fills it in (name, phone, pincode, preferred call
time) and ticks the consent box, the form POSTs to `/api/lead` along with the
solar estimate the calculator produced. That combined record is your sellable,
verified lead.

**It works the moment you deploy** — with no storage configured, leads are written
to your Vercel logs and also cached in the visitor's browser as a backup. To
actually collect and sell leads, wire up one storage option below.

## Fastest path: Vercel KV (recommended)

1. In your Vercel project → **Storage** → **Create Database** → **KV**. Connect it
   to this project. Vercel auto-adds `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
2. In `package.json` add the dependency: `"@vercel/kv": "^1.0.0"` (create the file
   if you don't have one — see below).
3. In `api/lead.js`, uncomment the **Option A: Vercel KV** block.
4. In `api/leads-export.js`, uncomment the KV block.
5. Set an env var `LEADS_ADMIN_TOKEN` to any long random string.
6. Redeploy.

Minimal `package.json` if you need one:

```json
{
  "name": "solarsense",
  "version": "1.0.0",
  "dependencies": { "@vercel/kv": "^1.0.0" }
}
```

## Retrieving leads to sell

Once storage is on, download all leads as a CSV:

```
https://YOURDOMAIN.com/api/leads-export?token=YOUR_ADMIN_TOKEN&format=csv
```

Each row includes: timestamp, name, phone, pincode, call time, state, tariff,
system size (kWp), system type, estimated gross/net cost, subsidy, and payback.
That's everything an installer needs to price a quote — which is what makes it a
*qualified* lead worth ₹200–800 rather than a bare contact.

## Alternatives

- **Supabase** (Postgres, free tier, nicer dashboard): create a `leads` table,
  set `SUPABASE_URL` + `SUPABASE_SERVICE_KEY`, and uncomment Option B in both files.
- **Email to yourself** (simplest to start, no DB): sign up for Resend, set
  `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`, uncomment Option C in
  `lead.js`. Every lead lands in your inbox. You can combine this with KV.

## Legal / compliance notes

- The form requires an explicit consent checkbox before it can be submitted.
- `privacy.html` has been updated to disclose exactly what's collected, that it's
  optional, and that details are shared with installers on consent — this is what
  the DPDP Act (2023) expects.
- Keep your promise: only share leads with actual installers, don't resell to
  unrelated third parties, and honour deletion requests. That's both the law and
  what keeps lead quality (and your reputation with buyers) high.

## Selling the leads

- Local installers and solar marketplaces buy verified, geo-tagged leads.
- Price by qualification: a lead with a real pincode + system size + budget
  signal (your estimate) is worth more than a name and number.
- Freshness matters — sell/deliver within 24–48h. Stale leads convert poorly.
- Consider exclusivity: one lead sold to one installer commands more than the
  same lead sold to five.
