Objective: prepare the premium site for the Lockii online booking widget without disturbing Local Trailer Hire bookings. Branch: feat/lockii-integration-preview · delivery: one branch, no push, no deploy · runner: vitest, tsc, eslint, next build, playwright (two suites)

## Specs
S1. "Do not modify Lockii prices, stock, payment settings, integrations, locks or booking policies." / "Do not activate a real checkout, generate booking records, change production CTAs or deploy a live booking cutover."
S2. "Keep Local Trailer Hire as the primary production booking route." Existing booking links unchanged.
S3. Reusable widget wrapper, feature flag disabled by default in production, planned /book and /manage-booking, trailer page integration point, loading and failure fallbacks, responsive containers, accessible focus and keyboard handling.
S4. "prevent transactional interaction until pricing and payment readiness have been approved."
S5. Preserve SEO, schema, premium design. Install the widget script once; no duplicate JSON-LD.
S6. Track trailer views, website CTA clicks, Local Trailer Hire clicks; completed bookings "only through a verified payment-success signal".
S7. Tests at 360, 390, 768, 1440; no real orders, payments, customer records or lock codes.
S8. Deliver status, blockers, owner approvals, go-live checklist and rollback. "Do not merge or deploy to production without explicit approval."

## Tasks
T1 S1,S3,S5 mode flag, wrapper, routes, trailer integration · inline
T2 S4 shield, fallback, tests · inline
T3 S6 funnel events · inline
T4 S5,S7 production isolation check, e2e (default and preview suites) · inline
T5 S8 docs/lockii-integration.md · inline

## Log
L1 User brief: "Integrate Lockii into the existing premium On Call Trailers website without disrupting the current Local Trailer Hire booking operation."
L2 Finding: widget.js enables JSON-LD injection and an AI chat overlay by default, and only reads dataLayer (never pushes). Both disabled with attributes taken from the widget source.
L3 Finding: the real widget shows $85.00 beside the site's approved $83.86. Preview must stay protected until pricing is approved.
