'use client';

import { useEffect, useState } from 'react';
import { motionPaused, setMotionPaused } from '@/lib/motion';

/** Lets a visitor pause the decorative motion (particles, road, shimmer, beams) for the whole site. */
export function MotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem('motion');
    } catch {
      stored = null;
    }
    if (stored === 'off' && !motionPaused()) setMotionPaused(true);
    // Reading the attribute after mount keeps the server and client markup identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaused(motionPaused());
  }, []);

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={paused}
      onClick={() => {
        setMotionPaused(!paused);
        setPaused(!paused);
      }}
    >
      {paused ? 'Play animations' : 'Pause animations'}
    </button>
  );
}
