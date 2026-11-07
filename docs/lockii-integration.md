# Online booking integration: status, blockers and launch plan

Status: **preview-ready, not launch-ready.** The site is technically prepared for the online booking widget, but it
ships switched off. Customers keep booking through Local Trailer Hire. Nothing here changes provider prices, stock,
payments, integrations, locks or booking policy, and no checkout, booking record or payment is created by the site or
its tests.

## What is built

| Piece | Where |
| --- | --- |
| IDs, product map, build-time mode | `src/data/lockii.ts` (`off` by default; `preview` only when `NEXT_PUBLIC_LOCKII_MODE=preview`; always `off` when `VERCEL_ENV=production`) |
| Widget wrapper: loads the script once, mounts elements after hydration, loading state, failure fallback, click-blocking shield | `src/components/LockiiEmbed.tsx`, `src/components/LockiiSlot.tsx`, `src/styles/booking.css` |
| Planned routes | `/book` (browse widget plus per-trailer buttons), `/manage-booking` (account widget). Holding pages while off. `noindex`, not in the sitemap, not in navigation. |
| Trailer page integration point | `src/app/trailers/tandem-cage-trailer/page.tsx`: a cage-trailer button inside the hire panel, preview only |
| Funnel events | `src/lib/analytics.ts`, `BookingAnalytics.tsx`, `TrackView.tsx` |
| Production isolation guard | `npm run check:claims` fails if any exported page or bundle contains widget code while the mode is off |
| Tests | `npm run test:e2e` (production build) and `npm run test:e2e:lockii` (preview build, provider stubbed) |

Unchanged: every existing booking link, phone link, the header/footer/sticky bar, SEO metadata, canonical URLs,
the single `LocalBusiness` JSON-LD block, imagery, motion and AB Web Studio credit.

### Widget script attributes

Supplied snippet: `data-lockii-id="hg6xlx8"` and `data-analytics="on"`. In the build we use:

| Attribute | Value | Why |
| --- | --- | --- |
| `data-lockii-id` | `hg6xlx8` | as supplied |
| `data-analytics` | `off` in preview | a preview must not record visits. Set to `on` at launch. |
| `data-schema` | `off` | **Taken from the provider's own `widget.js` source, not the account snippet.** Its JSON-LD injection is on by default and would add a second structured-data block beside the site's. Review it deliberately before enabling. |
| `data-support-chat` | `off` | Same source. An on-page AI chat overlay is on by default. |

Please ask the provider to confirm these two attributes are supported and stable.

### How the preview is protected

The widget is a cross-origin frame whose frames allow payment, so clicks cannot be blocked from inside it. In preview
the widget host is `inert` (no pointer, keyboard or tab access) and covered by a shield, with a visible "Preview only"
note. Tests prove a pointer click, Enter, Space and 40 Tab presses never reach the widget.

The shield is a safety layer, not access control. Static export has no server, so protect the preview deployment
itself: enable Vercel Deployment Protection on Preview, scope `NEXT_PUBLIC_LOCKII_MODE=preview` to the **Preview**
environment only, and keep `NEXT_PUBLIC_ALLOW_INDEXING=false` there. Never set it in Production.

## What the preview showed (real widget, read-only, analytics off)

- One script, no duplicate on client-side navigation, no injected schema, no chat overlay, no console errors, no
  horizontal overflow at 360, 390, 768 and 1440.
- **The widget's own prices differ from the site's.** On the trailer page it shows `$85.00 / 1 day` for the 12x6 next
  to the site's `$83.86` short-hire total, and `$40.00 / 1 day` for the motorcycle trailer. These are the configured
  tier totals from the audit, not approved prices. The preview must not be public until pricing is approved.
- The browse widget is tall (about 1,250 px on phones) and renders as a light card on the dark site. Cross-origin
  styling cannot be changed from here; the frame, spacing and a dimmed surface are what the site controls.
- The widget also appends one off-screen overlay frame to the page body. It stays inactive until a user action inside
  the widget, which the shield blocks.

## Pricing decision

**Local Trailer Hire prices are the source of truth.** Owner decision, recorded after checking the owner profile page
(https://www.localtrailerhire.com.au/u/614c78ad-b2b7-4b0e-b4c8-1e266b2caa3d) on 2026-11-07:

| Product | Local Trailer Hire (kept) | Lockii widget (must be changed by the owner to match) |
| --- | --- | --- |
| 12x6 Tandem Cage Box Trailer | $83.86 total per day (short hire); $77.87 at 4+ days and $71.88 at 7+ days from the listing page | $85.00 for 1 day |
| Motorcycle x3 Trailer | $38.34 total per day | $40.00 for 1 day |

- The site publishes only the three 12x6 rates in `src/data/listing.ts`. No site price was changed.
- The motorcycle price is recorded here as evidence only. It is not published until that trailer is approved for the site.
- This integration never edits Lockii prices. Lockii must be reconfigured by the owner so every duration boundary,
  including GST and the checkout total, equals the Local Trailer Hire figure, or the widget stays off.

## Release blockers (unresolved, from the audit)

1. Pricing tiers look wrong: the configured totals ($85 / $75 / $70 then $65 per extra day for the cage trailer;
   $40 / $35 / $30 then $25 for the motorcycle trailer) decrease with duration, which reads as per-booking totals
   rather than per-day rates. Not corrected here; Joseph must confirm the intended prices.
2. Stripe payment capability is unverified.
3. The third trailer is unverified.
4. No smart locks are connected, so no lock codes can be issued.
5. Pickup hours are inconsistent between sources. The site shows `5:00 AM – 11:30 PM, Monday to Sunday` from the
   Local Trailer Hire listing.
6. Two-way Local Trailer Hire synchronisation is not proven.
7. Pending-import stock blocking is unverified.
8. **No verified payment-success signal exists**, so no "booking completed" event is wired (see Analytics).
9. The motorcycle trailer has no public page, verified specifications, photos or approved rates, so only the 12x6 is
   mapped to a page. The motorcycle button appears only on the preview `/book` page.

## Local Trailer Hire and direct bookings: how they would stay in step

Do not activate Marketplace Import, and do not take direct bookings on shared stock, until one of these holds:

- **Channel-separated inventory (safest):** each physical trailer is allocated to exactly one channel, so the two
  systems can never both sell it.
- **Verified conflict prevention:** every direct booking, cancellation and extension is reflected on Local Trailer
  Hire, and every Local Trailer Hire booking blocks direct stock, with a tested latency shorter than the shortest
  possible double-booking window.

Questions to put to both providers before choosing:

| Event | Question |
| --- | --- |
| New booking on either side | Does it block the other side immediately, or on a delay? What happens inside the delay? |
| Cancellation | Does the freed stock reappear on the other side, and how fast? |
| Extension | Is an extension checked against the other side's bookings, or only its own? |
| Stock allocation | Is stock a shared pool or per-channel? What does "pending import" do to availability? |
| Failure | If sync fails, which side wins, and who is told? |

Until then: Local Trailer Hire stays the primary route.

## Analytics

Events are pushed to `window.dataLayer` when a tag manager has created it, and always raised as an `oct:track` DOM
event. **No analytics vendor tag is installed**, so nothing is recorded today; installing one is an owner decision.

| Event | Fires when |
| --- | --- |
| `trailer_detail_view` | the trailer page loads |
| `booking_cta_click` | any website booking button is clicked (`placement`, `destination`) |
| `local_trailer_hire_click` | the same click, as the outbound Local Trailer Hire click |
| `lockii_flow_entry` | **not built.** Reserved for after launch approval, when the widget is interactive. |
| booking completed | **not built.** Add only from a verified payment-success signal, for example a confirmed server-side webhook or a documented provider message. A click or a return-page visit is never a purchase. |

The widget does not push to `dataLayer`; it only reads consent entries from it. Its own analytics are off in preview.

## Content security

`vercel.json` sets no Content-Security-Policy today, so nothing blocks the widget. If one is added, allow
`book.lockii.app` and `cdn.lockii.app` for `script-src`, `frame-src`, `connect-src` and `img-src`.

## Owner approvals required before launch

1. Lockii reconfigured to the Local Trailer Hire prices (see Pricing decision), checked at every duration boundary, including GST and the final checkout total.
2. Stripe payments verified end to end with a real test purchase made by the owner.
3. Confirmation of how many trailers exist and which are on which channel.
4. Decision on channel-separated inventory or verified synchronisation, and the Marketplace Import position.
5. Pickup hours and the lock or key-handover method, stated accurately to customers.
6. Whether to publish the motorcycle trailer, with specifications and photos.
7. Provider confirmation of the `data-schema` and `data-support-chat` attributes, and a decision on structured data.
8. An analytics tag, and a verified payment-success signal for completed bookings.
9. Terms, cancellation and extension policies shown at booking.
10. Written go-ahead for a live cutover. The code has no live mode; it needs a separate change.

## Go-live checklist

- [ ] All ten approvals above recorded.
- [ ] A live mode implemented in a new reviewed change: widget interactive, `data-analytics="on"`, shield removed, the
      production guard in `getLockiiMode` deliberately changed.
- [ ] `npm run lint`, `typecheck`, `test`, `build`, `check:claims` (the isolation check is relaxed for the widget-on
      build; confirm the claims check still passes), `test:e2e` and `test:e2e:lockii` green.
- [ ] Staging walk-through by the owner: a real booking, a cancellation and an extension, with the lock, payment and
      Local Trailer Hire effects checked.
- [ ] Prices in the widget equal prices on the site, at every duration boundary.
- [ ] `/book` and `/manage-booking` added to the sitemap and navigation, `noindex` removed.
- [ ] Local Trailer Hire links kept as a visible fallback.
- [ ] Deploy to Production only with explicit owner approval.

## Rollback

1. In Vercel, remove or set `NEXT_PUBLIC_LOCKII_MODE` to `off`, then redeploy. Every widget script, element and route
   body disappears; `/book` and `/manage-booking` return to holding pages.
2. If a live change shipped, redeploy the previous Production deployment from Vercel (Instant Rollback), or revert the
   merge commit and push.
3. Existing Local Trailer Hire links were never removed, so customers can always book there.
