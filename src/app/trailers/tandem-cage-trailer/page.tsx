import type { Metadata } from 'next';
import Link from 'next/link';
import render1 from '@/assets/renders/trailer-1.webp';
import render2 from '@/assets/renders/trailer-2.webp';
import render3 from '@/assets/renders/trailer-3.webp';
import render4 from '@/assets/renders/trailer-4.webp';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { PhoneIcon } from '@/components/Icons';
import { LockiiSlot } from '@/components/LockiiSlot';
import { TrackView } from '@/components/TrackView';
import { LOCKII } from '@/data/lockii';
import { Rates } from '@/components/Rates';
import { Lines, Reveal } from '@/components/Reveal';
import { Reviews } from '@/components/Reviews';
import { SpecTable } from '@/components/SpecTable';
import { TrailerGallery } from '@/components/TrailerGallery';
import { telHref } from '@/data/booking';
import { hitchChecklist } from '@/data/content';
import { cover, coverNote, LISTING_NAME, pickupHours, POLICY_LINKS } from '@/data/listing';
import { pageMetadata } from '@/data/seo';
import { site } from '@/data/site';
import { trailers } from '@/data/trailers';

export const metadata: Metadata = pageMetadata({
  title: 'Tandem Cage Trailer hire in Sydney',
  description:
    'Tandem cage trailer hire in Sydney. The listed 12x6 has a 2,000 kg ATM and 1,330 kg payload, $83.86 per day for a short hire. Pickup in Haberfield.',
  path: '/trailers/tandem-cage-trailer',
});

const trailer = trailers[0];

// Illustrative 3D renders. They show the trailer type, not the condition of any individual trailer.
const images = [
  { src: render1, label: 'Front', alt: 'Illustrative 3D render of a galvanised tandem cage trailer from the front: drawbar, coupling, jockey wheel, spare wheel, diamond-plate body and mesh cage' },
  { src: render2, label: 'Rear', alt: 'Illustrative 3D render of the trailer from the rear: tailgate, rear lights, tandem wheels with mudguards and mesh cage' },
  { src: render3, label: 'Load area', alt: 'Illustrative 3D render looking down into the load area: diamond-plate floor enclosed by the mesh cage' },
  { src: render4, label: 'Axle', alt: 'Illustrative 3D render close-up of the tandem axle with white steel wheels, mudguards and diamond-plate side' },
];

export default function TrailerPage() {
  const tel = telHref(site.phone);
  return (
    <>
      <TrackView event="trailer_detail_view" params={{ trailer: trailer.slug }} />
      <section className="page-hero">
        <div className="container">
          <Link href="/trailers" className="link back">
            ← Back to the trailer
          </Link>
          <p className="eyebrow">{trailer.quantity} tandem cage trailers · {site.pickupSuburb}</p>
          <Lines as="h1" lines={['Tandem Cage', 'Trailer']} />
          <p className="lead hero__lead">{trailer.blurb}</p>
        </div>
      </section>

      <section className="section--s">
        <div className="container">
          <TrailerGallery images={images} />
          <p className="note note--spaced">
            Illustrative 3D renders of the trailer type. They are not photographs and do not show the condition of any
            individual trailer.
          </p>
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
              <p className="note" style={{ marginTop: 'var(--space-sm)' }}>
                As published for the listing “{LISTING_NAME}” on Local Trailer Hire.
              </p>
              <SpecTable rows={trailer.specs} caption={`Specifications for ${LISTING_NAME}`} />
              <h3 className="display detail__sub">Features</h3>
              <ul className="tags" style={{ marginTop: 'var(--space-md)' }}>
                {trailer.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3 className="display detail__sub">Roadside assistance and cover</h3>
              <dl className="specs-list">
                {cover.map((item) => (
                  <div key={item.title}>
                    <dt>{item.title}</dt>
                    <dd>{item.body}</dd>
                  </div>
                ))}
              </dl>
              <p className="note note--spaced">{coverNote}</p>
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
            <LockiiSlot
              tag="lockii-checkout-button"
              title="12x6 cage box trailer booking button"
              attributes={{ product_id: LOCKII.products.cage }}
              minHeight={96}
              previewOnly
            />
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
              General guidance for any trailer. Check your vehicle’s towing limits against the listed 2,000 kg ATM
              before you book, and read the rental terms for your hire.
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
