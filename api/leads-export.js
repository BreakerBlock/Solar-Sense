// Vercel Serverless Function — export captured leads (for you to review/sell).
//
// Protect this with a secret. Set env var LEADS_ADMIN_TOKEN in Vercel, then call:
//   https://yourdomain.com/api/leads-export?token=YOUR_SECRET&format=csv
//
// Only works once you've enabled a storage backend in lead.js. This example
// reads from Vercel KV (Option A). Adapt the query if you chose Supabase.

export default async function handler(req, res) {
  const token = req.query.token || '';
  if (!process.env.LEADS_ADMIN_TOKEN || token !== process.env.LEADS_ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let leads = [];

    // ── If using Vercel KV (Option A in lead.js) ──
    // import { kv } from '@vercel/kv';
    // const ids = await kv.lrange('leads:all', 0, -1);
    // leads = (await Promise.all(ids.map((id) => kv.get(id)))).filter(Boolean);

    // ── If using Supabase (Option B) ──
    // const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads?select=*&order=received_at.desc`, {
    //   headers: {
    //     apikey: process.env.SUPABASE_SERVICE_KEY,
    //     Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    //   },
    // });
    // leads = await r.json();

    const format = (req.query.format || 'json').toLowerCase();
    if (format === 'csv') {
      if (!leads.length) {
        res.setHeader('Content-Type', 'text/csv');
        return res.status(200).send('no leads yet\n');
      }
      const cols = Array.from(leads.reduce((s, l) => { Object.keys(l).forEach((k) => s.add(k)); return s; }, new Set()));
      const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const csv = [cols.join(','), ...leads.map((l) => cols.map((c) => esc(l[c])).join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="solarsense-leads.csv"');
      return res.status(200).send(csv);
    }

    return res.status(200).json({ count: leads.length, leads });
  } catch (err) {
    console.error('Export error:', err);
    return res.status(500).json({ error: 'Export failed', detail: String(err) });
  }
}
