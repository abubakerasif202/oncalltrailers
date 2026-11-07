# On Call Trailers

Marketing site for On Call Trailers, a self-service trailer hire business in Sydney. Built with Next.js (App Router, static export), Tailwind CSS v4 and `motion`. The design system lives in `src/styles/`: brand tokens in `tokens.css`, base rules in `base.css`, components and motion in `site.css`. Bookings are completed on the owner's external booking page (`src/data/booking.ts`, single source for every booking CTA).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/ (what Vercel serves: see vercel.json)
npm run start      # serves out/ locally
```

Checks: `npm run typecheck`, `npm run lint`, `npm run test`. After `npm run build`, `npm run check:claims` scans the exported HTML for demo copy, prices and unverified access or compliance claims.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for canonical links, sitemap and structured data. Defaults to `https://www.oncalltrailers.com.au`. |

| `NEXT_PUBLIC_ALLOW_INDEXING` | The site is indexable by default, matching the live `public/robots.txt`. Set to `false` to serve `noindex` metadata. |

| `NEXT_PUBLIC_LOCKII_MODE` | Online booking widget. Unset means off (production). `preview` renders it inside a click-blocking shield on a protected Preview deployment only. See `docs/lockii-integration.md`. |


Set these in the hosting provider's environment settings. Never commit real values.

## Before launch

All of these are placeholders and need the client's real details.

- [ ] **Price, size and capacity:** `src/data/trailers.ts`. The fleet is 3 identical galvanised tandem cage trailers; the $5/hour rate is reference pricing only and the trailer's size and capacity are not stated yet.
- [ ] **Business details:** `src/data/site.ts`. Phone and ABN are set; still missing email, pickup address and Instagram. Empty fields are hidden on the site.
- [ ] **FAQ answers:** `src/data/content.ts`, checked against the client's real policies.
- [ ] **Rental terms and privacy pages:** not included, so no legal text is invented. Add them from the client's documents.
- [ ] **Domain:** confirm `NEXT_PUBLIC_SITE_URL`.
- [ ] **Go live for search:** set `NEXT_PUBLIC_ALLOW_INDEXING=true` and redeploy. Until then the site is `noindex`.

## Structure

```
src/app/            routes, metadata, sitemap
src/styles/         design tokens, base rules, site CSS (motion included)
src/components/     UI: animated hero, pinned trailer anatomy scene, hire calculators, scroll reveals
src/data/           site info, fleet, copy and FAQ (edit content here)
src/lib/estimate.*  hire price estimator and its tests
public/             logo, favicon, social image, robots.txt (static files only; pages are generated)
```

Animations use transform and opacity only, respect the visitor's reduced-motion setting, and leave all content visible when scripting is off.
