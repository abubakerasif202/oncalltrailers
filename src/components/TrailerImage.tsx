import type { CSSProperties } from 'react';
import { largestUrl, srcSetOf, type ImageSet } from '@/data/fleetImages';

interface TrailerImageProps {
  image: ImageSet;
  alt: string;
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes: string;
  /** Only for the single image that is the largest above-the-fold element. */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  onLoad?: () => void;
  decorative?: boolean;
  /** Gallery state: sets data-active and hides inactive views from assistive technology. */
  active?: boolean;
}

/**
 * A responsive trailer render. The export is static with Next's image optimiser off, so the pre-sized WebP
 * variants are offered through srcSet. Width and height are the intrinsic size, so the layout never shifts, and
 * only a priority image loads eagerly; everything else is lazy.
 */
export function TrailerImage({ image, alt, sizes, priority = false, className, style, onLoad, decorative = false, active }: TrailerImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- the pre-sized srcSet below replaces next/image under static export
    <img
      src={largestUrl(image)}
      srcSet={srcSetOf(image)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={decorative ? '' : alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={style}
      onLoad={onLoad}
      // An eager image can finish loading before React hydrates and never fire onLoad, so check once it is attached.
      ref={onLoad ? (el) => { if (el && el.complete && el.naturalWidth > 0) onLoad(); } : undefined}
      data-active={active}
      aria-hidden={active === undefined ? undefined : !active}
    />
  );
}
