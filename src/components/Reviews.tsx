'use client';

import { useEffect, useRef, useState } from 'react';
import { LISTING_URL, listingStats, ownerStats, PROFILE_URL, reviews } from '@/data/listing';

/** Marketplace reviews, with listing and owner statistics kept separate. */
export function Reviews({ limit = 4 }: { limit?: number }) {
  const items = reviews.slice(0, limit);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [focused, setFocused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const active = items.length ? index % items.length : 0;
  const running = items.length > 1 && motionAllowed && visible && pageVisible && !paused && !interacting && !focused;
  const move = (direction: number) => setIndex(value => (value + direction + items.length) % items.length);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotionAllowed(!media.matches && document.documentElement.dataset.motion !== 'off');
    const visibility = () => setPageVisible(!document.hidden);
    const mutation = new MutationObserver(update);
    mutation.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    update();
    visibility();
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { threshold: 0.2 });
    if (container.current) observer.observe(container.current);
    return () => {
      mutation.disconnect();
      observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % items.length), 6000);
    return () => window.clearInterval(timer);
  }, [running, items.length, active]);

  return (
    <div className="reviews">
      <dl className="reviews__stats">
        <div><dt>This listing</dt><dd><strong>{listingStats.rating}</strong> from {listingStats.reviews} reviews</dd></div>
        <div><dt>Owner profile ({ownerStats.name}, all trailers)</dt><dd><strong>{ownerStats.rating}</strong> from {ownerStats.reviews} reviews · {ownerStats.hires} hires · {ownerStats.badge} · sharing since {ownerStats.since}</dd></div>
      </dl>
      <div ref={container} className="review-stage" role="region" aria-roledescription="carousel" aria-label="Customer reviews"
        onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="review-controls" aria-label="Review navigation">
          <button type="button" className="btn btn--ghost" onClick={() => move(-1)} aria-label="Previous reviews" disabled={items.length < 2}>←</button>
          <span>Stories from the road</span>
          <button type="button" className="btn btn--ghost" onClick={() => move(1)} aria-label="Next reviews" disabled={items.length < 2}>→</button>
          <button type="button" className="btn btn--ghost review-pause" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Play reviews' : 'Pause reviews'}>{paused ? 'Play' : 'Pause'}</button>
        </div>
        <ul className="reviews__list reviews__carousel" tabIndex={0} aria-label="Customer reviews — use left and right arrow keys"
          onKeyDown={event => { if (items.length > 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
          {items.map((review, position) => (
            <li key={review.name + review.month} data-active={position === active} aria-hidden={position !== active}>
              <blockquote>“{review.text}”</blockquote><p className="label">{review.name} · {review.month}</p>
            </li>
          ))}
        </ul>
        <div className="review-progress" aria-hidden="true"><span key={`${active}-${running}`} data-running={running} /></div>
        <p className="review-position" aria-live={running ? 'off' : 'polite'}>{items.length ? active + 1 : 0} / {items.length}</p>
      </div>
      <p className="note">Reviews as published on Local Trailer Hire. <a href={LISTING_URL} className="link" target="_blank" rel="noopener noreferrer">Listing reviews<span className="visually-hidden"> (opens in a new tab)</span></a>{' · '}<a href={PROFILE_URL} className="link" target="_blank" rel="noopener noreferrer">Owner profile<span className="visually-hidden"> (opens in a new tab)</span></a></p>
    </div>
  );
}
