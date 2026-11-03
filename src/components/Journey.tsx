'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { steps } from '@/data/content';
import { trailers } from '@/data/trailers';

const COUNT = steps.length;

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="space-y-3" aria-hidden="true">
        {trailers.map((trailer) => (
          <div
            key={trailer.slug}
            className="flex items-center justify-between rounded-xl border border-electric bg-electric/10 px-4 py-3"
          >
            <span className="text-chrome">{trailer.name}</span>
            <span className="display blue-text text-2xl">{trailer.price}</span>
          </div>
        ))}
        <div className="btn btn-primary w-full">Book now</div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="space-y-5" aria-hidden="true">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
            <circle cx="24" cy="24" r="21" stroke="#2a7fff" strokeWidth="3" />
            <motion.path
              d="M14 25l7 7 13-15"
              stroke="#e3eaf5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            />
          </svg>
          <span className="display text-3xl text-white">Identity verified</span>
        </div>
        <p className="text-mute">Your access code is sent to you automatically.</p>
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((n) => (
            <motion.span
              key={n}
              className="flex h-14 w-14 items-center justify-center rounded-lg border border-electric/60 bg-ink text-2xl text-electric-hi"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + n * 0.1 }}
            >
              •
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4" aria-hidden="true">
      <motion.div
        className="overflow-hidden rounded-xl"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Image src="/trailer-photo.jpg" alt="" width={1340} height={500} sizes="(min-width: 1024px) 40vw, 90vw" className="h-auto w-full" />
      </motion.div>
      <p className="display text-2xl text-chrome">Hitch up. Tow away.</p>
    </div>
  );
}

function JourneyPanel({ index }: { index: number }) {
  const step = steps[index];

  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2">
      <div>
        <p className="display blue-text text-[clamp(5rem,14vw,10rem)]" aria-hidden="true">
          {index + 1}
        </p>
        <h3 className="display -mt-2 text-4xl text-white sm:text-6xl">{step.title}</h3>
        <p className="mt-4 max-w-md text-lg text-mute">{step.body}</p>
      </div>
      <div className="panel p-6 sm:p-8">
        <StepVisual index={index} />
      </div>
    </div>
  );
}

function StaticSteps() {
  return (
    <ol className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.title} className="panel p-6">
          <p className="display blue-text text-6xl" aria-hidden="true">
            {i + 1}
          </p>
          <h3 className="display mt-2 text-3xl text-white">{step.title}</h3>
          <p className="mt-3 text-mute">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Three booking stages pinned to the scroll: the visitor drives the story forward. */
export function Journey() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(value * COUNT)));
    setActive((current) => (current === next ? current : next));
  });

  if (reduce) {
    return <StaticSteps />;
  }

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative mx-auto h-[34rem] w-full max-w-7xl px-5 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="h-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <JourneyPanel index={active} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 h-1 w-[min(28rem,70vw)] -translate-x-1/2 overflow-hidden rounded-full bg-line"
        >
          <motion.div className="h-full origin-left bg-electric" style={{ scaleX: railScale }} />
        </div>
      </div>
    </div>
  );
}
