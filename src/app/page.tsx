import Link from 'next/link';
import { FaqList } from '@/components/FaqList';
import { FeaturePanels } from '@/components/FeaturePanels';
import { Hero } from '@/components/Hero';
import { HireEstimator } from '@/components/HireEstimator';
import { Journey } from '@/components/Journey';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ValueStrip } from '@/components/ValueStrip';
import { faqs } from '@/data/content';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturePanels />
      <ValueStrip />

      <section aria-labelledby="journey-heading" className="pt-12">
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
            intro="Choose how long you need the trailer for to see an estimate."
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
        <Reveal className="panel mx-auto max-w-7xl overflow-hidden p-10 text-center sm:p-16">
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
