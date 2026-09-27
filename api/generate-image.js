// Server-side proxy for Imagen generation.
//
// The client sends only a metaphor id; the prompt text lives here. That keeps the
// endpoint a closed set of six possible upstream calls instead of an open-ended
// text-to-image service, so a caller who finds the URL cannot generate arbitrary
// images on the project's billing account.

const PROMPTS = {
  mountain:
    'Abstract minimalist painting of a stable mountain, geometric triangles, earthy sienna and deep teal colors, high contrast.',
  anchor:
    'Abstract expressionist painting of a heavy symbolic anchor, deep indigo, bold lines, textured paint.',
  shield:
    'Abstract golden shield pattern, concentric layers, soft glowing light center, thick protective borders.',
  tree:
    'Abstract tree, intricate roots, expansive branches, forest green and mahogany, organic shapes.',
  fortress:
    'Abstract fortress, thick monumental blocks, stone gray and amber highlights, representing unshakeable strength.',
  river:
    'Abstract flowing river, fluid curves in cerulean and silver, winding movement, organic shapes.',
};

const UPSTREAM_TIMEOUT_MS = 30000;

// Best-effort rate limiting. Module scope survives between invocations on a warm
// serverless instance, but each instance keeps its own counters and cold starts
// reset them — so these are a brake on casual abuse, not a hard guarantee. Put a
// WAF or an edge rate limit in front of this if you need one.
const WINDOW_MS = 60_000;
const MAX_PER_IP_PER_WINDOW = 10;
const MAX_GLOBAL_PER_WINDOW = 60;

const hits = new Map(); // ip -> number[] of timestamps
let globalHits = [];

function prune(list, now) {
  return list.filter((t) => now - t < WINDOW_MS);
}

function rateLimited(ip, now) {
  globalHits = prune(globalHits, now);
  if (globalHits.length >= MAX_GLOBAL_PER_WINDOW) return true;

  const seen = prune(hits.get(ip) || [], now);
  if (seen.length >= MAX_PER_IP_PER_WINDOW) {
    hits.set(ip, seen);
    return true;
  }

  seen.push(now);
  hits.set(ip, seen);
  globalHits.push(now);

  // Keep the map from growing without bound across many distinct IPs.
  if (hits.size > 5000) {
    for (const [key, list] of hits) {
      if (prune(list, now).length === 0) hits.delete(key);
    }
  }
  return false;
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

// Origin allowlist. Browsers send Origin on cross-site POSTs, so this stops casual
// embedding from another site; it is trivially spoofed by a non-browser client and
// is not the primary control — the closed prompt set and rate limit are.
function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin form posts and curl send no Origin

  const allowed = [];
  if (process.env.ALLOWED_ORIGIN) {
    allowed.push(...process.env.ALLOWED_ORIGIN.split(',').map((s) => s.trim()));
  }
  if (process.env.VERCEL_URL) allowed.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV !== 'production') {
    allowed.push('http://localhost:5173', 'http://127.0.0.1:5173');
  }

  // With nothing configured, fall back to same-host comparison.
  if (allowed.length === 0) {
    try {
      return new URL(origin).host === req.headers.host;
    } catch {
      return false;
    }
  }
  return allowed.includes(origin);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  if (!originAllowed(req)) {
    return res.status(403).json({ error: { message: 'Forbidden' } });
  }

  if (rateLimited(clientIp(req), Date.now())) {
    res.setHeader('Retry-After', '60');
    return res
      .status(429)
      .json({ error: { message: 'Too many requests. Please wait a moment and try again.' } });
  }

  const { id } = req.body || {};
  if (typeof id !== 'string' || !Object.prototype.hasOwnProperty.call(PROMPTS, id)) {
    return res.status(400).json({ error: { message: 'Unknown image id' } });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('generate-image: GEMINI_API_KEY is not configured');
    return res.status(500).json({ error: { message: 'Image generation is unavailable.' } });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // `instances` is an array in the predict API. It was an object here
        // previously, which Google rejects with 400 INVALID_ARGUMENT.
        instances: [{ prompt: PROMPTS[id] }],
        parameters: { sampleCount: 1 },
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Log upstream detail server-side; never forward it. Google's error bodies can
      // carry project identifiers, quota state and other internals.
      console.error('generate-image: upstream %s %j', response.status, data);
      const status = response.status === 429 ? 429 : 502;
      return res
        .status(status)
        .json({ error: { message: 'Image generation failed. Please try again later.' } });
    }

    const image = data?.predictions?.[0]?.bytesBase64Encoded;
    if (typeof image !== 'string' || image.length === 0) {
      console.error('generate-image: unexpected upstream shape %j', data);
      return res.status(502).json({ error: { message: 'Image generation failed. Please try again later.' } });
    }

    return res.status(200).json({ image });
  } catch (err) {
    const aborted = err?.name === 'AbortError';
    console.error('generate-image: %s', aborted ? 'upstream timeout' : err);
    return res
      .status(aborted ? 504 : 502)
      .json({ error: { message: 'Image generation failed. Please try again later.' } });
  } finally {
    clearTimeout(timer);
  }
}
