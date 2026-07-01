export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: { message: 'Missing prompt' } });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'API key not configured on server' } });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: { prompt },
      parameters: { sampleCount: 1 },
    }),
  });

  const data = await response.json().catch(() => null);
  return res.status(response.status).json(data);
}
