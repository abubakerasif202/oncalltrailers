import Image from 'next/image';
import Link from 'next/link';
import harbour from '@/assets/hero-harbour.webp';
import { BookingLink } from '@/components/BookingLink';
import { FaqList } from '@/components/FaqList';
import { FleetComparison } from '@/components/FleetComparison';
import { FleetSection } from '@/components/FleetSection';
import { Hero } from '@/components/Hero';
import { ContactRail, HomeGallery, TrustStrip } from '@/components/HomeEnhancements';
import { PhoneIcon } from '@/components/Icons';
import { Lines, Reveal } from '@/components/Reveal';
import { Reviews } from '@/components/Reviews';
import { Steps } from '@/components/Steps';
import { telHref } from '@/data/booking';
import { benefits, faqs, homeSteps, preChecks } from '@/data/content';
import { pickupHours } from '@/data/listing';
import { getLockiiMode } from '@/data/lockii';
import { site } from '@/data/site';

export default function HomePage() {
  const tel = telHref(site.phone);
  return (
    <>
      <Hero />
      <TrustStrip />
      {getLockiiMode() === 'live' ? (
        <div className="container direct-booking">
          <p>Prefer to book direct? Choose your dates with Lockii. Your final price is shown before payment.</p>
          <Link href="/book" className="btn btn--ghost">Direct online booking</Link>
        </div>
      ) : null}

      <section className="benefits" aria-label="Why hire from On Call Trailers">
        <ul className="container benefits__list">
          {benefits.map((item) => (
            <li key={item.title}>
              <h2 className="benefits__title">{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <FleetSection />

      <FleetComparison />
      <HomeGallery />

      <section className="section band">
        <div className="container">
          <div className="section__head split">
            <div>
              <Reveal as="p" className="eyebrow">
                How it works
              </Reveal>
              <Lines as="h2" lines={['Book. Collect.', 'Return.']} />
            </div>
          </div>
          <Steps items={homeSteps} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <Reveal as="p" className="eyebrow">
              Customer reviews
            </Reveal>
            <Lines as="h2" lines={['Trusted by', 'local hirers.']} />
          </div>
          <Reveal>
            <Reviews />
          </Reveal>
        </div>
      </section>

      <section className="section band" id="towing">
        <div className="container split split--even">
          <div className="prose">
            <Reveal as="p" className="eyebrow">
              Pickup &amp; towing
            </Reveal>
            <Lines as="h2" lines={['Collect in Sydney.', 'Tow with confidence.']} />
            <Reveal as="p" delay={0.1} className="lead-body">
              Pickup is in {site.pickupSuburb}. Pick-up and return hours are {pickupHours.hours}, {pickupHours.days}.
            </Reveal>
            {site.phone && tel ? (
              <Reveal className="actions" delay={0.15}>
                <a href={tel} className="btn btn--ghost">
                  <PhoneIcon className="btn__icon" />
                  Call {site.phone}
                </a>
                <Link href="/how-it-works" className="btn btn--ghost">
                  Towing checklist
                </Link>
              </Reveal>
            ) : null}
          </div>
          <ol className="checks checks--compact">
            {preChecks.map((item, index) => (
              <Reveal as="li" delay={index * 0.08} key={item.title}>
                <span className="mark">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="display">{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section--s">
        <div className="container split">
          <div>
            <Reveal as="p" className="eyebrow">
              Good to know
            </Reveal>
            <Lines as="h2" lines={['Before', 'you go.']} />
            <Reveal delay={0.15}>
              <Link href="/faq" className="btn btn--ghost" style={{ marginTop: 'var(--space-xl)' }}>
                All questions
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <FaqList items={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <ContactRail />
      <section className="closing">
        <div className="closing__media" aria-hidden="true">
          <Image src={harbour} alt="" sizes="100vw" loading="lazy" />
        </div>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            On Call Trailers
          </Reveal>
          <Lines as="h2" lines={['Your next move.', 'Starts here.']} />
          <Reveal className="actions" delay={0.2}>
            <BookingLink />
            {site.phone && tel ? (
              <a href={tel} className="btn btn--ghost">
                <PhoneIcon className="btn__icon" />
                Call {site.phone}
              </a>
            ) : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}
