/**
 * Open a file in the OS default browser/application.
 * Zero-dependency replacement for the `opener` package.
 */

import { spawn } from 'node:child_process';
import path from 'node:path';

export function openBrowser(target: string): void {
  const file = path.resolve(target);

  let cmd: string;
  let args: string[];
  switch (process.platform) {
    case 'darwin':
      cmd = 'open';
      args = [file];
      break;
    case 'win32':
      cmd = 'explorer';
      args = [file];
      break;
    default:
      cmd = 'xdg-open';
      args = [file];
  }

  const child = spawn(cmd, args, { stdio: 'ignore', detached: true });
  child.on('error', (error) => {
    console.warn(`Unable to open report: ${error.message}`);
  });
  child.unref();
}
