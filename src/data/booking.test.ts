import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { BOOKING_URL, getBooking, telHref } from '@/data/booking';

describe('booking destination', () => {
  it('points every booking CTA at the owner-supplied external booking page', () => {
    const booking = getBooking();
    expect(booking.href).toBe(BOOKING_URL);
    expect(new URL(booking.href).protocol).toBe('https:');
    expect(booking.host).toBe('localtrailerhire.com.au');
    expect(booking.label).toBe('Check availability');
  });

  it('opens externally in a new tab, safely, and names the destination for screen readers', () => {
    const html = renderToStaticMarkup(createElement(BookingLink));
    expect(html).toContain(`href="${BOOKING_URL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('opens localtrailerhire.com.au in a new tab');
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
