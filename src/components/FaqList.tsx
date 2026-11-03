'use client';

import { useId, useState } from 'react';
import type { Faq } from '@/data/content';

export function FaqList({ items }: { items: readonly Faq[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="display text-2xl text-white sm:text-3xl">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                >
                  <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-electric" />
                  <span className="absolute left-1/2 top-0 h-6 w-0.5 -translate-x-1/2 bg-electric" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-lg leading-relaxed text-mute">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
