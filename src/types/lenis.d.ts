import type Lenis from 'lenis';

declare global {
  interface Window {
    /** The smooth-scroll instance, present while smooth scrolling is active. */
    __lenis?: Lenis;
  }
}

export {};
