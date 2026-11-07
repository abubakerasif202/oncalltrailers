# Production-export interaction tests

## Run

```powershell
npm ci
npx playwright install chromium firefox webkit
npm run lint
npm run test
npm run typecheck
npm run build
npm run test:e2e
npm audit --omit=dev
```

`npm run test:e2e` builds a fresh static production export, starts a loopback-only
QA server on `127.0.0.1:43187`, runs the suite and stops its server. It intentionally
refuses to reuse an occupied port, so it cannot silently test another app or an old
build. The existing `npm start` and deployment configuration are unchanged.

The shared production build normalizes the generated Next.js 16.4.1 segment
filenames on Windows, preserving payloads and original files. Linux exports are
already flat and remain unchanged. This avoids prefetch 404s on an ordinary static
host; the QA server contains no special RSC rewrites. Regression tests verify
normalization, idempotence, unchanged Linux files and collision rejection.

For one project: `npm run test:e2e -- --project=chromium-375`.
For interactive debugging: `npm run test:e2e:ui`.

## Coverage and evidence

- Chromium: 375, 768, 1024 and 1440px.
- Firefox: 1440px; WebKit: 375px with touch/mobile emulation.
- Mobile menu keyboard activation, focus containment/restoration, closing,
  navigation and desktop-resize cleanup.
- Reservation keyboard controls, Escape, backdrop and close controls, repeated
  opening, preserved duration/equipment, reduced motion and site animation pause.
- Six production routes checked for overflow; modal viewport containment,
  accessible names/descriptions and runtime errors checked separately.
- Most checks use OS reduced motion for deterministic interaction testing; the
  preference test explicitly switches back to normal motion before testing pause.
- Desktop projects intentionally skip the mobile-only navigation test.

HTML results are in `playwright-report/`; screenshots and retry traces are in
`test-results/`. Both are ignored by Git. Open results with
`npx playwright show-report`, or inspect a failure with
`npx playwright show-trace <trace.zip>`.

## Booking boundary

The default suite builds the production configuration: the online-booking widget is off, and the suite asserts no widget
script, markup or request exists on any route. Requests to the widget provider and Local Trailer Hire are aborted.

`npm run test:e2e:lockii` builds a preview (`NEXT_PUBLIC_LOCKII_MODE=preview`) on port 43188 and runs `e2e-lockii/`. The
provider script is replaced by an inert stub that records clicks; the suite proves the shield blocks them. Both suites build
into `out/`, so run them one after the other. Neither suite submits a reservation, charges a payment or proves
availability. Real-device Safari/Android and live provider/payment verification remain separate.
