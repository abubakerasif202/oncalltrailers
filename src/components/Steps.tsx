'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useRef } from 'react';

interface StepItem {
  title: string;
  body: string;
  meta?: string;
}

/** Numbered stages beside a meter that fills as the list scrolls past. Full without scripting. */
export function Steps({ items, level = 3 }: { items: readonly StepItem[]; level?: 2 | 3 }) {
  const Heading = level === 2 ? 'h2' : 'h3';
  const list = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 65%'] });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      list.current?.style.setProperty('--steps-progress', '1');
    }
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    list.current?.style.setProperty('--steps-progress', String(Math.min(1, Math.max(0, value))));
  });

  return (
    <div className="steps" ref={list}>
      <span className="steps__meter" aria-hidden="true">
        <span />
      </span>
      <ol className="steps__list">
      {items.map((item, index) => (
        <li key={item.title} data-reveal="">
          <div>
            <span className="num">{String(index + 1).padStart(2, '0')}</span>
            <Heading>{item.title}</Heading>
          </div>
          <div>
            <p>{item.body}</p>
            {item.meta ? <p className="label" style={{ marginTop: 'var(--space-md)' }}>{item.meta}</p> : null}
          </div>
        </li>
      ))}
      </ol>
    </div>
  );
}
