import { aud, rates } from '@/data/listing';

/** Daily hire rates as listed by the owner: total per day including fees and taxes. */
export function Rates() {
  return (
    <>
      <dl className="rates">
        {rates.map((tier) => (
          <div key={tier.label}>
            <dt>{tier.label}</dt>
            <dd>
              {aud(tier.perDay)} <small>per day</small>
            </dd>
          </div>
        ))}
      </dl>
      <p className="note">Total daily hire cost including all fees and taxes, as listed on the booking page.</p>
    </>
  );
}
