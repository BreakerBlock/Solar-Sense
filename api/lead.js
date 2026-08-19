// Vercel Serverless Function — receives a lead from the calculator and stores it.
//
// ─────────────────────────────────────────────────────────────────────────────
// SETUP (pick ONE storage option below and set the matching env vars in Vercel):
//
//   Option A — Vercel KV (easiest; free tier). Set env: KV_REST_API_URL,
//              KV_REST_API_TOKEN. Uncomment the KV block.
//   Option B — Supabase (Postgres, free tier). Set env: SUPABASE_URL,
//              SUPABASE_SERVICE_KEY. Uncomment the Supabase block.
//   Option C — Email each lead to yourself via Resend. Set env: RESEND_API_KEY,
//              LEAD_EMAIL_TO, LEAD_EMAIL_FROM. Uncomment the email block.
//
// You can enable more than one at a time (e.g. store in KV AND email yourself).
// With NONE configured, the function still returns 200 and logs the lead, so the
// site works the moment you deploy — you just wire real storage when ready.
// ─────────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS (same-origin in prod; permissive here so preview deploys work)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let lead;
  try {
    lead = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // ── Server-side validation (never trust the client) ──
  const name = (lead.name || '').toString().trim();
  const phone = (lead.phone || '').toString().trim();
  const pincode = (lead.pincode || '').toString().trim();
  if (name.length < 2) return res.status(400).json({ error: 'Name required' });
  if (!/^[6-9]\d{9}$/.test(phone)) return res.status(400).json({ error: 'Invalid phone' });
  if (!/^\d{6}$/.test(pincode)) return res.status(400).json({ error: 'Invalid pincode' });

  // Enrich
  const record = {
    ...lead,
    name, phone, pincode,
    ip: (req.headers['x-forwarded-for'] || '').split(',')[0] || null,
    ua: req.headers['user-agent'] || null,
    received_at: new Date().toISOString(),
  };

  // Always log (visible in Vercel → your project → Logs)
  console.log('NEW LEAD:', JSON.stringify(record));

  try {
    // ── Option A: Vercel KV ────────────────────────────────────────────────
    // import { kv } from '@vercel/kv';
    // const id = `lead:${Date.now()}:${phone}`;
    // await kv.set(id, record);
    // await kv.lpush('leads:all', id);

    // ── Option B: Supabase ─────────────────────────────────────────────────
    // const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     apikey: process.env.SUPABASE_SERVICE_KEY,
    //     Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    //     Prefer: 'return=minimal',
    //   },
    //   body: JSON.stringify(record),
    // });
    // if (!r.ok) throw new Error('Supabase insert failed: ' + (await r.text()));

    // ── Option C: Email via Resend ─────────────────────────────────────────
    // if (process.env.RESEND_API_KEY) {
    //   await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       from: process.env.LEAD_EMAIL_FROM,
    //       to: process.env.LEAD_EMAIL_TO,
    //       subject: `New solar lead — ${name} (${pincode})`,
    //       text: Object.entries(record).map(([k, v]) => `${k}: ${v}`).join('\n'),
    //     }),
    //   });
    // }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead store error:', err);
    // Still return 200 so the user sees success; the lead is in the logs and the
    // client also keeps a localStorage backup. Change to 500 once storage is live
    // if you'd rather surface failures.
    return res.status(200).json({ ok: true, warning: 'stored to logs only' });
  }
}
