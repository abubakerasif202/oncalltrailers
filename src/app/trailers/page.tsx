import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import trailerSide from '@/assets/trailer-side.webp';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { Lines, Reveal } from '@/components/Reveal';
import { Rates } from '@/components/Rates';
import { SpecTable } from '@/components/SpecTable';
import { pageMetadata } from '@/data/seo';
import { trailers } from '@/data/trailers';

export const metadata: Metadata = pageMetadata({
  title: 'Trailer hire fleet',
  description: 'Three 12x6 galvanised tandem cage trailers for hire in Sydney from $71.88 per day. See the specs and check availability.',
  path: '/trailers',
});

const trailer = trailers[0];

export default function TrailersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['Our trailer']} />
          <p className="lead hero__lead">One trailer type, three in the fleet. Pickup in Sydney.</p>
        </div>
      </section>

      <section className="section--s">
        <div className="container split split--media" style={{ alignItems: 'center' }}>
          <Reveal as="figure" kind="plate" className="plate fleet__photo">
            <Image
              src={trailerSide}
              alt="Galvanised tandem-axle cage trailer with mesh cage sides, parked on wet tarmac at night"
              sizes="(min-width: 1440px) 760px, 100vw"
              preload
            />
            <figcaption>{trailer.quantity} identical trailers in the fleet</figcaption>
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
            <SpecTable rows={trailer.specs} />
            <Rates />
            <div className="actions" style={{ marginTop: 'var(--space-xl)' }}>
              <BookingLink />
              <Link href="/trailers/tandem-cage-trailer" className="btn btn--ghost">
                Trailer details
              </Link>
            </div>
            <BookingNote className="note note--spaced" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
