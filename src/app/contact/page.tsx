import type { Metadata } from 'next';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { PhoneIcon } from '@/components/Icons';
import { Lines, Reveal } from '@/components/Reveal';
import { telHref } from '@/data/booking';
import { pageMetadata } from '@/data/seo';
import { site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: `Call ${site.name} in ${site.region} about trailer hire, availability and pickup.`,
  path: '/contact',
});

export default function ContactPage() {
  const tel = telHref(site.phone);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['Get in touch']} />
          <p className="lead hero__lead">Call us about availability, towing suitability or pickup.</p>
        </div>
      </section>
      <section className="section--s" id="enquire">
        <div className="container">
          <Reveal>
            <dl className="contact-list">
              {site.phone && tel ? (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={tel}>{site.phone}</a>
                  </dd>
                </div>
              ) : null}
              {site.email ? (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Pickup</dt>
                <dd>{site.pickupAddress ?? site.region}</dd>
              </div>
              {site.abn ? (
                <div>
                  <dt>Business</dt>
                  <dd>
                    {site.name}, ABN {site.abn}
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="actions" style={{ marginTop: 'var(--space-2xl)' }}>
              <BookingLink />
              {site.phone && tel ? (
                <a href={tel} className="btn btn--ghost">
                  <PhoneIcon className="btn__icon" />
                  Call {site.phone}
                </a>
              ) : null}
            </div>
            <BookingNote className="note note--spaced" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
