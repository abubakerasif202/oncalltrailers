import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { scanExport } from './check-export-claims.mjs';

async function site(pages) {
  const root = await mkdtemp(path.join(tmpdir(), 'claims-'));
  for (const [name, html] of Object.entries(pages)) {
    await mkdir(path.dirname(path.join(root, name)), { recursive: true });
    await writeFile(path.join(root, name), html);
  }
  return root;
}

test('passes clean pages', async () => {
  const root = await site({ 'index.html': '<title>On Call</title><main><p>Hire a trailer is $83.86 total per day for a short hire. Roadside assistance by NRMA. 2,000 kg ATM.</p></main>' });
  try { assert.deepEqual(await scanExport(root), []); } finally { await rm(root, { recursive: true }); }
});

test('flags demo copy, prices, access and compliance claims in text, meta and JSON-LD', async () => {
  const root = await site({
    'index.html': '<meta name="description" content="Demo reference pricing"><p>From $5 per hour. 24/7 PIN lockbox. 100% ADR compliant.</p>',
    'faq/index.html': '<script type="application/ld+json">{"text":"Full insurance and GPS tracking included"}</script>',
    'a.html': '<script>var x="demo $5"</script><p>fine</p>',
  });
  try {
    const rules = new Set((await scanExport(root)).map((f) => f.rule));
    for (const rule of ['demo', 'reference pricing', 'unapproved prices', '24/7 access', 'smart lockbox / PIN', 'ADR / RMS claims', 'protection claims']) {
      assert.ok(rules.has(rule), `expected ${rule}`);
    }
    assert.equal((await scanExport(root)).some((f) => f.file === 'a.html'), false, 'scripts are not visible text');
  } finally { await rm(root, { recursive: true }); }
});
