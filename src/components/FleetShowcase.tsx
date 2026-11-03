import { trailers } from '@/data/trailers';
import { TrailerCard } from './TrailerCard';

export function FleetShowcase() {
  return (
    <div className="grid gap-6">
      {trailers.map((trailer) => (
        <TrailerCard key={trailer.slug} trailer={trailer} />
      ))}
    </div>
  );
}
