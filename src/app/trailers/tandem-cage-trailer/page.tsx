import type { Metadata } from 'next';
import Link from 'next/link';
import harbour from '@/assets/hero-harbour.webp';
import trailerSide from '@/assets/trailer-side.webp';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { PhoneIcon } from '@/components/Icons';
import { Rates } from '@/components/Rates';
import { Lines, Reveal } from '@/components/Reveal';
import { Reviews } from '@/components/Reviews';
import { SpecTable } from '@/components/SpecTable';
import { TrailerGallery } from '@/components/TrailerGallery';
import { telHref } from '@/data/booking';
import { hitchChecklist } from '@/data/content';
import { cover, pickupHours, POLICY_LINKS } from '@/data/listing';
import { pageMetadata } from '@/data/seo';
import { site } from '@/data/site';
import { trailers } from '@/data/trailers';

export const metadata: Metadata = pageMetadata({
  title: '12x6 Tandem Cage Trailer hire in Sydney',
  description:
    'Hire a 12x6 galvanised tandem cage trailer in Sydney from $71.88 per day. 2,000 kg ATM, 1,330 kg payload. Pickup in Haberfield, 5 AM to 11:30 PM.',
  path: '/trailers/tandem-cage-trailer',
});

const trailer = trailers[0];

// Swap these for the 3D renders in src/assets/renders/ when they are ready (see the image brief).
const images = [
  {
    src: harbour,
    label: 'Full trailer',
    alt: 'Illustration of a galvanised tandem cage trailer with tow hitch, jockey wheel and tandem wheels, on the waterfront at night with the Sydney skyline behind',
    position: '62% 60%',
  },
  {
    src: trailerSide,
    label: 'Cage and axle',
    alt: 'Illustration of the mesh cage sides, diamond-plate body and tandem wheels of the galvanised trailer',
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
          <p className="eyebrow">{trailer.quantity} in the fleet · {site.pickupSuburb}</p>
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
              <h3 className="display detail__sub">Features</h3>
              <ul className="tags" style={{ marginTop: 'var(--space-md)' }}>
                {trailer.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className="display detail__sub">Cover and assistance</h3>
              <dl className="specs-list">
                {cover.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal as="aside" className="panel" delay={0.1}>
            <h3 className="display">Hire this trailer</h3>
            <Rates />
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
                <dd>{site.pickupSuburb}</dd>
              </div>
              <div>
                <dt>Pick-up and return hours</dt>
                <dd>
                  {pickupHours.hours}, {pickupHours.days}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section__head">
            <Reveal as="p" className="eyebrow">
              Customer reviews
            </Reveal>
            <Lines as="h2" lines={['What hirers', 'say.']} />
          </div>
          <Reviews />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <Reveal as="p" className="eyebrow">
              Before you tow
            </Reveal>
            <Lines as="h2" lines={['General towing', 'checklist.']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              General guidance for any trailer. Check your vehicle’s towing limits against the 2,000 kg ATM before you
              book, and read the rental terms for your hire.
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
          <ul className="footer-policies" style={{ marginTop: 'var(--space-xl)', listStyle: 'none', padding: 0 }}>
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link" target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
