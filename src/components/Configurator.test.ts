import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Configurator, calculateRate } from './Configurator';

vi.mock('./useTween', () => ({ useTween: (value: number) => value }));

describe('reservation entry', () => {
  it('advertises a closed dialog without rendering hidden reservation content', () => {
    const html = renderToStaticMarkup(createElement(Configurator));
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('Book with Lockii');
    expect(html).not.toContain('Self-Service Trailer Reservation');
  });

  it('preserves initial duration, equipment controls and demo rate', () => {
    const html = renderToStaticMarkup(createElement(Configurator));
    expect(html).toContain('aria-valuetext="4 hrs"');
    expect(html).toContain('min="1" max="168"');
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('$20');
    expect(html).toContain('Demonstration rate');
  });

  it.each([[1, 20], [4, 20], [5, 40], [8, 40], [9, 80], [24, 80], [25, 150], [48, 150], [49, 210], [168, 490]])(
    'preserves the existing rate for %i hours', (hours, price) => {
      expect(calculateRate(hours)).toBe(price);
    },
  );
});
