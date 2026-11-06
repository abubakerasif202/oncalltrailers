// Copy only states what the owner has confirmed. Anything not yet confirmed (rates, dimensions, load limits,
// policies, pickup address, support hours) is deliberately absent and tracked in the handoff report.

export interface Faq {
  q: string;
  a: string;
}

/** The first four also appear on the home page; all are on /faq. */
export const faqs: readonly Faq[] = [
  {
    q: 'How do I book a trailer?',
    a: 'Use the Check availability button to open the booking page, pick your dates and book there. You can also call On Call Trailers on the number in the footer.',
  },
  {
    q: 'How do I know my vehicle can tow the trailer?',
    a: 'Check your vehicle’s rated towing capacity and towbar rating in the owner’s manual or on the compliance plate, and compare them with the trailer’s weight before you book. If you are unsure, call us first.',
  },
  {
    q: 'Where do I collect the trailer?',
    a: 'Pickup is in Sydney, NSW. Call us for the pickup location and collection details for your hire.',
  },
  {
    q: 'What can I carry in the trailer?',
    a: 'It is a mesh cage trailer suited to furniture, green waste, building supplies and bulky household loads. Ask us if you are unsure whether your load suits it, and always secure what you carry.',
  },
  {
    q: 'Can I extend or change my hire?',
    a: 'Call On Call Trailers as early as you can. Changes depend on availability, so do not assume an extension is approved until we confirm it.',
  },
  {
    q: 'What if I need to cancel or return late?',
    a: 'Contact us as soon as you know. We will tell you what applies to your hire.',
  },
] as const;

export const benefits = [
  { title: 'Three trailers', body: 'One proven tandem cage trailer type, three in the fleet.' },
  { title: 'Galvanised steel', body: 'Mesh cage sides and a tandem axle for bulky loads.' },
  { title: 'Sydney based', body: 'Local pickup in Sydney, NSW.' },
  { title: 'Registered business', body: 'An ABN-registered Sydney business you can phone.' },
] as const;

export const homeSteps = [
  { title: 'Book', body: 'Pick your trailer and dates on the booking page. Call us if you would rather talk it through.' },
  { title: 'Collect', body: 'Pick the trailer up in Sydney. Check your towbar, hitch and lights before you leave.' },
  { title: 'Return', body: 'Bring the trailer back at the agreed time. If plans change, call us as early as you can.' },
] as const;

export const preChecks = [
  { title: 'Check your vehicle', body: 'Confirm your vehicle’s towing capacity and towbar rating against the trailer before you book.' },
  { title: 'Plan your load', body: 'Think through weight, size and how you will secure it. Spread weight sensibly and keep it within your vehicle’s limits.' },
  { title: 'Ask before you tow', body: 'Not sure about suitability? Call us before you book.' },
] as const;

/** General towing guidance for any trailer. Follow any extra instructions given with your hire. */
export const hitchChecklist = [
  { title: 'Coupling secured', body: 'Check the coupling is fully seated on your towball and latched before you move off.' },
  { title: 'Safety chains attached', body: 'Attach the safety chains to your vehicle’s towbar as shown when you collect.' },
  { title: 'Lights working', body: 'Plug in the lead, then check brake lights, indicators and tail lights.' },
  { title: 'Load secured', body: 'Tie down everything you carry and keep the heavier items towards the front of the trailer.' },
  { title: 'Sides and gates closed', body: 'Close and latch any sides, gates or ramps before you drive.' },
  { title: 'Take it easy', body: 'Allow longer braking distances and extra room when turning or reversing.' },
] as const;
