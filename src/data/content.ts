export interface Step {
  title: string;
  body: string;
}

export const steps: readonly Step[] = [
  {
    title: 'Book online',
    body: 'Pick your trailer and your time on the booking calendar and pay securely online. Takes a couple of minutes.',
  },
  {
    title: 'Verify and get your code',
    body: 'Confirm your identity during booking. Your pickup details and access code are sent to you automatically.',
  },
  {
    title: 'Collect, tow, return',
    body: 'Pick up the trailer when your booking starts, take photos, and return it on time. No counter, no queue.',
  },
];

export interface Perk {
  title: string;
  body: string;
}

// Only claims that follow from the self-service booking flow itself.
export const perks: readonly Perk[] = [
  { title: 'Self-service pickup', body: 'Collect and return without waiting on anyone.' },
  { title: 'Book in minutes', body: 'Live availability, instant confirmation, pay online.' },
  { title: 'Extend online', body: 'Need longer? Extend your hire from your phone.' },
  { title: 'Locally run', body: 'A Sydney trailer hire business you can contact directly.' },
];

export interface Faq {
  q: string;
  a: string;
}

// TODO(client): confirm each answer against the client's actual policies before launch.
export const faqs: readonly Faq[] = [
  {
    q: 'How does self-service pickup work?',
    a: 'Book online, verify your identity, and you will receive your pickup details and access code. When your booking starts you collect the trailer yourself, with no counter and no queue.',
  },
  {
    q: 'What do I need to hire a trailer?',
    a: 'A valid driver licence for identity verification, and a vehicle with a tow bar rated for the trailer you choose.',
  },
  {
    q: 'How do I know my car can tow the trailer?',
    a: 'Check your vehicle’s rated towing capacity in the owner’s manual or on the compliance plate, and compare it with the trailer’s weight before you book.',
  },
  {
    q: 'Can I extend my hire?',
    a: 'Yes. You can request an extension online from your booking, subject to the trailer being available.',
  },
  {
    q: 'What if I return the trailer late?',
    a: 'Late returns can affect the next customer’s booking. Return on time, or extend online before your booking ends.',
  },
  {
    q: 'Can I change or cancel a booking?',
    a: 'Use your booking confirmation to manage changes online. Contact us if you need help.',
  },
];
