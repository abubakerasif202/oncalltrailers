// Facts below are taken from the owner's own page for this trailer on Local Trailer Hire (retrieved 2026-11-07).
// Source: https://www.localtrailerhire.com.au/l/motorcycle-x3-trailer/6a9e5309-1800-49c5-9297-b0663d34ecf8
// The listing does not state an axle count, brake type or pickup suburb, so none is published here. It shows
// "No reviews yet", so no reviews or ratings are shown for this trailer. Re-check against the source if anything changes.
import { PLATFORM, type RateTier } from '@/data/listing';

export const MOTORCYCLE_LISTING_NAME = 'Motorcycle x3 Trailer';
export const MOTORCYCLE_LISTING_URL = `${PLATFORM}/l/motorcycle-x3-trailer/6a9e5309-1800-49c5-9297-b0663d34ecf8`;

/** The listing's headline price is the short-hire total; the others apply only to longer hires. */
export const motorcycleRates: readonly RateTier[] = [
  { label: 'Short hire', perDay: 38.34, basis: 'total per day' },
  { label: '4+ day hire', perDay: 35.94, basis: 'per day' },
  { label: '7+ day hire', perDay: 33.54, basis: 'per day' },
];

export const motorcycleSpecTable: readonly (readonly [string, string])[] = [
  ['Size', "7' x 5' (2.1 m x 1.5 m)"],
  ['Payload', '570 kg (carry capacity)'],
  ['Tare', '180 kg'],
  ['ATM', '750 kg'],
  ['Connector', '7-pin flat'],
  ['Manufactured', '2003'],
];

export const motorcycleFeatures = [
  'Included folding loading ramp',
  'Durable steel frame',
  'Multiple secure tie-down points',
  'Jockey wheel',
  '7-pin flat connector',
] as const;

export const motorcycleUses = [
  'Road bikes, dirt bikes and scooters',
  'Weekend rides',
  'Track days',
  'Long-distance transport',
] as const;
