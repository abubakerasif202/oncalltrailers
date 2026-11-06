import { LISTING_URL, ownerStats, reviews } from '@/data/listing';

/** Reviews exactly as published on the owner's listing, each attributed and linked to its source. */
export function Reviews({ limit = 4 }: { limit?: number }) {
  return (
    <div className="reviews">
      <p className="reviews__summary">
        <strong>{ownerStats.rating}</strong> from {ownerStats.reviews} reviews · {ownerStats.hires} hires ·{' '}
        {ownerStats.badge} on Local Trailer Hire
      </p>
      <ul className="reviews__list">
        {reviews.slice(0, limit).map((review) => (
          <li key={review.name + review.month}>
            <blockquote>“{review.text}”</blockquote>
            <p className="label">
              {review.name} · {review.month}
            </p>
          </li>
        ))}
      </ul>
      <a href={LISTING_URL} className="link" target="_blank" rel="noopener noreferrer">
        Read all reviews on Local Trailer Hire
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
