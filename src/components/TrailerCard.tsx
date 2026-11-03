'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { Trailer } from '@/data/trailers';
import { TrailerGlyph } from './TrailerGlyph';

interface TrailerCardProps {
  trailer: Trailer;
}

export function TrailerCard({ trailer }: TrailerCardProps) {
  return (
    <motion.article
      className="card-edge group relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-10 lg:flex-row lg:items-center lg:gap-12"
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-electric/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
      />

      <div className="relative mb-8 flex h-56 items-center justify-center rounded-2xl border border-line bg-ink/60 sm:h-72 lg:mb-0 lg:h-80 lg:w-1/2 lg:shrink-0">
        <TrailerGlyph className="h-44 w-auto sm:h-56" />
      </div>

      <div className="relative flex flex-1 flex-col">
        <p className="mb-3 w-fit rounded-full border border-electric/50 bg-electric/10 px-3 py-1 text-sm font-semibold text-electric-hi">
          {trailer.quantity} in the fleet
        </p>
        <h3 className="display text-5xl text-white sm:text-6xl">{trailer.name}</h3>
        <p className="mt-3 max-w-lg text-lg text-mute">{trailer.blurb}</p>

        <ul className="my-5 flex flex-wrap gap-2" aria-label={`${trailer.name} specifications`}>
          {trailer.specs.map((spec) => (
            <li key={spec} className="rounded-full border border-line bg-panel px-3 py-1 text-sm text-chrome">
              {spec}
            </li>
          ))}
        </ul>

        <ul className="mb-6 space-y-2 text-chrome" aria-label="Good for">
          {trailer.goodFor.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-electric" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <p>
            <span className="display blue-text text-6xl">{trailer.price}</span>
            <span className="ml-2 text-sm text-mute">{trailer.priceNote}</span>
          </p>
          <Link href="/trailers#book" className="btn btn-primary !px-6 !py-3">
            Book
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
