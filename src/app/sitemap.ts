import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

const routes = ['', '/trailers', '/how-it-works', '/faq', '/contact'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
