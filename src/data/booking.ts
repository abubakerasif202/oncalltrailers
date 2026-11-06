import { LISTING_URL, PLATFORM_HOST } from '@/data/listing';
import { site } from '@/data/site';

/**
 * Single source of truth for every booking call to action.
 *
 * Every booking button goes to the linked 12x6 trailer listing on Local Trailer Hire, an external site,
 * and opens in a new tab. The phone number stays available as a second route.
 */
export const BOOKING_URL = LISTING_URL;

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
    host: PLATFORM_HOST,
    tel: telHref(site.phone),
  };
}
