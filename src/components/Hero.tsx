'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { getBooking } from '@/data/booking';
import { fleetImages, imageUrl, largestUrl, srcSetOf } from '@/data/fleetImages';
import { site } from '@/data/site';
import { BookingLink } from './BookingLink';
import { ArrowIcon } from './Icons';

const HERO_ALT =
  'Illustrative 3D render of three galvanised trailers side by side on a dark, wet studio floor: a motorcycle trailer, a cage box trailer and a car trailer';

/** The first screen: headline over the three-trailer lineup, which drifts slightly slower than the page. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const booking = getBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  const facts = [
    { label: 'Fleet', value: 'Cage, motorcycle and car trailers' },
    { label: 'Pickup', value: `${site.pickupSuburb ?? site.region} · 5 AM – 11:30 PM` },
    { label: 'Booking', value: `Online at ${booking.host}` },
  ];

  return (
    <section className="hero hero--fleet" ref={ref}>
      <motion.div className="hero__media" style={{ y: mediaY }}>
        {/* Art direction: the portrait poster keeps all three trailers in frame on phones; the landscape lineup fills wider screens. */}
        <picture>
          <source media="(max-width: 700px)" srcSet={fleetImages.lineupPortrait.widths.map((w) => `${imageUrl(fleetImages.lineupPortrait, w)} ${w}w`).join(', ')} sizes="100vw" />
          <img
            src={largestUrl(fleetImages.lineup)}
            srcSet={srcSetOf(fleetImages.lineup)}
            sizes="100vw"
            width={fleetImages.lineup.width}
            height={fleetImages.lineup.height}
            alt={HERO_ALT}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </picture>
        <p className="illus-tag">Illustrative image</p>
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="container hero__content" style={{ y: contentY }}>
        <p className="eyebrow" style={{ marginBottom: 0 }}>
          Sydney · Trailer hire
        </p>
        <h1 className="hero__title">
          <span className="line" style={{ '--line-delay': '150ms' } as React.CSSProperties}>
            <span className="shimmer-text">Three trailers.</span>
          </span>{' '}
          <span className="line" style={{ '--line-delay': '290ms' } as React.CSSProperties}>
            <span className="blue-text">Endless possibilities.</span>
          </span>
        </h1>
        <p className="hero__lead">
          From moving equipment to transporting motorcycles and cars, find the right trailer for your next job.
        </p>
        <div className="actions">
          <a href="#fleet" className="btn btn--primary">
            Explore Our Trailers
            <ArrowIcon className="btn__icon" />
          </a>
          <BookingLink className="btn btn--ghost">Book a Trailer</BookingLink>
        </div>
      </motion.div>

      <dl className="hero__facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
