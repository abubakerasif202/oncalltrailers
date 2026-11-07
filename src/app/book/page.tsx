import type { Metadata } from 'next';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { PhoneIcon } from '@/components/Icons';
import { LockiiSlot } from '@/components/LockiiSlot';
import { Lines, Reveal } from '@/components/Reveal';
import { telHref } from '@/data/booking';
import { getLockiiMode, LOCKII } from '@/data/lockii';
import { pickupHours } from '@/data/listing';
import { pageMetadata } from '@/data/seo';
import { site } from '@/data/site';

// Planned route. It stays out of the sitemap and the navigation, and is never indexed until launch is approved.
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Book a trailer',
    description: `Book a trailer from ${site.name} in ${site.region}.`,
    path: '/book',
  }),
  robots: { index: false, follow: false },
};

export default function BookPage() {
  const tel = telHref(site.phone);
  const preview = getLockiiMode() === 'preview';
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Pickup in {site.pickupSuburb}</p>
          <Lines as="h1" lines={['Book a', 'trailer']} />
          <p className="lead hero__lead">
            {preview
              ? 'A preview of the planned booking page. Nothing on this page can be booked yet.'
              : 'Online booking on this website is not open yet. Booking is available now through the trailer’s listing.'}
          </p>
        </div>
      </section>

      <section className="section--s">
        <div className="container split split--detail">
          <div>
            {preview ? (
              <>
                <Reveal>
                  <h2 className="display detail__sub">Available trailers</h2>
                </Reveal>
                <LockiiSlot tag="lockii-browse" title="Trailer availability preview" minHeight={520} />
              </>
            ) : (
              <Reveal>
                <h2 className="display detail__sub">How to book today</h2>
                <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
                  Choose your dates on the trailer’s listing page, or call and ask about availability and towing
                  suitability first.
                </p>
              </Reveal>
            )}
          </div>
          <Reveal as="aside" className="panel" delay={0.1}>
            <h3 className="display">Book now</h3>
            <p>Booking is completed on the trailer’s listing.</p>
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

      {preview ? (
        <section className="section--s">
          <div className="container">
            <Reveal>
              <h2 className="display detail__sub">Booking buttons for each trailer</h2>
              <p className="note note--spaced">These are the per-trailer buttons planned for the trailer pages.</p>
            </Reveal>
            <div className="lockii-buttons">
              <div>
                <h3 className="display">12x6 cage box trailer</h3>
                <LockiiSlot
                  tag="lockii-checkout-button"
                  title="12x6 cage box trailer booking button preview"
                  attributes={{ product_id: LOCKII.products.cage }}
                  minHeight={96}
                />
              </div>
              <div>
                <h3 className="display">Motorcycle trailer (not yet listed on this site)</h3>
                <LockiiSlot
                  tag="lockii-checkout-button"
                  title="Motorcycle trailer booking button preview"
                  attributes={{ product_id: LOCKII.products.motorcycle }}
                  minHeight={96}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
