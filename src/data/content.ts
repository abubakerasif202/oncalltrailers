// Copy states only what the owner has published (see listing.ts). Anything not confirmed is deliberately absent.

export interface Faq {
  q: string;
  a: string;
}

/** The first four also appear on the home page; all are on /faq. */
export const faqs: readonly Faq[] = [
  {
    q: 'How do I book a trailer?',
    a: 'Use the Check availability button to open the booking page, enter your pick-up and return times, then sign up or log in to book. You can also call On Call Trailers on the number in the footer.',
  },
  {
    q: 'What does it cost?',
    a: 'Rates are $83.86 per day for a short hire, $77.87 per day for 4+ day hires and $71.88 per day for 7+ day hires. That is the total daily cost including all fees and taxes, as listed on the booking page.',
  },
  {
    q: 'Where and when do I collect the trailer?',
    a: 'Pickup is in Haberfield, NSW. Pick-up and return hours are 5:00 AM to 11:30 PM, Monday to Sunday.',
  },
  {
    q: 'How do I know my vehicle can tow the trailer?',
    a: 'The trailer has a 2,000 kg ATM (fully loaded), a 670 kg tare and a 1,330 kg payload, with mechanical brakes and a 7-pin flat connector. Check your vehicle’s rated towing capacity and towbar rating against these figures before you book. If you are unsure, call us first.',
  },
  {
    q: 'Is roadside assistance or cover included?',
    a: 'Australia-wide roadside assistance is provided by NRMA. Trailer Shield, which limits your liability when hiring, is selected at checkout. See the rental terms for full details.',
  },
  {
    q: 'Can I extend, change or cancel my hire?',
    a: 'Call On Call Trailers as early as you can. Changes depend on availability, and the rental terms on the booking site set out what applies to your hire.',
  },
] as const;

export const benefits = [
  { title: 'Three 12x6 trailers', body: 'Identical galvanised tandem cage trailers with a 2,000 kg ATM.' },
  { title: 'Open 5 AM – 11:30 PM', body: 'Pick-up and return hours, Monday to Sunday.' },
  { title: 'Roadside assistance', body: 'Australia-wide, provided by NRMA. Trailer Shield cover at checkout.' },
  { title: '5.00 from 50 reviews', body: 'Super Owner on Local Trailer Hire, 89 hires.' },
] as const;

export const homeSteps = [
  { title: 'Book', body: 'Pick your dates on the booking page and sign up or log in to book. Call us if you would rather talk it through.' },
  { title: 'Collect', body: 'Pick the trailer up in Haberfield between 5:00 AM and 11:30 PM. Check your towbar, hitch and lights before you leave.' },
  { title: 'Return', body: 'Bring the trailer back at the agreed time, any day up to 11:30 PM. If plans change, call us as early as you can.' },
] as const;

export const preChecks = [
  { title: 'Check your vehicle', body: 'The trailer is 2,000 kg ATM with a 670 kg tare. Confirm your vehicle’s towing capacity and towbar rating cover it.' },
  { title: 'Plan your load', body: 'Payload is 1,330 kg. Spread weight sensibly, secure it to the tie-down rails and keep it within the cage.' },
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
