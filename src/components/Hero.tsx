'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from './Icon';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const promises = ['Premium trailer hire', 'Fast booking', 'Unattended pickup'] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 24]);

  return (
    <section className="relative isolate overflow-hidden pt-28 lg:pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(900px_500px_at_80%_20%,rgb(42_127_255/0.18),transparent_65%)]"
      />

      <motion.div
        className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 pb-10 sm:px-8 lg:min-h-[700px] lg:pb-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <h1 className="display text-[clamp(4.6rem,13vw,10.5rem)] leading-[0.86]">
          <span className="block overflow-hidden pb-[0.05em] pr-4">
            <motion.span variants={rise} className="block">
              <span className="chrome-text">On</span> <span className="blue-text">Call</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em] pr-4">
            <motion.span variants={rise} className="chrome-text block text-[0.6em]">
              Trailers
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fade}
          className="display mt-5 w-fit bg-gradient-to-r from-electric/45 via-electric/20 to-electric/5 px-9 py-2 text-xl tracking-[0.22em] text-white [clip-path:polygon(18px_0,100%_0,calc(100%-18px)_100%,0_100%)] sm:text-3xl"
        >
          Ready when you are
        </motion.p>

        <motion.ul
          variants={fade}
          className="mt-6 flex max-w-xl flex-col gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-chrome sm:flex-row sm:flex-wrap sm:gap-y-2"
        >
          {promises.map((item, i) => (
            <li key={item} className={i > 0 ? 'sm:ml-4 sm:border-l sm:border-line sm:pl-4' : undefined}>
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fade} className="mt-9 flex flex-wrap gap-4">
          <Link href="/trailers#book" className="btn btn-primary">
            <Icon name="calendar" className="h-5 w-5" />
            Book a trailer now
          </Link>
          <Link href="/how-it-works" className="btn btn-outline">
            <Icon name="play" className="h-5 w-5" />
            How it works
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="hero-scene relative -z-10 -ml-[48%] mt-2 w-[148%] max-w-none lg:absolute lg:bottom-0 lg:right-0 lg:ml-0 lg:mt-0 lg:w-[86%]"
        style={{ y: sceneY }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image
          src="/hero-scene.jpg"
          alt=""
          width={1916}
          height={821}
          priority
          sizes="(min-width: 1024px) 86vw, 148vw"
          className="h-auto w-full"
        />
      </motion.div>
    </section>
  );
}
