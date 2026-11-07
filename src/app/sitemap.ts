import type { MetadataRoute } from 'next';
import { fleet } from '@/data/fleet';
import { site } from '@/data/site';

export const dynamic = 'force-static';

/** Public, indexable pages only. A trailer page joins the sitemap once the owner has verified the trailer. */
const routes = [
  '',
  '/trailers',
  ...fleet.filter((trailer) => trailer.verified).map((trailer) => `/trailers/${trailer.slug}`),
  '/how-it-works',
  '/faq',
  '/contact',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
