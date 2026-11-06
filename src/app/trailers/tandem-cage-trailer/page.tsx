import type { Metadata } from 'next';
import Link from 'next/link';
import harbour from '@/assets/hero-harbour.webp';
import trailerSide from '@/assets/trailer-side.webp';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { PhoneIcon } from '@/components/Icons';
import { Lines, Reveal } from '@/components/Reveal';
import { SpecTable } from '@/components/SpecTable';
import { TrailerGallery } from '@/components/TrailerGallery';
import { telHref } from '@/data/booking';
import { hitchChecklist } from '@/data/content';
import { pageMetadata } from '@/data/seo';
import { site } from '@/data/site';
import { trailers } from '@/data/trailers';

export const metadata: Metadata = pageMetadata({
  title: 'Tandem Cage Trailer hire in Sydney',
  description:
    'Hire a galvanised tandem cage trailer in Sydney for house moves, green waste and building supplies. See the trailer and check availability.',
  path: '/trailers/tandem-cage-trailer',
});

const trailer = trailers[0];

const images = [
  {
    src: harbour,
    label: 'Full trailer',
    alt: 'Galvanised tandem cage trailer with tow hitch, jockey wheel and tandem wheels, parked on the waterfront at night with the Sydney skyline behind',
    position: '62% 60%',
  },
  {
    src: trailerSide,
    label: 'Cage and axle',
    alt: 'Close view of the mesh cage sides, diamond-plate body and tandem wheels of the galvanised trailer',
    position: '75% 50%',
  },
];

export default function TrailerPage() {
  const tel = telHref(site.phone);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link href="/trailers" className="link back">
            ← Back to the trailer
          </Link>
          <p className="eyebrow">{trailer.quantity} in the fleet · {site.region}</p>
          <Lines as="h1" lines={['Tandem Cage', 'Trailer']} />
          <p className="lead hero__lead">{trailer.blurb}</p>
        </div>
      </section>

      <section className="section--s">
        <div className="container">
          <TrailerGallery images={images} />
        </div>
      </section>

      <section className="section--s">
        <div className="container split split--detail">
          <div>
            <Lines as="h2" lines={['Built around', 'your next load.']} />
            <Reveal>
              <h3 className="display detail__sub">Good for</h3>
              <ul className="tags" style={{ marginTop: 'var(--space-md)' }}>
                {trailer.goodFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className="display detail__sub">Specifications</h3>
              <SpecTable rows={trailer.specs} />
              <p className="note note--spaced">
                Need exact dimensions or load limits before you book? Call us and ask.
              </p>
            </Reveal>
          </div>
          <Reveal as="aside" className="panel" delay={0.1}>
            <h3 className="display">Hire this trailer</h3>
            <p>See availability and rates on the booking page, then pick your dates.</p>
            <div className="actions">
              <BookingLink />
              {site.phone && tel ? (
                <a href={tel} className="btn btn--ghost">
                  <PhoneIcon className="btn__icon" />
                  Call {site.phone}
                </a>
              ) : null}
            </div>
            <BookingNote />
            <dl className="panel__list">
              <div>
                <dt>Pickup</dt>
                <dd>{site.region}. Call us for the pickup location.</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section__head">
            <Reveal as="p" className="eyebrow">
              Before you tow
            </Reveal>
            <Lines as="h2" lines={['General towing', 'checklist.']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              General guidance for any trailer. Follow any extra instructions you are given for your hire, and check your
              vehicle’s towing limits before you book.
            </p>
          </div>
          <ol className="checks">
            {hitchChecklist.map((item, index) => (
              <Reveal as="li" delay={index * 0.05} key={item.title}>
                <span className="mark">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="display">{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
