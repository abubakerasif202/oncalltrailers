import type { Metadata } from 'next';
import { TrailerPage } from '@/components/TrailerPage';
import { bySlug } from '@/data/fleet';
import { pageMetadata } from '@/data/seo';

const trailer = bySlug('tandem-cage-trailer')!;

export const metadata: Metadata = pageMetadata({
  title: trailer.seo.title,
  description: trailer.seo.description,
  path: `/trailers/${trailer.slug}`,
});

export default function CageTrailerPage() {
  return <TrailerPage trailer={trailer} />;
}
