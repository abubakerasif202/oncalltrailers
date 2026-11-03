'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type { Trailer } from '@/data/trailers';
import { Icon } from './Icon';

interface TrailerCardProps {
  trailer: Trailer;
}

export function TrailerCard({ trailer }: TrailerCardProps) {
  return (
    <motion.article
      className="panel flex flex-col overflow-hidden lg:flex-row"
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative lg:w-[58%] lg:shrink-0">
        <Image
          src="/trailer-photo.jpg"
          alt="Galvanised tandem-axle cage trailer parked on wet tarmac in front of the Sydney skyline at night"
          width={1340}
          height={500}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="h-full w-full object-cover"
        />
        <p className="absolute left-4 top-4 rounded-full border border-electric/60 bg-ink/80 px-3 py-1 text-sm font-semibold text-electric-hi backdrop-blur">
          {trailer.quantity} in the fleet
        </p>
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <h3 className="display text-5xl text-white">{trailer.name}</h3>
        <p className="mt-3 text-lg text-mute">{trailer.blurb}</p>

        <ul className="my-5 flex flex-wrap gap-2" aria-label={`${trailer.name} specifications`}>
          {trailer.specs.map((spec) => (
            <li key={spec} className="rounded-full border border-line bg-ink/60 px-3 py-1 text-sm text-chrome">
              {spec}
            </li>
          ))}
        </ul>

        <ul className="mb-6 space-y-2 text-chrome" aria-label="Good for">
          {trailer.goodFor.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <Icon name="check" className="h-5 w-5 shrink-0 text-electric-hi" />
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
            <Icon name="calendar" className="h-5 w-5" />
            Book
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
