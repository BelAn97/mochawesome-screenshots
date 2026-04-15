/**
 * Log Report Module - Modern ES6+ syntax
 */

'use strict';

const chalk = require('chalk');
const stringify = require('json-stringify-safe');

const LOG_PREFIX = `[${chalk.gray('mochawesome')}]`;

/**
 * Resolve test object from context
 */
function resolveTest(testOrContext) {
  if (!testOrContext) return null;
  return testOrContext.test || testOrContext.ctx || null;
}

/**
 * Log data to test report
 */
function log(testOrContext, data) {
  const test = resolveTest(testOrContext);

  if (!test || data === undefined || data === null) {
    console.log(`\n${LOG_PREFIX} Error: Invalid log report arguments.`);
    return;
  }

  const formattedData = `<pre>${stringify(data, null, 2)}</pre>`;
  test.logr = test.logr ? `${test.logr}<br>${formattedData}` : formattedData;
}

/**
 * Set custom report name
 */
function setReportName(testOrContext, reportName) {
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
function setScreenshot(testOrContext, screenshotFile, message) {
  const test = resolveTest(testOrContext);

  if (!test || typeof screenshotFile !== 'string' || !screenshotFile.trim()) {
    console.log(`\n${LOG_PREFIX} Error: Invalid arguments.`);
    return;
  }

  const screenshotEntry = [screenshotFile.trim(), message || ''];

  if (test.customScrFileName) {
    test.customScrFileName.push(screenshotEntry);
  } else {
    test.customScrFileName = [screenshotEntry];
  }
}

module.exports = {
  log,
  setReportName,
  setScreenshot
};
