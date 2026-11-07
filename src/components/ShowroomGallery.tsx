'use client';

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Dialog } from 'radix-ui';
import type { FleetView } from '@/data/fleet';
import { imageUrl } from '@/data/fleetImages';
import { TrailerImage } from './TrailerImage';

const ZOOM_LEVELS = [1, 1.5, 2, 3] as const;
const SWIPE_PX = 48;

interface ShowroomGalleryProps {
  views: readonly FleetView[];
  trailerName: string;
}

/**
 * Image showroom: a fixed-ratio stage that crossfades between the supplied renders, real-button thumbnails,
 * arrow-key and swipe navigation, and a fullscreen viewer with zoom. The images are static renders, so there is
 * no rotation: the "angles" are the separate views supplied for each trailer.
 */
export function ShowroomGallery({ views, trailerName }: ShowroomGalleryProps) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set());
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(0);
  const swipeStart = useRef<number | null>(null);
  const fullscreenButton = useRef<HTMLButtonElement>(null);
  const count = views.length;

  const go = useCallback(
    (delta: number) => {
      setActive((current) => (current + delta + count) % count);
      setZoom(0);
    },
    [count],
  );

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.pointerType === 'touch' ? event.clientX : null;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) >= SWIPE_PX) go(dx < 0 ? 1 : -1);
  };

  const view = views[active];
  const markLoaded = (index: number) => setLoaded((current) => (current.has(index) ? current : new Set(current).add(index)));

  return (
    <div className="gallery gallery--showroom">
      <div
        className="gallery__stage plate"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${trailerName} image viewer. Use the left and right arrow keys to change view.`}
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {views.map((item, index) => (
          <TrailerImage
            key={item.label}
            image={item.image}
            alt={item.alt}
            sizes="(min-width: 1440px) 1312px, 100vw"
            className="gallery__img"
            active={index === active}
            onLoad={() => markLoaded(index)}
          />
        ))}
        <div className="gallery__skeleton" data-loaded={loaded.has(active)} aria-hidden="true" />
        <div className="gallery__controls">
          <button type="button" className="gallery__nav" aria-label="Previous view" onClick={() => go(-1)}>
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" className="gallery__nav" aria-label="Next view" onClick={() => go(1)}>
            <span aria-hidden="true">›</span>
          </button>
        </div>
        <button type="button" className="gallery__full" ref={fullscreenButton} onClick={() => setOpen(true)}>
          Fullscreen
        </button>
        <p className="gallery__count" aria-live="polite">
          {view.label} · {active + 1} / {count}
        </p>
      </div>

      <ul className="gallery__thumbs" aria-label="Choose a view">
        {views.map((item, index) => (
          <li key={item.label}>
            <button
              type="button"
              className="gallery__thumb"
              aria-pressed={index === active}
              onClick={() => {
                setActive(index);
                setZoom(0);
              }}
            >
              <TrailerImage image={item.image} alt="" decorative sizes="160px" />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root
        open={open}
        onOpenChange={(next) => {
          // Every fullscreen session starts unzoomed.
          setOpen(next);
          setZoom(0);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="lightbox__overlay" />
          <Dialog.Content
            className="lightbox"
            onCloseAutoFocus={(event) => {
              // The opener is a plain button, not a Dialog trigger, so hand focus back to it explicitly.
              event.preventDefault();
              fullscreenButton.current?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') go(1);
              else if (event.key === 'ArrowLeft') go(-1);
              else if (event.key === '+' || event.key === '=') setZoom((z) => Math.min(z + 1, ZOOM_LEVELS.length - 1));
              else if (event.key === '-') setZoom((z) => Math.max(z - 1, 0));
              else if (event.key === '0') setZoom(0);
            }}
          >
            <Dialog.Title className="visually-hidden">
              {trailerName}: {view.label}
            </Dialog.Title>
            <Dialog.Description className="visually-hidden">
              Illustrative 3D render. Use the arrow keys to change view, plus and minus to zoom, and Escape to close.
            </Dialog.Description>
            <div className="lightbox__scroller" tabIndex={0} aria-label="Zoomable image. Scroll to pan when zoomed in.">
              {/* eslint-disable-next-line @next/next/no-img-element -- fullscreen opens the largest pre-sized variant */}
              <img
                className="lightbox__img"
                src={imageUrl(view.image, Math.max(...view.image.widths))}
                alt={view.alt}
                width={view.image.width}
                height={view.image.height}
                style={zoom === 0 ? { width: '100%', height: '100%', objectFit: 'contain' } : { width: `${ZOOM_LEVELS[zoom] * 100}%`, height: 'auto' }}
                draggable={false}
              />
            </div>
            <div className="lightbox__bar" role="toolbar" aria-label="Viewer controls">
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => go(-1)}>
                Previous
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => go(1)}>
                Next
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setZoom((z) => Math.max(z - 1, 0))}
                disabled={zoom === 0}
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="lightbox__zoom" aria-live="polite">
                {Math.round(ZOOM_LEVELS[zoom] * 100)}%
              </span>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setZoom((z) => Math.min(z + 1, ZOOM_LEVELS.length - 1))}
                disabled={zoom === ZOOM_LEVELS.length - 1}
                aria-label="Zoom in"
              >
                +
              </button>
              <Dialog.Close asChild>
                <button type="button" className="btn btn--primary btn--sm">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
