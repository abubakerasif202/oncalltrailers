import type { Metadata } from 'next';
import { BookingLink, BookingNote } from '@/components/BookingLink';
import { PhoneIcon } from '@/components/Icons';
import { LockiiSlot } from '@/components/LockiiSlot';
import { Lines, Reveal } from '@/components/Reveal';
import { telHref } from '@/data/booking';
import { getLockiiMode } from '@/data/lockii';
import { pageMetadata } from '@/data/seo';
import { site } from '@/data/site';

// Planned route. It stays out of the sitemap and the navigation, and is never indexed until launch is approved.
export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Manage a booking',
    description: `Find or change a booking with ${site.name}.`,
    path: '/manage-booking',
  }),
  robots: { index: false, follow: false },
};

export default function ManageBookingPage() {
  const tel = telHref(site.phone);
  const mode = getLockiiMode();
  const widget = mode !== 'off';
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['Manage a', 'booking']} />
          <p className="lead hero__lead">
            {mode === 'preview'
              ? 'A preview of the planned booking account page. Nothing on this page can be changed yet.'
              : mode === 'live'
                ? 'Sign in to see or change a booking made on this website, or call us if you need help.'
                : 'Bookings made through the trailer’s listing are managed there. Call us if you need help.'}
          </p>
        </div>
      </section>

      <section className="section--s">
        <div className="container split split--detail">
          <div>
            {widget ? (
              <LockiiSlot tag="lockii-account" title="Booking account" minHeight={420} />
            ) : (
              <Reveal>
                <h2 className="display detail__sub">Changing a booking</h2>
                <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
                  Sign in on the trailer’s listing to see or change your booking, or call us and we will help.
                </p>
              </Reveal>
            )}
          </div>
          <Reveal as="aside" className="panel" delay={0.1}>
            <h3 className="display">Need a hand?</h3>
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
