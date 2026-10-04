// Server-side proxy for Gemini image generation.
//
// The client sends only an id; the prompt text lives here. That keeps the endpoint a
// closed set of known upstream calls instead of an open-ended text-to-image service, so
// a caller who finds the URL cannot generate arbitrary images on the project's billing
// account. There are two id families: the six unit metaphors in PROMPTS, and the six
// 2026-27 candidate themes in THEME_PROMPTS.
//
// This used to call Imagen (`imagen-4.0-generate-001:predict`). Google shut every
// Imagen model down in the Gemini API on 2026-08-17; those calls now 404 with
// NOT_FOUND no matter what the key or billing looks like. Image generation moved to
// the Gemini image models, which use `:generateContent` and return the bytes inline
// rather than under `predictions`.

// Note the deliberate absence of the phrase "painting of". The mountain and anchor prompts
// used it, and the model consistently read it as an instruction to depict a painting as an
// *object* — returning photographs of framed canvases hanging on walls or leaning in a
// studio, complete with wall texture and floor. Every generation of those two came back
// that way; the four prompts that said "Abstract <thing>" never did. STYLE_SUFFIX below
// makes the requirement explicit rather than relying on that phrasing alone.
const PROMPTS = {
  // "minimalist geometric mountain, high contrast" is the exact vocabulary of mid-century
  // wall-art prints, and the model kept returning the poster rather than the picture — a
  // print floating on white with a drop shadow. Two changes fix it: drop "minimalist", and
  // add the painterly surface language that the five reliable prompts all have and this
  // one lacked ("textured paint", "brushwork", "thick monumental blocks").
  mountain:
    'Abstract mountain built from interlocking geometric planes, earthy sienna and deep ' +
    'teal, high contrast, painted in oil with visible brushwork and dry-brushed texture, ' +
    'the slopes running off every edge.',
  anchor:
    'Abstract expressionist composition of a heavy symbolic anchor, deep indigo, bold lines, thick textured brushwork.',
  shield:
    'Abstract golden shield pattern, concentric layers, soft glowing light center, thick protective borders.',
  tree:
    'Abstract tree, intricate roots, expansive branches, forest green and mahogany, organic shapes.',
  fortress:
    'Abstract fortress, thick monumental blocks, stone gray and amber highlights, representing unshakeable strength.',
  river:
    'Abstract flowing river, fluid curves in cerulean and silver, winding movement, organic shapes.',
};

// Candidate themes for the 2026-27 unit, used to illustrate the staff ballot. Kept in a
// separate map from PROMPTS so the six metaphors that the live unit depends on stay
// visually and editorially untouched, but merged into ALL_PROMPTS below so the endpoint
// remains a closed set — twelve known upstream calls, never an arbitrary one.
//
// Each of these names something that STYLE_SUFFIX would otherwise be fighting: a map, a
// museum, a repaired bowl, a monument are all *objects*, and asking for them directly
// invites the same failure the mountain and anchor prompts hit — a photograph of the thing
// sitting on a surface. So each prompt describes the forms abstractly ("plinth-like
// blocks", "suggesting invented territory") and never names the object itself.
const THEME_PROMPTS = {
  'theme-invisible-systems':
    'Abstract composition of overlapping translucent layers crossed by branching ' +
    'connective currents, cool violet and pale cyan over warm ochre, glowing where the ' +
    'layers overlap, painted in thin washed glazes with visible brushwork.',
  'theme-cartography':
    'Abstract composition of contour shapes and winding boundary forms suggesting ' +
    'invented territory, warm sepia and muted jade with coral accents, small painted ' +
    'symbols scattered across it, thick gouache texture and bold outlines.',
  'theme-museum-of-us':
    'Abstract composition of layered vessel and relic forms, carved facets and worn ' +
    'edges, terracotta and bone white with oxidized copper green, thick impasto paint ' +
    'and incised marks.',
  'theme-seeing-music':
    'Abstract composition of rhythmic marks, sweeping arcs and staccato bursts rising ' +
    'across the surface, saturated magenta, cobalt and chrome yellow, bold gestural ' +
    'brushstrokes over layered textured paint.',
  'theme-beautiful-mending':
    'Abstract composition of fractured planes rejoined by thick radiant gold seams, ' +
    'deep charcoal and slate blue fields, the gold veins branching off every edge, ' +
    'heavy textured paint and visible brushwork.',
  'theme-monuments':
    'Abstract composition of stacked plinth-like forms rising in bold vertical tiers, ' +
    'weathered limestone gray with warm bronze and dusty rose, thick dry-brushed ' +
    'texture filling the surface edge to edge.',
};

const ALL_PROMPTS = { ...PROMPTS, ...THEME_PROMPTS };

// Appended to every prompt. The image is displayed edge to edge in a square panel, so a
// depicted frame, canvas edge or wall shows up as a border inside the UI.
// Names the specific failure modes seen in practice — poster, print, margin, drop shadow —
// rather than only the frame-and-wall ones, which the earlier wording covered but which
// were not what the mountain prompt was actually producing.
const STYLE_SUFFIX =
  ' The artwork fills the entire square frame, edge to edge, with no margin, border or ' +
  'drop shadow. This is the artwork itself, not a picture of artwork: do not depict a ' +
  'poster, a print, canvas edges, a picture frame, an easel, a wall or a studio, and do ' +
  'not place it on any background surface.';

// Overridable so a future model retirement is an env var change, not a redeploy of
// this file. See .env.example.
//
// Lite rather than plain flash: measured against production, lite generates in ~3.0s
// versus ~8.8s for the same prompts, and the output is indistinguishable at the size this
// UI displays. Generation is ~95% of the request's wall clock, so this is the single
// biggest lever on how the page feels.
const DEFAULT_MODEL = 'gemini-3.1-flash-lite-image';

// The panel renders the image in a roughly square box a few hundred CSS pixels wide, so
// the model's default 16:9 is both the wrong shape (cropped by object-cover) and more
// pixels than can ever be seen. Square at 1K is about the smallest that still looks sharp
// on a high-DPI screen. Both are overridable for tuning without a redeploy.
const DEFAULT_ASPECT_RATIO = '1:1';
const DEFAULT_IMAGE_SIZE = '1K';

// Image generation routinely takes 10-20s. Keep this under the function's
// maxDuration (set in vercel.json) so we return our own 504 rather than letting the
// platform kill the invocation.
const UPSTREAM_TIMEOUT_MS = 45000;

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

// Generic failure response. When DEBUG_UPSTREAM_ERRORS is set, attach Google's
// coarse error enum (NOT_FOUND, PERMISSION_DENIED, RESOURCE_EXHAUSTED, ...) and the
// upstream HTTP status — never the full message, which can carry project identifiers
// and quota state. Leave the variable unset in normal operation.
function failure(res, status, upstreamStatus, upstreamEnum) {
  const error = { message: 'Image generation failed. Please try again later.' };
  if (process.env.DEBUG_UPSTREAM_ERRORS) {
    error.upstream = upstreamEnum || null;
    error.upstreamHttpStatus = upstreamStatus || null;
  }
  return res.status(status).json({ error });
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
  if (typeof id !== 'string' || !Object.prototype.hasOwnProperty.call(ALL_PROMPTS, id)) {
    return res.status(400).json({ error: { message: 'Unknown image id' } });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('generate-image: GEMINI_API_KEY is not configured');
    return res.status(500).json({ error: { message: 'Image generation is unavailable.' } });
  }

  const model = process.env.IMAGE_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Header auth rather than `?key=`, so the key cannot leak through request
        // URLs in logs, traces or error reports.
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: ALL_PROMPTS[id] + STYLE_SUFFIX }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: {
            aspectRatio: process.env.IMAGE_ASPECT_RATIO || DEFAULT_ASPECT_RATIO,
            imageSize: process.env.IMAGE_SIZE || DEFAULT_IMAGE_SIZE,
          },
        },
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Log upstream detail server-side; never forward it. Google's error bodies can
      // carry project identifiers, quota state and other internals.
      console.error('generate-image: upstream %s %j', response.status, data);
      const status = response.status === 429 ? 429 : 502;
      return failure(res, status, response.status, data?.error?.status);
    }

    const candidate = data?.candidates?.[0];

    // A safety or recitation block comes back as a 200 with no image part. Name it
    // distinctly — retrying an identical prompt will not help.
    const finish = candidate?.finishReason;
    if (finish && finish !== 'STOP') {
      console.error('generate-image: upstream finishReason %s', finish);
      return failure(res, 502, response.status, `FINISH_${finish}`);
    }

    const part = candidate?.content?.parts?.find((p) => p?.inlineData?.data);
    const image = part?.inlineData?.data;
    if (typeof image !== 'string' || image.length === 0) {
      console.error('generate-image: unexpected upstream shape %j', data);
      return failure(res, 502, response.status, 'UNEXPECTED_RESPONSE_SHAPE');
    }

    // Pass the mime type through instead of letting the client assume PNG; these
    // models can return JPEG or WebP depending on the model and request.
    const mimeType = part.inlineData.mimeType || 'image/png';
    if (!/^image\/[\w.+-]+$/.test(mimeType)) {
      console.error('generate-image: refusing non-image mime type %j', mimeType);
      return failure(res, 502, response.status, 'UNEXPECTED_RESPONSE_SHAPE');
    }

    return res.status(200).json({ image, mimeType });
  } catch (err) {
    const aborted = err?.name === 'AbortError';
    console.error('generate-image: %s', aborted ? 'upstream timeout' : err);
    return failure(res, aborted ? 504 : 502, null, aborted ? 'UPSTREAM_TIMEOUT' : 'FETCH_FAILED');
  } finally {
    clearTimeout(timer);
  }
}
