// Copy carried over from the live site (oncalltrailers.vercel.app). Claims marked "owner to verify" are the owner's, kept as found.

export interface Faq {
  q: string;
  a: string;
}

/** The first four also appear on the home page; all six are on /faq. */
export const faqs: readonly Faq[] = [
  {
    q: 'How does self-service pickup work?',
    a: 'Self-service collection is planned through Lockii. When live booking is connected, follow your confirmed instructions for pickup location, identity checks and access. Bookings are not enabled on this demonstration site.',
  },
  {
    q: 'What do I need to hire a trailer?',
    a: 'Confirm the owner’s hire requirements before booking. Check your vehicle and towbar ratings against the trailer’s confirmed weight and load limits.',
  },
  {
    q: 'How do I know my car can tow the trailer?',
    a: 'Check your vehicle’s rated towing capacity in the owner’s manual or on the compliance plate, and compare it with the trailer’s weight before you book.',
  },
  {
    q: 'Can I extend my hire?',
    a: 'Extensions depend on availability and the owner’s hire conditions. Contact On Call Trailers before your hire ends; do not assume an extension is approved.',
  },
  {
    q: 'What if I return the trailer late?',
    a: 'Return at the agreed time. Contact On Call Trailers if you expect a delay; late-return terms are awaiting owner confirmation.',
  },
  {
    q: 'Can I change or cancel a booking?',
    a: 'Check the conditions provided with your confirmed booking and contact On Call Trailers for assistance. Final change and cancellation policies are awaiting owner confirmation.',
  },
];

export const hotspots = [
  {
    n: '01',
    label: 'Structural cage',
    title: '600mm Galvanised Steel Mesh',
    body: 'Hot-dip galvanised anti-corrosion welded mesh with heavy-duty perimeter tie rails and dual secure locking pins.',
    x: 62,
    y: 26,
    zoom: 1.5,
  },
  {
    n: '02',
    label: 'Suspension and axles',
    title: 'Heavy-Duty Tandem Axle Assembly',
    body: 'Solid 45mm square axles with rocker-roller load-sharing slipper springs and integrated mechanical disc braking system.',
    x: 74,
    y: 74,
    zoom: 1.6,
  },
  {
    n: '03',
    label: 'Loading gate',
    title: 'Full-Width Drop-Down Ramp',
    body: 'Heavy-gauge drop-down rear gate designed for rapid roll-on loading of furniture, lawnmowers, and building materials.',
    x: 94,
    y: 48,
    zoom: 1.7,
  },
  {
    n: '04',
    label: 'ADR coupling',
    title: '50mm Quick-Release Ball Coupling',
    body: 'Australian Standard 50mm override ball coupling equipped with ADR-approved twin high-tensile safety chains and D-shackles.',
    x: 5,
    y: 62,
    zoom: 1.8,
  },
] as const;

export const reasons = [
  {
    title: 'Room for the real world',
    body: 'Cage sides and a tandem-axle layout. Explore the trailer, then confirm dimensions and load limits before booking.',
  },
  {
    title: 'Your hire, clearly planned',
    body: 'Choose the time you need. Check the final hire price, availability and booking conditions before confirming.',
  },
  {
    title: 'Self-service. Not guesswork.',
    body: 'Follow your confirmed collection instructions, check your towing setup and get ready for the road.',
  },
] as const;

export const homeSteps = [
  {
    title: 'Book online',
    body: 'Choose your trailer and hire dates. Review availability, final pricing and booking conditions before confirming through the booking provider.',
  },
  {
    title: 'Access your trailer',
    body: 'Follow your confirmed booking instructions for identity checks, the pickup location and trailer access.',
  },
  {
    title: 'Return with ease',
    body: 'Return the trailer at the agreed time and location, then complete the return checks in your booking instructions.',
  },
] as const;

export const preChecks = [
  {
    title: 'Check your vehicle',
    body: 'Confirm your vehicle’s towing capacity and towbar rating, and check the trailer’s confirmed weight and load limits.',
  },
  {
    title: 'Plan your load',
    body: 'Check dimensions, weight and suitable restraints before you book. Trailer dimensions and capacity are awaiting owner confirmation.',
  },
  {
    title: 'Ask before you tow',
    body: 'Not sure about suitability? Contact On Call Trailers before making your booking.',
  },
] as const;

/** Owner to verify: these are the owner's claims, kept as found. */
export const standards = [
  {
    mark: '100%',
    title: '100% ADR Compliant',
    body: 'Built and inspected in accordance with Australian Design Rules for safety, braking, and lighting.',
  },
  {
    mark: 'RMS',
    title: 'NSW RMS Registered',
    body: 'Current NSW registration, roadworthy certifications, and regular maintenance logged after every hire.',
  },
  {
    mark: '24/7',
    title: 'Self-Service Access',
    body: 'Convenient PIN-code lockbox collection in Sydney. Pick up and return on your own timeline.',
  },
  {
    mark: 'AU',
    title: 'Local Sydney Support',
    body: 'Real human assistance whenever you need hitching advice, extensions, or road support.',
  },
] as const;

/** The four-step guide and the checklist on /how-it-works. */
export const guideSteps = [
  {
    n: '01',
    title: 'Select Trailer',
    body: 'Choose our heavy-duty galvanised tandem-axle cage trailer engineered with 600mm walls and 2,000kg GTM capacity for any payload.',
    meta: 'Fleet: 8x5 & 10x5 Series',
  },
  {
    n: '02',
    title: 'Choose Dates',
    body: 'Pick your pickup window and rental duration: 4 hours, single day (24h), full weekend, or weekly. Add tie-down ratchet straps or blankets.',
    meta: 'Transparent Demo Pricing',
  },
  {
    n: '03',
    title: 'Lockii Booking',
    body: 'Confirm your reservation through our integrated Lockii system. You will instantly receive an SMS and email with your depot access PIN.',
    meta: 'Instant Digital Access',
  },
  {
    n: '04',
    title: '24/7 Collection',
    body: 'Arrive at our Sydney location, enter your unique PIN at the smart lockbox, connect your trailer, verify lights and safety chains, and hit the road.',
    meta: 'Self-Service Freedom',
  },
] as const;

export const hitchChecklist = [
  {
    title: '50mm Coupling Lock',
    body: 'Ensure the ball coupling is fully seated on your 50mm towball and the release trigger has dropped securely into the locked position.',
  },
  {
    title: 'Dual Safety Chains',
    body: 'Cross the twin ADR-rated safety chains underneath the drawbar and fasten tightly with rated D-shackles to your vehicle’s towbar hitch points.',
  },
  {
    title: 'Electrical Connection',
    body: 'Plug the electrical lead into your car’s socket. Test brake lights, hazard lights, indicators, and tail running lights before departure.',
  },
  {
    title: 'Jockey Wheel Stowed',
    body: 'Wind the heavy-duty swing-up jockey wheel fully up, pull the release pin, rotate to horizontal transport position, and lock firmly.',
  },
  {
    title: '60/40 Load Balance',
    body: 'Distribute approximately 60% of your total load weight forward of the tandem axle assembly to maintain positive downforce and stop trailer sway.',
  },
  {
    title: 'Gate Latches Pinned',
    body: 'Close the drop-down rear loading ramp gate and lock both spring-loaded slide bolts with the safety linchpins before driving.',
  },
] as const;

export interface DurationOption {
  label: string;
  hours: number;
}

/** Quick picks in the configurator. */
export const durationTabs: readonly DurationOption[] = [
  { label: '4 Hours', hours: 4 },
  { label: '24 Hours (1 Day)', hours: 24 },
  { label: 'Weekend (2 Days)', hours: 48 },
  { label: '7 Days', hours: 168 },
];

export const durationSelect: readonly DurationOption[] = [
  { label: '1 Hour', hours: 1 },
  { label: '4 hrs', hours: 4 },
  { label: '24 Hours', hours: 24 },
  { label: '48 Hours', hours: 48 },
  { label: '3 Days (72h)', hours: 72 },
  { label: '7 Days', hours: 168 },
];

export const addons = [
  { id: 'straps', label: 'Ratchet Straps', price: 10 },
  { id: 'blankets', label: 'Moving Blankets', price: 10 },
  { id: 'trolley', label: 'Heavy Trolley', price: 15 },
] as const;
