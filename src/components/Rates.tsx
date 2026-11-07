import { aud, LISTING_NAME, rateNote, rates as cageRates, type RateTier } from '@/data/listing';

interface RatesProps {
  /** Rates for one listing; defaults to the 12x6 cage trailer listing. */
  rates?: readonly RateTier[];
  listingName?: string;
}

/** Daily hire rates as listed for a trailer, keeping each duration condition and the listing's fee wording. */
export function Rates({ rates = cageRates, listingName = LISTING_NAME }: RatesProps) {
  return (
    <>
      <dl className="rates" aria-label={`Listed hire rates for the ${listingName} listing`}>
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
