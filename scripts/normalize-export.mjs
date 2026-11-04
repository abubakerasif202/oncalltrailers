// Next 16.4.1's Windows exporter leaves directory separators in segment filenames.
// Publish the portable filenames requested by the client without changing payloads.
import { constants } from 'node:fs';
import { copyFile, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export async function normalizeExport(root = path.resolve('out')) {
  let copied = 0;
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const source = path.join(directory, entry.name);
      if (entry.isDirectory()) { await visit(source); continue; }
      if (!entry.isFile() || !entry.name.endsWith('.txt')) continue;
      const parts = path.relative(root, source).split(path.sep);
      const segment = parts.findIndex((part) => part.startsWith('__next.'));
      if (segment < 0 || segment === parts.length - 1) continue;
      const target = path.join(root, ...parts.slice(0, segment), parts.slice(segment).join('.'));
      try {
        await copyFile(source, target, constants.COPYFILE_EXCL);
        copied++;
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
        const [original, existing] = await Promise.all([readFile(source), readFile(target)]);
        if (!original.equals(existing)) throw new Error(`Conflicting segment export: ${path.relative(root, target)}`);
      }
    }
  }
  await visit(root);
  return copied;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(`Normalized ${await normalizeExport()} static segment filenames.`);
}
