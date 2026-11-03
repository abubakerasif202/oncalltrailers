'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const WHEELS = [128, 168] as const;

/** A trailer that drives along the road as the visitor scrolls past, wheels turning. */
export function RoadTrailer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['-22%', '96%']);
  const wheelSpin = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const roadShift = useTransform(scrollYProgress, [0, 1], [0, -240]);

  return (
    <div ref={ref} className="relative overflow-hidden py-14" aria-hidden="true">
      <div className="mx-auto max-w-7xl px-5">
        <div className="relative h-36">
          <motion.div className="absolute bottom-0 left-0 w-56 sm:w-80" style={{ x }}>
            <svg viewBox="0 0 260 130" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 96h40" stroke="#93a6c4" strokeWidth="3" />
              <circle cx="8" cy="96" r="5" fill="#2a7fff" />
              <path d="M44 88h196v-10H44z" fill="#0d1a2e" stroke="#e3eaf5" strokeWidth="3" />
              <path d="M60 78V30h168v48" stroke="#e3eaf5" strokeWidth="3" />
              <path
                d="M60 46h168M60 62h168M92 30v48M124 30v48M156 30v48M188 30v48"
                stroke="#6aa9ff"
                strokeWidth="1.5"
                opacity="0.75"
              />
              {WHEELS.map((cx) => (
                <motion.g
                  key={cx}
                  style={{ rotate: wheelSpin, transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <circle cx={cx} cy="92" r="17" fill="#04070d" stroke="#e3eaf5" strokeWidth="3" />
                  <circle cx={cx} cy="92" r="6" fill="#2a7fff" />
                  <path d={`M${cx} 77v30M${cx - 15} 92h30`} stroke="#93a6c4" strokeWidth="2" />
                </motion.g>
              ))}
            </svg>
          </motion.div>
        </div>

        <div className="relative h-3 overflow-hidden rounded-full border border-line bg-panel">
          <motion.div
            className="absolute inset-y-0 left-0 w-[200%]"
            style={{
              x: roadShift,
              backgroundImage:
                'repeating-linear-gradient(90deg, var(--color-electric-hi) 0 28px, transparent 28px 64px)',
              opacity: 0.55,
              height: 2,
              top: 'calc(50% - 1px)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
