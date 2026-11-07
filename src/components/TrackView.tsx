'use client';

import { useEffect } from 'react';
import { track, type TrackedEvent, type TrackParams } from '@/lib/analytics';

/** Fires one event when a page is viewed. */
export function TrackView({ event, params }: { event: TrackedEvent; params?: TrackParams }) {
  const key = JSON.stringify(params ?? {});
  useEffect(() => {
    track(event, JSON.parse(key) as TrackParams);
  }, [event, key]);
  return null;
}
