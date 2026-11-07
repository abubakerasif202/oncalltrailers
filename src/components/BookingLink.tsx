import type { ReactNode } from 'react';
import { getBooking } from '@/data/booking';
import { ArrowIcon } from './Icons';

interface BookingLinkProps {
  className?: string;
  /** Override the default label. */
  children?: ReactNode;
  short?: boolean;
  tabIndex?: number;
  /** A different trailer's listing on the same booking platform. Omit for the default listing. */
  href?: string;
}

/** Every booking button on the site: an external link to the trailer listing that says where it goes. */
export function BookingLink({ className = 'btn btn--primary', children, short, tabIndex, href }: BookingLinkProps) {
  const booking = getBooking();
  return (
    <a
      href={href ?? booking.href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      data-booking="external"
    >
      {children ?? (short ? booking.shortLabel : booking.label)}
      <ArrowIcon className="btn__icon" />
      <span className="visually-hidden"> (opens the Local Trailer Hire listing on {booking.host} in a new tab)</span>
    </a>
  );
}

/** One quiet line telling visitors the booking happens on an external site. */
export function BookingNote({ className = 'note' }: { className?: string }) {
  const booking = getBooking();
  return (
    <p className={className}>
      Opens the trailer’s listing on Local Trailer Hire ({booking.host}), an external site, in a new tab.
    </p>
  );
}
