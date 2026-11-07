'use client';

import { useEffect, useState } from 'react';
import { telHref } from '@/data/booking';
import { site } from '@/data/site';
import { ContextualBookingLink } from './ContextualBookingLink';
import { PhoneIcon } from './Icons';

/** A compact booking bar that appears once the hero has gone and leaves before the footer. */
export function StickyBook() {
  const [visible, setVisible] = useState(false);
  const tel = telHref(site.phone);

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
    <div className="sticky-book" data-visible={visible} inert={!visible}>
      <span>Trailer hire in {site.region}</span>
      {tel ? (
        <a href={tel} className="btn btn--ghost btn--sm sticky-book__call" aria-label={`Call ${site.phone}`}>
          <PhoneIcon className="btn__icon" />
          <span className="sticky-book__call-text">Call</span>
        </a>
      ) : null}
      <ContextualBookingLink className="btn btn--primary btn--sm" short />
    </div>
  );
}
