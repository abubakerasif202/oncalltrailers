'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { Trailer } from '@/data/trailers';
import { TrailerGlyph } from './TrailerGlyph';

interface TrailerCardProps {
  trailer: Trailer;
  index: number;
  featured?: boolean;
}

export function TrailerCard({ trailer, index, featured = false }: TrailerCardProps) {
  return (
    <motion.article
      className={`card-edge group relative flex overflow-hidden rounded-2xl ${
        featured ? 'flex-col p-7 sm:p-9 lg:row-span-2' : 'flex-col p-6 sm:flex-row sm:items-center sm:gap-6'
      }`}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-electric/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
      />

      <div
        className={`relative flex items-center justify-center rounded-xl border border-line bg-ink/60 ${
          featured ? 'mb-7 h-56 sm:h-72' : 'mb-5 h-32 sm:mb-0 sm:h-36 sm:w-56 sm:shrink-0'
        }`}
      >
        <TrailerGlyph kind={trailer.kind} className={featured ? 'h-44 w-auto sm:h-56' : 'h-24 w-auto'} />
      </div>

      <div className="relative flex flex-1 flex-col">
        <h3 className={`display text-white ${featured ? 'text-5xl sm:text-6xl' : 'text-3xl'}`}>
          {trailer.name}
        </h3>
        <p className={`mt-3 text-mute ${featured ? 'max-w-lg text-lg' : ''}`}>{trailer.blurb}</p>

        <ul className="mb-5 mt-5 flex flex-wrap gap-2" aria-label={`${trailer.name} specifications`}>
          {trailer.specs.map((spec) => (
            <li key={spec} className="rounded-full border border-line bg-panel px-3 py-1 text-sm text-chrome">
              {spec}
            </li>
          ))}
        </ul>

        {featured && (
          <ul className="mt-6 space-y-2 text-chrome" aria-label="Good for">
            {trailer.goodFor.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-6 bg-electric" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <p>
            <span className={`display blue-text ${featured ? 'text-6xl' : 'text-4xl'}`}>{trailer.price}</span>
            <span className="ml-2 text-sm text-mute">{trailer.priceNote}</span>
          </p>
          <Link href="/trailers#book" className="btn btn-primary !px-5 !py-2.5 !text-base">
            Book
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
