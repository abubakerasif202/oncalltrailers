/**
 * Responsive WebP sets built by scripts/build-trailer-images.mjs from the original render pack
 * (design-assets/3d-render-pack-original). They are static CGI renders, not photographs and not 3D models.
 * `width` and `height` are the intrinsic size of the largest variant, so every image reserves its space.
 */
export interface ImageSet {
  /** File stem in public/images/trailers. */
  name: string;
  widths: readonly number[];
  width: number;
  height: number;
}

const set = (name: string, widths: readonly number[], width: number, height: number): ImageSet => ({ name, widths, width, height });

const HERO = [640, 1024, 1376] as const;
const SIDE = [600, 900, 1200] as const;
const CUTOUT = [480, 768, 1024] as const;

/** Home hero: the generated Sydney waterfront scene with all three trailers (illustrative, not a photograph). */
export const waterfrontHero = set('hero-waterfront', [640, 1024, 1376, 1920], 1920, 1080);

export const fleetImages = {
  cageHero: set('cage-hero', HERO, 1376, 768),
  cageSide: set('cage-side', SIDE, 1200, 896),
  cageCutout: set('cage-cutout', CUTOUT, 1024, 1024),
  motorcycleHero: set('motorcycle-hero', HERO, 1376, 768),
  motorcycleSide: set('motorcycle-side', SIDE, 1200, 896),
  motorcycleCutout: set('motorcycle-cutout', CUTOUT, 1024, 1024),
  carHero: set('car-hero', HERO, 1376, 768),
  carSide: set('car-side', SIDE, 1200, 896),
  carCutout: set('car-cutout', CUTOUT, 1024, 1024),
} as const;

export const imageUrl = (image: ImageSet, width: number): string => `/images/trailers/${image.name}-${width}.webp`;

/** The largest variant: the fallback `src` and the file a fullscreen view opens. */
export const largestUrl = (image: ImageSet): string => imageUrl(image, Math.max(...image.widths));

export const srcSetOf = (image: ImageSet): string => image.widths.map((w) => `${imageUrl(image, w)} ${w}w`).join(', ');
