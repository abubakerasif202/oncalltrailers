'use client';

import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';
import { useRef } from 'react';

interface MarqueeProps {
  words: readonly string[];
}

/**
 * Giant outlined type that slides sideways as the band scrolls past and leans into the scroll speed.
 * Driven by scroll position and velocity, not a timer.
 */
export function Marquee({ words }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const skew = useTransform(velocity, [-2500, 2500], [7, -7]);
  const forward = useTransform(scrollYProgress, [0, 1], ['6%', '-34%']);
  const backward = useTransform(scrollYProgress, [0, 1], ['-34%', '6%']);
  const row = [...words, ...words, ...words];

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <motion.div className="marquee__row" style={{ x: forward, skewX: skew }}>
        {row.map((word, index) => (
          <span key={`a${index}`} className={`marquee__word${index % 2 ? ' marquee__word--solid' : ''}`}>
            {word}
          </span>
        ))}
      </motion.div>
      <motion.div className="marquee__row" style={{ x: backward, skewX: skew }}>
        {row.map((word, index) => (
          <span key={`b${index}`} className={`marquee__word${index % 2 ? '' : ' marquee__word--solid'}`}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
