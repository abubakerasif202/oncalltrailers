import { describe, expect, it } from 'vitest';
import { estimateHire, formatDuration, MAX_HOURS } from './estimate';

const hourly = { firstBlockHours: 1, firstBlockPrice: 5, extraHourPrice: 5 };
const block = { firstBlockHours: 3, firstBlockPrice: 80, extraHourPrice: 20 };

describe('estimateHire', () => {
  it('charges the first block price within the first block', () => {
    expect(estimateHire(block, 1)).toBe(80);
    expect(estimateHire(block, 3)).toBe(80);
  });

  it('adds the extra hour rate after the first block', () => {
    expect(estimateHire(block, 4)).toBe(100);
    expect(estimateHire(block, 8)).toBe(180);
  });

  it('scales an hourly rate linearly', () => {
    expect(estimateHire(hourly, 1)).toBe(5);
    expect(estimateHire(hourly, 10)).toBe(50);
  });

  it('rounds partial hours up', () => {
    expect(estimateHire(hourly, 2.2)).toBe(15);
  });

  it('clamps invalid and out-of-range input', () => {
    expect(estimateHire(hourly, 0)).toBe(5);
    expect(estimateHire(hourly, -4)).toBe(5);
    expect(estimateHire(hourly, Number.NaN)).toBe(5);
    expect(estimateHire(hourly, 9999)).toBe(MAX_HOURS * 5);
  });
});

describe('formatDuration', () => {
  it('formats hours, days and mixes', () => {
    expect(formatDuration(1)).toBe('1 hr');
    expect(formatDuration(5)).toBe('5 hrs');
    expect(formatDuration(24)).toBe('1 day');
    expect(formatDuration(52)).toBe('2 days 4 hrs');
  });
});
