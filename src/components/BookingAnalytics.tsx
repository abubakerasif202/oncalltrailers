'use client';

import { useEffect } from 'react';
import { placementOf, track } from '@/lib/analytics';

/**
 * One delegated listener for every booking button, so the booking link markup stays a plain server link.
 * A click on a booking button is a funnel step, never a completed booking.
 */
export function BookingAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[data-booking="external"]') : null;
      if (!link) return;
      const params = { placement: placementOf(link), path: window.location.pathname };
      track('booking_cta_click', { ...params, destination: 'local_trailer_hire' });
      track('local_trailer_hire_click', params);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
