# On Call Trailers

Marketing site for On Call Trailers, a self-service trailer hire business in Sydney. Built with Next.js (App Router), Tailwind CSS v4 and `motion`. Bookings, payments, ID checks and lock codes are handled by the client's [Lockii](https://www.lockii.app) account through its embedded booking widget.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

Checks: `npm run typecheck`, `npm run lint`, `npm run test`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_LOCKII_ID` | The `data-lockii-id` value from the client's Lockii embed snippet. While empty, the booking section shows a placeholder panel. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for canonical links, sitemap and structured data. Defaults to `https://www.oncalltrailers.com.au`. |

| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` at launch. Anything else (including unset) serves `noindex` and `Disallow: /` so the placeholder site stays out of search results. |

Set these in the hosting provider's environment settings. Never commit real values.

## Before launch

All of these are placeholders and need the client's real details.

- [ ] **Price, size and capacity:** `src/data/trailers.ts`. The fleet is 3 identical galvanised tandem cage trailers; the $5/hour rate is reference pricing only and the trailer's size and capacity are not stated yet.
- [ ] **Business details:** `src/data/site.ts`. Phone and ABN are set; still missing email, pickup address and Instagram. Empty fields are hidden on the site.
- [ ] **FAQ answers:** `src/data/content.ts`, checked against the client's real policies.
- [ ] **Rental terms and privacy pages:** not included, so no legal text is invented. Add them from the client's documents.
- [ ] **Lockii widget id:** `NEXT_PUBLIC_LOCKII_ID`.
- [ ] **Domain:** confirm `NEXT_PUBLIC_SITE_URL`.
- [ ] **Go live for search:** set `NEXT_PUBLIC_ALLOW_INDEXING=true` and redeploy. Until then the site is `noindex`.

## Structure

```
src/app/            routes, metadata, sitemap, robots
src/components/     UI, including the animated hero, road trailer and booking journey
src/data/           site info, fleet, copy and FAQ (edit content here)
src/lib/estimate.*  hire price estimator and its tests
public/             logo and social image
```

Animations respect the visitor's reduced-motion setting.
