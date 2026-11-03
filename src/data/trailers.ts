// TODO(client): the price below is REFERENCE PRICING from a comparable trailer-hire site.
// Confirm the real rate and the trailer's size and capacity before launch.
export interface Rate {
  /** Hours covered by the first block. */
  firstBlockHours: number;
  /** Price in AUD for the first block. */
  firstBlockPrice: number;
  /** Price in AUD for each hour after the first block. */
  extraHourPrice: number;
}

export interface Trailer {
  slug: string;
  name: string;
  /** Number of identical trailers in the fleet. */
  quantity: number;
  price: string;
  priceNote: string;
  rate: Rate;
  blurb: string;
  specs: readonly string[];
  goodFor: readonly string[];
}

export const trailers: readonly Trailer[] = [
  {
    slug: 'tandem-cage-trailer',
    name: 'Tandem Cage Trailer',
    quantity: 3,
    price: 'From $5',
    priceNote: 'per hour',
    rate: { firstBlockHours: 1, firstBlockPrice: 5, extraHourPrice: 5 },
    blurb:
      'A galvanised tandem-axle cage trailer for furniture, green waste, building supplies and bulky loads.',
    specs: ['Galvanised steel', 'Tandem axle', 'Mesh cage sides'],
    goodFor: ['House and unit moves', 'Green waste and tip runs', 'Landscaping and building supplies'],
  },
];
