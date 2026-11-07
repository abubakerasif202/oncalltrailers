import type { ReactNode } from 'react';
import { telHref } from '@/data/booking';
import { getLockiiMode, LOCKII } from '@/data/lockii';
import { site } from '@/data/site';
import { BookingLink } from './BookingLink';
import { PhoneIcon } from './Icons';
import { LockiiEmbed } from './LockiiEmbed';

interface LockiiSlotProps {
  tag: string;
  title: string;
  attributes?: Readonly<Record<string, string>>;
  minHeight?: number;
  /** Short note after the preview banner. */
  caption?: ReactNode;
  /** Render only in a shielded preview build, never live. Used where the widget's own prices would sit beside the site's. */
  previewOnly?: boolean;
}

/**
 * Attributes for the embed script. The account snippet is data-lockii-id plus data-analytics="on". Changes:
 * - data-analytics is "off" while shielded, so a preview never records visits. It is "on" when live, as supplied.
 * - data-schema and data-support-chat are "off". These come from the provider's own widget source (its JSON-LD
 *   injection is on by default, and so is an on-page AI chat overlay), not from the account snippet. They stop a
 *   second structured-data block next to the site's LocalBusiness schema and an unreviewed chat overlay.
 */
function scriptAttributes(shielded: boolean): Record<string, string> {
  return {
    'data-lockii-id': LOCKII.widgetId,
    'data-analytics': shielded ? 'off' : 'on',
    'data-schema': 'off',
    'data-support-chat': 'off',
  };
}

/** Shown when the widget cannot load: the Local Trailer Hire route and the phone stay available. */
function Fallback() {
  const tel = telHref(site.phone);
  return (
    <>
      <p>Online booking options could not load. You can still book or ask a question now.</p>
      <div className="actions">
        <BookingLink />
        {tel ? (
          <a href={tel} className="btn btn--ghost">
            <PhoneIcon className="btn__icon" />
            Call {site.phone}
          </a>
        ) : null}
      </div>
    </>
  );
}

/**
 * Renders a vendor widget only when this build has it switched on. With the mode off it renders nothing, so
 * exported pages contain no widget script, no widget markup and no vendor URL.
 */
export function LockiiSlot({ tag, title, attributes, minHeight = 320, caption, previewOnly = false }: LockiiSlotProps) {
  const mode = getLockiiMode();
  if (mode === 'off' || (mode === 'live' && previewOnly)) return null;
  const shielded = mode === 'preview';
  const embed = (
    <LockiiEmbed
      tag={tag}
      title={title}
      attributes={attributes}
      minHeight={minHeight}
      shielded={shielded}
      script={{ id: LOCKII.scriptId, src: LOCKII.scriptSrc, attributes: scriptAttributes(shielded) }}
      fallback={<Fallback />}
    />
  );
  if (!shielded) return <div className="lockii-slot">{embed}</div>;
  return (
    <div className="lockii-slot">
      <p className="lockii-banner" role="note">
        <strong>Preview only.</strong> Online booking is switched off on this page. Prices and availability shown here
        are not confirmed. {caption}
      </p>
      {embed}
    </div>
  );
}
