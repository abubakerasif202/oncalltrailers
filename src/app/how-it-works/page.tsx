import type { Metadata } from 'next';
import { BookingLink } from '@/components/BookingLink';
import { PhoneIcon } from '@/components/Icons';
import { Lines, Reveal } from '@/components/Reveal';
import { Steps } from '@/components/Steps';
import { telHref } from '@/data/booking';
import { hitchChecklist, homeSteps } from '@/data/content';
import { pageMetadata } from '@/data/seo';
import { site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: `How It Works | ${site.name} Sydney`,
  description: 'Book, collect and return a hire trailer in Sydney, plus a general towing checklist.',
  path: '/how-it-works',
  absoluteTitle: true,
});

export default function HowItWorksPage() {
  const tel = telHref(site.phone);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Trailer hire in Sydney</p>
          <Lines as="h1" lines={['How it works']} />
          <p className="lead hero__lead">Three steps from booking to return, and a quick towing checklist.</p>
        </div>
      </section>

      <section className="section--s">
        <div className="container">
          <Steps level={2} items={homeSteps} />
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section__head split">
            <div>
              <p className="eyebrow">Towing</p>
              <Lines as="h2" lines={['Before you', 'drive off.']} />
            </div>
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              General guidance for any trailer. Follow any extra instructions you are given for your hire.
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

      <section className="section">
        <div className="container">
          <Reveal className="actions">
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
