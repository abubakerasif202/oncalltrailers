'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import trailerSide from '@/assets/trailer-side.webp';
import { hotspots } from '@/data/content';

const PINNED = '(min-width: 61rem) and (prefers-reduced-motion: no-preference)';

/**
 * One pinned scroll scene: as the section scrolls, the camera pushes in on each part of the trailer in turn,
 * a laser line scans the frame and a telemetry card opens beside the active radar hotspot.
 * Hotspots are buttons too. Without scripting, or with reduced motion, it is a plain image and a list.
 */
export function Anatomy() {
  const section = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!window.matchMedia(PINNED).matches) return;
    const index = Math.min(hotspots.length - 1, Math.max(0, Math.floor(progress * hotspots.length)));
    setActive((current) => (current === index ? current : index));
  });

  const goTo = useCallback((index: number) => {
    setActive(index);
    const node = section.current;
    if (!node || !window.matchMedia(PINNED).matches) return;
    const travel = node.offsetHeight - window.innerHeight;
    const top = node.getBoundingClientRect().top + window.scrollY;
    const target = top + (travel * (index + 0.5)) / hotspots.length;
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  }, []);

  const current = hotspots[active];
  const leftSide = current.x > 55;

  return (
    <div className="anatomy" ref={section} id="anatomy">
      <div className="anatomy__sticky">
        <div className="container">
          <div
            className="plate anatomy__stage"
            style={
              {
                '--anatomy-zoom': current.zoom,
                '--anatomy-origin': `${current.x}% ${current.y}%`,
              } as React.CSSProperties
            }
          >
            <div className="anatomy__zoom">
              <Image
                src={trailerSide}
                alt="Galvanised tandem cage trailer inspection view"
                className="plate__img"
                sizes="(min-width: 1440px) 1312px, 100vw"
              />
              {hotspots.map((spot, index) => (
                <button
                  key={spot.n}
                  type="button"
                  className="hotspot"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  aria-pressed={active === index}
                  aria-label={`${spot.n} ${spot.label}: ${spot.title}`}
                  onClick={() => goTo(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="laser" aria-hidden="true" />
            <div
              className="hud"
              aria-hidden="true"
              style={{
                left: `${current.x}%`,
                top: `${Math.min(Math.max(current.y, 28), 72)}%`,
                transform: leftSide ? 'translate(calc(-100% - 48px), -50%)' : 'translate(48px, -50%)',
              }}
            >
              <p className="label">
                {current.n} · {current.label}
              </p>
              <h3 className="display">{current.title}</h3>
              <p>{current.body}</p>
            </div>
          </div>
          <div className="anatomy__list" style={{ marginTop: 'var(--space-xl)' }}>
            {hotspots.map((spot, index) => (
              <div className="anatomy__item" key={spot.n} data-active={active === index}>
                <h3>{spot.title}</h3>
                <p>{spot.body}</p>
                <p className="label">
                  {spot.n} · {spot.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
