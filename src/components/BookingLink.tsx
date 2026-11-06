import type { ReactNode } from 'react';
import { getBooking } from '@/data/booking';
import { ArrowIcon } from './Icons';

interface BookingLinkProps {
  className?: string;
  /** Override the default label. */
  children?: ReactNode;
  short?: boolean;
  tabIndex?: number;
}

/** Every booking button on the site: an external link to the rental platform that says where it goes. */
export function BookingLink({ className = 'btn btn--primary', children, short, tabIndex }: BookingLinkProps) {
  const booking = getBooking();
  return (
    <a
      href={booking.href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
    >
      {children ?? (short ? booking.shortLabel : booking.label)}
      <ArrowIcon className="btn__icon" />
      <span className="visually-hidden"> (opens {booking.host} in a new tab)</span>
    </a>
  );
}

/** One quiet line telling visitors where booking happens. */
export function BookingNote({ className = 'note' }: { className?: string }) {
  const booking = getBooking();
  return <p className={className}>Bookings are completed on {booking.host}.</p>;
}
