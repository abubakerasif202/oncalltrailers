'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import harbour from '@/assets/hero-harbour.webp';
import { getBooking } from '@/data/booking';
import { site } from '@/data/site';
import { BookingLink } from './BookingLink';

/** The first screen: headline over the night-harbour image, which drifts slightly slower than the page. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const booking = getBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  const facts = [
    { label: 'Fleet', value: 'Three tandem cage trailers' },
    { label: 'Pickup', value: `${site.pickupSuburb ?? site.region} · 5 AM – 11:30 PM` },
    { label: 'Booking', value: `Online at ${booking.host}` },
  ];

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y: mediaY }}>
        <Image
          src={harbour}
          alt="Galvanised tandem cage trailer parked on the waterfront with the Sydney Opera House and Harbour Bridge lit up behind it at night"
          preload
          sizes="100vw"
        />
        <p className="illus-tag">Illustrative image</p>
        <div className="hero__lit" aria-hidden="true">
          <Image src={harbour} alt="" sizes="100vw" />
        </div>
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="container hero__content" style={{ y: contentY }}>
        <p className="eyebrow" style={{ marginBottom: 0 }}>
          Sydney · Trailer hire
        </p>
        <h1 className="hero__title">
          <span className="line" style={{ '--line-delay': '150ms' } as React.CSSProperties}>
            <span className="shimmer-text">Sydney trailer hire.</span>
          </span>{' '}
          <span className="line" style={{ '--line-delay': '290ms' } as React.CSSProperties}>
            <span className="blue-text">Ready when you are.</span>
          </span>
        </h1>
        <p className="hero__lead">
          A galvanised tandem cage trailer for house moves, green waste and building supplies. Pick your dates and book
          online.
        </p>
        <div className="actions">
          <BookingLink />
          <Link href="/trailers/tandem-cage-trailer" className="btn btn--ghost">
            View trailer
          </Link>
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
