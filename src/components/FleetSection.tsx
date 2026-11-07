import { fleet } from '@/data/fleet';
import { FleetCard } from './FleetCard';
import { Lines, Reveal } from './Reveal';

/** The three-trailer fleet: three interactive cards. */
export function FleetSection({ id = 'fleet', heading = ['Pick the right', 'trailer.'] }: { id?: string; heading?: readonly string[] }) {
  return (
    <section className="section" id={id} aria-label="The trailer fleet">
      <div className="container">
        <div className="section__head">
          <Reveal as="p" className="eyebrow">
            The fleet
          </Reveal>
          <Lines as="h2" lines={heading} />
          <Reveal as="p" delay={0.1} className="lead" >
            Cage, motorcycle and car trailers. Specifications and rates are published only where the owner has
            confirmed them.
          </Reveal>
        </div>
        <ul className="fleet-cards">
          {fleet.map((trailer, index) => (
            <FleetCard key={trailer.slug} trailer={trailer} index={index} />
          ))}
        </ul>
        <p className="note note--spaced">
          Illustrative 3D renders. They are not photographs and do not show the condition of any individual trailer.
        </p>
      </div>
    </section>
  );
}
