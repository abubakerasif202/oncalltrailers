import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { placementOf, track } from '@/lib/analytics';

type FakeWindow = EventTarget & { dataLayer?: unknown[] };

describe('track', () => {
  let win: FakeWindow;

  beforeEach(() => {
    win = new EventTarget();
    Object.defineProperty(globalThis, 'window', { value: win, configurable: true, writable: true });
  });

  afterEach(() => {
    Reflect.deleteProperty(globalThis, 'window');
  });

  it('pushes to dataLayer when one exists and announces a DOM event', () => {
    win.dataLayer = [];
    const seen: unknown[] = [];
    win.addEventListener('oct:track', (e) => seen.push((e as CustomEvent).detail), { once: true });
    track('booking_cta_click', { placement: 'hero' });
    expect(win.dataLayer).toEqual([{ event: 'booking_cta_click', placement: 'hero' }]);
    expect(seen).toEqual([{ event: 'booking_cta_click', placement: 'hero' }]);
  });

  it('does not create a dataLayer or throw without a tag manager', () => {
    expect(() => track('trailer_detail_view', { trailer: 'x' })).not.toThrow();
    expect(win.dataLayer).toBeUndefined();
  });

  it('does nothing on the server', () => {
    Reflect.deleteProperty(globalThis, 'window');
    expect(() => track('booking_cta_click')).not.toThrow();
  });
});

describe('placementOf', () => {
  const within = (matching: string) => ({ closest: (selector: string) => (selector === matching ? {} : null) }) as unknown as Element;

  it('names the closest landmark', () => {
    expect(placementOf(within('.sticky-book'))).toBe('sticky_bar');
    expect(placementOf(within('.hero'))).toBe('hero');
    expect(placementOf(within('.panel'))).toBe('trailer_panel');
    expect(placementOf(within('nothing'))).toBe('page');
  });
});
