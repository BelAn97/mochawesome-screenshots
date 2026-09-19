/**
 * Builds the browser assets of the report:
 *  - LESS -> dist/css (Bootstrap 3 styles included)
 *  - client script (vanilla JS + Chart.js) -> dist/js/mochawesome.js
 *  - fonts -> dist/fonts
 */

import { build } from 'esbuild';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import less from 'less';

const rootDir = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

async function compileStyles() {
  const cssOutDir = path.join(rootDir, 'dist', 'css');
  await mkdir(cssOutDir, { recursive: true });

  for (const name of ['mochawesome', 'mochawesome-64']) {
    const filename = path.join(rootDir, 'src', 'less', `${name}.less`);
    const result = await less.render(await readFile(filename, 'utf8'), {
      filename,
      paths: [path.join(rootDir, 'src', 'less'), path.join(rootDir, 'node_modules', 'bootstrap', 'less')],
      compress: true
    });
    await writeFile(path.join(cssOutDir, `${name}.css`), result.css);
  }
  console.log('assets: compiled LESS -> dist/css');
}

async function bundleClientScript() {
  const jsOutDir = path.join(rootDir, 'dist', 'js');
  await mkdir(jsOutDir, { recursive: true });

  await build({
    entryPoints: [path.join(rootDir, 'src', 'js', 'mochawesome.js')],
    bundle: true,
    minify: true,
    format: 'iife',
    target: ['es2020'],
    outfile: path.join(jsOutDir, 'mochawesome.js'),
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning'
  });
  console.log('assets: bundled client script -> dist/js/mochawesome.js');
}

async function copyFonts() {
  await cp(path.join(rootDir, 'src', 'fonts'), path.join(rootDir, 'dist', 'fonts'), {
    recursive: true,
    force: true
  });
  console.log('assets: copied fonts -> dist/fonts');
}

await compileStyles();
await bundleClientScript();
await copyFonts();
