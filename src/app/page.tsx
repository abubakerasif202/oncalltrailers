import Link from 'next/link';
import { FaqList } from '@/components/FaqList';
import { FleetShowcase } from '@/components/FleetShowcase';
import { HireEstimator } from '@/components/HireEstimator';
import { Hero } from '@/components/Hero';
import { Journey } from '@/components/Journey';
import { Reveal } from '@/components/Reveal';
import { RoadTrailer } from '@/components/RoadTrailer';
import { SectionHeading } from '@/components/SectionHeading';
import { faqs, perks } from '@/data/content';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-label="Why hire from us" className="border-y border-line bg-panel/50">
        <ul className="mx-auto grid max-w-7xl divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {perks.map((perk) => (
            <li key={perk.title} className="px-6 py-8 sm:px-8">
              <p className="display text-3xl text-white">{perk.title}</p>
              <p className="mt-2 text-mute">{perk.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title={
              <>
                The <span className="blue-text">fleet</span>
              </>
            }
            intro="Three identical galvanised cage trailers at one pickup point. Book one online in minutes."
          />
          <FleetShowcase />
        </div>
      </section>

      <RoadTrailer />

      <section aria-labelledby="journey-heading">
        <div className="px-5 pt-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 id="journey-heading" className="display text-5xl text-white sm:text-7xl">
              Hiring made <span className="blue-text">simple</span>
            </h2>
          </div>
        </div>
        <Journey />
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Plan your hire"
            intro="Choose a trailer and how long you need it for to see an estimate."
          />
          <Reveal>
            <HireEstimator />
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title="Good to know" />
          <FaqList items={faqs.slice(0, 4)} />
          <Link href="/faq" className="mt-8 inline-block font-semibold text-electric-hi hover:text-white">
            See all questions
          </Link>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-electric/40 bg-gradient-to-br from-panel-2 to-ink p-10 text-center sm:p-16">
          <h2 className="display chrome-text text-5xl sm:text-7xl">Need a trailer today?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-mute">
            Check live availability and book in minutes.
          </p>
          <Link href="/trailers#book" className="btn btn-primary mt-8">
            Book a trailer
          </Link>
        </Reveal>
      </section>
    </>
  );
}
