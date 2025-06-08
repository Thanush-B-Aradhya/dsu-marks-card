import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  const data = req.body;

  const { error } = await supabase.from('submissions').insert([data]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: 'Success' });
}
