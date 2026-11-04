import Image from 'next/image';
import Link from 'next/link';
import harbour from '@/assets/hero-harbour.webp';
import trailerSide from '@/assets/trailer-side.webp';
import { Anatomy } from '@/components/Anatomy';
import { Configurator } from '@/components/Configurator';
import { CountUp } from '@/components/CountUp';
import { Estimator } from '@/components/Estimator';
import { FaqList } from '@/components/FaqList';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Lines, Reveal } from '@/components/Reveal';
import { Steps } from '@/components/Steps';
import { faqs, homeSteps, preChecks, reasons, standards } from '@/data/content';
import { trailers } from '@/data/trailers';

const trailer = trailers[0];

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee words={['Ready when you are', 'On Call Trailers']} />

      <section className="section band">
        <div className="container">
          <div className="section__head">
            <Reveal as="p" className="eyebrow">
              Interactive Hire Configurator
            </Reveal>
            <Lines as="h2" lines={['Select Your Duration', '& Equipment']} />
          </div>
          <Reveal>
            <Configurator />
          </Reveal>
        </div>
      </section>

      <section className="section" id="fleet">
        <div className="container fleet">
          <div className="split">
            <div>
              <Reveal as="p" className="eyebrow">
                The fleet
              </Reveal>
              <Lines as="h2" lines={['Big plans.', 'Meet your trailer.']} />
            </div>
            <Reveal as="p" className="lead" delay={0.1}>
              One versatile trailer type. Three in the fleet. A galvanised tandem cage trailer for your next load.
            </Reveal>
          </div>
          <Reveal as="figure" kind="plate" className="plate fleet__photo">
            <Image
              src={trailerSide}
              alt="Galvanised tandem-axle cage trailer parked on wet tarmac in front of the Sydney skyline at night"
              sizes="(min-width: 1440px) 1312px, 100vw"
            />
            <figcaption>3 in the fleet</figcaption>
          </Reveal>
          <div className="fleet__grid">
            <Reveal className="fleet__copy">
              <h3 className="display">
                <Link href="/trailers/tandem-cage-trailer" className="link">
                  {trailer.name}
                </Link>
              </h3>
              <p className="lead" style={{ marginTop: 'var(--space-md)', color: 'var(--color-ink-2)' }}>
                {trailer.blurb}
              </p>
              <div className="price-line" style={{ marginTop: 'var(--space-xl)' }}>
                <span className="label">From</span>
                <span className="fig">${trailer.rate.firstBlockPrice}</span>
                <span className="label">per hour · demo reference pricing</span>
              </div>
              <div className="actions" style={{ marginTop: 'var(--space-xl)' }}>
                <Link href="/trailers#book" className="btn btn--primary">
                  Plan hire ↗
                </Link>
                <Link href="/trailers/tandem-cage-trailer" className="btn btn--ghost">
                  Trailer details
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="specs">
                <div>
                  <dt>Build</dt>
                  <dd>Galvanised steel</dd>
                </div>
                <div>
                  <dt>Axle</dt>
                  <dd>Tandem</dd>
                </div>
                <div>
                  <dt>Sides</dt>
                  <dd>Mesh cage</dd>
                </div>
                <div>
                  <dt>Good for</dt>
                  <dd>{trailer.goodFor.join(' · ')}</dd>
                </div>
              </dl>
              <p className="note" style={{ marginTop: 'var(--space-lg)' }}>
                Demo reference pricing — not an offer. Dimensions and load capacity await confirmation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--s">
        <div className="container" style={{ marginBottom: 'var(--space-2xl)' }}>
          <h2 className="eyebrow" style={{ marginBottom: 0 }}>
            Interactive Engineering Telemetry · Tap Hotspots
          </h2>
        </div>
        <Anatomy />
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head split">
            <div>
              <Reveal as="p" className="eyebrow">
                Why On Call Trailers
              </Reveal>
              <Lines as="h2" lines={['Less friction.', 'More forward.']} />
            </div>
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              From a house move to a weekend project, start with a trailer that suits the job. Keep the hire simple and
              the focus on what’s next.
            </p>
          </div>
          <div className="cols">
            {reasons.map((item, index) => (
              <Reveal delay={index * 0.1} key={item.title}>
                <div className="col" data-tilt>
                  <h3 className="display">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section__head split">
            <div>
              <Reveal as="p" className="eyebrow">
                How it works
              </Reveal>
              <Lines as="h2" lines={['Three steps.', 'One less thing', 'to worry about.']} />
            </div>
          </div>
          <Steps items={homeSteps} />
          <Reveal className="actions" delay={0.1}>
            <p className="label" style={{ alignSelf: 'center', marginTop: 'var(--space-3xl)' }}>
              Tandem Cage Trailer
            </p>
            <Link
              href="/trailers/tandem-cage-trailer"
              className="btn btn--ghost"
              style={{ marginTop: 'var(--space-3xl)' }}
            >
              View trailer
            </Link>
            <Link href="/trailers#book" className="btn btn--primary" style={{ marginTop: 'var(--space-3xl)' }}>
              Book now
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" id="towing">
        <div className="container">
          <div className="section__head split">
            <div>
              <Reveal as="p" className="eyebrow">
                Before you hitch up
              </Reveal>
              <Lines as="h2" lines={['The right fit.', 'Before the first', 'kilometre.']} />
            </div>
          </div>
          <ol className="checks">
            {preChecks.map((item, index) => (
              <Reveal as="li" delay={index * 0.08} key={item.title}>
                <span className="mark">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="display">{item.title}</h3>
                {index === 2 ? (
                  <p>
                    Not sure about suitability?{' '}
                    <Link href="/contact" className="link">
                      Contact On Call Trailers
                    </Link>{' '}
                    before making your booking.
                  </p>
                ) : (
                  <p>{item.body}</p>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section--s">
        <div className="container split split--even" style={{ alignItems: 'center' }}>
          <Reveal as="figure" kind="plate" className="plate collect__media">
            <Image
              src={trailerSide}
              alt="Tandem wheels of the galvanised cage trailer on wet tarmac under Sydney Harbour lights"
              sizes="(min-width: 1440px) 640px, 100vw"
            />
            <figcaption>Unattended pickup · Sydney</figcaption>
          </Reveal>
          <div className="prose">
            <Reveal as="p" className="eyebrow">
              The collection experience
            </Reveal>
            <Lines as="h2" lines={['Ready to collect.', 'Ready to go.']} />
            <Reveal as="p" delay={0.15} className="lead-body">
              Unattended pickup is the planned collection experience. Your confirmed booking instructions will explain
              where to go, how to access your trailer and what to check before departure.
            </Reveal>
            <Reveal as="p" className="note" delay={0.2}>
              Booking integration is being connected. Pickup address and final collection arrangements will be confirmed
              before live bookings open.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section__head">
            <Reveal as="p" className="eyebrow">
              A little forward planning
            </Reveal>
            <Lines as="h2" lines={['Make room', 'for your plans.']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              Explore a demonstration estimate. Owner-approved rates are still to come.
            </p>
          </div>
          <Reveal>
            <Estimator />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head split">
            <div>
              <Reveal as="p" className="eyebrow">
                Sydney Certified Standards
              </Reveal>
              <Lines as="h2" lines={['Verified Quality.', 'Zero Compromise.']} />
            </div>
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              We maintain our fleet to strict commercial road standards so you can tow with absolute confidence.
            </p>
          </div>
          <div className="cols cols--4">
            {standards.map((item, index) => (
              <Reveal delay={index * 0.08} key={item.title}>
                <div className="col standard" data-tilt>
                  <p className="fig">{index === 0 ? <CountUp to={100} suffix="%" /> : item.mark}</p>
                  <h3 className="display">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
                All questions ↗
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <FaqList items={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <section className="closing">
        <div className="closing__media" aria-hidden="true">
          <Image src={harbour} alt="" sizes="100vw" />
        </div>
        <div className="container">
          <Reveal as="p" className="eyebrow">
            On Call Trailers
          </Reveal>
          <Lines as="h2" lines={['Your next move.', 'Starts right here.']} />
          <Reveal className="actions" delay={0.2}>
            <Link href="/trailers#book" className="btn btn--primary">
              Find your trailer ↗
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
