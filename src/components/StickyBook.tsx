'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/data/site';

/** Mobile-only Book and Call bar that slides up once the visitor starts scrolling. */
export function StickyBook() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (value) => setShow(value > 400));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-ink/90 p-3 backdrop-blur-xl md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn-ghost flex-1 !px-4">
              Call
            </a>
          )}
          <Link href="/trailers#book" className="btn btn-primary flex-[2]">
            Book a trailer
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
