// Vercel Serverless Function — receives a lead from the calculator and stores it
// in Supabase (Postgres table: `leads`).
//
// Required environment variables (set these in Vercel → Project → Settings →
// Environment Variables, NOT in code):
//   SUPABASE_URL          e.g. https://xxxxxxxx.supabase.co
//   SUPABASE_SERVICE_KEY  the service_role key (server-side only — never expose)
//
// The table is created as `leads`. See LEADS_SETUP.md for the schema.

export default async function handler(req, res) {
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

  // Build the row. Only include columns that exist in the `leads` table.
  const record = {
    ts: lead.ts || new Date().toISOString(),
    name,
    phone,
    pincode,
    state: lead.state || null,
    tariff: lead.tariff ? Number(lead.tariff) : null,
    system_kwp: lead.system_kwp ? Number(lead.system_kwp) : null,
    system_type: lead.system_type || null,
    daily_kwh: lead.daily_kwh ? Number(lead.daily_kwh) : null,
    est_gross: lead.est_gross != null ? Math.round(Number(lead.est_gross)) : (lead.est_cost != null ? Math.round(Number(lead.est_cost)) : null),
    est_net: lead.est_net != null ? Math.round(Number(lead.est_net)) : null,
    est_subsidy: lead.est_subsidy != null ? Math.round(Number(lead.est_subsidy)) : null,
    payback_yrs: lead.payback_yrs != null ? String(lead.payback_yrs) : null,
    lead_type: lead.lead_type || null,
    ip: (req.headers['x-forwarded-for'] || '').split(',')[0] || null,
    ua: req.headers['user-agent'] || null,
    received_at: new Date().toISOString(),
  };

  console.log('NEW LEAD:', JSON.stringify({ ...record, ip: undefined, ua: undefined }));

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Supabase env vars missing — lead logged only.');
    return res.status(200).json({ ok: true, warning: 'storage not configured' });
  }

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(record),
    });
    if (!r.ok) {
      const detail = await r.text();
      throw new Error(`Supabase insert failed (${r.status}): ${detail}`);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead store error:', err);
    // Return 200 so the visitor still sees success; lead is in the logs and the
    // client keeps a localStorage backup. Switch to 500 if you'd rather surface it.
    return res.status(200).json({ ok: true, warning: 'stored to logs only' });
  }
}
