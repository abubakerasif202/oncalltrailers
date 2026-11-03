import type { Rate } from '@/data/trailers';

export const MIN_HOURS = 1;
export const MAX_HOURS = 72;

/** Estimated hire price in whole AUD for a number of hours. Invalid input is clamped. */
export function estimateHire(rate: Rate, hours: number): number {
  const safeHours = Number.isFinite(hours)
    ? Math.min(MAX_HOURS, Math.max(MIN_HOURS, Math.ceil(hours)))
    : MIN_HOURS;

  if (safeHours <= rate.firstBlockHours) {
    return rate.firstBlockPrice;
  }
  const extraHours = safeHours - rate.firstBlockHours;
  return rate.firstBlockPrice + extraHours * rate.extraHourPrice;
}

/** Human readable duration, for example "1 day 4 hrs". */
export function formatDuration(hours: number): string {
  const total = Math.max(MIN_HOURS, Math.ceil(hours));
  const days = Math.floor(total / 24);
  const rest = total % 24;
  const dayPart = days > 0 ? `${days} day${days === 1 ? '' : 's'}` : '';
  const hourPart = rest > 0 ? `${rest} hr${rest === 1 ? '' : 's'}` : '';
  return [dayPart, hourPart].filter(Boolean).join(' ');
}

const currency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

export function formatAud(amount: number): string {
  return currency.format(amount);
}
