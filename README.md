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

Set both in the hosting provider's environment settings. Never commit real values.

## Before launch

All of these are placeholders and need the client's real details.

- [ ] **Fleet, prices and specs:** `src/data/trailers.ts` (reference pricing only; the car trailer's extra-hour rate is an assumption used by the estimator).
- [ ] **Business details:** `src/data/site.ts` (phone, email, pickup address, Instagram). Empty fields are hidden on the site.
- [ ] **FAQ answers:** `src/data/content.ts`, checked against the client's real policies.
- [ ] **Rental terms and privacy pages:** not included, so no legal text is invented. Add them from the client's documents.
- [ ] **Lockii widget id:** `NEXT_PUBLIC_LOCKII_ID`.
- [ ] **Domain:** confirm `NEXT_PUBLIC_SITE_URL`.

## Structure

```
src/app/            routes, metadata, sitemap, robots
src/components/     UI, including the animated hero, road trailer and booking journey
src/data/           site info, fleet, copy and FAQ (edit content here)
src/lib/estimate.*  hire price estimator and its tests
public/             logo and social image
```

Animations respect the visitor's reduced-motion setting.
