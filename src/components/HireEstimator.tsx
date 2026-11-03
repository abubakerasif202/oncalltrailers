'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { trailers } from '@/data/trailers';
import { estimateHire, formatAud, formatDuration, MAX_HOURS, MIN_HOURS } from '@/lib/estimate';

export function HireEstimator() {
  const sliderId = useId();
  const [slug, setSlug] = useState(trailers[0].slug);
  const [hours, setHours] = useState(4);

  const trailer = trailers.find((t) => t.slug === slug) ?? trailers[0];
  const total = estimateHire(trailer.rate, hours);
  const canChoose = trailers.length > 1;

  const target = useMotionValue(total);
  const spring = useSpring(target, { stiffness: 110, damping: 20 });
  const label = useTransform(spring, (v) => formatAud(Math.round(v)));

  useEffect(() => {
    target.set(total);
  }, [total, target]);

  return (
    <div className="card-edge rounded-3xl p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          {canChoose && (
            <>
              <p className="mb-3 text-sm font-semibold text-mute" id={`${sliderId}-group`}>
                Choose a trailer
              </p>
              <div role="radiogroup" aria-labelledby={`${sliderId}-group`} className="mb-9 flex flex-wrap gap-2">
                {trailers.map((t) => {
                  const active = t.slug === slug;
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSlug(t.slug)}
                      className="relative min-h-11 rounded-full border border-line px-4 py-2 text-sm font-semibold text-chrome transition-colors hover:border-electric"
                    >
                      {active && (
                        <motion.span
                          layoutId="estimator-pill"
                          className="absolute inset-0 rounded-full bg-electric"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <label htmlFor={sliderId} className="mb-3 flex items-baseline justify-between text-sm font-semibold text-mute">
            <span>How long do you need the {trailer.name.toLowerCase()}?</span>
            <span className="display text-3xl text-white">{formatDuration(hours)}</span>
          </label>
          <input
            id={sliderId}
            type="range"
            min={MIN_HOURS}
            max={MAX_HOURS}
            step={1}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-electric"
          />
          <div className="mt-2 flex justify-between text-xs text-mute">
            <span>1 hr</span>
            <span>3 days</span>
          </div>
        </div>

        <div className="rounded-2xl border border-electric/40 bg-ink/70 p-7 text-center">
          <p className="text-sm text-mute">Estimated hire</p>
          <p className="display blue-text my-2 text-7xl" aria-live="polite" aria-atomic="true">
            <motion.span>{label}</motion.span>
          </p>
          <p className="text-sm text-mute">
            {trailer.name} for {formatDuration(hours)}
          </p>
          <Link href="/trailers#book" className="btn btn-primary mt-6 w-full">
            Check availability
          </Link>
          <p className="mt-4 text-xs text-mute">Estimate only. Your final price is shown at booking.</p>
        </div>
      </div>
    </div>
  );
}
