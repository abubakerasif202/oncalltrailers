import type { Metadata } from 'next';
import Link from 'next/link';
import { Journey } from '@/components/Journey';
import { ValueStrip } from '@/components/ValueStrip';

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

      <ValueStrip />

      <div className="px-5 py-24 text-center sm:px-8">
        <Link href="/trailers#book" className="btn btn-primary">
          Book a trailer
        </Link>
      </div>
    </>
  );
}
