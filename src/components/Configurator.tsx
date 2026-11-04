'use client';

import { useId, useState } from 'react';
import { Dialog } from 'radix-ui';
import { AnimatedDialogContent } from './AnimatedDialogContent';
import { addons, durationTabs, sliderTicks } from '@/data/content';
import { site } from '@/data/site';
import { formatAud } from '@/lib/estimate';
import { PhoneIcon } from './Icons';
import { useTween } from './useTween';

/** The configurator's demonstration rate card: 4 hrs $20, 8 hrs $40, 24 hrs $80, 48 hrs $150, then $70 a day. */
export function calculateRate(hours: number): number {
  if (hours <= 4) return 20;
  if (hours <= 8) return 40;
  if (hours <= 24) return 80;
  if (hours <= 48) return 150;
  return Math.ceil(hours / 24) * 70;
}

function describe(hours: number): string {
  if (hours < 24) return `${hours} hrs`;
  const days = Math.floor(hours / 24);
  const rest = hours % 24;
  return rest > 0 ? `${days}d ${rest}h (${hours} hrs)` : `${days} Day${days > 1 ? 's' : ''}`;
}

/** Duration, equipment and a live demonstration rate. The rate is a demonstration, not a quote. */
export function Configurator() {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(4);
  const [chosen, setChosen] = useState<Record<string, boolean>>({});

  const equipment = addons.reduce((sum, item) => sum + (chosen[item.id] ? item.price : 0), 0);
  const total = useTween(calculateRate(hours) + equipment);
  const tel = site.phone?.replace(/\s/g, '');

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
          <p className="display" style={{ fontSize: 'var(--text-section)' }} aria-hidden="true">
            {describe(hours)}
          </p>
          <input
            id={`${uid}-hours`}
            className="range"
            type="range"
            min={1}
            max={168}
            step={1}
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            aria-valuetext={describe(hours)}
          />
          <div className="range__marks" aria-hidden="true">
            {sliderTicks.map((tick) => (
              <span key={tick.label} style={{ left: `${((tick.hours - 1) / 167) * 100}%` }}>
                {tick.label}
              </span>
            ))}
          </div>
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

      <div className="beam" data-tilt>
        <div className="quote">
          <p className="label">Calculated Hire Rate</p>
          <p className="fig" aria-live="polite" aria-atomic="true">
            {formatAud(Math.round(total))}
          </p>
          <p className="label">Tandem Cage Trailer · {describe(hours)}</p>
          <Dialog.Trigger asChild>
          <button type="button" className="btn btn--primary">
            Book with Lockii ↗
          </button>
          </Dialog.Trigger>
          <p className="note">Self-service 24/7 PIN code pickup · Demonstration rate</p>
        </div>
      </div>

      <AnimatedDialogContent open={open} className="modal">
        <div className="modal__body">
          <Dialog.Close asChild>
          <button type="button" className="modal__close" aria-label="Close reservation">
            ×
          </button>
          </Dialog.Close>
          <p className="eyebrow" style={{ color: 'var(--color-cyan)' }}>
            Lockii Rental Management System
          </p>
          <Dialog.Title asChild>
          <h3 className="display" style={{ fontSize: 'var(--text-display-s)' }}>
            Self-Service Trailer Reservation
          </h3>
          </Dialog.Title>
          <Dialog.Description asChild>
          <p className="note" style={{ marginTop: 'var(--space-md)' }}>
            Direct connection to On Call Trailers&rsquo; Lockii automated booking gateway.
          </p>
          </Dialog.Description>
          <ol className="modal__list">
            <li>
              <strong>Trailer Specification</strong>
              Heavy-Duty Galvanised Tandem Cage Trailer (8x5 Series · 2,000kg GTM)
            </li>
            <li>
              <strong>Pickup Location</strong>
              Sydney Metro Depot (Secure 24/7 Smart Lockbox Access)
            </li>
            <li data-accent="true">
              <strong>System Status: Demo Integration Mode</strong>
              Online reservation engine is ready for live Lockii merchant credentials. Bookings can be placed immediately
              via phone or direct dispatch.
            </li>
          </ol>
          <div className="actions">
            {site.phone && tel ? (
              <a href={`tel:${tel}`} className="btn btn--primary">
                <PhoneIcon className="btn__icon" />
                Call {site.phone} ↗
              </a>
            ) : null}
            <Dialog.Close asChild>
            <button type="button" className="btn btn--ghost">
              Return to fleet
            </button>
            </Dialog.Close>
          </div>
        </div>
      </AnimatedDialogContent>
    </div>
    </Dialog.Root>
  );
}
