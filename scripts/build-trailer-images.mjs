// Builds the responsive WebP set for the fleet pages from the original render pack.
// Source: design-assets/3d-render-pack-original (kept as backups, never served).
// Output: public/images/trailers/<name>-<width>.webp. Cutouts keep their transparency.
// Run: node scripts/build-trailer-images.mjs
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const src = path.resolve('design-assets/3d-render-pack-original');
const heroSrc = path.resolve('design-assets/waterfront-hero-original');
const out = path.resolve('public/images/trailers');

/** [source file, output name, widths to emit, webp quality] */
const jobs = [
  ['oncall-cage-trailer-hero.jpg', 'cage-hero', [640, 1024, 1376], 80],
  ['oncall-cage-trailer-side.jpg', 'cage-side', [600, 900, 1200], 80],
  ['oncall-cage-trailer-cutout.png', 'cage-cutout', [480, 768, 1024], 82],
  ['oncall-motorcycle-trailer-hero.jpg', 'motorcycle-hero', [640, 1024, 1376], 80],
  ['oncall-motorcycle-trailer-side.jpg', 'motorcycle-side', [600, 900, 1200], 80],
  ['oncall-motorcycle-trailer-cutout.png', 'motorcycle-cutout', [480, 768, 1024], 82],
  ['oncall-car-trailer-hero.jpg', 'car-hero', [640, 1024, 1376], 80],
  ['oncall-car-trailer-side.jpg', 'car-side', [600, 900, 1200], 80],
  ['oncall-car-trailer-cutout.png', 'car-cutout', [480, 768, 1024], 82],
];

await mkdir(out, { recursive: true });

// Home hero: the generated Sydney waterfront scene with all three trailers. Widths up to 1920 are resized from the 2560 file.
for (const width of [640, 1024, 1376, 1920]) {
  const info = await sharp(path.join(heroSrc, 'waterfront-lineup-v3-2560.png')).resize({ width }).webp({ quality: 78, effort: 5 }).toFile(path.join(out, `hero-waterfront-${width}.webp`));
  console.log(`hero-waterfront-${width}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}

for (const [file, name, widths, quality] of jobs) {
  const meta = await sharp(path.join(src, file)).metadata();
  for (const width of widths) {
    const w = Math.min(width, meta.width);
    const target = path.join(out, `${name}-${width}.webp`);
    const info = await sharp(path.join(src, file)).resize({ width: w }).webp({ quality, effort: 5, alphaQuality: 90 }).toFile(target);
    console.log(`${name}-${width}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB alpha=${info.channels === 4}`);
  }
}
