'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Site-wide progressive enhancement, mounted once in the layout:
 * reveals for [data-reveal], magnetic primary buttons and the scroll progress hairline.
 * Everything is a no-op when the visitor prefers reduced motion.
 */
export function Enhance() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
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

    // Scroll progress
    const bar = document.querySelector<HTMLElement>('.progress');
    let frame = 0;
    const updateBar = () => {
      frame = 0;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateBar);
    };
    if (!reduce.matches) {
      window.addEventListener('scroll', onScroll, { passive: true });
      updateBar();
    }

    // Magnetic buttons (fine pointers only)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onMove = (event: PointerEvent) => {
      const btn = (event.target as HTMLElement | null)?.closest<HTMLElement>('.btn--primary');
      if (!btn) return;
      const box = btn.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      btn.style.setProperty('--mx', `${dx * 0.14}px`);
      btn.style.setProperty('--my', `${dy * 0.2}px`);
    };
    const onLeave = (event: PointerEvent) => {
      const btn = (event.target as HTMLElement | null)?.closest<HTMLElement>('.btn--primary');
      if (!btn) return;
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    };
    if (!reduce.matches && fine.matches) {
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerout', onLeave);
    }

    return () => {
      disconnectReveals?.();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
