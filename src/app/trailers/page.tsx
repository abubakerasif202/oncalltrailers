import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import trailerSide from '@/assets/trailer-side.webp';
import { Estimator } from '@/components/Estimator';
import { LockiiBooking } from '@/components/LockiiBooking';
import { Lines, Reveal } from '@/components/Reveal';
import { trailers } from '@/data/trailers';

export const metadata: Metadata = {
  title: 'Trailers',
  alternates: { canonical: '/trailers' },
};

const trailer = trailers[0];

export default function TrailersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['Our trailers']} />
          <p className="lead hero__lead">
            Three galvanised tandem cage trailers. One Sydney pickup location. Plan your next load.
          </p>
        </div>
      </section>

      <section className="section--s">
        <div className="container split split--media" style={{ alignItems: 'center' }}>
          <Reveal as="figure" kind="plate" className="plate" >
            <Image
              src={trailerSide}
              alt="Galvanised tandem-axle cage trailer parked on wet tarmac in front of the Sydney skyline at night"
              sizes="(min-width: 1440px) 760px, 100vw"
            />
            <figcaption>3 in the fleet</figcaption>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display" style={{ fontSize: 'var(--text-section)' }}>
              <Link href="/trailers/tandem-cage-trailer" className="link">
                {trailer.name}
              </Link>
            </h2>
            <p className="lead" style={{ marginTop: 'var(--space-md)', color: 'var(--color-ink-2)' }}>
              {trailer.blurb}
            </p>
            <ul className="tags" style={{ marginTop: 'var(--space-xl)' }}>
              {trailer.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <ul className="tags" style={{ marginTop: 'var(--space-sm)' }}>
              {trailer.goodFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="price-line" style={{ marginTop: 'var(--space-xl)' }}>
              <span className="label">From</span>
              <span className="fig">${trailer.rate.firstBlockPrice}</span>
              <span className="label">per hour · demo reference pricing</span>
            </div>
            <p className="note" style={{ marginTop: 'var(--space-md)' }}>
              Demo reference pricing — not an offer. Dimensions and load capacity await confirmation.
            </p>
            <div className="actions" style={{ marginTop: 'var(--space-xl)' }}>
              <a href="#book" className="btn btn--primary">
                Plan hire
              </a>
              <Link href="/trailers/tandem-cage-trailer" className="btn btn--ghost">
                Explore trailer details ↗
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section band" id="book">
        <div className="container">
          <div className="section__head split">
            <Lines as="h2" lines={['Book your', 'trailer']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              Explore your trailer options. Live availability, final pricing and collection details will be confirmed
              when the booking integration is connected.
            </p>
          </div>
          <Reveal>
            <LockiiBooking />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <Lines as="h2" lines={['Estimate your hire']} />
          </div>
          <Reveal>
            <Estimator />
          </Reveal>
        </div>
      </section>
    </>
  );
}
