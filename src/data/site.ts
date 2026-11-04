// TODO(client): still missing: email, pickup address and Instagram (null fields are hidden on the site).
export interface SiteInfo {
  name: string;
  tagline: string;
  url: string;
  region: string;
  phone: string | null;
  abn: string | null;
  email: string | null;
  pickupAddress: string | null;
  instagram: string | null;
}

export const site: SiteInfo = {
  name: 'On Call Trailers',
  tagline: 'Ready when you are',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.oncalltrailers.com.au',
  region: 'Sydney, NSW',
  phone: '+61 490 176 809',
  abn: '80 807 007 887',
  email: null,
  pickupAddress: null,
  instagram: null,
};

/** The live site is indexable today (its robots.txt allows all). Set NEXT_PUBLIC_ALLOW_INDEXING=false to block it. */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'false';

export interface NavItem {
  href: string;
  label: string;
}

export const navItems: readonly NavItem[] = [
  { href: '/trailers', label: 'Trailers' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];
