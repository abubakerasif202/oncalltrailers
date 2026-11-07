import Link from 'next/link';
import { relatedTo, type TrailerSlug } from '@/data/fleet';
import { Lines, Reveal } from './Reveal';
import { TrailerImage } from './TrailerImage';

/** The other trailers in the fleet, as quiet links to their pages. */
export function RelatedTrailers({ current }: { current: TrailerSlug }) {
  return (
    <section className="section" aria-label="Other trailers">
      <div className="container">
        <div className="section__head">
          <Reveal as="p" className="eyebrow">
            More trailers
          </Reveal>
          <Lines as="h2" lines={['Also in', 'the fleet.']} />
        </div>
        <ul className="related">
          {relatedTo(current).map((trailer) => (
            <Reveal as="li" key={trailer.slug}>
              <Link href={`/trailers/${trailer.slug}`} className="related__card">
                <TrailerImage image={trailer.cutout} alt={trailer.cutoutAlt} sizes="(min-width: 640px) 220px, 40vw" />
                <span className="related__text">
                  <span className="eyebrow">{trailer.category}</span>
                  <span className="display related__name">{trailer.name}</span>
                  <span className="related__summary">{trailer.summary}</span>
                  <span className="related__go">View trailer</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
