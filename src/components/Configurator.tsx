'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { addons, durationSelect, durationTabs } from '@/data/content';
import { trailers } from '@/data/trailers';
import { formatAud } from '@/lib/estimate';
import { useTween } from './useTween';

const trailer = trailers[0];

function hireLabel(hours: number): string {
  const match = durationSelect.find((option) => option.hours === hours);
  return match ? match.label : `${hours} hrs`;
}

/** Duration, equipment and a live demonstration rate. The rate is the trailer's reference pricing, not a quote. */
export function Configurator() {
  const uid = useId();
  const [hours, setHours] = useState(4);
  const [chosen, setChosen] = useState<Record<string, boolean>>({});

  const equipment = addons.reduce((sum, item) => sum + (chosen[item.id] ? item.price : 0), 0);
  const hire = trailer.rate.firstBlockPrice + Math.max(0, hours - trailer.rate.firstBlockHours) * trailer.rate.extraHourPrice;
  const total = useTween(hire + equipment);

  return (
    <div className="calc">
      <div className="calc__controls">
        <div className="segments" role="group" aria-label="Hire duration">
          {durationTabs.map((tab) => (
            <button
              key={tab.hours}
              type="button"
              className="segment"
              aria-pressed={hours === tab.hours}
              onClick={() => setHours(tab.hours)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="field">
          <label htmlFor={`${uid}-hours`}>Hire Duration (Hours / Days)</label>
          <select
            id={`${uid}-hours`}
            className="select"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
          >
            {durationSelect.map((option) => (
              <option key={option.hours} value={option.hours}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend>Optional Transport Equipment</legend>
          <div className="addons">
            {addons.map((item) => (
              <label className="addon" key={item.id}>
                <input
                  type="checkbox"
                  checked={Boolean(chosen[item.id])}
                  onChange={(event) => setChosen((state) => ({ ...state, [item.id]: event.target.checked }))}
                />
                <span>{item.label}</span>
                <em>+ ${item.price} hire</em>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="quote">
        <p className="label">Calculated Hire Rate</p>
        <p className="fig" aria-live="polite" aria-atomic="true">
          {formatAud(Math.round(total))}
        </p>
        <p className="label">
          {trailer.name}, {hireLabel(hours)}
        </p>
        <Link href="/trailers#book" className="btn btn--primary">
          Book with Lockii
        </Link>
        <p className="note">Self-service 24/7 PIN code pickup. Demonstration rate.</p>
      </div>
    </div>
  );
}
