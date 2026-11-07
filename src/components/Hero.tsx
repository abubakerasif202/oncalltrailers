'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { getBooking } from '@/data/booking';
import { waterfrontHero } from '@/data/fleetImages';
import { site } from '@/data/site';
import { BookingLink } from './BookingLink';
import { ArrowIcon } from './Icons';
import { TrailerImage } from './TrailerImage';

/** The first screen: headline over the night-harbour image, which drifts slightly slower than the page. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const booking = getBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  const facts = [
    { label: 'Trailer', value: '12 × 6 tandem cage trailer' },
    { label: 'Pickup', value: `${site.pickupSuburb ?? site.region} · 5 AM – 11:30 PM` },
    { label: 'Booking', value: `Online at ${booking.host}` },
  ];

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y: mediaY }}>
        <TrailerImage
          image={waterfrontHero}
          alt="Three galvanised trailers on the Sydney waterfront with vivid blue, cyan and purple lighting on the Opera House and Harbour Bridge"
          sizes="100vw"
          priority
        />
        <div className="hero__lit" aria-hidden="true">
          <TrailerImage image={waterfrontHero} alt="" decorative sizes="100vw" />
        </div>
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="container hero__content" style={{ y: contentY }}>
        <p className="eyebrow" style={{ marginBottom: 0 }}>
          Sydney · Trailer hire
        </p>
        <h1 className="hero__title">
          <span className="line" style={{ '--line-delay': '150ms' } as React.CSSProperties}>
            <span className="shimmer-text">Ready to move.</span>
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
        </div>      </motion.div>

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
