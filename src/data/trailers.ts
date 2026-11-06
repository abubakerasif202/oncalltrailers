// Only facts the owner has confirmed live here. Dimensions, ATM, tare, payload, braking, coupling, accessories
// and hire rates are NOT published until the owner supplies them (see the handoff report).
export interface Trailer {
  slug: string;
  name: string;
  /** Number of identical trailers in the fleet. */
  quantity: number;
  blurb: string;
  /** Verified specification rows, label then value. */
  specs: readonly (readonly [label: string, value: string])[];
  goodFor: readonly string[];
}

export const trailers: readonly Trailer[] = [
  {
    slug: 'tandem-cage-trailer',
    name: 'Tandem Cage Trailer',
    quantity: 3,
    blurb: 'A galvanised tandem-axle cage trailer for furniture, green waste, building supplies and bulky loads.',
    specs: [
      ['Type', 'Tandem axle cage trailer'],
      ['Fleet', '3 identical trailers'],
      ['Build', 'Galvanised steel'],
      ['Sides', 'Mesh cage'],
    ],
    goodFor: ['House and unit moves', 'Green waste and tip runs', 'Landscaping and building supplies'],
  },
];
