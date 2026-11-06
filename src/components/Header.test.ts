import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';
import { BOOKING_URL } from '@/data/booking';
import { navItems, site } from '@/data/site';

vi.mock('next/navigation', () => ({ usePathname: () => '/faq' }));
vi.mock('next/image', () => ({ default: () => null }));

describe('navigation entry', () => {
  it('provides a labelled dialog trigger without exposing closed mobile links', () => {
    const html = renderToStaticMarkup(createElement(Header));
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('>Menu</button>');
    expect(html).not.toContain('drawer__link');
  });

  it('preserves desktop destinations, current page, brand and booking link', () => {
    const html = renderToStaticMarkup(createElement(Header));
    for (const item of navItems) {
      expect(html).toContain(`href="${item.href}"`);
      expect(html).toContain(item.label);
    }
    expect(html).toContain('aria-current="page" href="/faq"');
    expect(html).toContain(site.name);
    expect(html).toContain(`href="${BOOKING_URL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
