'use client';

import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';

export interface GalleryImage {
  src: StaticImageData;
  alt: string;
  /** Short label for the thumbnail button. */
  label: string;
  /** CSS object-position so each crop keeps the trailer in frame. */
  position?: string;
}

/** Image gallery with a fixed aspect ratio, crossfading between views. Every view is a real button. */
export function TrailerGallery({ images }: { images: readonly GalleryImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery__stage plate">
        {images.map((image, index) => (
          <Image
            key={image.label}
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 1440px) 1312px, 100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
            className="gallery__img"
            data-active={index === active}
            aria-hidden={index !== active}
            style={{ objectPosition: image.position }}
          />
        ))}
      </div>
      {images.length > 1 ? (
        <ul className="gallery__thumbs" aria-label="Choose a view">
          {images.map((image, index) => (
            <li key={image.label}>
              <button
                type="button"
                className="gallery__thumb"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                <Image src={image.src} alt="" sizes="160px" loading="lazy" style={{ objectPosition: image.position }} />
                <span>{image.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
