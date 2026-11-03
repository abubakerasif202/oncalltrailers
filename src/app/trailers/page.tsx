import type { Metadata } from 'next';
import { FleetShowcase } from '@/components/FleetShowcase';
import { HireEstimator } from '@/components/HireEstimator';
import { LockiiBooking } from '@/components/LockiiBooking';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Trailers',
  description:
    'Cage, car and motorbike trailers for self-service hire in Sydney. Check live availability and book online.',
  alternates: { canonical: '/trailers' },
};

export default function TrailersPage() {
  return (
    <div className="px-5 pb-24 pt-36 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={
            <>
              Our <span className="blue-text">trailers</span>
            </>
          }
          intro="Choose the right trailer for the job, then book it below."
        />
        <FleetShowcase />

        <section id="book" className="scroll-mt-28 pt-24" aria-labelledby="book-heading">
          <Reveal className="mb-10 max-w-3xl">
            <h2 id="book-heading" className="display text-5xl text-white sm:text-7xl">
              Book your <span className="blue-text">trailer</span>
            </h2>
            <p className="mt-4 text-lg text-mute">
              Pick your trailer and time. You will verify your identity and receive your pickup
              details automatically.
            </p>
          </Reveal>
          <LockiiBooking />
        </section>

        <section className="pt-24" aria-labelledby="estimate-heading">
          <SectionHeading title={<span id="estimate-heading">Estimate your hire</span>} />
          <Reveal>
            <HireEstimator />
          </Reveal>
        </section>
      </div>
    </div>
  );
}
