// Facts below are taken from the owner's own pages on Local Trailer Hire (retrieved 2026-11-07) at the owner's request.
// Each group is attributed to the exact page it came from. Re-check against the source if anything changes.
export const PLATFORM = 'https://www.localtrailerhire.com.au';
export const PLATFORM_HOST = 'localtrailerhire.com.au';

/** The linked trailer listing: every specification, rate, hour and listing review below comes from this page. */
export const LISTING_NAME = '12x6 Tandem Cage Box Trailer - HABERFIELD';
export const LISTING_URL = `${PLATFORM}/l/12x6-tandem-cage-box-trailer-haberfield/68a2ad2c-53a0-4737-81db-ad3ed00ef2d8`;
/** The owner's profile (Joseph P): owner-wide statistics come from this page, not from the listing. */
export const PROFILE_URL = `${PLATFORM}/u/614c78ad-b2b7-4b0e-b4c8-1e266b2caa3d`;

export const POLICY_LINKS = [
  { label: 'Rental terms', href: `${PLATFORM}/rental-terms` },
  { label: 'Terms of service', href: `${PLATFORM}/terms-of-service` },
  { label: 'Privacy policy', href: `${PLATFORM}/privacy-policy` },
  { label: 'Safe hiring guide', href: `${PLATFORM}/help/safe-hiring-guide` },
] as const;

export interface RateTier {
  /** Duration condition exactly as listed. */
  label: string;
  perDay: number;
  /** Wording the listing uses for the figure. */
  basis: string;
}

/** Listing rates. The listing's headline price is the short-hire total; the others apply only to longer hires. */
export const rates: readonly RateTier[] = [
  { label: 'Short hire', perDay: 83.86, basis: 'total per day' },
  { label: '4+ day hire', perDay: 77.87, basis: 'per day' },
  { label: '7+ day hire', perDay: 71.88, basis: 'per day' },
];

/** The listing's own wording for the headline price. */
export const rateNote =
  'The short hire price is the total daily hire cost, including all fees and taxes. The 4+ day and 7+ day rates are lower daily rates that apply only to hires of that length. Enter your dates on the booking page to confirm the price.';

export const aud = (n: number): string => `$${n.toFixed(2)}`;

export const pickupHours = {
  days: 'Monday to Sunday',
  hours: '5:00 AM – 11:30 PM',
} as const;

export const pickupSuburb = 'Haberfield, NSW';

/** Specifications of the linked 12x6 listing only. Not assumed to apply to every trailer in the fleet. */
export const specTable: readonly (readonly [string, string])[] = [
  ['Internal size', "12' x 6' (3.6 m x 1.8 m)"],
  ['Cage height', '600 mm'],
  ['ATM', '2,000 kg'],
  ['Tare', '670 kg'],
  ['Payload', '1,330 kg'],
  ['Brakes', 'Mechanical brakes'],
  ['Connector', '7-pin flat'],
  ['Axles', 'Tandem'],
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

/** Wording follows the listing; cover levels and conditions are set by the rental terms and checkout. */
export const cover = [
  { title: 'Roadside assistance', body: 'The listing states Australia-wide roadside assistance is provided by NRMA.' },
  { title: 'Trailer Shield', body: 'The listing describes it as a way to limit your liability when hiring. You select your cover level at checkout.' },
] as const;

export const coverNote =
  'This is not a blanket guarantee. Cover levels, exclusions and conditions are set out in the rental terms and at checkout.';

/** Statistics for the linked listing only. */
export const listingStats = {
  rating: '5.00',
  reviews: 45,
} as const;

/** Owner-wide statistics from the owner profile. Not specific to this trailer. */
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

/** Reviews copied as published on the linked listing, each attributed to it. */
export const reviews: readonly Review[] = [
  { name: 'Rob C', month: 'October 2026', text: 'All good - smooth and trouble-free hire!' },
  { name: 'Cam M', month: 'September 2026', text: 'Super easy, great trailer. Thanks' },
  { name: 'Graeme K', month: 'September 2026', text: 'Very good service. Trailer was easy to find, clean, and tidy. Would recommend.' },
  { name: 'Rodney S', month: 'September 2026', text: '2nd time hiring this trailer, it was a pleasure doing business with Joseph' },
];
