'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

/** A booking bar that slides in once the hero has gone and leaves before the footer. */
export function StickyBook() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const footer = document.querySelector('.site-footer');
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(past && !nearFooter);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="sticky-book" data-visible={visible} aria-hidden={!visible}>
      <span>Self-service trailer hire in {site.region}</span>
      <Link href="/trailers#book" className="btn btn--primary btn--sm" tabIndex={visible ? 0 : -1}>
        Book now
      </Link>
    </div>
  );
}
