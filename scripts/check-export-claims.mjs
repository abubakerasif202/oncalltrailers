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
];

/** Hire rates the owner has published (listing.ts). Any other dollar amount is unapproved. */
export const approvedPrices = new Set(['83.86', '77.87', '71.88']);

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

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const findings = await scanExport();
  if (findings.length) {
    console.error(findings.map((f) => `${f.file}: ${f.rule} -> "${f.match}"`).join('\n'));
    process.exit(1);
  }
  console.log('Export claims check passed: no demo, price, access or compliance claims found.');
}
