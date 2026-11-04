'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { trailers } from '@/data/trailers';
import { MAX_HOURS, MIN_HOURS, estimateHire, formatAud } from '@/lib/estimate';
import { useTween } from './useTween';

const trailer = trailers[0];

function hoursLabel(hours: number): string {
  return `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
}

/** A slider from one hour to three days, priced with the trailer's reference rate. Demonstration only. */
export function Estimator() {
  const uid = useId();
  const [hours, setHours] = useState(4);
  const total = useTween(estimateHire(trailer.rate, hours));

  return (
    <div className="calc">
      <div className="calc__controls">
        <div className="field">
          <label htmlFor={uid}>
            How long do you need the {trailer.name.toLowerCase()}?
          </label>
          <p className="display" style={{ fontSize: 'var(--text-section)' }} aria-hidden="true">
            {hoursLabel(hours)}
          </p>
          <input
            id={uid}
            className="range"
            type="range"
            min={MIN_HOURS}
            max={MAX_HOURS}
            step={1}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            aria-valuetext={hoursLabel(hours)}
          />
          <div className="range__marks" aria-hidden="true">
            <span style={{ left: 0 }}>1 hr</span>
            <span style={{ left: '100%', transform: 'translateX(-100%)' }}>3 days</span>
          </div>
        </div>
      </div>

      <div className="beam" data-tilt>
      <div className="quote">
        <p className="label">Demo reference pricing</p>
        <p className="fig" aria-live="polite" aria-atomic="true">
          {formatAud(Math.round(total))}
        </p>
        <p className="label">
          {trailer.name} for {hoursLabel(hours)}
        </p>
        <Link href="/trailers#book" className="btn btn--primary">
          Check availability
        </Link>
        <p className="note">Demonstration only — not a quote. Rates await owner approval.</p>
      </div>
      </div>
    </div>
  );
}
