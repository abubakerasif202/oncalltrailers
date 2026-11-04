import { createElement, type ComponentProps } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LockiiBooking } from './LockiiBooking';

vi.mock('next/script', () => ({
  default: (props: ComponentProps<'script'> & { strategy?: string }) => {
    const attributes = { ...props };
    delete attributes.strategy;
    return createElement('script', attributes);
  },
}));

afterEach(() => vi.unstubAllEnvs());

describe('Lockii booking configuration', () => {
  it('clearly discloses demo mode without loading a provider when no ID is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_LOCKII_ID', '');
    const html = renderToStaticMarkup(createElement(LockiiBooking));
    expect(html).toContain('Booking preview — not yet connected');
    expect(html).toContain('Live availability, payment and collection access are not enabled.');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('lockii-selector');
  });

  it('preserves the provider URL, widget ID and selector when configured', () => {
    vi.stubEnv('NEXT_PUBLIC_LOCKII_ID', 'test-widget-not-a-live-account');
    const html = renderToStaticMarkup(createElement(LockiiBooking));
    expect(html).toContain('src="https://dash.lockii.app/widget.js"');
    expect(html).toContain('data-lockii-id="test-widget-not-a-live-account"');
    expect(html).toContain('data-analytics="on"');
    expect(html).toContain('<lockii-selector>');
    expect(html).not.toContain('Booking preview');
  });
});
