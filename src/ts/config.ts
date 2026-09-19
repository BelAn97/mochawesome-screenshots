/**
 * Configuration Module
 */

import path from 'node:path';
import type { MochawesomeConfig, ReporterOptions } from './types.js';

const DEFAULT_CONFIG = {
  splitChar: process.platform === 'win32' ? '\\' : '/',
  reportDir: path.join('.', 'mochawesome-reports'),
  reportName: 'mochawesome'
};

/**
 * Create merged configuration from defaults, env vars, and options
 */
export function createConfig(options: ReporterOptions = {}): MochawesomeConfig {
  // The compiled module lives in <package>/dist/{cjs,esm}; package root is two levels up.
  const packageRoot = path.resolve(__dirname, '..', '..');
  const buildDir = path.join(packageRoot, 'dist');

  const reportDir = getOption('reportDir', options) as string;
  let reportName = getOption('reportName', options) as string;
  const multiReport = getOption('multiReport', options, true) as boolean | undefined;

  if (multiReport) {
    reportName += `_${Date.now()}`;
  }

  return {
    buildDir,
    buildFontsDir: path.join(buildDir, 'fonts'),
    buildCssDir: path.join(buildDir, 'css'),
    buildJsDir: path.join(buildDir, 'js'),
    reportDir,
    reportName,
    reportTitle: getOption('reportTitle', options) as string | undefined,
    reportPageTitle: getOption('reportPageTitle', options) as string | undefined,
    inlineAssets: getOption('inlineAssets', options, true) as boolean | undefined,
    autoOpen: getOption('autoOpen', options, true) as boolean | undefined,
    jsonReport: getOption('jsonReport', options, true) as boolean | undefined,
    reportJsDir: path.join(reportDir, 'js'),
    reportFontsDir: path.join(reportDir, 'fonts'),
    reportCssDir: path.join(reportDir, 'css'),
    reportScreenshotDir: path.join(reportDir, 'screenshots'),
    clearOldScreenshots: getOption('clearOldScreenshots', options, true) as boolean | undefined,
    passedScreenshot: getOption('takePassedScreenshot', options, true) as boolean | undefined,
    shortScrFileNames: getOption('shortScrFileNames', options, true) as boolean | undefined,
    framework: getOption('framework', options) as string | undefined,
    screenshotMaxFileLength: 254 - path.resolve(reportDir, 'screenshots').length,
    screenshotDelay: toNumber(getOption('screenshotDelay', options), 500),
    multiReport,
    splitChar: DEFAULT_CONFIG.splitChar,
    reportJsonFile: path.join(reportDir, `${reportName}.json`),
    reportHtmlFile: path.join(reportDir, `${reportName}.html`)
  };
}

/**
 * Get configuration option with precedence:
 * 1. Config option
 * 2. Environment variable
 * 3. Base config
 */
function getOption(optName: string, options: ReporterOptions, isBool = false): unknown {
  const envVar = `MOCHAWESOME_${optName.toUpperCase()}`;

  if (options?.[optName as keyof ReporterOptions] !== undefined) {
    const value = options[optName as keyof ReporterOptions];
    if (isBool && typeof value === 'string') {
      return value === 'true';
    }
    return value;
  }

  if (process.env[envVar] !== undefined) {
    const value = process.env[envVar] as string;
    if (isBool && typeof value === 'string') {
      return value === 'true';
    }
    return value;
  }

  if (isBool && typeof DEFAULT_CONFIG[optName as keyof typeof DEFAULT_CONFIG] === 'string') {
    const value = DEFAULT_CONFIG[optName as keyof typeof DEFAULT_CONFIG];
    return value === 'true';
  }
  return DEFAULT_CONFIG[optName as keyof typeof DEFAULT_CONFIG];
}

function toNumber(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
