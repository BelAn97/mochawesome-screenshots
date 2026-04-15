/**
 * Configuration Module - Modern ES6+ with clean syntax
 */

'use strict';

const path = require('node:path');

const DEFAULT_CONFIG = {
  splitChar: process.platform === 'win32' ? '\\' : '/',
  reportDir: path.join('.', 'mochawesome-reports'),
  reportName: 'mochawesome'
};

/**
 * Create merged configuration from defaults, env vars, and options
 */
function createConfig(options = {}) {
  const libDir = __dirname;
  const nodeModulesDir = path.join(__dirname, '..', 'node_modules');
  const buildDir = path.join(__dirname, '..', 'dist');
  const srcDir = path.join(__dirname, '..', 'src');
  const srcJsDir = path.join(srcDir, 'js');

  const reportName = getOption('reportName', options);
  const reportDir = getOption('reportDir', options);

  return {
    libDir,
    nodeModulesDir,
    reportDir,
    reportName,
    reportTitle: getOption('reportTitle', options),
    reportPageTitle: getOption('reportPageTitle', options),
    inlineAssets: getOption('inlineAssets', options, true),
    autoOpen: getOption('autoOpen', options, true),
    jsonReport: getOption('jsonReport', options, true),
    buildDir,
    buildFontsDir: path.join(buildDir, 'fonts'),
    buildCssDir: path.join(buildDir, 'css'),
    buildJsDir: path.join(buildDir, 'js'),
    srcDir,
    srcFontsDir: path.join(srcDir, 'fonts'),
    srcLessDir: path.join(srcDir, 'less'),
    srcJsDir: path.join(srcDir, 'js'),
    srcHbsDir: path.join(srcDir, 'templates'),
    bsDir: path.join(nodeModulesDir, 'bootstrap'),
    bsFontsDir: path.join(nodeModulesDir, 'bootstrap', 'fonts'),
    bsLessDir: path.join(nodeModulesDir, 'bootstrap', 'less'),
    reportJsDir: path.join(reportDir, 'js'),
    reportFontsDir: path.join(reportDir, 'fonts'),
    reportCssDir: path.join(reportDir, 'css'),
    reportScreenshotDir: path.join(reportDir, 'screenshots'),
    clearOldScreenshots: getOption('clearOldScreenshots', options, true),
    passedScreenshot: getOption('takePassedScreenshot', options, true),
    shortScrFileNames: getOption('shortScrFileNames', options, true),
    framework: getOption('framework', options),
    screenshotMaxFileLenght: 254 - path.resolve(reportDir, 'screenshots').length,
    multiReport: getOption('multiReport', options, true),
    reportJsonFile: path.join(reportDir, `${reportName}.json`),
    reportHtmlFile: path.join(reportDir, `${reportName}.html`),
    clientJsFiles: [path.join(srcJsDir, 'mochawesome.js')],
    vendorJsFiles: [
      path.join(nodeModulesDir, 'jquery', 'dist', 'jquery.js'),
      path.join(nodeModulesDir, 'bootstrap', 'js', 'transition.js'),
      path.join(nodeModulesDir, 'bootstrap', 'js', 'collapse.js'),
      path.join(srcJsDir, 'lodash.custom.js'),
      path.join(nodeModulesDir, 'chart.js', 'Chart.js')
    ]
  };
}

/**
 * Get configuration option with precedence:
 * 1. Config option
 * 2. Environment variable
 * 3. Base config
 */
function getOption(optName, options, isBool = false) {
  const envVar = `MOCHAWESOME_${optName.toUpperCase()}`;

  if (optName === 'multiReport' && options?.[optName] === true) {
    options.reportName += `_${Date.now()}`;
  }

  if (options?.[optName] !== undefined) {
    if (isBool && typeof options[optName] === 'string') {
      return options[optName] === 'true';
    }
    return options[optName];
  }

  if (process.env[envVar] !== undefined) {
    if (isBool && typeof process.env[envVar] === 'string') {
      return process.env[envVar] === 'true';
    }
    return process.env[envVar];
  }

  if (isBool && typeof DEFAULT_CONFIG[optName] === 'string') {
    return DEFAULT_CONFIG[optName] === 'true';
  }
  return DEFAULT_CONFIG[optName];
}

module.exports = createConfig;
