import type { Metadata } from 'next';
import Link from 'next/link';
import { Journey } from '@/components/Journey';
import { perks } from '@/data/content';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Self-service trailer hire in three steps: book online, verify your identity and get your code, then collect and tow.',
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  return (
    <>
      <div className="px-5 pt-36 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="display text-6xl text-white sm:text-8xl">
            How it <span className="blue-text">works</span>
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-mute">
            From booking to towing in three steps, with nobody to wait for.
          </p>
        </div>
      </div>

      <Journey />

      <section aria-label="Benefits" className="border-y border-line bg-panel/50">
        <ul className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <li key={perk.title} className="px-6 py-8 sm:px-8">
              <p className="display text-3xl text-white">{perk.title}</p>
              <p className="mt-2 text-mute">{perk.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="px-5 py-24 text-center sm:px-8">
        <Link href="/trailers#book" className="btn btn-primary">
          Book a trailer
        </Link>
      </div>
    </>
  );
}
