import type { Metadata } from 'next';
import { TrailerPage } from '@/components/TrailerPage';
import { bySlug } from '@/data/fleet';
import { pageMetadata } from '@/data/seo';

const trailer = bySlug('car-trailer')!;

// The car trailer has no verified listing, rate or specification, so it stays out of search until `verified` is set.
export const metadata: Metadata = {
  ...pageMetadata({
    title: trailer.seo.title,
    description: trailer.seo.description,
    path: `/trailers/${trailer.slug}`,
  }),
  ...(trailer.verified ? {} : { robots: { index: false, follow: false } }),
};

export default function CarTrailerPage() {
  return <TrailerPage trailer={trailer} />;
}
