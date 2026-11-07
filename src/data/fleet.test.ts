import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { bySlug, fleet, relatedTo } from '@/data/fleet';
import { imageUrl, largestUrl, srcSetOf } from '@/data/fleetImages';
import { rates as cageRates } from '@/data/listing';
import { MOTORCYCLE_LISTING_URL, motorcycleRates } from '@/data/motorcycleListing';

/** The only hire rates the owner has published, per the listing pages. */
const APPROVED = new Set([83.86, 77.87, 71.88, 38.34, 35.94, 33.54]);

describe('fleet data', () => {
  it('has the three trailers in order, with unique slugs', () => {
    expect(fleet.map((t) => t.slug)).toEqual(['tandem-cage-trailer', 'motorcycle-trailer', 'car-trailer']);
    expect(fleet.map((t) => t.number)).toEqual(['01', '02', '03']);
    expect(new Set(fleet.map((t) => t.seo.title)).size).toBe(3);
    expect(new Set(fleet.map((t) => t.seo.description)).size).toBe(3);
  });

  it('only ever carries approved hire rates', () => {
    for (const trailer of fleet) {
      for (const tier of trailer.rates ?? []) expect(APPROVED.has(tier.perDay), `${trailer.slug} ${tier.perDay}`).toBe(true);
    }
    expect(cageRates.map((r) => r.perDay)).toEqual([83.86, 77.87, 71.88]);
    expect(motorcycleRates.map((r) => r.perDay)).toEqual([38.34, 35.94, 33.54]);
  });

  it('books each listed trailer on its own Local Trailer Hire listing, over https', () => {
    for (const slug of ['tandem-cage-trailer', 'motorcycle-trailer'] as const) {
      const booking = bySlug(slug)!.booking;
      expect(booking.kind).toBe('listing');
      if (booking.kind === 'listing') {
        const url = new URL(booking.url);
        expect(url.protocol).toBe('https:');
        expect(url.host).toBe('www.localtrailerhire.com.au');
        expect(url.pathname).toMatch(/^\/l\//);
      }
    }
    const moto = bySlug('motorcycle-trailer')!.booking;
    expect(moto.kind === 'listing' && moto.url).toBe(MOTORCYCLE_LISTING_URL);
  });

  it('gives the car trailer no rate, specification, listing URL or index entry', () => {
    const car = bySlug('car-trailer')!;
    expect(car.booking).toEqual({ kind: 'enquiry' });
    expect(car.rates).toBeNull();
    expect(car.specs).toBeNull();
    expect(car.keySpecs).toEqual([]);
    expect(car.features).toEqual([]);
    expect(car.verified).toBe(false);
    expect(car.compare).toMatchObject({ size: null, payload: null, atm: null, rate: null });
    // Nothing the owner has not confirmed may appear in its copy.
    expect(JSON.stringify(car)).not.toMatch(/\$\d|\d\s?kg|localtrailerhire|lockii|\bATM \d/i);
  });

  it('shows card key specs that match the full specification table', () => {
    for (const trailer of fleet.filter((t) => t.specs)) {
      for (const [label, value] of trailer.keySpecs) {
        const full = trailer.specs!.find(([l]) => l === label)?.[1];
        expect(full, `${trailer.slug} ${label}`).toBeDefined();
        expect(full!.replace(/,/g, '').startsWith(value.replace(/,/g, '')), `${trailer.slug} ${label}: ${value} vs ${full}`).toBe(true);
      }
    }
  });

  it('does not state an axle count or ramp for renders the listings do not describe', () => {
    for (const slug of ['motorcycle-trailer', 'car-trailer'] as const) {
      const trailer = bySlug(slug)!;
      const text = [trailer.cutoutAlt, ...trailer.views.map((v) => v.alt)].join(' ');
      expect(text, slug).not.toMatch(/tandem|single[- ]axle|twin[- ]axle|ramp/i);
      expect(text, slug).toMatch(/illustrative/i);
    }
  });

  it('recommends the other two trailers', () => {
    expect(relatedTo('car-trailer').map((t) => t.slug)).toEqual(['tandem-cage-trailer', 'motorcycle-trailer']);
  });
});

describe('fleet images', () => {
  const root = path.resolve(import.meta.dirname, '../../public');

  it('every responsive variant referenced by the fleet exists on disk', () => {
    const sets = fleet.flatMap((t) => [t.cutout, ...t.views.map((v) => v.image)]);
    for (const set of sets) for (const width of set.widths) expect(existsSync(path.join(root, imageUrl(set, width))), imageUrl(set, width)).toBe(true);
  });

  it('builds a srcSet from every width and falls back to the largest', () => {
    const set = fleet[0].cutout;
    expect(srcSetOf(set).split(', ')).toHaveLength(set.widths.length);
    expect(largestUrl(set)).toBe(imageUrl(set, Math.max(...set.widths)));
  });

  it('keeps the original render pack outside the served folder', () => {
    expect(existsSync(path.resolve(import.meta.dirname, '../../design-assets/3d-render-pack-original/oncall-cage-trailer-cutout.png'))).toBe(true);
    expect(existsSync(path.join(root, 'design-assets'))).toBe(false);
  });
});
