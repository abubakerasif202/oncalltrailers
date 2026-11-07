import Link from 'next/link';
import { fleet } from '@/data/fleet';
import { Lines, Reveal } from './Reveal';

const TBC = 'To be confirmed';

function Cell({ label, value }: { label: string; value: string | null }) {
  return (
    <td data-label={label} className={value ? undefined : 'compare__tbc'}>
      {value ?? TBC}
    </td>
  );
}

/**
 * Side-by-side comparison. Trailers are rows and facts are columns, so on phones each row becomes a labelled card
 * without a second copy of the content. A value the owner has not confirmed reads "To be confirmed".
 */
export function FleetComparison() {
  return (
    <section className="section band" aria-label="Compare the trailers">
      <div className="container">
        <div className="section__head">
          <Reveal as="p" className="eyebrow">
            Compare
          </Reveal>
          <Lines as="h2" lines={['Which trailer', 'fits the job?']} />
        </div>
        <Reveal>
          <table className="compare">
            <caption className="visually-hidden">
              Comparison of the cage, motorcycle and car trailers: use, size, payload, towing weight, hire rate, pickup and booking
            </caption>
            <thead>
              <tr>
                <th scope="col">Trailer</th>
                <th scope="col">Primary use</th>
                <th scope="col">Size</th>
                <th scope="col">Payload</th>
                <th scope="col">Towing weight (ATM)</th>
                <th scope="col">Hire rate</th>
                <th scope="col">Pickup</th>
                <th scope="col">Booking</th>
              </tr>
            </thead>
            <tbody>
              {fleet.map((trailer) => (
                <tr key={trailer.slug}>
                  <th scope="row" data-label="Trailer">
                    <Link href={`/trailers/${trailer.slug}`} className="link">
                      {trailer.name}
                    </Link>
                    <small>{trailer.compare.type}</small>
                  </th>
                  <Cell label="Primary use" value={trailer.compare.use} />
                  <Cell label="Size" value={trailer.compare.size} />
                  <Cell label="Payload" value={trailer.compare.payload} />
                  <Cell label="Towing weight (ATM)" value={trailer.compare.atm} />
                  <Cell label="Hire rate" value={trailer.compare.rate} />
                  <Cell label="Pickup" value={trailer.pickup} />
                  <Cell label="Booking" value={trailer.compare.booking} />
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="note note--spaced">
          Always check your vehicle’s towing capacity and towbar rating against the trailer’s weight before you book.
        </p>
      </div>
    </section>
  );
}
