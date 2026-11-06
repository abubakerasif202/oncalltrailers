import { features, specTable } from '@/data/listing';

// Specifications come from the owner's listing (see listing.ts).
export interface Trailer {
  slug: string;
  name: string;
  /** Number of identical trailers in the fleet. */
  quantity: number;
  blurb: string;
  specs: readonly (readonly [label: string, value: string])[];
  features: readonly string[];
  goodFor: readonly string[];
}

export const trailers: readonly Trailer[] = [
  {
    slug: 'tandem-cage-trailer',
    name: 'Tandem Cage Trailer',
    quantity: 3,
    blurb:
      'A heavy-duty 12x6 galvanised tandem cage trailer with a 2,000 kg ATM, easy to tow and built for gear, furniture and machinery.',
    specs: specTable,
    features,
    goodFor: ['House and unit moves', 'Green waste and tip runs', 'Worksite and building supplies', 'Storage unit runs'],
  },
];
