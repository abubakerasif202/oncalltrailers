import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import harbour from '@/assets/hero-harbour.webp';
import { Lines, Reveal } from '@/components/Reveal';
import { trailers } from '@/data/trailers';

export const metadata: Metadata = {
  title: 'Tandem Cage Trailer',
  alternates: { canonical: '/trailers/tandem-cage-trailer' },
};

const trailer = trailers[0];

export default function TrailerPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link href="/trailers" className="link back">
            ← Back to the fleet
          </Link>
          <p className="eyebrow">Three in the fleet · Sydney</p>
          <Lines as="h1" lines={['Tandem Cage', 'Trailer']} />
          <p className="lead hero__lead">{trailer.blurb}</p>
        </div>
      </section>

      <section className="section--s">
        <div className="container">
          <Reveal as="figure" kind="plate" className="plate fleet__photo">
            <Image
              src={harbour}
              alt="Complete galvanised tandem cage trailer with tow hitch and tandem wheels"
              sizes="(min-width: 1440px) 1312px, 100vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="section--s">
        <div className="container split">
          <Lines as="h2" lines={['Built around', 'your next load.']} />
          <Reveal>
            <ul className="tags">
              {trailer.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <h3 className="display" style={{ fontSize: 'var(--text-2xl)', marginTop: 'var(--space-2xl)' }}>
              Jobs to discuss with us
            </h3>
            <ul className="tags" style={{ marginTop: 'var(--space-md)' }}>
              {trailer.goodFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container split">
          <div>
            <p className="eyebrow">Plan your hire</p>
            <Lines as="h2" lines={['Check the fit.', 'Then plan the trip.']} />
          </div>
          <Reveal>
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              Dimensions, tare weight, load capacity and final rates are awaiting owner confirmation. Check your vehicle
              and towbar ratings and confirm suitability before booking.
            </p>
            <p className="note" style={{ marginTop: 'var(--space-lg)' }}>
              Demo reference pricing: From ${trailer.rate.firstBlockPrice} per hour. Not an offer or confirmed hire rate.
            </p>
            <div className="actions" style={{ marginTop: 'var(--space-xl)' }}>
              <Link href="/trailers#book" className="btn btn--primary">
                View booking options ↗
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                Ask about suitability →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
