import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowIcon } from '@/components/Icons';
import { Lines, Reveal } from '@/components/Reveal';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const tel = site.phone?.replace(/\s/g, '');
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['Get in touch']} />
        </div>
      </section>
      <section className="section--s">
        <div className="container">
          <Reveal>
            <dl className="contact-list">
              {site.phone && tel ? (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${tel}`}>{site.phone}</a>
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
              {site.pickupAddress ? (
                <div>
                  <dt>Pickup</dt>
                  <dd>{site.pickupAddress}</dd>
                </div>
              ) : null}
            </dl>
            <div className="actions" style={{ marginTop: 'var(--space-2xl)' }}>
              <Link href="/trailers#book" className="btn btn--primary">
                Book a trailer
                <ArrowIcon className="btn__icon" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
