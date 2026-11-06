import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, access } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { normalizeExport } from './normalize-export.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'oncalltrailers-export-'));
  t.after(async () => {
    assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
    assert.ok(path.basename(root).startsWith('oncalltrailers-export-'));
    await rm(root, { recursive: true, force: true });
  });
  return root;
}

async function put(root, name, content) {
  const file = path.join(root, name);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}

test('normalizes Windows-exported segment files while preserving original bytes and files', async (t) => {
  const root = await fixture(t);
  await put(root, 'trailers/__next.trailers/__PAGE__.txt', 'segment payload');
  await put(root, 'index.html', '<h1>Unchanged</h1>');
  assert.equal(await normalizeExport(root), 1);
  assert.equal(await readFile(path.join(root, 'trailers/__next.trailers.__PAGE__.txt'), 'utf8'), 'segment payload');
  assert.equal(await readFile(path.join(root, 'trailers/__next.trailers/__PAGE__.txt'), 'utf8'), 'segment payload');
  assert.equal(await readFile(path.join(root, 'index.html'), 'utf8'), '<h1>Unchanged</h1>');
  assert.equal(await normalizeExport(root), 0);
});

test('leaves correctly emitted Linux files and unrelated nested text files unchanged', async (t) => {
  const root = await fixture(t);
  await put(root, 'trailers/__next.trailers.__PAGE__.txt', 'linux payload');
  await put(root, 'notes/keep.txt', 'not an RSC file');
  assert.equal(await normalizeExport(root), 0);
  await assert.rejects(access(path.join(root, 'notes.keep.txt')));
  assert.equal(await readFile(path.join(root, 'trailers/__next.trailers.__PAGE__.txt'), 'utf8'), 'linux payload');
});

test('rejects conflicting output instead of overwriting generated data', async (t) => {
  const root = await fixture(t);
  await put(root, 'trailers/__next.trailers/__PAGE__.txt', 'new payload');
  await put(root, 'trailers/__next.trailers.__PAGE__.txt', 'existing payload');
  await assert.rejects(normalizeExport(root), /Conflicting segment export/);
  assert.equal(await readFile(path.join(root, 'trailers/__next.trailers.__PAGE__.txt'), 'utf8'), 'existing payload');
});
