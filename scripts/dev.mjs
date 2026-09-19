/**
 * Watch mode: rebuilds library (tsup --watch), templates, LESS and the
 * client bundle whenever the corresponding sources change.
 */

import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

const run = (command, args) => {
  const child = spawn(command, args, { cwd: rootDir, stdio: 'inherit', shell: process.platform === 'win32' });
  child.on('error', (error) => console.error(error.message));
  return child;
};

const debounce = (fn, ms = 150) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

// Library: hand off to tsup's own watcher.
run(process.execPath, [
  path.join(rootDir, 'node_modules', 'tsup', 'dist', 'cli-default.js'),
  '--watch'
]);

const rebuildTemplates = debounce(() => run(process.execPath, [path.join(rootDir, 'scripts', 'build-templates.mjs')]));
const rebuildAssets = debounce(() => run(process.execPath, [path.join(rootDir, 'scripts', 'build-assets.mjs')]));

watch(path.join(rootDir, 'src', 'templates'), { recursive: true }, (event, file) => {
  if (file?.endsWith('.mu')) {
    console.log(`[watch] template changed: ${file}`);
    rebuildTemplates();
  }
});

watch(path.join(rootDir, 'src', 'less'), { recursive: true }, (event, file) => {
  if (file?.endsWith('.less')) {
    console.log(`[watch] style changed: ${file}`);
    rebuildAssets();
  }
});

watch(path.join(rootDir, 'src', 'js'), (event, file) => {
  if (file?.endsWith('.js')) {
    console.log(`[watch] client script changed: ${file}`);
    rebuildAssets();
  }
});

console.log('dev: watching src/ts (tsup), src/templates, src/less, src/js ...');
