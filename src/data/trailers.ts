import { features, LISTING_NAME, specTable } from '@/data/listing';

export interface Trailer {
  slug: string;
  name: string;
  /** Number of tandem cage trailers in the fleet. Specifications are NOT assumed identical across them. */
  quantity: number;
  blurb: string;
  /** Name of the linked listing the specifications belong to. */
  listingName: string;
  /** Specifications of the linked listing only. */
  specs: readonly (readonly [label: string, value: string])[];
  features: readonly string[];
  goodFor: readonly string[];
}

export const trailers: readonly Trailer[] = [
  {
    slug: 'tandem-cage-trailer',
    name: 'Tandem Cage Trailer',
    quantity: 3,
    blurb: 'Tandem-axle galvanised cage trailers for gear, furniture and machinery. The listed 12x6 has a 2,000 kg ATM.',
    listingName: LISTING_NAME,
    specs: specTable,
    features,
    goodFor: ['House and unit moves', 'Green waste and tip runs', 'Worksite and building supplies', 'Storage unit runs'],
  },
];
