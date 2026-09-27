# ARTistic Expressions — Dev Log

A running record of decisions, changes, and progress on this project.

---

## 2026-09-27

- Cloned the repo to a local Windows working copy; fixed the git identity that had been
  committing 11 prior commits as `Your Name <your-github-email@example.com>`
- Full security review — secrets, dependencies, headers, PII. Confirmed no literal API key
  exists in any git blob across the entire history (the 2026-07-01 exposure was via the
  built bundle on Vercel, never via source control), and the built bundle is clean
- **Hardened `/api/generate-image`, which was an unauthenticated open proxy.** It accepted
  an arbitrary `prompt` from any caller, so anyone who found the URL could generate
  unlimited images on the project's billing account. The endpoint now takes a metaphor
  `id` and owns the prompt text itself, reducing it to a closed set of six possible
  upstream calls. Added a best-effort per-IP + global rate limit (in-memory, so it resets
  on cold starts and is per-instance — a brake on casual abuse, not a hard guarantee),
  an Origin allowlist, and a 30s upstream timeout
- Stopped forwarding Google's raw error JSON to the browser — upstream detail (project
  identifiers, quota state) is now logged server-side and the client gets a generic message
- Client no longer retries 4xx responses; retrying a 429 five times only added load
- Moved the six image prompts out of `src/App.jsx` into `api/generate-image.js` so there is
  a single source of truth and the client copy cannot silently drift
- Added `vercel.json` with CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, COOP, and `nosniff` — the site previously sent no security headers
- `npm audit fix`: 8 vulnerabilities (6 high) → 0, all semver-compatible. Two were
  Windows-specific: a Vite `server.fs.deny` bypass and an NTLMv2 hash disclosure in
  `launch-editor`
- Fixed `eslint.config.js`, which lacked Node globals for `api/` — `npm run lint` had been
  failing on `process is not defined` before any of these changes
- `.gitignore` covered `*.local` but not `.env`; added `.env`/`.env.*` plus a documented
  `.env.example`
- PII review: the app collects nothing — no forms or inputs, no localStorage, no cookies,
  no analytics, no geolocation. The two staff emails in the footer are intentional public
  contact info
- Added the `ae27.gusddev.app` subdomain: Vercel domain on Production (verified), Cloudflare
  CNAME → `0a0bbfdd4fd91f3b.vercel-dns-017.com` set to **DNS-only** (proxying it would break
  Vercel's cert issuance). `ALLOWED_ORIGIN` updated to cover all three origins; confirmed the
  new origin passes the check and an unlisted origin gets a 403. The old domains were left in
  place rather than removed or redirected
- **Found and fixed the real cause of the image-generation 502s.** Google shut down every
  Imagen model in the Gemini API on 2026-08-17, so `imagen-4.0-generate-001:predict` returns
  404 `NOT_FOUND` regardless of key or billing. Migrated to `gemini-3.1-flash-image` via
  `:generateContent`, where the bytes arrive inline under
  `candidates[].content.parts[].inlineData` instead of under `predictions[]`. Verified in
  production: all six metaphors return HTTP 200 with real image data
- Worth recording how that was found, because the first two attempts were guesses. The
  `instances`-as-array change was correct per the predict API spec but could never have
  fixed a retired model. What actually resolved it was the `DEBUG_UPSTREAM_ERRORS` flag,
  which surfaced Google's error enum and named the cause in one request. **Read the upstream
  error before changing the request.**
- Follow-ons from that migration: the model name is now overridable via `IMAGE_MODEL` so the
  next retirement is an env var change rather than a code change; upstream auth moved from
  `?key=` to the `x-goog-api-key` header so the key stays out of request URLs; a non-`STOP`
  `finishReason` (safety/recitation block, which arrives as a 200 with no image part) is
  reported distinctly instead of as a generic bad-shape error; the upstream mime type is
  passed through to the client, which had been hardcoding `image/png` — the new model
  actually returns JPEG; and `maxDuration` is set to 60s, since generation takes 10–20s and
  the platform default would have killed the invocation before the upstream timeout fired

---

## 2026-08-26

- Verified GitHub repo, `package.json`, and `index.html` were already renamed to ARTistic Expressions from an earlier session
- Renamed the codespace display name from the auto-generated "potential space giggle" to "Artistic Expressions"
- Local codespace folder path (`/workspaces/my-react-site`) intentionally left as-is — it's baked in at codespace creation and only updates on a fresh codespace

---

## 2026-07-01

- Security review revealed `VITE_GEMINI_API_KEY` was being compiled into the public JS bundle, exposing the API key to any site visitor
- Fixed by creating a Vercel serverless function (`api/generate-image.js`) to proxy Gemini API calls server-side
- Client-side code now calls `/api/generate-image` — key never reaches the browser
- Rotated the compromised API key; new key created via Google AI Studio backed by a paid GCloud project
- Verified fix: JS bundle contains no API key or direct Gemini URL; image generation confirmed working end-to-end

---

## 2026-04-24

- Updated favicon to `favicon_v2.svg` — custom badge-style icon with sun, hills, and gold arc
- Updated `index.html` favicon `href` to point to new file
- Renamed GitHub repo from `my-react-site` to `ARTistic-Expressions`
- Updated `git remote origin` URL to match new repo name
- Updated `index.html` `<title>` from `my-react-site` to `ARTistic Expressions`
- Updated `package.json` `name` field to `artistic-expressions`
- Fixed broken `node_modules` (missing `@rolldown/binding-linux-x64-gnu` native binding due to npm optional-dep bug) by removing `node_modules` and `package-lock.json` and running a clean `npm install`

---

## 2026-04-04

- Integrated AI image generation API into the app
- Iterated through several approaches to handle the API key securely (moved to Vercel environment variable)
- Debugged and resolved a 400 Bad Request error in the API call
- Refined API request format and payload structure across multiple commits
- Updated overall page layout

---

## 2026-04-03

- Initial commit — project scaffolded with Vite + React + Tailwind v4
- Fixed Tailwind v4 configuration issues on setup

---

## Project Overview

**ARTistic Expressions** is a React-based teaching tool for art educators. It supports a multi-day unit on abstract art where students express their personal support systems through visual metaphors.

**Core features:**
- 6 visual metaphors (Mountain, Anchor, Shield, Tree, Fortress, River) with descriptions and AI image generation prompts
- 5-day lesson plan with expandable day-by-day content and linked Google Slides
- Art supply reference list organized by category (foundations, media, adhesives, dry/wet media, tools)
- AI-generated artwork preview based on selected metaphor
- Teaching strategies and accessibility guidance

**Stack:** React 19, Vite 8, Tailwind CSS v4, Lucide React icons, deployed on Vercel
