import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Claims and demo leftovers that must never reach customers. Each needs owner approval before it can return. */
export const banned = [
  ['demo', /\bdemo(nstration)?\b/i],
  ['reference pricing', /reference pric/i],
  ['integration placeholder', /being connected|not yet connected|awaiting (owner )?confirmation|await confirmation/i],
  ['24/7 access', /24\s*\/\s*7/],
  ['ADR / RMS claims', /\bADR\b|\bRMS\b|certified standards/i],
  ['smart lockbox / PIN', /lockbox|(?<!7-)\bPIN\b|\bSMS\b/i],
  ['Lockii', /lockii/i],
  ['legacy specs', /\bGTM\b|8x5|10x5/i],
  ['maintenance claim', /maintenance (logged|after)|maintained after/i],
  ['protection claims', /insurance|\bGPS\b|refund|no[- ]bond|bond[- ]free/i],
  ['any payload', /any payload/i],
  ['identical specs assumed', /identical (12x6|trailers)|3 identical/i],
  ['discount rate as standard', /from \$\s?71\.88|from \$\s?77\.87|from \$\s?33\.54|from \$\s?35\.94/i],
  ['blanket cover claim', /fully covered|covered for everything|guaranteed cover/i],
];

/** Hire rates the owner has published (listing.ts). Any other dollar amount is unapproved. */
export const approvedPrices = new Set([
  // 12x6 cage trailer listing (src/data/listing.ts)
  '83.86',
  '77.87',
  '71.88',
  // Motorcycle x3 Trailer listing, retrieved 2026-11-07 (src/data/motorcycleListing.ts)
  '38.34',
  '35.94',
  '33.54',
]);

/** Visible text, meta tags and JSON-LD of one HTML document (scripts other than JSON-LD are dropped). */
export function extractText(html) {
  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  const meta = [...html.matchAll(/<(?:meta|title)[^>]*?(?:content="([^"]*)"|>([^<]*)<)/g)].map((m) => m[1] ?? m[2] ?? '');
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  return [body, ...meta, ...ld].join(' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ');
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

/** Returns [{ file, rule, match }] for every banned phrase found in the exported pages. */
export async function scanExport(root = path.resolve('out')) {
  const findings = [];
  for await (const file of htmlFiles(root)) {
    const text = extractText(await readFile(file, 'utf8'));
    for (const [rule, pattern] of banned) {
      const match = text.match(pattern);
      if (match) findings.push({ file: path.relative(root, file), rule, match: match[0] });
    }
    for (const price of text.matchAll(/\$\s?(\d[\d,]*(?:\.\d+)?)/g)) {
      if (!approvedPrices.has(price[1])) findings.push({ file: path.relative(root, file), rule: 'unapproved prices', match: price[0] });
    }
  }
  return findings;
}

async function* exportedFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* exportedFiles(full);
    else if (/\.(html|js|txt|xml|json)$/.test(entry.name)) yield full;
  }
}

/**
 * Production isolation: a build with the booking widget off must carry no trace of the widget provider
 * (script, element names or URL) in any exported page or bundle. Returns [{ file, rule, match }].
 */
export async function scanWidgetIsolation(root = path.resolve('out')) {
  const findings = [];
  for await (const file of exportedFiles(root)) {
    const match = (await readFile(file, 'utf8')).match(/book\.lockii\.app|<lockii-|lockii-widget|data-lockii/i);
    if (match) findings.push({ file: path.relative(root, file), rule: 'widget isolation', match: match[0] });
  }
  return findings;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const widgetBuild = ['preview', 'live'].includes(process.env.NEXT_PUBLIC_LOCKII_MODE ?? '');
  const findings = [...(await scanExport()), ...(widgetBuild ? [] : await scanWidgetIsolation())];
  if (findings.length) {
    console.error(findings.map((f) => `${f.file}: ${f.rule} -> "${f.match}"`).join('\n'));
    process.exit(1);
  }
  console.log(
    `Export claims check passed: no demo, price, access or compliance claims found${widgetBuild ? ' (widget build: widget isolation not checked)' : ', and no booking widget code in the export'}.`,
  );
}
