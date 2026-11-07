'use client';

import { useRef } from 'react';
import { LISTING_URL, listingStats, ownerStats, PROFILE_URL, reviews } from '@/data/listing';

/**
 * Reviews exactly as published on the linked trailer listing. The listing's own rating and count are shown
 * separately from the owner-wide statistics, each linked to the page it came from.
 */
export function Reviews({ limit = 4 }: { limit?: number }) {
  const rail = useRef<HTMLUListElement>(null);
  const move = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return (
    <div className="reviews">
      <dl className="reviews__stats">
        <div>
          <dt>This listing</dt>
          <dd>
            <strong>{listingStats.rating}</strong> from {listingStats.reviews} reviews
          </dd>
        </div>
        <div>
          <dt>Owner profile ({ownerStats.name}, all trailers)</dt>
          <dd>
            <strong>{ownerStats.rating}</strong> from {ownerStats.reviews} reviews · {ownerStats.hires} hires ·{' '}
            {ownerStats.badge} · sharing since {ownerStats.since}
          </dd>
        </div>
      </dl>
      <div className="review-controls" aria-label="Review navigation">
        <button type="button" className="btn btn--ghost" onClick={() => move(-1)} aria-label="Previous reviews">←</button>
        <span>Stories from the road</span>
        <button type="button" className="btn btn--ghost" onClick={() => move(1)} aria-label="Next reviews">→</button>
      </div>
      <ul className="reviews__list reviews__carousel" ref={rail} tabIndex={0} aria-label="Customer reviews — scroll for more">
        {reviews.slice(0, limit).map((review) => (
          <li key={review.name + review.month}>
            <blockquote>“{review.text}”</blockquote>
            <p className="label">
              {review.name} · {review.month}
            </p>
          </li>
        ))}
      </ul>
      <p className="note">
        Reviews as published on Local Trailer Hire.{' '}
        <a href={LISTING_URL} className="link" target="_blank" rel="noopener noreferrer">
          Listing reviews<span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        {' · '}
        <a href={PROFILE_URL} className="link" target="_blank" rel="noopener noreferrer">
          Owner profile<span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
