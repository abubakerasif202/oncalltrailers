import { describe, expect, it } from 'vitest';
import { getLockiiMode, LOCKII } from '@/data/lockii';

describe('Lockii mode', () => {
  it('is off by default', () => {
    expect(getLockiiMode({})).toBe('off');
  });

  it('turns on only for the exact preview value', () => {
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'preview' })).toBe('preview');
    for (const value of ['', 'on', 'true', 'live', 'PREVIEW', '1']) {
      expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: value }), value).toBe('off');
    }
  });

  it('is forced off in a Vercel production environment, even when the flag is set', () => {
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'preview', VERCEL_ENV: 'production' })).toBe('off');
    expect(getLockiiMode({ NEXT_PUBLIC_LOCKII_MODE: 'preview', VERCEL_ENV: 'preview' })).toBe('preview');
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
