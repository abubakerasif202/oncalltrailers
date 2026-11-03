// TODO(client): replace every null / placeholder below with the client's real details.
export interface SiteInfo {
  name: string;
  tagline: string;
  url: string;
  region: string;
  phone: string | null;
  email: string | null;
  pickupAddress: string | null;
  instagram: string | null;
}

export const site: SiteInfo = {
  name: 'On Call Trailers',
  tagline: 'Ready when you are',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.oncalltrailers.com.au',
  region: 'Sydney, NSW',
  phone: null,
  email: null,
  pickupAddress: null,
  instagram: null,
};

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
