import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { FleetTrailer } from '@/data/fleet';
import { aud } from '@/data/listing';
import { BookingLink } from './BookingLink';
import { ArrowIcon } from './Icons';
import { TrailerImage } from './TrailerImage';

/** Shown on a card whose specifications the owner has not confirmed: the same grid, honest values. */
const PENDING_SPECS = [
  ['Size', 'To be confirmed'],
  ['Payload', 'To be confirmed'],
  ['ATM', 'To be confirmed'],
] as const;

/** The booking action for one trailer: its own listing when it has one, an enquiry otherwise. Never an unverified URL. */
export function TrailerBookAction({ trailer, label = 'Book Now', className = 'btn btn--primary btn--sm' }: { trailer: FleetTrailer; label?: string; className?: string }) {
  if (trailer.booking.kind === 'listing') {
    return (
      <BookingLink className={className} href={trailer.booking.url}>
        {label}
        <span className="visually-hidden"> for the {trailer.name}</span>
      </BookingLink>
    );
  }
  return (
    <Link href="/contact#enquire" className={className}>
      Enquire
      <span className="visually-hidden"> about the {trailer.name}</span>
      <ArrowIcon className="btn__icon" />
    </Link>
  );
}

/**
 * One trailer card: the transparent render floats above the surface on a soft moving shadow, and the card tilts
 * and catches a metallic sweep (CSS only; the shared tilt handler in Enhance is a no-op for reduced motion,
 * coarse pointers and narrow screens). Only published specifications and rates appear.
 */
export function FleetCard({ trailer, index }: { trailer: FleetTrailer; index: number }) {
  const headline = trailer.rates?.[0];
  const longer = trailer.rates?.slice(1) ?? [];
  const headingId = `fleet-card-${trailer.slug}`;
  return (
    <li className="fleet-card-wrap" data-reveal="" style={{ '--reveal-delay': `${index * 120}ms` } as CSSProperties}>
      <article className="fleet-card" data-tilt aria-labelledby={headingId}>
        <div className="fleet-card__art">
          <span className="fleet-card__number" aria-hidden="true">
            {trailer.number}
          </span>
          <TrailerImage
            image={trailer.cutout}
            alt={trailer.cutoutAlt}
            sizes="(min-width: 1100px) 360px, (min-width: 640px) 45vw, 88vw"
            className="fleet-card__img"
          />
          <span className="fleet-card__shadow" aria-hidden="true" />
        </div>
        <div className="fleet-card__body">
          <p className="eyebrow">{trailer.category}</p>
          <h3 id={headingId} className="display fleet-card__name">
            {trailer.name}
          </h3>
          <p className="fleet-card__summary">{trailer.summary}</p>

          <dl className={trailer.keySpecs.length ? 'fleet-card__specs' : 'fleet-card__specs fleet-card__specs--tbc'}>
            {(trailer.keySpecs.length ? trailer.keySpecs : PENDING_SPECS).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {headline ? (
            <p className="fleet-card__rate">
              <span className="fleet-card__price">{aud(headline.perDay)}</span> <small>{headline.basis}, short hire</small>
              <span className="fleet-card__longer">
                {longer.map((tier) => `${tier.label.replace(' hire', '')} ${aud(tier.perDay)}/day`).join(' · ')}
              </span>
            </p>
          ) : (
            <p className="fleet-card__rate fleet-card__rate--tbc">Hire rate confirmed on enquiry</p>
          )}

          {trailer.features.length ? (
            <ul className="tags">
              {trailer.features.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : null}

          <div className="actions fleet-card__actions">
            <Link href={`/trailers/${trailer.slug}`} className="btn btn--ghost btn--sm">
              Explore Trailer
              <span className="visually-hidden">: {trailer.name}</span>
            </Link>
            <TrailerBookAction trailer={trailer} />
          </div>
        </div>
      </article>
    </li>
  );
}
