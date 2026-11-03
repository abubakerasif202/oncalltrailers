'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { trailers } from '@/data/trailers';
import { Icon } from './Icon';

const EASE = [0.22, 1, 0.36, 1] as const;
const BOOKING_STEPS = ['Trailer', 'Dates', 'Details', 'Confirm'] as const;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''] as const;

function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.1em] text-chrome">
          <Icon name="check" className="h-5 w-5 shrink-0 text-electric-hi" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function panelMotion(index: number) {
  return {
    initial: { opacity: 0, y: 48 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, delay: index * 0.14, ease: EASE },
  } as const;
}

export function FeaturePanels() {
  const trailer = trailers[0];

  return (
    <section className="relative px-5 pb-16 pt-4 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1.25fr_1fr]">
        <motion.article className="panel flex flex-col overflow-hidden" {...panelMotion(0)} whileHover={{ y: -6 }}>
          <div className="p-6 pb-3">
            <h2 className="display text-3xl text-white sm:text-4xl">The trailer</h2>
            <p className="mt-1 text-mute">Right for the job, ready when you are</p>
          </div>
          <Image
            src="/trailer-photo.jpg"
            alt="Galvanised tandem-axle cage trailer parked on wet tarmac in front of the Sydney skyline at night"
            width={925}
            height={345}
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="h-auto w-full"
          />
          <div className="flex flex-1 flex-col p-6">
            <h3 className="display text-2xl text-chrome">{trailer.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${trailer.name} specifications`}>
              {trailer.specs.map((spec) => (
                <li key={spec} className="rounded-full border border-line bg-ink/60 px-3 py-1 text-sm text-chrome">
                  {spec}
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2 text-chrome" aria-label="Good for">
              {trailer.goodFor.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-electric-hi" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <p>
                <span className="display blue-text text-5xl">{trailer.price}</span>
                <span className="ml-2 text-sm text-mute">{trailer.priceNote}</span>
              </p>
              <Link href="/trailers" className="btn btn-outline !px-5 !py-2.5 !text-base">
                View
              </Link>
            </div>
          </div>
        </motion.article>

        <motion.article
          className="panel flex flex-col p-6 sm:p-8"
          {...panelMotion(1)}
          whileHover={{ y: -6 }}
        >
          <h2 className="display text-3xl text-white sm:text-4xl">Online booking</h2>
          <p className="mt-1 text-mute">Book, pay and get on the road in minutes.</p>

          <ol className="mt-8 flex items-start" aria-label="Booking steps">
            {BOOKING_STEPS.map((step, i) => (
              <li key={step} className="relative flex flex-1 flex-col items-center gap-2 text-center">
                {i > 0 && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute right-1/2 top-5 h-0.5 w-full origin-left bg-electric/60"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.25 }}
                  />
                )}
                <motion.span
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-lg font-bold ${
                    i === 0
                      ? 'border-electric bg-electric text-white shadow-[0_0_24px_rgb(42_127_255/0.6)]'
                      : 'border-electric/50 bg-ink text-electric-hi'
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 + i * 0.25 }}
                >
                  {i + 1}
                </motion.span>
                <span className="text-sm text-chrome">{step}</span>
              </li>
            ))}
          </ol>

          <div aria-hidden="true" className="mt-7 rounded-xl border border-line bg-ink/60 p-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-mute">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
              {Array.from({ length: 14 }, (_, i) => {
                const selected = i >= 8 && i <= 10;
                return (
                  <motion.span
                    key={i}
                    className={`rounded-md py-1.5 text-sm ${
                      selected ? 'bg-electric font-semibold text-white shadow-[0_0_14px_rgb(42_127_255/0.6)]' : 'bg-panel text-chrome'
                    }`}
                    initial={selected ? { scale: 0.6, opacity: 0 } : false}
                    whileInView={selected ? { scale: 1, opacity: 1 } : undefined}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1.2 + (i - 8) * 0.15 }}
                  >
                    {i + 1}
                  </motion.span>
                );
              })}
            </div>
          </div>

          <Checklist items={['Real-time availability', 'Instant confirmation', 'Secure online payment']} />

          <div className="mt-auto pt-8">
            <Link href="/trailers#book" className="btn btn-primary w-full">
              <Icon name="calendar" className="h-5 w-5" />
              Book online now
            </Link>
          </div>
        </motion.article>

        <motion.article className="panel flex flex-col p-6 sm:p-8" {...panelMotion(2)} whileHover={{ y: -6 }}>
          <h2 className="display text-3xl text-white sm:text-4xl">Unattended pickup</h2>
          <p className="mt-1 text-mute">Collect your trailer on your schedule.</p>

          <div className="mt-6 flex flex-1 flex-col items-center gap-2">
            <div
              aria-hidden="true"
              className="relative w-40 shrink-0 rounded-2xl border border-line bg-gradient-to-b from-[#1a2a45] to-[#070c18] p-4 shadow-[0_0_44px_rgb(42_127_255/0.28)]"
            >
              <p className="display text-center text-sm text-chrome">On Call</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {KEYS.map((key, i) =>
                  key === '' ? (
                    <span key={i} />
                  ) : (
                    <span
                      key={i}
                      className="rounded-md border border-line bg-ink/80 py-2 text-center text-base text-chrome"
                    >
                      {key}
                    </span>
                  ),
                )}
              </div>
              <div className="mt-3 flex justify-center text-electric-hi">
                <Icon name="lock" className="h-5 w-5" />
              </div>
              <span className="absolute inset-x-6 -bottom-px h-0.5 animate-pulse rounded-full bg-electric shadow-[0_0_14px_3px_rgb(42_127_255/0.9)]" />
            </div>
            <div className="self-stretch">
              <Checklist items={['Self-service access', 'Simple and secure', 'Fast, contactless pickup']} />
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
