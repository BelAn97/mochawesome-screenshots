/**
 * Configuration Module - Modern ES6+ with clean syntax
 * ES2022 features: optional chaining, nullish coalescing, template literals
 */

'use strict';

const path = require('path');

// Default configuration
const DEFAULT_CONFIG = {
  splitChar: process.platform === 'win32' ? '\\' : '/',
  reportDir: path.join('.', 'mochawesome-reports'),
  reportName: 'mochawesome'
};

/**
 * Create merged configuration from defaults, env vars, and options
 * @param {Object} options - Reporter options
 * @returns {Object} Complete configuration
 */
function createConfig(options = {}) {
  // Helper to get option value with precedence
  const getOption = (optName, isBool = false) => {
    const envVar = `MOCHAWESOME_${optName.toUpperCase()}`;

    // Handle multiReport special case
    if (optName === 'multiReport' && options[optName] === true) {
      options.reportName += `_${Date.now()}`;
    }

    // Check passed options first
    if (options?.[optName] !== undefined) {
      return isBool && typeof options[optName] === 'string' ? options[optName] === 'true' : options[optName];
    }

    // Check environment variables
    if (process.env[envVar] !== undefined) {
      return isBool && typeof process.env[envVar] === 'string' ? process.env[envVar] === 'true' : process.env[envVar];
    }

    // Return default
    return DEFAULT_CONFIG[optName];
  };

  // Directories
  const libDir = __dirname;
  const nodeModulesDir = path.join(__dirname, '..', 'node_modules');
  const buildDir = path.join(__dirname, '..', 'dist');
  const srcDir = path.join(__dirname, '..', 'src');

  // Get core options
  const reportName = getOption('reportName');
  const reportDir = getOption('reportDir');

  // Build and return complete config
  return {
    // Base
    libDir,
    nodeModulesDir,

    // Report settings
    reportDir,
    reportName,
    reportTitle: getOption('reportTitle'),
    reportPageTitle: getOption('reportPageTitle'),
    inlineAssets: getOption('inlineAssets', true),
    autoOpen: getOption('autoOpen', true),
    jsonReport: getOption('jsonReport', true),

    // Build directories
    buildDir,
    buildFontsDir: path.join(buildDir, 'fonts'),
    buildCssDir: path.join(buildDir, 'css'),
    buildJsDir: path.join(buildDir, 'js'),

    // Source directories
    srcDir,
    srcFontsDir: path.join(srcDir, 'fonts'),
    srcLessDir: path.join(srcDir, 'less'),
    srcJsDir: path.join(srcDir, 'js'),
    srcHbsDir: path.join(srcDir, 'templates'),

    // Bootstrap directories
    bsDir: path.join(nodeModulesDir, 'bootstrap'),
    bsFontsDir: path.join(nodeModulesDir, 'bootstrap', 'fonts'),
    bsLessDir: path.join(nodeModulesDir, 'bootstrap', 'less'),

    // Report subdirectories
    reportJsDir: path.join(reportDir, 'js'),
    reportFontsDir: path.join(reportDir, 'fonts'),
    reportCssDir: path.join(reportDir, 'css'),
    reportScreenshotDir: path.join(reportDir, 'screenshots'),

    // Screenshot options
    clearOldScreenshots: getOption('clearOldScreenshots', true),
    passedScreenshot: getOption('takePassedScreenshot', true),
    shortScrFileNames: getOption('shortScrFileNames', true),
    framework: getOption('framework'),
    screenshotMaxFileLenght: 254 - path.resolve(reportDir, 'screenshots').length,

    // Report options
    multiReport: getOption('multiReport', true),
    reportJsonFile: path.join(reportDir, `${reportName}.json`),
    reportHtmlFile: path.join(reportDir, `${reportName}.html`),

    // Client files
    clientJsFiles: [path.join(srcDir, 'js', 'mochawesome.js')],
    vendorJsFiles: [
      path.join(nodeModulesDir, 'jquery', 'dist', 'jquery.js'),
      path.join(nodeModulesDir, 'bootstrap', 'js', 'transition.js'),
      path.join(nodeModulesDir, 'bootstrap', 'js', 'collapse.js'),
      path.join(srcDir, 'js', 'lodash.custom.js'),
      path.join(nodeModulesDir, 'chart.js', 'Chart.js')
    ]
  };
}

module.exports = createConfig;
