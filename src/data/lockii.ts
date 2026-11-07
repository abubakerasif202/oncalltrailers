/**
 * Lockii online-booking integration: identifiers, build-time mode and the product map.
 *
 * Nothing here is a secret. The company and product IDs are public widget identifiers; operator API keys
 * and payment credentials must never be added to this repository.
 *
 * The integration is OFF unless a build opts in. Production keeps booking through Local Trailer Hire
 * (src/data/booking.ts) until every release blocker in docs/lockii-integration.md is closed.
 */

export const LOCKII = {
  companyId: 'company_hg6xlx8',
  /** Public widget ID used by the embed script's data-lockii-id attribute. */
  widgetId: 'hg6xlx8',
  scriptSrc: 'https://book.lockii.app/widget.js',
  /** Script element id, so the embed script is only ever injected once per document. */
  scriptId: 'lockii-widget',
  products: {
    /** 12x6 Cage Box Trailer: maps to /trailers/tandem-cage-trailer. */
    cage: 'product_01a19102-9dd1-77ba-8a1e-b873a4e37fe4',
    /** Motorcycle x3 Trailer: no public page, specifications or approved photos on this site yet. */
    motorcycle: 'product_01a19103-22b0-738d-a605-047c6ab43ad8',
  },
} as const;

/**
 * off     – no widget script, no widget markup. This is the production behaviour.
 * preview – the widget renders inside a shield that blocks every click, key press and tab stop, so it
 *           can be reviewed without any transactional interaction. There is deliberately no "live" mode:
 *           enabling real checkout is a separate, owner-approved change (see docs/lockii-integration.md).
 */
export type LockiiMode = 'off' | 'preview';

/** Resolved at build time. Unset, unknown or Vercel-production environments always resolve to "off". */
export function getLockiiMode(env: Readonly<Record<string, string | undefined>> = process.env): LockiiMode {
  if (env.VERCEL_ENV === 'production') return 'off';
  return env.NEXT_PUBLIC_LOCKII_MODE === 'preview' ? 'preview' : 'off';
}
