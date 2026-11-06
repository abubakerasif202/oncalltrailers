Objective: premium, honest, easy-to-book On Call Trailers site (benchmark for clarity: jdtrailerhire.com.au, original design). Supersedes final-polish S1 where they conflict (road, marquee, hotspots are reduced or removed on the user's explicit new instruction).
Branch: feat/premium-trailer-hire (from chore/final-polish 5968869) · delivery: single feature branch, slices committed · runner: vitest, tsc, eslint, next build, playwright · no deploy, no merge

## Specs
S1. Booking: "Find the owner's actual booking URL or configured integration in the project." / "If no verified destination exists, use an honest 'Enquire about availability' action connected to the existing contact method." / "Do not invent a booking link or imply that payment, availability or access is connected when it is not." / "Remove dead ends and misleading 'Check availability' loops."
S2. Hero: headline "Sydney trailer hire. Ready when you are." · primary CTA "Check availability." · secondary CTA "View trailer." · "Show the pickup suburb only if verified." · trailer, headline and main CTA visible on mobile.
S3. Homepage order: hero; compact strip of verified benefits; trailer showcase with specs and booking action; three steps (book, collect, return); genuine reviews and real fleet photos if available; pickup and collection; essential FAQs; final CTA and complete footer. "Remove or substantially reduce the oversized moving brand marquee." One pricing component only with approved data.
S4. Trailer showcase and detail page: gallery, consistent image ratios, intended uses, owner-approved pricing, compact spec table, pickup information, booking action. "Hide unsupported specifications and hotspots from the public UI until verified." One trailer type, three trailers; no invented categories.
S5. Remove demo content and unverified claims: demo prices, accessory prices, "Booking integration is being connected.", placeholder collection instructions, 24/7 access, ADR, maintenance after every hire, roadside, insurance, GPS, refund, no-bond. "Do not simply remove the word 'demo' and leave an unverified price looking real."
S6. Trust: business name and ABN, phone, pickup suburb only if verified, policies only if they exist. "Do not invent legal terms or publish an assumed pickup address."
S7. Motion: "Reduce competing particles, giant moving typography and decorative travelling-trailer effects." Keep the pause control, prefers-reduced-motion, content visible without JS.
S8. Mobile and accessibility at 360, 390, 430, 768, 1440: no overflow, touch targets, accessible menu, focus, contrast, compact mobile CTA.
S9. SEO: keep URLs; titles, descriptions, canonical, social metadata; accurate alt; hero priority; lazy below the fold; no fabricated review or offer schema.
S10. Validate: lint, typecheck, build, tests, browser checks, screenshots. Report remaining owner info and blocked integration with the exact reason.

## Tasks
T1 S1,S5 booking module, claims cleanup, tests · inline
T2 S2,S3,S5,S6 homepage restructure, hero, header, footer, sticky bar · inline
T3 S4 trailer gallery, showcase, detail page, trailers page, contact, how-it-works, faq · inline
T4 S7 motion reductions · inline
T5 S9 metadata, og url, hero alt · inline
T6 S8,S10 export claims check, e2e rewrite, screenshots, validation · inline

## Log
L1 (2026-11-07) user brief: "Upgrade the On Call Trailers website to a premium, polished trailer-hire experience, using https://jdtrailerhire.com.au/ as a benchmark for booking clarity and customer confidence." (full 10-point brief quoted in Specs S1-S10).
L2 Finding: no Lockii widget ID or booking URL exists in the repo, its git history, docs, or the deployed build (production renders the not-connected placeholder). Booking integration is blocked on owner input; the site ships the honest enquiry (phone) mode, with the Lockii widget activating only when NEXT_PUBLIC_LOCKII_ID is set.
