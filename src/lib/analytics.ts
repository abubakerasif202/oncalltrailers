/**
 * Booking funnel events. They are pushed to `window.dataLayer` when a tag manager has created it, and always
 * announced as an `oct:track` DOM event so tests (or a later analytics tag) can listen without a vendor script.
 *
 * Deliberately absent: a "booking completed" or purchase event. A click, a page view or a return page is not
 * proof of payment. Add one only from a verified payment-success signal (see docs/lockii-integration.md).
 */
export type TrackedEvent =
  | 'trailer_detail_view'
  | 'booking_cta_click'
  | 'local_trailer_hire_click'
  | 'lockii_flow_entry';

export type TrackParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackedEvent, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return;
  const detail = { event, ...params };
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent('oct:track', { detail }));
}

/** Where on the page a booking link sits, from the closest landmark. */
export function placementOf(element: Element): string {
  const landmarks: readonly (readonly [selector: string, name: string])[] = [
    ['.sticky-book', 'sticky_bar'],
    ['.site-header', 'header'],
    ['.hero', 'hero'],
    ['.panel', 'trailer_panel'],
    ['.site-footer', 'footer'],
  ];
  for (const [selector, name] of landmarks) if (element.closest(selector)) return name;
  return 'page';
}
