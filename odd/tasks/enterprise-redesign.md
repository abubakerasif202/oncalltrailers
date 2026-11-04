Objective: full Hallmark redesign of oncalltrailers.vercel.app, enterprise-grade premium motion, brand kept (electric blue, Barlow Condensed/Barlow, the night-harbour photography).
Branch: feat/enterprise-redesign · delivery: ask-on-risk, one slice · runner: vitest (estimate tests untouched), next build (static export)

## Specs
S1. "redesign a wholesite more premium animation enterprises level" (L1): all six pages redesigned in full depth, with richer, enterprise-grade animation.
S2. Content kept: the live copy in public/*.html is the inventory; wording changes only where a copy gate names a line, and each is listed in the handoff.
S3. Wiring kept: every link (/trailers#book, /how-it-works, /faq, /contact, /trailers/tandem-cage-trailer, #towing, tel:+61490176809, https://abwebstudio.com.au), the hire estimator, no invented metrics, quotes or logos.
S4. The live site's source is the compiled snapshot (src/ was stale); the site is rebuilt in src/ as a Next.js static export and deployed from `out/` (vercel.json).
S5. Motion respects prefers-reduced-motion, transform and opacity only, content visible without scripting.
S6. Brand tokens: #087eff electric, #071322 panel, Barlow Condensed display, Barlow body (self-hosted woff2).

## Tasks
T1 S4 inline: static export config, vercel.json, package build script
T2 S5-S6 inline: tokens, base, site.css, layout, motion primitives
T3 S1-S3 inline: Home page
T4 S1-S3 inline: Trailers, trailer detail
T5 S1-S3 inline: How it works, FAQ, Contact, 404
T6 sweep: sloplint, build, tests, compare, handoff

## Log
L1 (2026-11-05) user: "redesign a wholesite more premium animation enterprises level"
L2 (2026-11-05) user: "yes go with yr recomendation" (rebuild in src/ as a Next static export, deploy the output)
