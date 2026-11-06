import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import trailerRender from '@/assets/renders/trailer-1.webp';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { Lines, Reveal } from '@/components/Reveal';
import { Rates } from '@/components/Rates';
import { SpecTable } from '@/components/SpecTable';
import { LISTING_NAME } from '@/data/listing';
import { pageMetadata } from '@/data/seo';
import { trailers } from '@/data/trailers';

export const metadata: Metadata = pageMetadata({
  title: 'Trailer hire fleet',
  description: 'Tandem cage trailer hire in Sydney. The listed 12x6 is $83.86 per day for a short hire, with lower rates for 4+ and 7+ day hires.',
  path: '/trailers',
});

const trailer = trailers[0];

export default function TrailersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['Our trailer']} />
          <p className="lead hero__lead">Three tandem cage trailers. Specifications and rates below are for the listed 12x6, with pickup in Haberfield.</p>
        </div>
      </section>

      <section className="section--s">
        <div className="container split split--media">
          <Reveal as="figure" kind="plate" className="plate fleet__photo">
            <Image
              src={trailerRender}
              alt="3D render of the galvanised tandem cage trailer with mesh cage sides, spare wheel and jockey wheel"
              sizes="(min-width: 1440px) 760px, 100vw"
              preload
            />
            <figcaption>Illustrative 3D render · {trailer.quantity} tandem cage trailers in the fleet</figcaption>
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
            <SpecTable rows={trailer.specs} caption={`Specifications for ${LISTING_NAME}`} />
            <p className="note note--spaced">Specifications and rates are for the listed “{LISTING_NAME}” on Local Trailer Hire.</p>
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
