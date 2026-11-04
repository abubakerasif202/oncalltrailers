/** Shared motion preference: the visitor's OS setting, plus the site's own "Pause animations" switch. */

export const MOTION_EVENT = 'motionchange';

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function motionPaused(): boolean {
  return document.documentElement.dataset.motion === 'off';
}

/** True when decorative motion should run. */
export function motionAllowed(): boolean {
  return !prefersReducedMotion() && !motionPaused();
}

export function setMotionPaused(paused: boolean): void {
  if (paused) {
    document.documentElement.dataset.motion = 'off';
  } else {
    delete document.documentElement.dataset.motion;
  }
  try {
    window.localStorage.setItem('motion', paused ? 'off' : 'on');
  } catch {
    // Storage can be unavailable (private mode); the switch still works for this visit.
  }
  window.dispatchEvent(new Event(MOTION_EVENT));
}
