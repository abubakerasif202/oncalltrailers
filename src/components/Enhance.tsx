'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Site-wide progressive enhancement, mounted once in the layout: scroll reveals,
 * magnetic primary buttons, 3D tilt with glare and the hero flashlight.
 * Everything is a no-op when the visitor prefers reduced motion, and pointer effects need a fine pointer.
 */
export function Enhance() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const wide = window.matchMedia('(min-width: 1024px)');
    let disconnectReveals: (() => void) | undefined;

    // Reveals
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (reduce.matches || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
      );
      targets.forEach((el) => io.observe(el));
      disconnectReveals = () => io.disconnect();
    }

    // Pointer effects
    let tilted: HTMLElement | null = null;
    const resetTilt = (el: HTMLElement) => {
      el.style.setProperty('--tx', '0deg');
      el.style.setProperty('--ty', '0deg');
      el.style.setProperty('--ts', '1');
      el.dataset.hover = 'false';
    };
    const hero = document.querySelector<HTMLElement>('.hero');
    const lit = hero?.querySelector<HTMLElement>('.hero__lit') ?? null;

    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest<HTMLElement>('.btn--primary');
      if (btn) {
        const box = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${(event.clientX - (box.left + box.width / 2)) * 0.24}px`);
        btn.style.setProperty('--my', `${(event.clientY - (box.top + box.height / 2)) * 0.24}px`);
      }

      if (wide.matches) {
        const card = target.closest<HTMLElement>('[data-tilt]');
        if (tilted && tilted !== card) resetTilt(tilted);
        if (card) {
          const box = card.getBoundingClientRect();
          const x = event.clientX - box.left;
          const y = event.clientY - box.top;
          card.style.setProperty('--tx', `${((y - box.height / 2) / (box.height / 2)) * -6}deg`);
          card.style.setProperty('--ty', `${((x - box.width / 2) / (box.width / 2)) * 6}deg`);
          card.style.setProperty('--ts', '1.015');
          card.style.setProperty('--gx', `${x}px`);
          card.style.setProperty('--gy', `${y}px`);
          card.dataset.hover = 'true';
          tilted = card;
        } else {
          tilted = null;
        }
      }

      if (hero && lit) {
        if (hero.contains(target)) {
          const box = lit.getBoundingClientRect();
          lit.style.setProperty('--sx', `${event.clientX - box.left}px`);
          lit.style.setProperty('--sy', `${event.clientY - box.top}px`);
          hero.dataset.lit = 'true';
        } else {
          hero.dataset.lit = 'false';
        }
      }
    };
    const onOut = (event: PointerEvent) => {
      const btn = (event.target as HTMLElement | null)?.closest<HTMLElement>('.btn--primary');
      if (btn) {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      }
      if (!event.relatedTarget) {
        if (tilted) resetTilt(tilted);
        tilted = null;
        if (hero) hero.dataset.lit = 'false';
      }
    };
    if (!reduce.matches && fine.matches) {
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerout', onOut);
    }

    return () => {
      disconnectReveals?.();
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, [pathname]);

  return null;
}
