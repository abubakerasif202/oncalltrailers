import { site } from '@/data/site';

/**
 * Single source of truth for every booking call to action.
 *
 * Bookings are completed on the owner's rental platform (an external site), so every CTA says so
 * and opens it in a new tab. The phone number stays available as a second route.
 */
export const BOOKING_URL = 'https://www.localtrailerhire.com.au/u/614c78ad-b2b7-4b0e-b4c8-1e266b2caa3d';

export interface Booking {
  /** Main call to action label. */
  label: string;
  /** Shorter label for tight spaces (header, sticky bar). */
  shortLabel: string;
  href: string;
  /** Host shown to the visitor before they leave the site. */
  host: string;
  /** tel: link for the owner's phone, or null. */
  tel: string | null;
}

export function telHref(phone: string | null): string | null {
  return phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null;
}

export function getBooking(): Booking {
  return {
    label: 'Check availability',
    shortLabel: 'Book now',
    href: BOOKING_URL,
    host: new URL(BOOKING_URL).hostname.replace(/^www\./, ''),
    tel: telHref(site.phone),
  };
}
