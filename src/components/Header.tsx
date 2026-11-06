'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from 'radix-ui';
import { AnimatedDialogContent } from './AnimatedDialogContent';
import logo from '@/assets/logo-mark.webp';
import { telHref } from '@/data/booking';
import { navItems, site } from '@/data/site';
import { BookingLink } from './BookingLink';
import { PhoneIcon } from './Icons';

const drawerLinks = [
  { href: '/', label: 'Home' },
  { href: '/trailers', label: 'Our Trailer' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/#towing', label: 'Pickup & Towing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Header() {
  const pathname = usePathname();
  const brandRef = useRef<HTMLAnchorElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const tel = telHref(site.phone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 60.001rem)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
    <header className="site-header" data-scrolled={scrolled} data-open={open}>
      <div className="container site-header__bar">
        <Link href="/" className="brand" ref={brandRef}>
          <Image src={logo} alt="" width={56} height={56} priority />
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
        <BookingLink className="btn btn--primary btn--sm" short />
        <Dialog.Trigger asChild>
          <button type="button" className="menu-btn">Menu</button>
        </Dialog.Trigger>
      </div>
      <AnimatedDialogContent open={open} className="drawer" overlayClassName="drawer-overlay"
        onCloseAutoFocus={(event) => {
          if (window.matchMedia('(min-width: 60.001rem)').matches) {
            event.preventDefault();
            brandRef.current?.focus();
          }
        }}>
        <Dialog.Title className="visually-hidden">Site navigation</Dialog.Title>
        <Dialog.Description className="visually-hidden">Explore On Call Trailers and book your hire.</Dialog.Description>
        <Dialog.Close asChild>
          <button type="button" className="menu-btn drawer__close">Close</button>
        </Dialog.Close>
        <nav className="drawer__links" aria-label="Mobile">
          {drawerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="drawer__link" aria-current={pathname === item.href ? 'page' : undefined} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="drawer__meta">
          <p>
            <strong>Trailer hire in {site.region}</strong>
          </p>
          {site.phone && tel ? (
            <a href={tel} className="btn btn--ghost">
              <PhoneIcon className="btn__icon" />
              Call {site.phone}
            </a>
          ) : null}
          <BookingLink />
        </div>
      </AnimatedDialogContent>
    </header>
    </Dialog.Root>
  );
}
