'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface MarqueeProps {
  words: readonly string[];
}

/** Giant outlined type that slides sideways as the band scrolls past: driven by scroll position, not a timer. */
export function Marquee({ words }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const forward = useTransform(scrollYProgress, [0, 1], ['6%', '-34%']);
  const backward = useTransform(scrollYProgress, [0, 1], ['-34%', '6%']);
  const row = [...words, ...words, ...words];

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <motion.div className="marquee__row" style={{ x: forward }}>
        {row.map((word, index) => (
          <span key={`a${index}`} className={`marquee__word${index % 2 ? ' marquee__word--solid' : ''}`}>
            {word}
          </span>
        ))}
      </motion.div>
      <motion.div className="marquee__row" style={{ x: backward }}>
        {row.map((word, index) => (
          <span key={`b${index}`} className={`marquee__word${index % 2 ? '' : ' marquee__word--solid'}`}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
