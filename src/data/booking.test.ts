import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { BOOKING_URL, getBooking, telHref } from '@/data/booking';
import { Rates } from '@/components/Rates';
import { Reviews } from '@/components/Reviews';
import { SpecTable } from '@/components/SpecTable';
import { cover, coverNote, LISTING_URL, listingStats, ownerStats, PROFILE_URL, rates, reviews, specTable } from '@/data/listing';

describe('booking destination', () => {
  it('points every booking CTA at the owner-supplied external booking page', () => {
    const booking = getBooking();
    expect(booking.href).toBe(BOOKING_URL);
    expect(booking.href).toBe(LISTING_URL);
    expect(booking.href).toContain('/l/12x6-tandem-cage-box-trailer-haberfield/');
    expect(new URL(booking.href).protocol).toBe('https:');
    expect(booking.host).toBe('localtrailerhire.com.au');
    expect(booking.label).toBe('Check availability');
  });

  it('opens externally in a new tab, safely, and names the destination for screen readers', () => {
    const html = renderToStaticMarkup(createElement(BookingLink));
    expect(html).toContain(`href="${BOOKING_URL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('opens the Local Trailer Hire listing on localtrailerhire.com.au in a new tab');
    expect(html).toContain('Check availability');
  });

  it('honours a custom label and the short label', () => {
    expect(renderToStaticMarkup(createElement(BookingLink, { short: true }))).toContain('Book now');
    expect(renderToStaticMarkup(createElement(BookingLink, null, 'Hire this trailer'))).toContain('Hire this trailer');
  });

  it('tells visitors where booking happens without promising anything about payment or access', () => {
    const html = renderToStaticMarkup(createElement(BookingNote));
    expect(html).toContain('localtrailerhire.com.au');
    expect(html).not.toMatch(/instant|secure|pin|sms|24\/7/i);
  });

  it('builds a clean tel: link and tolerates a missing phone', () => {
    expect(telHref('+61 490 176 809')).toBe('tel:+61490176809');
    expect(telHref(null)).toBeNull();
  });
});

describe('listing attribution', () => {
  it('keeps listing statistics separate from owner-profile statistics', () => {
    expect(listingStats.reviews).toBe(45);
    expect(ownerStats.reviews).toBe(50);
    expect(ownerStats.hires).toBe(89);
    expect(LISTING_URL).not.toBe(PROFILE_URL);
    const html = renderToStaticMarkup(createElement(Reviews));
    expect(html).toContain('This listing');
    expect(html).toContain('Owner profile');
    expect(html).toContain('all trailers');
    expect(html).toContain(`href="${LISTING_URL}"`);
    expect(html).toContain(`href="${PROFILE_URL}"`);
    expect(reviews.length).toBeGreaterThan(0);
  });

  it('keeps every duration condition and the short-hire wording on the rates', () => {
    const html = renderToStaticMarkup(createElement(Rates));
    expect(rates.map((r) => r.label)).toEqual(['Short hire', '4+ day hire', '7+ day hire']);
    expect(html).toContain('$83.86');
    expect(html).toContain('total per day');
    expect(html).toContain('including all fees and taxes');
    expect(html).toContain('apply only to hires of that length');
    expect(html).not.toMatch(/from \$/i);
  });

  it('scopes specifications to the linked listing and does not claim identical trailers', () => {
    expect(specTable.some(([label]) => /fleet/i.test(label))).toBe(false);
    const html = renderToStaticMarkup(createElement(SpecTable, { rows: specTable, caption: 'Specifications for the listing' }));
    expect(html).toContain('2,000 kg');
    expect(html).not.toMatch(/identical/i);
  });

  it('describes roadside assistance and Trailer Shield without a blanket guarantee', () => {
    expect(cover.map((c) => c.body).join(' ')).not.toMatch(/insur|guarantee|fully|covered for/i);
    expect(coverNote).toMatch(/not a blanket guarantee/i);
  });
});
