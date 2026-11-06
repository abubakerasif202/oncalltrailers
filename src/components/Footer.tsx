import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo-mark.webp';
import { telHref } from '@/data/booking';
import { navItems, site } from '@/data/site';
import { BookingLink } from './BookingLink';
import { MotionToggle } from './MotionToggle';

export function Footer() {
  const tel = telHref(site.phone);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Link href="/" className="brand">
              <Image src={logo} alt="" width={56} height={56} loading="lazy" />
              <span className="brand__text">
                <span className="brand__name">{site.name}</span>
              </span>
            </Link>
            <p className="lead" style={{ marginTop: 'var(--space-lg)', color: 'var(--color-ink-2)' }}>
              Trailer hire in {site.region}.
            </p>
            <div className="actions" style={{ marginTop: 'var(--space-lg)' }}>
              <BookingLink className="btn btn--primary btn--sm" />
            </div>
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
                  <a href={tel}>{site.phone}</a>
                </li>
              ) : null}
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              ) : null}
              <li>{site.region}</li>
              <li>
                <Link href="/contact">Contact details</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>
            © 2026 {site.name}.{site.abn ? ` ABN ${site.abn}.` : ''}
          </p>
          <MotionToggle />
          <a href="https://abwebstudio.com.au" target="_blank" rel="noopener noreferrer" className="link">
            Website by AB Web Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
