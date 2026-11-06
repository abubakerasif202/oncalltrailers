import { aud, LISTING_NAME, rateNote, rates } from '@/data/listing';

/** Daily hire rates as listed for the linked trailer, keeping each duration condition and the listing's fee wording. */
export function Rates() {
  return (
    <>
      <dl className="rates" aria-label={`Listed hire rates for the ${LISTING_NAME} listing`}>
        {rates.map((tier) => (
          <div key={tier.label}>
            <dt>{tier.label}</dt>
            <dd>
              {aud(tier.perDay)} <small>{tier.basis}</small>
            </dd>
          </div>
        ))}
      </dl>
      <p className="note">{rateNote}</p>
    </>
  );
}
