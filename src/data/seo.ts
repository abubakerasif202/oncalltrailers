import type { Metadata } from 'next';
import { site } from '@/data/site';

/** Per-page metadata with its own canonical, Open Graph title and url (children do not inherit the root og:url). */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `${site.url}${path}`,
      siteName: site.name,
      locale: 'en_AU',
      type: 'website',
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${site.name} galvanised cage trailer in front of the Sydney skyline` }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
  };
}
