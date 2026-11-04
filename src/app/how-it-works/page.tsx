import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowIcon, PhoneIcon } from '@/components/Icons';
import { Lines, Reveal } from '@/components/Reveal';
import { Steps } from '@/components/Steps';
import { guideSteps, hitchChecklist } from '@/data/content';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: { absolute: `How It Works | ${site.name} Sydney` },
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  const tel = site.phone?.replace(/\s/g, '');
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Lines as="h1" lines={['How it works']} />
          <p className="lead hero__lead">
            Four straightforward steps from booking to collection. Transparent rates, 24/7 smart lockbox access, and
            road-ready tandem trailers ready when you are.
          </p>
        </div>
      </section>

      <section className="section--s">
        <div className="container">
          <Steps level={2} items={guideSteps.map((step) => ({ title: step.title, body: `${step.body} ${step.meta}.` }))} />
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section__head split">
            <Lines as="h2" lines={['The 60-Second', 'Hitching Checklist']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              Safety is our primary priority. Before towing onto public Sydney roads, take one minute to verify these
              essential hitching points:
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
        <div className="container split">
          <div>
            <Lines as="h2" lines={['Straightforward', 'Returns']} />
          </div>
          <Reveal>
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              Returning is just as easy as pickup. Park in your assigned bay, sweep the trailer floor, lock the coupling,
              and return the key to the smart lockbox.
            </p>
            <div className="actions" style={{ marginTop: 'var(--space-xl)' }}>
              <Link href="/trailers#book" className="btn btn--primary">
                Book Your Trailer Now
                <ArrowIcon className="btn__icon" />
              </Link>
              {site.phone && tel ? (
                <a href={`tel:${tel}`} className="btn btn--ghost">
                  <PhoneIcon className="btn__icon" />
                  Speak With Our Team ({site.phone})
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
