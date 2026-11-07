Objective: premium three-trailer fleet showroom from the Gemini render pack, without touching Lockii or switching the booking provider. Branch: feat/premium-fleet-showroom · delivery: push branch only, Vercel preview, no merge or production deploy · runner: vitest, tsc, eslint, next build, playwright (three suites)

## Specs
S1. "Do not rebuild the website from scratch." / "These are static CGI renders, not actual 3D models. Do not falsely implement or advertise full 3D rotation."
S2. Hero: "THREE TRAILERS. ENDLESS POSSIBILITIES." / "From moving equipment to transporting motorcycles and cars, find the right trailer for your next job." CTAs "Explore Our Trailers" and "Book a Trailer" (existing approved route).
S3. Three interactive fleet cards with verified specifications and approved rates only. "Do not invent the car trailer's rate, dimensions, payload, towing requirements or availability."
S4. Pages /trailers/tandem-cage-trailer, /trailers/motorcycle-trailer, /trailers/car-trailer. "If the car trailer is not yet configured in Lockii or Local Trailer Hire, do not invent a booking URL. Provide a working enquiry option."
S5. Image showroom: angles, transitions, thumbnails, fullscreen, zoom, keyboard, touch. "Never fake mechanical specifications."
S6. Comparison: "When information has not been confirmed, use a neutral description or omit the field."
S7. "Do not overwrite the existing Lockii integration. Do not remove feature flags." Local Trailer Hire stays the primary booking channel.
S8. SEO preserved and extended; reduced-motion, performance and accessibility; Playwright at 360/390/768/1440; "Do not merge into main or deploy to production until explicitly approved."

## Tasks
T1 S1,S3,S4,S7 fleet data, motorcycle listing facts, car enquiry-only · inline
T2 S1,S5 image pipeline, TrailerImage, ShowroomGallery · inline
T3 S2,S3 hero, fleet cards, motion · inline
T4 S4,S6,S8 trailer pages, comparison, breadcrumbs, sitemap, metadata · inline
T5 S7,S8 tests across all three Playwright suites · inline
T6 S8 docs, screenshots, branch push and preview · inline

## Log
L1 User brief: "Transform the existing On Call Trailers website into a premium, highly interactive, three-trailer showroom using the newly generated Gemini renders."
L2 Finding: motorcycle listing facts and rates read from the owner's own Local Trailer Hire page (2026-11-07). The car trailer has no listing.
L3 Finding: rewriting the cage page dropped its Lockii preview slot; the preview e2e suite caught it and it is restored.
L4 Finding: the local test server lacked a .txt content type, which made un-prefetched links hard-navigate; Vercel serves text/plain, which Next accepts.
