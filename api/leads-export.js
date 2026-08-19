// Vercel Serverless Function — export captured leads (for you to review/sell).
//
// Protect this with a secret. Set env var LEADS_ADMIN_TOKEN in Vercel, then call:
//   https://yourdomain.com/api/leads-export?token=YOUR_SECRET&format=csv
//
// Reads from the Supabase `leads` table. Requires the same SUPABASE_URL and
// SUPABASE_SERVICE_KEY env vars as lead.js, plus LEADS_ADMIN_TOKEN.

export default async function handler(req, res) {
  const token = req.query.token || '';
  if (!process.env.LEADS_ADMIN_TOKEN || token !== process.env.LEADS_ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase env vars not configured' });
  }

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/leads?select=*&order=received_at.desc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    if (!r.ok) {
      const detail = await r.text();
      throw new Error(`Supabase query failed (${r.status}): ${detail}`);
    }
    const leads = await r.json();

    const format = (req.query.format || 'json').toLowerCase();
    if (format === 'csv') {
      if (!leads.length) {
        res.setHeader('Content-Type', 'text/csv');
        return res.status(200).send('no leads yet\n');
      }
      const cols = Array.from(
        leads.reduce((s, l) => { Object.keys(l).forEach((k) => s.add(k)); return s; }, new Set())
      );
      const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const csv = [
        cols.join(','),
        ...leads.map((l) => cols.map((c) => esc(l[c])).join(',')),
      ].join('\n');
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
