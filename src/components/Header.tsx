'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import logo from '@/assets/logo-mark.webp';
import { navItems, site } from '@/data/site';
import { PhoneIcon } from './Icons';

const drawerLinks = [
  { href: '/', label: 'Home' },
  { href: '/trailers', label: 'Our Fleet' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/#towing', label: 'Towing Guide' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled} data-open={open}>
      <div className="container site-header__bar">
        <Link href="/" className="brand">
          <Image src={logo} alt="" width={48} height={48} priority />
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__tag">{site.tagline}</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/trailers#book" className="btn btn--primary btn--sm">
          Book now
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="drawer" className="drawer" data-open={open} data-lenis-prevent>
        <div className="drawer__links">
          {drawerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="drawer__link" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="drawer__meta">
          <p>
            <strong>Sydney Metro 24/7 Pickup</strong>
            Self-service collection with secure digital PIN lockbox.
          </p>
          {site.phone ? (
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn--ghost">
              <PhoneIcon className="btn__icon" />
              Call {site.phone}
            </a>
          ) : null}
          <Link href="/trailers#book" className="btn btn--primary" onClick={() => setOpen(false)}>
            Find Your Trailer
          </Link>
        </div>
      </div>
    </header>
  );
}
