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
import { ArrowIcon } from '@/components/Icons';
import { Lines, Reveal } from '@/components/Reveal';
import { Steps } from '@/components/Steps';
import { faqs, homeSteps, preChecks, reasons, standards } from '@/data/content';
import { trailers } from '@/data/trailers';

const trailer = trailers[0];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section band">
        <div className="container">
          <div className="section__head">
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
            <Lines as="h2" lines={['The fleet']} />
            <Reveal as="p" className="lead">
              Big plans. Meet your trailer. One versatile trailer type. Three in the fleet. A galvanised tandem cage
              trailer for your next load.
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
                <span className="label">per hour, demo reference pricing</span>
              </div>
              <div className="actions" style={{ marginTop: 'var(--space-xl)' }}>
                <Link href="/trailers#book" className="btn btn--primary">
                  Plan hire
                  <ArrowIcon className="btn__icon" />
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
                  <dd>{trailer.goodFor.join(', ')}</dd>
                </div>
              </dl>
              <p className="note" style={{ marginTop: 'var(--space-lg)' }}>
                Demo reference pricing, not an offer. Dimensions and load capacity await confirmation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--s">
        <div className="container" style={{ marginBottom: 'var(--space-2xl)' }}>
          <Lines as="h2" lines={['Interactive engineering', 'telemetry']} />
          <p className="lead" style={{ marginTop: 'var(--space-lg)', color: 'var(--color-ink-2)' }}>
            Tap a hotspot.
          </p>
        </div>
        <Anatomy />
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head split">
            <Lines as="h2" lines={['Why On Call', 'Trailers']} />
            <div>
              <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
                Less friction. More forward. From a house move to a weekend project, start with a trailer that suits the
                job. Keep the hire simple and the focus on what’s next.
              </p>
            </div>
          </div>
          <div className="cols">
            {reasons.map((item, index) => (
              <Reveal className="col" delay={index * 0.1} key={item.title}>
                <h3 className="display">{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section__head split">
            <Lines as="h2" lines={['How it works']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              Three steps. One less thing to worry about.
            </p>
          </div>
          <Steps items={homeSteps} />
          <Reveal className="actions" delay={0.1}>
            <Link href="/trailers#book" className="btn btn--primary" style={{ marginTop: 'var(--space-3xl)' }}>
              Book now
            </Link>
            <Link
              href="/trailers/tandem-cage-trailer"
              className="btn btn--ghost"
              style={{ marginTop: 'var(--space-3xl)' }}
            >
              View trailer
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" id="towing">
        <div className="container">
          <div className="section__head split">
            <Lines as="h2" lines={['Before you', 'hitch up']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              The right fit. Before the first kilometre.
            </p>
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
            <figcaption>Unattended pickup, Sydney</figcaption>
          </Reveal>
          <div className="prose">
            <Lines as="h2" lines={['The collection', 'experience']} />
            <Reveal as="p" className="lead" delay={0.1}>
              Ready to collect. Ready to go.
            </Reveal>
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
            <Lines as="h2" lines={['Sydney certified', 'standards']} />
            <p className="lead" style={{ color: 'var(--color-ink-2)' }}>
              Verified quality. Zero compromise. We maintain our fleet to strict commercial road standards so you can tow
              with absolute confidence.
            </p>
          </div>
          <div className="cols cols--4">
            {standards.map((item, index) => (
              <Reveal className="col standard" delay={index * 0.08} key={item.title}>
                <p className="fig">
                  {index === 0 ? <CountUp to={100} suffix="%" /> : item.mark}
                </p>
                <h3 className="display">{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--s">
        <div className="container split">
          <div>
            <Lines as="h2" lines={['Good to know']} />
            <Reveal as="p" className="lead" delay={0.1}>
              Before you go.
            </Reveal>
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

      <section className="closing">
        <div className="closing__media" aria-hidden="true">
          <Image src={harbour} alt="" sizes="100vw" />
        </div>
        <div className="container">
          <Lines as="h2" lines={['Your next move.', 'Starts right here.']} />
          <Reveal className="actions" delay={0.2}>
            <Link href="/trailers#book" className="btn btn--primary">
              Find your trailer
              <ArrowIcon className="btn__icon" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
