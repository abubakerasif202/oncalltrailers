// TODO(client): REFERENCE PRICING AND SPECS ONLY.
// Names, prices, rates and specs below mirror a comparable trailer-hire site and must be
// replaced with the client's real fleet before launch. The extra-hour rate for the car
// trailer is an assumption used only by the hire estimator.
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
  kind: 'cage' | 'car' | 'bike';
  price: string;
  priceNote: string;
  rate: Rate;
  blurb: string;
  specs: readonly string[];
  goodFor: readonly string[];
}

export const trailers: readonly Trailer[] = [
  {
    slug: '8x5-tilt-cage-trailer',
    name: '8 x 5 Tilt Cage Trailer',
    kind: 'cage',
    price: 'From $5',
    priceNote: 'per hour',
    rate: { firstBlockHours: 1, firstBlockPrice: 5, extraHourPrice: 5 },
    blurb: 'The everyday workhorse for furniture, green waste, building supplies and bulky loads.',
    specs: ['8 x 5 ft deck', 'Caged sides', 'Tilting deck for easy unloading'],
    goodFor: ['House moves', 'Green waste & tip runs', 'Landscaping supplies'],
  },
  {
    slug: 'tilt-car-trailer',
    name: '3.5t Tilt Car Trailer',
    kind: 'car',
    price: '$80',
    priceNote: 'for the first 3 hours',
    rate: { firstBlockHours: 3, firstBlockPrice: 80, extraHourPrice: 20 },
    blurb: 'Move project cars, track cars and breakdowns with a tilt bed that makes loading simple.',
    specs: ['3.5 tonne rated', 'Tilt bed for low-angle loading'],
    goodFor: ['Project cars', 'Track days', 'Vehicle breakdowns'],
  },
  {
    slug: 'motorbike-trailer',
    name: 'Motorbike Trailer',
    kind: 'bike',
    price: 'From $5',
    priceNote: 'per hour',
    rate: { firstBlockHours: 1, firstBlockPrice: 5, extraHourPrice: 5 },
    blurb: 'A stable, secure trailer for carrying bikes to the track, the trail or the workshop.',
    specs: ['Built to hold bikes upright', 'Easy to tow'],
    goodFor: ['Track & trail days', 'Workshop runs', 'Bike moves'],
  },
];
