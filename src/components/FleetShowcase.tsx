import { trailers } from '@/data/trailers';
import { TrailerCard } from './TrailerCard';

/** Featured trailer on the left, the rest stacked beside it. */
export function FleetShowcase() {
  const [featured, ...rest] = trailers;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <TrailerCard trailer={featured} index={0} featured />
      {rest.map((trailer, i) => (
        <TrailerCard key={trailer.slug} trailer={trailer} index={i + 1} />
      ))}
    </div>
  );
}
