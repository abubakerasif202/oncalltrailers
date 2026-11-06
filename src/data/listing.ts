// Facts below are taken from the owner's own listing on Local Trailer Hire (retrieved 2026-11-07) at the owner's request.
// Re-check them against the listing if rates or specifications change.
export const PLATFORM = 'https://www.localtrailerhire.com.au';
export const LISTING_URL = `${PLATFORM}/l/12x6-tandem-cage-box-trailer-haberfield/68a2ad2c-53a0-4737-81db-ad3ed00ef2d8`;
export const POLICY_LINKS = [
  { label: 'Rental terms', href: `${PLATFORM}/rental-terms` },
  { label: 'Terms of service', href: `${PLATFORM}/terms-of-service` },
  { label: 'Privacy policy', href: `${PLATFORM}/privacy-policy` },
  { label: 'Safe hiring guide', href: `${PLATFORM}/help/safe-hiring-guide` },
] as const;

export interface RateTier {
  label: string;
  perDay: number;
}

/** Total daily hire cost including all fees and taxes, as listed. */
export const rates: readonly RateTier[] = [
  { label: 'Short hire', perDay: 83.86 },
  { label: '4+ day hire', perDay: 77.87 },
  { label: '7+ day hire', perDay: 71.88 },
];

export const aud = (n: number): string => `$${n.toFixed(2)}`;

export const pickupHours = {
  days: 'Monday to Sunday',
  hours: '5:00 AM – 11:30 PM',
} as const;

export const pickupSuburb = 'Haberfield, NSW';

export const specTable: readonly (readonly [string, string])[] = [
  ['Type', 'Tandem axle cage trailer'],
  ['Fleet', '3 identical trailers'],
  ['Internal size', "12' x 6' (3.6 m x 1.8 m)"],
  ['Cage height', '600 mm'],
  ['ATM', '2,000 kg'],
  ['Tare', '670 kg'],
  ['Payload', '1,330 kg'],
  ['Brakes', 'Mechanical brakes'],
  ['Connector', '7-pin flat'],
  ['Build', 'Galvanised steel, built 2025'],
];

export const features = [
  'Tandem axles for stability',
  'Plenty of tie-down rails',
  '600 mm cage',
  'Spare wheel',
  'Jockey wheel',
  '7-pin flat connector',
] as const;

export const cover = [
  { title: 'Roadside assistance', body: 'Australia-wide roadside assistance provided by NRMA.' },
  { title: 'Trailer Shield', body: 'Limit your liability when hiring. Select your cover level at checkout.' },
] as const;

export const ownerStats = {
  name: 'Joseph P',
  rating: '5.00',
  reviews: 50,
  hires: 89,
  since: 'June 2024',
  response: 'Usually responds within 5 minutes',
  badge: 'Super Owner',
} as const;

export interface Review {
  name: string;
  month: string;
  text: string;
}

/** Reviews copied as published on the listing; each links back to the listing as its source. */
export const reviews: readonly Review[] = [
  { name: 'Rob C', month: 'October 2026', text: 'All good - smooth and trouble-free hire!' },
  { name: 'Cam M', month: 'September 2026', text: 'Super easy, great trailer. Thanks' },
  { name: 'Graeme K', month: 'September 2026', text: 'Very good service. Trailer was easy to find, clean, and tidy. Would recommend.' },
  { name: 'Rodney S', month: 'September 2026', text: '2nd time hiring this trailer, it was a pleasure doing business with Joseph' },
];
