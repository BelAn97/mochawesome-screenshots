/**
 * Log Report Module - Modern ES6+ syntax
 * Provides utilities to log data and customize reports from tests
 */

'use strict';

const chalk = require('chalk');
const stringify = require('json-stringify-safe');

/**
 * Resolve test object from context
 * @param {Object} testOrContext - Test instance or context object
 * @returns {Object|null} Test object or null
 */
function resolveTest(testOrContext) {
  if (!testOrContext) return null;
  
  const { test, ctx } = testOrContext;
  return test || ctx || null;
}

/**
 * Log data to test report
 * @param {Object} testOrContext - Test instance or context
 * @param {*} data - Data to log
 */
function log(testOrContext, data) {
  const test = resolveTest(testOrContext);

  if (!test || data === undefined || data === null) {
    console.log(`\n[${chalk.gray('mochawesome')}] Error: Invalid log report arguments.`);
    return;
  }

  const formattedData = `<pre>${stringify(data, null, 2)}</pre>`;
  test.logr = test.logr ? `${test.logr}<br>${formattedData}` : formattedData;
}

/**
 * Set custom report name
 * @param {Object} testOrContext - Test instance or context
 * @param {string} reportName - Custom report name
 */
function setReportName(testOrContext, reportName) {
  const test = resolveTest(testOrContext);

  if (!test || typeof reportName !== 'string' || !reportName.trim()) {
    console.log(`\n[${chalk.gray('mochawesome')}] Error: Invalid arguments.`);
    return;
  }

  test.reportName = reportName.trim();
}

/**
 * Set custom screenshot with optional message
 * @param {Object} testOrContext - Test instance or context
 * @param {string} screenshotFile - Screenshot filename
 * @param {string} [message=''] - Optional message to display
 */
function setScreenshot(testOrContext, screenshotFile, message = '') {
  const test = resolveTest(testOrContext);

  if (!test || typeof screenshotFile !== 'string' || !screenshotFile.trim()) {
    console.log(`\n[${chalk.gray('mochawesome')}] Error: Invalid arguments.`);
    return;
  }

  const screenshotEntry = [screenshotFile.trim(), message];
  
  if (!test.customScrFileName) {
    test.customScrFileName = [screenshotEntry];
  } else {
    test.customScrFileName.push(screenshotEntry);
  }
}

// Export module
module.exports = {
  log,
  setReportName,
  setScreenshot
};
