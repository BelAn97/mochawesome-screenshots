/**
 * Log Report Module - public API for enriching tests with logs,
 * custom screenshots and custom report names.
 */

import pc from 'picocolors';
import { stringifySafe } from './utils.js';
import type { AugmentedTest } from './types.js';

const LOG_PREFIX = `[${pc.gray('mochawesome')}]`;

/** Mocha `this` context, a test object, or anything carrying one of them. */
export type TestOrContext =
  | AugmentedTest
  | { test?: AugmentedTest; ctx?: AugmentedTest }
  | null
  | undefined;

/**
 * Resolve test object from context
 */
function resolveTest(testOrContext: TestOrContext): AugmentedTest | null {
  if (!testOrContext) return null;
  const holder = testOrContext as { test?: AugmentedTest; ctx?: AugmentedTest };
  return holder.test ?? holder.ctx ?? null;
}

/**
 * Log data to test report
 */
export function log(testOrContext: TestOrContext, data: unknown): void {
  const test = resolveTest(testOrContext);

  if (!test || data === undefined || data === null) {
    console.log(`\n${LOG_PREFIX} Error: Invalid log report arguments.`);
    return;
  }

  const formattedData = `<pre>${stringifySafe(data, 2)}</pre>`;
  test.logr = test.logr ? `${test.logr}<br>${formattedData}` : formattedData;
}

/**
 * Set custom report name
 */
export function setReportName(testOrContext: TestOrContext, reportName: string): void {
  const test = resolveTest(testOrContext);

  if (!test || typeof reportName !== 'string' || !reportName.trim()) {
    console.log(`\n${LOG_PREFIX} Error: Invalid arguments.`);
    return;
  }

  test.reportName = reportName.trim();
}

/**
 * Set custom screenshot with optional message
 */
export function setScreenshot(testOrContext: TestOrContext, screenshotFile: string, message?: string): void {
  const test = resolveTest(testOrContext);

  if (!test || typeof screenshotFile !== 'string' || !screenshotFile.trim()) {
    console.log(`\n${LOG_PREFIX} Error: Invalid arguments.`);
    return;
  }

  const screenshotEntry: [string, string] = [screenshotFile.trim(), message || ''];

  if (test.customScrFileName) {
    test.customScrFileName.push(screenshotEntry);
  } else {
    test.customScrFileName = [screenshotEntry];
  }
}
