/**
 * Runs the smoke suite (e2e/playwright-smoke.js).
 *
 * The suite intentionally contains failing tests (plus one failing hook) so the
 * generated report exercises screenshots and error rendering. This runner treats
 * exactly EXPECTED_FAILURES failures as success and verifies that the report was
 * generated, so `npm test` and CI stay green while still catching regressions
 * (unexpected failures, missing report, infrastructure errors).
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const EXPECTED_FAILURES = 8;
const REPORT_PATH = path.join(rootDir, 'mochawesome-reports', 'mochawesome.html');
const mochaBin = path.join(rootDir, 'node_modules', 'mocha', 'bin', 'mocha.js');

const status = await new Promise((resolve) => {
  const child = spawn(process.execPath, [mochaBin, 'e2e/playwright-smoke.js'], {
    cwd: rootDir,
    stdio: 'inherit'
  });
  child.on('error', (error) => {
    console.error(error.message);
    resolve(-1);
  });
  child.on('exit', (code) => resolve(code ?? -1));
});

let failed = false;

if (status !== EXPECTED_FAILURES) {
  console.error(
    `\nSmoke suite: expected exactly ${EXPECTED_FAILURES} intentional failures, got exit code ${status}.`
  );
  failed = true;
}

if (!fs.existsSync(REPORT_PATH) || fs.statSync(REPORT_PATH).size === 0) {
  console.error(`Smoke suite: report was not generated at ${REPORT_PATH}.`);
  failed = true;
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log(
    `\nSmoke suite: ${EXPECTED_FAILURES} intentional failures as expected, report generated at ${REPORT_PATH}.`
  );
}
