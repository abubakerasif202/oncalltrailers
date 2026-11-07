'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { track } from '@/lib/analytics';

export interface LockiiEmbedProps {
  /** Widget element to create, e.g. the browse, account or checkout-button element. */
  tag: string;
  /** Attributes set on the created element, exactly as the vendor documents them. */
  attributes?: Readonly<Record<string, string>>;
  /** Accessible name for the region. */
  title: string;
  /** Embed script settings, supplied by the server so production bundles carry no vendor strings. */
  script: { id: string; src: string; attributes: Readonly<Record<string, string>> };
  /** While true every pointer, keyboard and tab interaction with the widget is blocked. */
  shielded: boolean;
  /** Shown instead of the widget when the script is blocked or never defines the element. */
  fallback: ReactNode;
  /** Reserved height so the page does not shift while the widget loads. */
  minHeight: number;
}

type Status = 'loading' | 'ready' | 'failed';

/** Longest wait for the embed script to define its element before the fallback takes over. */
const DEFINE_TIMEOUT_MS = 10_000;

/**
 * Mounts one vendor widget element on the client after hydration, so the vendor script can never write
 * into markup React still expects to own. Static HTML contains only the reserved, labelled region.
 */
export function LockiiEmbed({ tag, attributes, title, script, shielded, fallback, minHeight }: LockiiEmbedProps) {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('loading');

  // Live only: one event when the booking widget is first seen. Seeing it is entry to the flow, never a booking.
  useEffect(() => {
    const frame = host.current?.parentElement;
    if (shielded || status !== 'ready' || !frame) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      track('lockii_flow_entry', { widget: tag, path: window.location.pathname });
      observer.disconnect();
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [shielded, status, tag]);

  // A script that is blocked, stalled or never defines its element must not leave the page loading forever.
  useEffect(() => {
    const timer = setTimeout(() => setStatus((current) => (current === 'loading' ? 'failed' : current)), DEFINE_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!host.current) return;
    const container = host.current;
    let cancelled = false;

    // Not tied to this instance's script callbacks: when several embeds share one deduplicated script, only
    // some instances hear it load, but every instance can wait for the element to be defined.
    customElements.whenDefined(tag).then(() => {
      if (cancelled) return;
      const element = document.createElement(tag);
      for (const [name, value] of Object.entries(attributes ?? {})) element.setAttribute(name, value);
      container.replaceChildren(element);
      setStatus('ready');
    });

    // The vendor's frames carry no title; give each one a name as soon as it appears.
    const nameFrames = () => {
      for (const frame of container.querySelectorAll('iframe:not([title])')) frame.setAttribute('title', title);
    };
    const observer = new MutationObserver(nameFrames);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      container.replaceChildren();
    };
    // attributes is a stable literal from the server render; tag and title identify the embed.
  }, [tag, title, attributes]);

  return (
    <div className="lockii-stage" data-status={status} data-shielded={shielded}>
      <Script
        id={script.id}
        src={script.src}
        strategy="afterInteractive"
        {...script.attributes}
        onError={() => setStatus('failed')}
      />
      {status === 'failed' ? (
        <div className="lockii-fallback" role="status">
          {fallback}
        </div>
      ) : (
        <div className="lockii-frame" role="region" aria-label={title} style={{ minHeight }}>
          <div
            ref={host}
            className="lockii-host"
            // A cross-origin frame cannot be blocked from inside, so the whole host is inert and covered.
            inert={shielded}
          />
          {status === 'loading' ? (
            <p className="lockii-loading" role="status">
              Loading booking options…
            </p>
          ) : null}
          {shielded ? <div className="lockii-shield" aria-hidden="true" /> : null}
        </div>
      )}
    </div>
  );
}
