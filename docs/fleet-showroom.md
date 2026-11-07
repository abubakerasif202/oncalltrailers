# Fleet showroom: how it works and what is still unconfirmed

The home page, `/trailers` and three trailer pages now present a three-trailer fleet using the supplied CGI render
pack. Booking is unchanged: every booking button goes to Local Trailer Hire. The Lockii widget code and its flags are
untouched (see `lockii-integration.md`).

## Pages

| Page | Notes |
| --- | --- |
| `/` | Night-harbour hero (Opera House and Harbour Bridge, with the flashlight shine) carrying the new headline, then fleet cards, comparison table and the existing sections |
| `/trailers` | Fleet cards and comparison |
| `/trailers/tandem-cage-trailer` | 12x6 cage box trailer (existing URL kept) |
| `/trailers/motorcycle-trailer` | Motorcycle x3 Trailer: indexable, in the sitemap |
| `/trailers/car-trailer` | Enquiry only: `noindex`, not in the sitemap, no booking link |

All three trailer pages share one template (`src/components/TrailerPage.tsx`) and one data source (`src/data/fleet.ts`).

## Where the facts come from

- **Cage trailer:** the owner's listing, as before (`src/data/listing.ts`).
- **Motorcycle trailer:** the owner's own listing page, read on 2026-11-07 (`src/data/motorcycleListing.ts`): 7' x 5',
  570 kg payload, 180 kg tare, 750 kg ATM, 7-pin flat connector, folding loading ramp, built 2003, and $38.34 total per
  day for a short hire, $35.94 per day at 4+ days, $33.54 per day at 7+ days. The listing states no axle count, brake
  type, pickup suburb or reviews, so the site shows none.
- **Car trailer:** nothing. It has no listing, rate, specification or booking route, so the card and page say
  "To be confirmed" and offer an enquiry (phone or contact page).
- **Renders:** illustrative CGI only. They are labelled as such. The renders disagree with each other in places (the
  motorcycle trailer shows one axle in two images and two in another; the car trailer's ramps differ), so alt text and
  captions never state an axle count or ramp, and the specification tables come only from the listings.

## Booking behaviour

- Cage card/page buttons open the cage listing; motorcycle buttons open the motorcycle listing.
- The header, drawer, footer and sticky bar buttons follow the trailer being viewed (`ContextualBookingLink`): the
  motorcycle page opens the motorcycle listing, the car page shows "Enquire", everywhere else opens the cage listing.
- No Lockii widget or Lockii URL is used on the new pages, so the car trailer cannot be sold through an unverified
  route and there is no price conflict with the widget's own values.

## When the car trailer is confirmed

In `src/data/fleet.ts`, for the `car-trailer` entry: add its listing (`booking`), approved `rates`, `specs`,
`keySpecs` and `features` with a source note, then set `verified: true`. That one flag adds the page to the sitemap and
removes `noindex`. Add any new approved price to `approvedPrices` in `scripts/check-export-claims.mjs`.

## Images

Originals are kept in `design-assets/3d-render-pack-original/` (not served). `node scripts/build-trailer-images.mjs`
writes the responsive WebP set to `public/images/trailers/` (cutouts keep transparency). Pages use `srcSet`, explicit
width and height, lazy loading below the fold, and a single high-priority hero image. On phones the home hero uses the
portrait poster so all three trailers stay in frame.

## Motion

Fleet cards use CSS transforms and opacity only: a gentle float with a moving shadow, a metallic sweep, hover
elevation, and pointer-driven tilt and parallax through the site's existing `data-tilt` handler (desktop pointers only).
Everything stops for `prefers-reduced-motion` and for the site's pause button.

## Image viewer

`ShowroomGallery`: crossfading stage, three thumbnails, previous/next, arrow keys, swipe, and a fullscreen viewer with
zoom (100–300%, `+`, `-`, `0`), focus trapping and focus return. These are separate render views, not 3D rotation.

## Checks

`npm run lint`, `typecheck`, `test`, `build`, `check:claims`, `test:e2e` (production build), `test:e2e:lockii` and
`test:e2e:lockii:live` (provider stubbed). Both Lockii suites rebuild `out/`, so finish with `npm run build`.

## Owner questions

1. Is the car trailer real, registered and bookable? Its size, payload, towing requirements, rate and booking route.
2. "Three trailers" in the hero now means three trailer types. The cage page used to say there are three cage
   trailers; that count is no longer shown. Is it still correct, and should it return?
3. Pickup location for the motorcycle trailer (its listing shows a map but no suburb in its text).
4. Real photographs of each trailer, to sit beside or replace the renders.
5. An analytics tag, if funnel events (`booking_cta_click`, `local_trailer_hire_click`, `trailer_detail_view`) should
   be recorded.
