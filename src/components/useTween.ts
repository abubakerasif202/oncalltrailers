'use client';

import { animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Eases a displayed number toward its target. Jumps straight there when motion is reduced. */
export function useTween(target: number, duration = 0.7): number {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const controls = animate(from.current, target, {
      duration: reduce ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        from.current = latest;
        setValue(latest);
      },
      onComplete: () => {
        from.current = target;
        setValue(target);
      },
    });
    return () => controls.stop();
  }, [target, duration]);

  return value;
}
