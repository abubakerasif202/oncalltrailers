// Copy states only what the owner has published (see listing.ts). Specifications and rates belong to the linked
// 12x6 listing and are labelled that way. Anything not confirmed is deliberately absent.

export interface Faq {
  q: string;
  a: string;
}

/** The first four also appear on the home page; all are on /faq. */
export const faqs: readonly Faq[] = [
  {
    q: 'How do I book a trailer?',
    a: 'Use the Check availability button to open the trailer’s listing on Local Trailer Hire, an external site. Enter your pick-up and return times there, then sign up or log in to book. You can also call On Call Trailers on the number in the footer.',
  },
  {
    q: 'What does it cost?',
    a: 'The 12x6 listing shows $83.86 total per day for a short hire, including all fees and taxes. Lower daily rates apply only to longer hires: $77.87 per day for 4+ day hires and $71.88 per day for 7+ day hires. Enter your dates on the booking page to confirm the price.',
  },
  {
    q: 'Where and when do I collect the trailer?',
    a: 'The listing gives Haberfield, NSW as the pickup location, with pick-up and return hours of 5:00 AM to 11:30 PM, Monday to Sunday. No street address is published here, so call us if you need more detail.',
  },
  {
    q: 'How do I know my vehicle can tow the trailer?',
    a: 'The listed 12x6 trailer has a 2,000 kg ATM (fully loaded), a 670 kg tare and a 1,330 kg payload, with mechanical brakes and a 7-pin flat connector. Check your vehicle’s rated towing capacity and towbar rating against these figures before you book. If you are unsure, call us first.',
  },
  {
    q: 'What roadside assistance and cover are offered?',
    a: 'The listing states Australia-wide roadside assistance is provided by NRMA, and describes Trailer Shield as a way to limit your liability, with your cover level selected at checkout. This is not a blanket guarantee: cover levels, exclusions and conditions are set out in the rental terms and at checkout.',
  },
  {
    q: 'Can I extend, change or cancel my hire?',
    a: 'Call On Call Trailers as early as you can. Changes depend on availability, and the rental terms on Local Trailer Hire set out what applies to your hire.',
  },
] as const;

export const benefits = [
  { title: 'Three cage trailers', body: 'Tandem-axle galvanised cage trailers. The listed 12x6 has a 2,000 kg ATM.' },
  { title: 'Open 5 AM – 11:30 PM', body: 'Pick-up and return hours on the listing, Monday to Sunday.' },
  { title: 'Roadside assistance', body: 'Listed as provided by NRMA. Terms and cover levels apply.' },
  { title: '5.00 from 45 reviews', body: 'On the 12x6 listing at Local Trailer Hire.' },
] as const;

export const homeSteps = [
  { title: 'Book', body: 'Open the listing on Local Trailer Hire, enter your dates, then sign up or log in to book. Call us if you would rather talk it through.' },
  { title: 'Collect', body: 'Pick the trailer up in Haberfield between 5:00 AM and 11:30 PM. Check your towbar, hitch and lights before you leave.' },
  { title: 'Return', body: 'Bring the trailer back at the agreed time, up to 11:30 PM. If plans change, call us as early as you can.' },
] as const;

export const preChecks = [
  { title: 'Check your vehicle', body: 'The listed 12x6 is 2,000 kg ATM with a 670 kg tare. Confirm your vehicle’s towing capacity and towbar rating cover it.' },
  { title: 'Plan your load', body: 'The listed payload is 1,330 kg. Spread weight sensibly, secure it to the tie-down rails and keep it within the cage.' },
  { title: 'Ask before you tow', body: 'Not sure about suitability? Call us before you book.' },
] as const;

/** General towing guidance for any trailer. Follow any extra instructions given with your hire. */
export const hitchChecklist = [
  { title: 'Coupling secured', body: 'Check the coupling is fully seated on your towball and latched before you move off.' },
  { title: 'Safety chains attached', body: 'Attach the safety chains to your vehicle’s towbar as shown when you collect.' },
  { title: 'Lights working', body: 'Plug in the 7-pin flat lead, then check brake lights, indicators and tail lights.' },
  { title: 'Load secured', body: 'Tie down everything you carry and keep the heavier items towards the front of the trailer.' },
  { title: 'Jockey wheel up', body: 'Wind the jockey wheel up and lock it before you drive.' },
  { title: 'Take it easy', body: 'Allow longer braking distances and extra room when turning or reversing.' },
] as const;
