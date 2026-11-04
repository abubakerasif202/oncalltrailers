'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import harbour from '@/assets/hero-harbour.webp';
import { ArrowIcon } from './Icons';

const facts = [
  { label: 'Fleet', value: 'Three tandem cage trailers' },
  { label: 'Pickup', value: 'One Sydney location' },
  { label: 'Booking', value: 'Confirmed through the booking provider' },
] as const;

/** The first screen: headline over the night-harbour photograph, which drifts slower than the page. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y: mediaY }} aria-hidden="true">
        <Image
          src={harbour}
          alt="Galvanised tandem cage trailer, including its tow hitch and wheels, against Sydney Harbour at night"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="container hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <h1 className="hero__title">
          <span className="line" style={{ '--line-delay': '150ms' } as React.CSSProperties}>
            <span>The right trailer.</span>
          </span>{' '}
          <span className="line" style={{ '--line-delay': '290ms' } as React.CSSProperties}>
            <span>Ready when you are.</span>
          </span>
        </h1>
        <p className="hero__lead">
          Premium trailer hire with easy online booking and convenient self-service collection.
        </p>
        <div className="actions">
          <Link href="/trailers#book" className="btn btn--primary">
            Find your trailer
            <ArrowIcon className="btn__icon" />
          </Link>
          <a href="#fleet" className="btn btn--ghost">
            Explore our fleet
          </a>
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
