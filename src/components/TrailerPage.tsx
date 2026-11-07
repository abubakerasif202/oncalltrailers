import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BookingNote } from '@/components/BookingLink';
import { TrailerBookAction } from '@/components/FleetCard';
import { PhoneIcon } from '@/components/Icons';
import { LockiiSlot } from '@/components/LockiiSlot';
import { Rates } from '@/components/Rates';
import { RelatedTrailers } from '@/components/RelatedTrailers';
import { Lines, Reveal } from '@/components/Reveal';
import { Reviews } from '@/components/Reviews';
import { ShowroomGallery } from '@/components/ShowroomGallery';
import { SpecTable } from '@/components/SpecTable';
import { TrackView } from '@/components/TrackView';
import { TrailerImage } from '@/components/TrailerImage';
import { telHref } from '@/data/booking';
import { hitchChecklist } from '@/data/content';
import type { FleetTrailer } from '@/data/fleet';
import { cover, coverNote, pickupHours, POLICY_LINKS } from '@/data/listing';
import { LOCKII } from '@/data/lockii';
import { site } from '@/data/site';

/** Splits a name over two display lines at its last space. */
const titleLines = (name: string): string[] => {
  const cut = name.lastIndexOf(' ');
  return cut > 0 ? [name.slice(0, cut), name.slice(cut + 1)] : [name];
};

/**
 * One trailer page. The three pages share this layout, so they stay consistent and every fact comes from the
 * fleet data: nothing is shown for a trailer unless the owner has published it.
 */
export function TrailerPage({ trailer }: { trailer: FleetTrailer }) {
  const tel = telHref(site.phone);
  const listed = trailer.booking.kind === 'listing';
  const isCage = trailer.slug === 'tandem-cage-trailer';
  const hero = trailer.views[0];
  const eyebrow = isCage ? `${trailer.category} · ${site.pickupSuburb}` : trailer.category;

  return (
    <>
      <TrackView event="trailer_detail_view" params={{ trailer: trailer.slug }} />

      <section className="trailer-hero">
        <div className="trailer-hero__media" aria-hidden={false}>
          <TrailerImage image={hero.image} alt={hero.alt} sizes="100vw" priority className="trailer-hero__img" />
          <div className="trailer-hero__shade" aria-hidden="true" />
        </div>
        <div className="container trailer-hero__content">
          <Breadcrumbs
            crumbs={[
              { name: 'Home', path: '/' },
              { name: 'Trailers', path: '/trailers' },
              { name: trailer.name, path: `/trailers/${trailer.slug}` },
            ]}
          />
          <p className="eyebrow">
            {trailer.number} · {eyebrow}
          </p>
          <Lines as="h1" lines={titleLines(trailer.name)} />
          <p className="lead hero__lead">{trailer.intro}</p>
          <div className="actions">
            <TrailerBookAction trailer={trailer} label={isCage ? 'Check availability' : 'Book This Trailer'} className="btn btn--primary" />
            {site.phone && tel ? (
              <a href={tel} className="btn btn--ghost">
                <PhoneIcon className="btn__icon" />
                Call {site.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section--s" aria-label={`${trailer.name} images`}>
        <div className="container">
          <ShowroomGallery views={trailer.views} trailerName={trailer.name} />
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
              {trailer.specs && trailer.booking.kind === 'listing' ? (
                <>
                  <p className="note" style={{ marginTop: 'var(--space-sm)' }}>
                    As published for the listing “{trailer.booking.listingName}” on Local Trailer Hire.
                  </p>
                  <SpecTable rows={trailer.specs} caption={`Specifications for ${trailer.booking.listingName}`} />
                </>
              ) : (
                <p className="lead-body" style={{ marginTop: 'var(--space-md)', color: 'var(--color-ink-2)' }}>
                  Specifications are published once the owner has confirmed them. Enquire for size, payload and towing
                  requirements.
                </p>
              )}

              {trailer.features.length ? (
                <>
                  <h3 className="display detail__sub">Features</h3>
                  <ul className="tags" style={{ marginTop: 'var(--space-md)' }}>
                    {trailer.features.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              <h3 className="display detail__sub">Towing guidance</h3>
              <ul className="plain-list">
                {trailer.towing.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              {isCage ? (
                <>
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
                </>
              ) : null}
            </Reveal>
          </div>

          <Reveal as="aside" className="panel" delay={0.1}>
            <h3 className="display">{listed ? 'Hire this trailer' : 'Ask about this trailer'}</h3>
            {trailer.rates && trailer.booking.kind === 'listing' ? (
              <Rates rates={trailer.rates} listingName={trailer.booking.listingName} />
            ) : (
              <p>The hire rate and availability are confirmed when you enquire.</p>
            )}
            <div className="actions">
              <TrailerBookAction trailer={trailer} label="Check availability" className="btn btn--primary" />
              {site.phone && tel ? (
                <a href={tel} className="btn btn--ghost">
                  <PhoneIcon className="btn__icon" />
                  Call {site.phone}
                </a>
              ) : null}
            </div>
            {listed ? <BookingNote /> : <p className="note">There is no online booking page for this trailer yet.</p>}
            {/* Existing preview integration point: cage trailer only, shielded preview builds only, never live and never in production. */}
            {isCage ? (
              <LockiiSlot
                tag="lockii-checkout-button"
                title="12x6 cage box trailer booking button"
                attributes={{ product_id: LOCKII.products.cage }}
                minHeight={96}
                previewOnly
              />
            ) : null}
            <dl className="panel__list">
              <div>
                <dt>Pickup</dt>
                <dd>{isCage ? site.pickupSuburb : trailer.pickup}</dd>
              </div>
              {listed ? (
                <div>
                  <dt>Pick-up and return hours</dt>
                  <dd>
                    {pickupHours.hours}, {pickupHours.days}
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </section>

      {isCage ? (
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
      ) : null}

      {listed ? (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <Reveal as="p" className="eyebrow">
                Before you tow
              </Reveal>
              <Lines as="h2" lines={['General towing', 'checklist.']} />
              <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
                General guidance for any trailer. Check your vehicle’s towing limits against the listed ATM before you
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
      ) : null}

      <RelatedTrailers current={trailer.slug} />
    </>
  );
}
