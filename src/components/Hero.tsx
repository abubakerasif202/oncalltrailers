'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type { PointerEvent } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const rise = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 100, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-electric-hi) 1px, transparent 1px), linear-gradient(90deg, var(--color-electric-hi) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 72% 30%, black, transparent 70%)',
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <h1 className="display text-[clamp(3.6rem,10.5vw,8rem)]">
            <span className="block overflow-hidden pb-[0.08em] pr-4">
              <motion.span variants={rise} className="chrome-text block">
                Ready when
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] pr-4">
              <motion.span variants={rise} className="blue-text block">
                you are.
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fade} className="mt-7 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
            Self-service trailer hire in Sydney. Book online, verify once, get your access code and
            tow away. No counter, no queue.
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-wrap gap-4">
            <Link href="/trailers#book" className="btn btn-primary">
              Book a trailer
            </Link>
            <Link href="/trailers" className="btn btn-ghost">
              View the fleet
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-md [perspective:1100px] lg:max-w-none"
          initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-electric/30 blur-[90px]"
            animate={reduce ? undefined : { opacity: [0.45, 0.9, 0.45], scale: [0.94, 1.1, 0.94] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={reduce ? undefined : { rotateX, rotateY }}
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/logo.png"
              alt="On Call Trailers crest: a galvanised cage trailer in front of the Sydney skyline. Ready when you are."
              width={720}
              height={720}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="relative h-auto w-full drop-shadow-[0_30px_60px_rgba(42,127,255,0.35)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
