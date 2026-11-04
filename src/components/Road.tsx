'use client';

import { useEffect, useRef } from 'react';
import { MOTION_EVENT, motionAllowed } from '@/lib/motion';

const PERIOD = 28; // px between dashes
const CRUISE = 46; // px per second when idle: the rig never stops
const MAX = 1100;

/**
 * A dashed road along the top edge with a rig that drives along it.
 * The rig's position follows scroll progress, the road runs under it all the time,
 * and scrolling makes it run faster: the wheels spin and a speed trail fades in.
 */
export function Road() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const dashes = el.querySelector<HTMLElement>('.road__dashes');
    const rig = el.querySelector<HTMLElement>('.road__rig');
    const trail = el.querySelector<HTMLElement>('.road__trail');
    const wheels = Array.from(el.querySelectorAll<SVGGElement>('.road__wheel'));
    if (!dashes || !rig) return;

    let frame = 0;
    let running = false;
    let offset = 0;
    let angle = 0;
    let speed = CRUISE;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const tick = (now: number) => {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, Math.max(0.001, (now - lastT) / 1000));
      lastT = now;

      const y = window.scrollY;
      const scrollSpeed = Math.abs(y - lastY) / dt;
      lastY = y;

      const target = CRUISE + Math.min(MAX, scrollSpeed * 0.55);
      speed += (target - speed) * Math.min(1, dt * 5);
      offset = (offset + speed * dt) % PERIOD;
      angle = (angle + speed * dt * 5) % 360;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, y / max) : 0;
      const x = progress * (window.innerWidth - 36);
      const bob = Math.sin(now / 90) * Math.min(0.9, speed / 700);

      dashes.style.transform = `translate3d(${-offset}px, 0, 0)`;
      rig.style.transform = `translate3d(${x}px, ${bob}px, 0)`;
      for (const wheel of wheels) wheel.style.transform = `rotate(${angle}deg)`;
      if (trail) {
        trail.style.opacity = String(Math.min(1, Math.max(0, (speed - 140) / 600)));
        trail.style.transform = `scaleX(${0.4 + Math.min(1, speed / 700)})`;
      }
    };

    const start = () => {
      if (running || !motionAllowed()) return;
      running = true;
      lastT = performance.now();
      lastY = window.scrollY;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const onChange = () => (motionAllowed() ? start() : stop());
    const onVisibility = () => (document.hidden ? stop() : onChange());

    start();
    window.addEventListener(MOTION_EVENT, onChange);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.removeEventListener(MOTION_EVENT, onChange);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="road" ref={root} aria-hidden="true">
      <div className="road__dashes" />
      <div className="road__rig">
        <span className="road__trail" />
        <svg viewBox="0 0 28 14" width="28" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
          <path d="M1 4h3M4 4v6M4 8h22M26 4v9H8V4zM5 10l-3 3" />
          <g className="road__wheel">
            <circle cx="12" cy="11" r="2.2" />
            <path d="M12 9.2v3.6" />
          </g>
          <g className="road__wheel">
            <circle cx="19" cy="11" r="2.2" />
            <path d="M19 9.2v3.6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
