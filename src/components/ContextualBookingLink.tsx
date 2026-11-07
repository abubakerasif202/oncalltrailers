'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bySlug } from '@/data/fleet';
import { BookingLink } from './BookingLink';
import { ArrowIcon } from './Icons';

interface ContextualBookingLinkProps {
  className?: string;
  short?: boolean;
  tabIndex?: number;
}

/**
 * The header, drawer and sticky bar booking button. It follows the trailer being viewed: the motorcycle page opens the
 * motorcycle listing, the car page offers an enquiry (the car trailer has no verified booking route), and everywhere
 * else it opens the default listing.
 */
export function ContextualBookingLink({ className = 'btn btn--primary', short, tabIndex }: ContextualBookingLinkProps) {
  const pathname = usePathname();
  const slug = /^\/trailers\/([^/]+)\/?$/.exec(pathname ?? '')?.[1];
  const trailer = slug ? bySlug(slug) : undefined;

  if (trailer?.booking.kind === 'enquiry') {
    return (
      <Link href="/contact#enquire" className={className} tabIndex={tabIndex}>
        Enquire
        <ArrowIcon className="btn__icon" />
      </Link>
    );
  }
  return <BookingLink className={className} short={short} tabIndex={tabIndex} href={trailer?.booking.kind === 'listing' ? trailer.booking.url : undefined} />;
}
