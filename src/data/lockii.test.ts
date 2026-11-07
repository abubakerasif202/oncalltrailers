import { describe, expect, it } from 'vitest';
import { getLockiiMode, LOCKII } from '@/data/lockii';

const live = { NEXT_PUBLIC_LOCKII_MODE: 'live', NEXT_PUBLIC_LOCKII_OWNER_APPROVED: 'true' };

describe('Lockii mode', () => {
  it('is off by default and for unknown values', () => {
    expect(getLockiiMode({})).toBe('off');
    for (const value of ['', 'on', 'true', 'PREVIEW', 'LIVE', '1']) {
      expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: value }), value).toBe('off');
    }
  });

  it('preview works outside production and is forced off in Vercel production', () => {
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'preview' })).toBe('preview');
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'preview', VERCEL_ENV: 'preview' })).toBe('preview');
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'preview', VERCEL_ENV: 'production' })).toBe('off');
  });

  it('live needs the mode and the explicit owner approval, in any environment', () => {
    expect(getLockiiMode(live)).toBe('live');
    expect(getLockiiMode({ ...live, VERCEL_ENV: 'production' })).toBe('live');
    expect(getLockiiMode({ ...live, VERCEL_ENV: 'preview' })).toBe('live');
  });

  it('a live request without the exact approval never opens checkout', () => {
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'live' })).toBe('preview');
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'live', VERCEL_ENV: 'production' })).toBe('off');
    for (const approval of ['', 'yes', '1', 'TRUE', 'false']) {
      const env = { NEXT_PUBLIC_LOCKII_MODE: 'live', NEXT_PUBLIC_LOCKII_OWNER_APPROVED: approval };
      expect(getLockiiMode(env), approval).toBe('preview');
      expect(getLockiiMode({ ...env, VERCEL_ENV: 'production' }), approval).toBe('off');
    }
  });

  it('approval alone does nothing', () => {
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_OWNER_APPROVED: 'true' })).toBe('off');
  });

  it('carries the supplied public identifiers and no credentials', () => {
    expect(LOCKII.companyId).toBe('company_hg6xlx8');
    expect(LOCKII.widgetId).toBe('hg6xlx8');
    expect(LOCKII.scriptSrc).toBe('https://book.lockii.app/widget.js');
    expect(LOCKII.products.cage).toBe('product_01a19102-9dd1-77ba-8a1e-b873a4e37fe4');
    expect(LOCKII.products.motorcycle).toBe('product_01a19103-22b0-738d-a605-047c6ab43ad8');
    expect(JSON.stringify(LOCKII)).not.toMatch(/secret|api[_-]?key|sk_|token/i);
  });
});
