import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo-mark.webp';
import { navItems, site } from '@/data/site';

export function Footer() {
  const tel = site.phone?.replace(/\s/g, '');
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Link href="/" className="brand" aria-label={`${site.name}, home`}>
              <Image src={logo} alt="" width={48} height={48} />
              <span className="brand__text">
                <span className="brand__name">{site.name}</span>
              </span>
            </Link>
            <p className="lead" style={{ marginTop: 'var(--space-lg)', color: 'var(--color-ink-2)' }}>
              {site.tagline}. Self-service trailer hire in {site.region}.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>Get in touch</h2>
            <ul>
              {site.phone && tel ? (
                <li>
                  <a href={`tel:${tel}`}>{site.phone}</a>
                </li>
              ) : null}
              <li>
                <Link href="/contact">Contact details</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>
            © 2026 {site.name}. All rights reserved.
            {site.abn ? ` ABN ${site.abn}.` : ''}
          </p>
          <a href="https://abwebstudio.com.au" target="_blank" rel="noopener noreferrer" className="link">
            Website by AB Web Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
