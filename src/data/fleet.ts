// The three-trailer fleet: one definition drives the home page cards, the trailer pages, the comparison table,
// the sitemap and per-page metadata. Only facts the owner has published appear here (see listing.ts and
// motorcycleListing.ts). The car trailer has no published listing, rate or specification, so it carries none:
// it is enquiry-only and stays out of search until `verified` is set to true.
import { features as cageFeatures, LISTING_NAME, LISTING_URL, rates as cageRates, specTable as cageSpecs, type RateTier } from '@/data/listing';
import { fleetImages, type ImageSet } from '@/data/fleetImages';
import {
  MOTORCYCLE_LISTING_NAME,
  MOTORCYCLE_LISTING_URL,
  motorcycleFeatures,
  motorcycleRates,
  motorcycleSpecTable,
  motorcycleUses,
} from '@/data/motorcycleListing';

export type TrailerSlug = 'tandem-cage-trailer' | 'motorcycle-trailer' | 'car-trailer';

type SpecRows = readonly (readonly [label: string, value: string])[];

export type Booking =
  /** Bookable on the owner's Local Trailer Hire listing. */
  | { kind: 'listing'; url: string; listingName: string }
  /** No verified booking route: customers phone or use the contact page. */
  | { kind: 'enquiry' };

export interface FleetView {
  label: string;
  image: ImageSet;
  alt: string;
  /** CSS object-position so a crop keeps the trailer in frame. */
  position?: string;
}

export interface FleetTrailer {
  slug: TrailerSlug;
  number: '01' | '02' | '03';
  name: string;
  category: string;
  /** One line for cards. */
  summary: string;
  /** Page introduction. */
  intro: string;
  /** Page and metadata. */
  seo: { title: string; description: string };
  /** True only once the owner has confirmed the trailer is real, registered and bookable. Gates indexing and the sitemap. */
  verified: boolean;
  booking: Booking;
  /** Approved hire rates, or null when none has been confirmed. */
  rates: readonly RateTier[] | null;
  /** The few key facts shown on a card, or empty when none is verified. */
  keySpecs: SpecRows;
  /** Every published specification, or null when none is confirmed. */
  specs: SpecRows | null;
  features: readonly string[];
  goodFor: readonly string[];
  /** General towing guidance only: never a compatibility promise. */
  towing: readonly string[];
  pickup: string;
  cutout: ImageSet;
  cutoutAlt: string;
  /** Gallery views: the three renders supplied for this trailer. */
  views: readonly FleetView[];
  /** Comparison table facts; a missing value renders as "To be confirmed". */
  compare: { type: string; use: string; size: string | null; payload: string | null; atm: string | null; rate: string | null; booking: string };
}

const GENERIC_TOWING = [
  'Check your vehicle’s rated towing capacity and towbar rating against the trailer’s weight before you book.',
  'Plug in the trailer’s lead and check brake lights, indicators and tail lights before you move off.',
  'Tie down your load, keep heavier items towards the front and allow longer braking distances.',
] as const;

const PICKUP_HOURS = '5:00 AM to 11:30 PM, Monday to Sunday';

export const fleet: readonly FleetTrailer[] = [
  {
    slug: 'tandem-cage-trailer',
    number: '01',
    name: '12×6 Cage Box Trailer',
    category: 'Cage box trailer',
    summary: 'Ideal for moving furniture, equipment, landscaping materials and bulky loads.',
    intro:
      'A galvanised tandem cage trailer for house and unit moves, green waste and tip runs, building supplies and storage runs. The listed 12x6 has a 2,000 kg ATM and a 1,330 kg payload.',
    seo: {
      title: 'Cage Trailer Hire Sydney',
      description:
        'Tandem cage trailer hire in Sydney. The listed 12x6 has a 2,000 kg ATM and 1,330 kg payload, $83.86 per day for a short hire. Pickup in Haberfield.',
    },
    verified: true,
    booking: { kind: 'listing', url: LISTING_URL, listingName: LISTING_NAME },
    rates: cageRates,
    keySpecs: [
      ['Internal size', "12' x 6'"],
      ['Payload', '1,330 kg'],
      ['ATM', '2,000 kg'],
    ],
    specs: cageSpecs,
    features: cageFeatures,
    goodFor: ['House and unit moves', 'Green waste and tip runs', 'Worksite and building supplies', 'Storage unit runs'],
    towing: [
      'The listed ATM is 2,000 kg with a 670 kg tare. Confirm your vehicle’s towing capacity and towbar rating cover it.',
      'It has mechanical brakes and a 7-pin flat connector. Check your vehicle has a matching socket.',
      'Not sure about suitability? Call us before you book.',
    ],
    pickup: 'Haberfield, NSW',
    cutout: fleetImages.cageCutout,
    cutoutAlt: 'Illustrative 3D render of a galvanised tandem cage trailer with mesh cage sides, spare wheel and jockey wheel',
    views: [
      {
        label: 'Front view',
        image: fleetImages.cageHero,
        alt: 'Illustrative 3D render of a galvanised tandem cage trailer from the front left: drawbar, coupling, jockey wheel, mesh cage and tandem wheels on a dark studio floor',
      },
      {
        label: 'Side view',
        image: fleetImages.cageSide,
        alt: 'Illustrative 3D render of the cage trailer from the side with the On Call Trailers badge, mesh cage and tandem wheels in a misty studio',
      },
      {
        label: 'Studio cutout',
        image: fleetImages.cageCutout,
        alt: 'Illustrative 3D render of the galvanised tandem cage trailer cut out on a transparent background',
      },
    ],
    compare: {
      type: 'Cage box trailer',
      use: 'Furniture, equipment, landscaping and bulky loads',
      size: "12' x 6' (3.6 m x 1.8 m)",
      payload: '1,330 kg',
      atm: '2,000 kg',
      rate: '$83.86 total per day (short hire)',
      booking: 'Book on Local Trailer Hire',
    },
  },
  {
    slug: 'motorcycle-trailer',
    number: '02',
    name: 'Motorcycle x3 Trailer',
    category: 'Motorcycle trailer',
    summary: 'Designed for transporting motorcycles securely.',
    intro:
      'A sturdy motorcycle trailer with a steel frame, multiple secure tie-down points and an included folding loading ramp, listed for road bikes, dirt bikes and scooters.',
    seo: {
      title: 'Motorcycle Trailer Hire Sydney',
      description:
        'Motorcycle trailer hire in Sydney. Steel frame, included folding loading ramp and multiple tie-down points. $38.34 per day for a short hire.',
    },
    verified: true,
    booking: { kind: 'listing', url: MOTORCYCLE_LISTING_URL, listingName: MOTORCYCLE_LISTING_NAME },
    rates: motorcycleRates,
    keySpecs: [
      ['Size', "7' x 5'"],
      ['Payload', '570 kg'],
      ['ATM', '750 kg'],
    ],
    specs: motorcycleSpecTable,
    features: motorcycleFeatures,
    goodFor: motorcycleUses,
    towing: [
      'The listed ATM is 750 kg with a 180 kg tare. Confirm your vehicle’s towing capacity and towbar rating cover it.',
      'It has a 7-pin flat connector. Check your vehicle has a matching socket.',
      'Not sure about suitability? Call us before you book.',
    ],
    pickup: 'Shown on the trailer’s listing',
    cutout: fleetImages.motorcycleCutout,
    cutoutAlt: 'Illustrative 3D render of a galvanised motorcycle trailer with three bike cradles on a steel frame',
    views: [
      {
        label: 'Front view',
        image: fleetImages.motorcycleHero,
        alt: 'Illustrative 3D render of a galvanised motorcycle trailer with three bike cradles, drawbar and jockey wheel on a dark studio floor',
      },
      {
        label: 'Side view',
        image: fleetImages.motorcycleSide,
        alt: 'Illustrative 3D render of the motorcycle trailer from the side showing three bike cradles on the steel frame in a misty studio',
      },
      {
        label: 'Studio cutout',
        image: fleetImages.motorcycleCutout,
        alt: 'Illustrative 3D render of the motorcycle trailer cut out on a transparent background',
      },
    ],
    compare: {
      type: 'Motorcycle trailer',
      use: 'Road bikes, dirt bikes and scooters',
      size: "7' x 5' (2.1 m x 1.5 m)",
      payload: '570 kg',
      atm: '750 kg',
      rate: '$38.34 total per day (short hire)',
      booking: 'Book on Local Trailer Hire',
    },
  },
  {
    slug: 'car-trailer',
    number: '03',
    name: 'Car Trailer',
    category: 'Car trailer',
    summary: 'Designed for vehicle transport.',
    intro:
      'A car trailer for transporting vehicles. Its size, payload, towing requirements, hire rate and booking route have not been confirmed yet, so please enquire before planning a hire.',
    seo: {
      title: 'Car Trailer Hire Sydney',
      description: 'Enquire about car trailer hire in Sydney with On Call Trailers. Details and booking are confirmed on enquiry.',
    },
    verified: false,
    booking: { kind: 'enquiry' },
    rates: null,
    keySpecs: [],
    specs: null,
    features: [],
    goodFor: ['Transporting a vehicle'],
    towing: [...GENERIC_TOWING, 'The trailer’s weight and towing requirements are confirmed when you enquire.'],
    pickup: 'Confirmed on enquiry',
    cutout: fleetImages.carCutout,
    cutoutAlt: 'Illustrative 3D render of a galvanised car trailer with a flat loading deck',
    views: [
      {
        label: 'Front view',
        image: fleetImages.carHero,
        alt: 'Illustrative 3D render of a galvanised car trailer with a flat deck, drawbar and jockey wheel on a dark studio floor',
      },
      {
        label: 'Side view',
        image: fleetImages.carSide,
        alt: 'Illustrative 3D render of a car trailer from the side with a flat loading deck in a misty studio',
      },
      {
        label: 'Studio cutout',
        image: fleetImages.carCutout,
        alt: 'Illustrative 3D render of the car trailer cut out on a transparent background',
      },
    ],
    compare: {
      type: 'Car trailer',
      use: 'Vehicle transport',
      size: null,
      payload: null,
      atm: null,
      rate: null,
      booking: 'Enquire first',
    },
  },
];

export const bySlug = (slug: string): FleetTrailer | undefined => fleet.find((trailer) => trailer.slug === slug);

/** Trailers other than this one, for related-trailer recommendations. */
export const relatedTo = (slug: TrailerSlug): readonly FleetTrailer[] => fleet.filter((trailer) => trailer.slug !== slug);

export const PICKUP_HOURS_TEXT = PICKUP_HOURS;
