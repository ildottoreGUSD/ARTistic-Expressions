# ARTistic Expressions — Dev Log

A running record of decisions, changes, and progress on this project.

---

## 2026-10-04

- Reviewed the whole app ahead of planning the 2026-27 unit. Findings worth keeping: the
  unit's identity is hardcoded in roughly 500 places (160 `teal-*` and 362 `slate-*` literal
  utility strings, `"ARTistic Expressions 2026"` in three, `"What Gives Me Strength?"` in
  two, both again inside the `PROMO_CONTENT` `copyText` blocks), so **extracting a `UNIT`
  constant beside `METAPHORS` is the first step of any reskin, not an afterthought**. Also:
  `animate-fade-in` is referenced 10 times and defined nowhere; `tailwind.config.js` is dead
  under v4 since `index.css` has no `@config`; `CopyButton` still uses the deprecated
  `document.execCommand('copy')`; and `src/App.css`, `src/assets/*` and `public/icons.svg`
  are unreferenced Vite starter cruft
- Theme voting for 2026-27 will happen in a Google Form rather than in the app, so the
  planned in-app ballot (Google Sign-In restricted to `gusd.net`, Upstash for storage) was
  dropped before any of it was written. Recording the two findings from planning it anyway,
  because they will resurface if the app ever does need auth: the site's CSP blocks Google
  Identity Services on all four of `script-src`, `connect-src`, `frame-src` and `style-src`,
  and the global `Cross-Origin-Opener-Policy: same-origin` breaks the GSI popup — it needs
  `same-origin-allow-popups`. Both are per-route overridable in `vercel.json`
- Added six 2026-27 candidate theme prompts to `api/generate-image.js` in a separate
  `THEME_PROMPTS` map, merged into `ALL_PROMPTS` for the id lookup. The split keeps the six
  metaphors the live unit depends on editorially untouched while preserving the closed-set
  property — the endpoint still makes one of twelve known upstream calls, never an arbitrary
  one
- **A preview deployment cannot be used to generate images, and the reason is worth writing
  down.** Vercel Authentication is set to Standard Protection, which blocks *function
  invocation* on previews while still serving static GETs from the edge. That produces a
  confusing signature: `GET /` returns the real site, `GET /api/generate-image` returns
  `index.html` (the function never runs, so it falls through to the SPA), and every POST
  returns a bare 401 with an empty body. Compare against production, where the same two
  requests correctly return 405 and 400. Separately, **both `GEMINI_API_KEY` and
  `ALLOWED_ORIGIN` are scoped to Production only**, so even with the protection lifted a
  preview would 500. Generating from a preview therefore means exposing the billing-backed
  key to every preview build; generating from production means a redeploy whose frontend
  bundle is byte-identical. Chose production
- **A new image failure mode, distinct from the poster-on-white one.** The `museum-of-us`
  prompt asked for "carved facets", "worn edges", "incised marks" and "thick impasto paint".
  Every one of those describes a *physical surface*, so the model built a sculptural relief
  panel and then did what it does with any object: photographed it outdoors, against trees
  and grass, with a thumb visible at the bottom edge. `STYLE_SUFFIX` did not catch it — the
  suffix forbids a frame, a wall and a background surface, and this was none of those. The
  artwork had simply become a thing that exists somewhere. Fixed by flattening the
  vocabulary to "silhouettes", "flat painted shapes" and "outlines", which describe a picture
  rather than an object
- **Rebuilt the border check and found its blind spot.** Reconstructed from the description
  in the 2026-09-27 entry: score each image on the minimum per-edge luminance standard
  deviation (how flat the flattest edge is) and the maximum spread between the four edge
  means (how alike the edges are), flagging only when both are low — the two-number form
  that the earlier entry records as necessary to avoid false-positiving a flat-by-style
  composition. Validated against a synthetic inset control (0/0, flagged) and the six
  existing metaphors (flatness 19-28, none flagged). **It scores the bad `museum-of-us`
  image as full-bleed**, because the foliage genuinely reaches all four edges. The check
  detects artwork inset on a plain ground and nothing else; artwork-as-object-in-a-scene has
  to be caught by eye. Still living in a scratchpad rather than `scripts/`
- Generated the six theme images through the production endpoint, inspected all six
  individually, regenerated `museum-of-us` once after the prompt fix. Kept out of `public/`
  — they are ballot material, not unit assets, and committing them would change the live
  site. Published as a gallery page for staff to read before voting
- **The pinned git credential helper is repo-local and did not survive re-cloning**, which
  is a sharp edge the 2026-09-27 entry did not anticipate. A fresh clone inherits only the
  global `gh auth git-credential` helper, which serves whichever account is active — so the
  first push failed with the same misleading "Repository not found" 404 as before, on a
  machine where this was supposedly already fixed. Re-applied the two `git config --local`
  lines documented in the helper script's own header. Note a second trap: **PowerShell
  silently drops an empty-string argument to a native executable**, so
  `git config --local credential.https://github.com.helper ""` writes nothing and the reset
  entry that clears the inherited global helper never appears. It has to be written from a
  POSIX shell (or straight into `.git/config`). Verify with
  `printf 'protocol=https\nhost=github.com\n\n' | git credential fill`, which names the
  account git will actually use
- Published the six candidates as a gallery page for staff to read before voting, with the
  art inlined as data URIs since the artifact CSP blocks every external host. Downscaled to
  560px first: six 1K JPEGs inline would be roughly 7 MB of base64, versus 679 KB at the
  size the page actually renders them. The full-resolution originals stay separate, for the
  Form's per-question images
- Shared it link-public (view-only). Artifacts offer only "only people invited" or "anyone
  with the link" — there is no domain restriction, so a `gusd.net`-only share is not
  available, and invited-only would require every teacher to have a Claude account. Revoke
  from the same menu by setting access back to invited-only
- **You cannot verify an artifact's share state over HTTP, and the check that looks like it
  works is actively misleading.** An anonymous request to the shared URL returns 200 — but
  so does an anonymous request to a URL with a UUID that does not exist, byte for byte the
  same 26,500-byte app shell. Access is enforced client-side after the JS loads, so status
  code and response length carry no signal at all. The only real check is opening the link
  in a signed-out or incognito window. Worth knowing before reporting "verified public" off
  a 200
- Minor, but it cost a republish: a literal em dash in the artifact's `<title>` came back
  mojibake (`U+00E2 U+20AC U+201D` — UTF-8 bytes read as Latin-1). HTML entities are
  charset-independent, so `&mdash;` and `&ndash;` are the safe form in artifact markup;
  the rest of the page was already entity-encoded and rendered correctly
- Built and published the staff ballot as a Google Form, owned by `eahangarzadeh@gusd.net`,
  responders restricted to Glendale Unified, verified email collected, one response per
  person, response editing allowed so a teacher can change their vote. Five questions: the
  ranking, then why that first choice, what would make it hard to run, a theme we did not
  list, and school site. Only the ranking matters for the result; the rest is optional
  - edit: `docs.google.com/forms/d/1YoMxfQuKz5yqVFkCtBz45XWZ_4KGQ5jB3VRz9ydFluM/edit`
  - responder: `docs.google.com/forms/d/e/1FAIpQLSctc0hXCZKRA4diYfhEJ3gqcuCFWeEmAaQzJRkcPQh7zfQG6w/viewform`
- **Google Forms has no ranking question type.** The ballot is a 6×3 multiple-choice grid —
  themes as rows, "1st / 2nd / 3rd choice" as columns — with **Limit to one response per
  column** enabled. One radio per row stops a theme being both 1st and 2nd; the column limit
  stops two themes sharing a rank. Verified in preview: selecting a second "1st choice" is
  refused with "Please don't select more than one response per column"
- **That grid cannot be made required, and the reason is worth recording** so nobody turns
  the toggle on later. The only required option for a grid is *Require a response in each
  row*. With six rows, three columns and one response per column, at most three rows can
  ever be filled, so requiring all six makes the form unsatisfiable — it would be impossible
  to submit. It stays off, which means an empty ballot is technically submittable
- **Creating a Google Doc/Form from a URL without a `/u/N/` prefix does not use the account
  you think it does.** `docs.google.com/forms/create` resolved to the personal
  `eahangarzadeh@gmail.com` session even though `docs.google.com/forms/u/0/` was the GUSD
  Workspace account and showed the GUSD chip and the VAPA forms. The first build of this
  ballot landed in the wrong account, where the responder dropdown offers only "Anyone with
  the link" — the domain restriction simply does not exist outside a Workspace account, so
  the mistake is invisible until you go looking for the setting. **Use the `/u/N/create`
  form of the URL, and confirm the owner in the share dialog before building anything.**
  Four Google accounts are signed in on this machine, which is what makes this easy to hit

### Open items (2026-10-04)

- **The gallery page's "rank your top three in the form" line is now correct** — the Form
  does ask for a top three. Note the coupling in the other direction: the Form description
  embeds the artifact URL, so if that page is ever republished to a *different* URL the Form
  description needs editing too
- **The six theme images are not in the repo.** They live outside `public/` deliberately
  (ballot material, not unit assets). If a theme wins and its art becomes part of the unit,
  it needs the full three-place treatment: a `METAPHORS`-style entry, a file under
  `public/`, and the prompt already in `THEME_PROMPTS`
- **`THEME_PROMPTS` stays in the endpoint after the vote is over.** Five of the six become
  dead weight once a theme is chosen. Prune them then, rather than leaving twelve ids live
  indefinitely
- **The border check is still not in `scripts/`**, and now has a documented blind spot
  (artwork-as-object-in-a-scene). If it ever gets committed, the limitation needs to go in
  the file header or it will be trusted further than it deserves

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
- Made `ae27.gusddev.app` the canonical home. Removed `ae26.vercel.app` from the project
  (note: a released `*.vercel.app` name can be claimed by anyone afterwards, so it should be
  considered gone for good rather than parked). Trimmed `ALLOWED_ORIGIN` to the two origins
  that still exist, and added a `rel="canonical"` tag pointing at `ae27.gusddev.app`
- **`artisticexpressions.gusddev.app` was deliberately left attached.** Its CNAME lives in a
  Cloudflare account separate from the one holding the other 25 zones, and detaching the
  domain from Vercel while that record still points at `cname.vercel-dns.com` would leave a
  dangling CNAME on a district subdomain — which anyone could then claim by adding that
  hostname to their own Vercel project. Correct order if it is ever retired: **delete the
  Cloudflare record first, confirm it stops resolving, then detach from Vercel.** The
  canonical tag means it no longer competes with `ae27` in the meantime
- **Fixed the `gh` account problem durably** rather than switching accounts by hand each
  session. The cause was that `credential.https://github.com.helper` was
  `!gh auth git-credential`, which serves whichever account `gh` has *active* — and that
  kept reverting to `emilpulse-code`, producing a 404 on push that reads like a missing
  repo rather than an identity mismatch. (The earlier guess that Git Credential Manager was
  responsible was wrong; the global config resets the helper list for `github.com`, so GCM
  never enters the picture there.) Replaced it with a repo-local helper,
  `~/.git-credential-github-ildottoregusd.sh`, which calls
  `gh auth token --user ildottoreGUSD` and so is independent of the active account.
  Verified by switching `gh` to `emilpulse-code` and confirming both an authenticated read
  and `git push --dry-run` against the private repo still succeed. Scoped per-repo so the
  other account's repos are unaffected — note that `gh` subcommands themselves
  (`gh pr create`, etc.) still follow the active account
- **Image generation felt sluggish; measured it before touching anything.** Baseline on
  production was ~9.2s total per image, of which ~8.8s was time-to-first-byte and only
  ~0.4s was transferring the payload on a fast connection — so ~95% of the wall clock was
  the model, not the network. Switched the default to `gemini-3.1-flash-lite-image`
  (~3.0s vs ~8.8s across three runs, output indistinguishable at the size this UI shows)
  and set `imageConfig` to 1:1 at 1K, since the panel is a roughly square box a few hundred
  CSS pixels wide and the model's default 16:9 was being cropped by `object-cover`.
  Result: ~4.0s end-to-end, 1024×1024, ~900KB JPEG (~1.2MB on the wire after base64).
  Roughly 2.3× faster, ~20% smaller, and no longer spending bytes on cropped pixels
- Remaining cost is the ~1.2MB payload, which is invisible on a fast connection and roughly
  5s on typical school wifi. Cutting it further means changing behaviour rather than
  configuration — a smaller render (softer on high-DPI screens, and this is an art site),
  returning raw bytes instead of base64 (−25%, needs a client change), or pre-generating
  the six images as static assets (instant and free per view, but the images stop being
  freshly generated). Left as an open decision rather than chosen unilaterally
- **Chose pre-generation.** The six metaphor images now ship as static assets in
  `public/metaphors/`, seeded into component state on mount, so selecting a metaphor is
  instant and costs nothing per view — no API call, no per-view billing, and the page keeps
  working even if the model is retired again. "Regenerate Visual" still calls the live API
  and replaces the static image for the rest of the session, so the generative feature is
  intact. Cache headers set to one day plus a week of stale-while-revalidate, since Vercel
  serves `public/` with `must-revalidate` by default and that costs a round trip per view.
  They were generated through the production endpoint rather than a local script, so no API
  key ever needed to exist on a developer machine
- **Found a real content bug while reviewing those images.** The `mountain` and `anchor`
  prompts read `Abstract ... painting of a ...`, and the model took "painting" as a noun to
  depict: it returned *photographs of framed canvases on walls and leaning in studios*,
  wall texture and floor included. Every generation of those two came back that way; the
  four prompts phrased `Abstract <thing>` never did. This affected the live Regenerate path
  too, not just the static defaults. Reworded both to "composition" and appended an
  explicit style suffix to all six ("fills the entire frame… the image is the artwork
  itself"). Verified across repeat generations afterwards — the framing is gone. Note there
  is still run-to-run variance: one post-fix `mountain` came back as a poster floating on
  white, and two immediately after it were clean, so the committed set was picked by eye
- **Closed out that variance.** `mountain` was the only prompt still drifting, and it had
  two causes specific to it. "Abstract minimalist … geometric triangles … high contrast" is
  the exact vocabulary of mid-century wall-art prints, so the model had every reason to
  render a print; and unlike the five prompts that never drifted, it carried no painterly
  surface language at all (the others say "textured paint", "bold lines", "thick monumental
  blocks", "organic shapes"). Dropped "minimalist", described the paint surface, and asked
  for slopes running off every edge. The shared style suffix now also names the failure
  modes actually observed — poster, print, margin, drop shadow — rather than only the
  frame-and-wall ones it already covered but which were never what mountain produced
- Verified by measurement rather than by eye: **10 consecutive regenerations, 10 full-bleed,
  none flagged.** The check scores each image on whether its border is uniform *and* the
  same on all four sides. The first version of that check used the spread of luminance
  around the whole border ring and produced a false positive — a minimalist composition
  with a flat sky over flat ground has a genuinely low-variance border while still bleeding
  off every edge. Requiring the four edges to also resemble each other separates "flat by
  style" from "flat because it is paper". Validated against a synthetic positive control
  (artwork pasted inset on a white ground), which scores 0/0 against a worst real image of
  18/33. Re-ran the other five prompts afterwards since the suffix change was global — all
  five still full-bleed
- Side effect worth knowing: mountain's style moved from flat geometric to oil-painted,
  because the flat-graphic vocabulary *was* the trigger. It now matches the other five,
  which were already painterly. The static default was regenerated to match, so it no
  longer jumps styles when a teacher hits Regenerate

### Where this was paused (2026-09-27)

Everything above is merged, deployed and verified on `ae27.gusddev.app`. Nothing is
half-finished. Open items, none urgent:

- **`artisticexpressions.gusddev.app` is still attached** to the Vercel project by choice.
  If it is ever retired: delete the Cloudflare CNAME **first**, confirm it stops resolving,
  *then* detach from Vercel — the reverse order leaves a dangling record on a district
  subdomain that a third party could claim. That zone is in a different Cloudflare account
  from the other 25, so it needs the district login
- **`ae26.vercel.app` was released** and can now be claimed by anyone. Treat it as gone, not
  parked
- **The full-bleed check is not in the repo.** It lives in a scratchpad and was used to
  verify the prompt work — worth adding under `scripts/` if this kind of prompt regression
  comes up again, though it is Windows PowerShell in an otherwise JS project
- **Payload is still ~1.2MB per live regeneration.** Irrelevant for the default view now
  that the six images are static, and only paid when a teacher hits Regenerate. If it ever
  matters, the untried levers are a 512px render (softer on high-DPI) or returning raw
  bytes instead of base64 (−25%, needs a client change)
- **`gh` subcommands still follow the active account**, which drifts to `emilpulse-code`.
  Git itself is pinned and unaffected; only `gh pr create` and friends need
  `gh auth switch --user ildottoreGUSD`.

  Investigated this properly rather than leaving it as folklore. The drift is **not caused
  by ordinary use**: with the wrong account deliberately active, neither git operations
  through the pinned helper, nor `gh auth token --user`, nor `gh repo view` changed it.
  There are no `GH_*` environment variables, no PowerShell profile, no Startup items and no
  registry Run entries referencing gh on this machine. The setting lives in
  `%APPDATA%\GitHub CLI\hosts.yml` under `user:` — tokens are in the OS keyring, not in
  that file. Since it has only ever been observed already-wrong at the *start* of a session,
  whatever flips it happens between sessions; the cause is still unidentified. Deliberately
  not building machinery for it: git is immune, and the gh case fails loudly with a 404 and
  takes one command to correct. Revisit only if it starts costing real time

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
