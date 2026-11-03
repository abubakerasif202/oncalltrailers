'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { navItems, site } from '@/data/site';
import { Icon } from './Icon';

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (value) => setCompact(value > 24));

  const telHref = site.phone ? `tel:${site.phone.replace(/\s/g, '')}` : null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        compact
          ? 'border-b border-electric/30 bg-ink/85 py-2 backdrop-blur-xl'
          : 'border-b border-electric/20 bg-gradient-to-b from-ink/90 to-ink/20 py-3 shadow-[0_1px_0_rgb(227_234_245/0.07)]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={96}
            height={96}
            className={`transition-all duration-300 ${
              compact ? 'h-12 w-12' : 'h-20 w-20 drop-shadow-[0_0_18px_rgb(42_127_255/0.6)]'
            }`}
          />
          <span className="display hidden text-2xl text-white sm:block">
            On Call <span className="blue-text">Trailers</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative py-2 text-sm font-semibold uppercase tracking-[0.12em] text-chrome transition-colors hover:text-white ${
                i > 0 ? 'border-l border-electric/30 pl-8' : ''
              }`}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-electric transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {telHref && site.phone && (
            <a
              href={telHref}
              className="hidden items-center gap-2 rounded-lg border border-chrome/40 bg-ink/50 px-4 py-2 font-semibold text-white transition-colors hover:border-electric lg:flex"
            >
              <Icon name="phone" className="h-5 w-5 text-electric-hi" />
              {site.phone}
            </a>
          )}
          <Link href="/trailers#book" className="btn btn-primary !px-5 !py-2.5 !text-base">
            <Icon name="calendar" className="h-5 w-5" />
            Book now
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-chrome transition-all duration-300 ${
                open ? 'top-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-chrome transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-chrome transition-all duration-300 ${
                open ? 'top-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-b border-line bg-ink/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-3 text-3xl text-white"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
