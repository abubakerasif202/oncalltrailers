'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { MOTION_EVENT, motionAllowed } from '@/lib/motion';

/** Inertial smooth scrolling for wheel input. Off for reduced motion and when animations are paused. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis || !motionAllowed()) return;
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: { offset: -90 }, autoRaf: true });
      window.__lenis = lenis;
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
      delete window.__lenis;
    };
    const onChange = () => (motionAllowed() ? start() : stop());

    start();
    window.addEventListener(MOTION_EVENT, onChange);
    return () => {
      window.removeEventListener(MOTION_EVENT, onChange);
      stop();
    };
  }, []);

  // A new page starts at the top, unless the link carries a hash.
  useEffect(() => {
    if (window.location.hash) return;
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
