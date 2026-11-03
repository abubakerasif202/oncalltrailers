import Image from 'next/image';
import Link from 'next/link';
import { navItems, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="relative border-t border-electric/25 bg-panel/60 px-5 pb-28 pt-16 sm:px-8 md:pb-14">
      <div aria-hidden="true" className="plate absolute inset-x-0 top-0 h-2 opacity-70" />
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="" width={72} height={72} className="h-16 w-16" />
            <p className="display text-3xl text-white">{site.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-mute">
            {site.tagline}. Self-service trailer hire in {site.region}.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="display mb-3 text-xl text-chrome">Explore</p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-mute transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="display mb-3 text-xl text-chrome">Get in touch</p>
          <ul className="space-y-2 text-mute">
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            )}
            {site.pickupAddress && <li>{site.pickupAddress}</li>}
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact details
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-sm text-mute">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
        {site.abn && <> ABN {site.abn}.</>}
      </p>
    </footer>
  );
}
