/**
 * Report Generator - Modern async/await with fs-extra
 */

'use strict';

/* global page, browser, cy */

const fs = require('fs-extra');
const path = require('node:path');
const chalk = require('chalk');

const LOG_PREFIX = `[${chalk.gray('mochawesome')}]`;

/**
 * Generate report structure and copy assets
 */
async function generateReport(config) {
  console.log(`${LOG_PREFIX} Generating report files...\n`);

  try {
    await createDirs(config, config.inlineAssets);
    await copyFiles(config.buildJsDir, config.reportJsDir, 'scripts');

    if (!config.inlineAssets) {
      await Promise.allSettled([
        copyFiles(config.buildFontsDir, config.reportFontsDir, 'fonts'),
        copyFiles(config.buildCssDir, config.reportCssDir, 'CSS')
      ]);
    }
  } catch (error) {
    console.error(`${LOG_PREFIX} Error generating report: ${error.message}\n`);
  }
}

/**
 * Create necessary directories
 */
async function createDirs(config, inline) {
  const dirs = [config.reportDir, config.reportJsDir, config.reportScreenshotDir];

  if (!inline) {
    dirs.push(config.reportFontsDir, config.reportCssDir);
  }

  await Promise.all(dirs.map((dir) => fs.ensureDir(dir)));
}

/**
 * Copy files from source to destination directory
 */
async function copyFiles(srcDir, destDir, label) {
  try {
    await fs.copy(srcDir, destDir, { overwrite: true });
  } catch (error) {
    console.warn(`${LOG_PREFIX} Warning: Unable to copy ${label}: ${error.message}\n`);
  }
}

/**
 * Save data to file
 */
async function saveToFile(data, outFile) {
  await fs.outputFile(outFile, data, 'utf8');
  return outFile;
}

/**
 * Clear screenshots directory
 */
function clearScreenshots(config) {
  try {
    fs.emptyDirSync(config.reportScreenshotDir);
    console.log('Clear old screenshots: Success!');
  } catch (error) {
    console.warn(`${LOG_PREFIX} Warning: Unable to clear old screenshots: ${error.message}\n`);
  }
}

/**
 * Save screenshot to file (framework-specific)
 */
function saveScreenshotToFile(outFile, config) {
  try {
    const pageInstance = globalThis.page;
    const browserInstance = globalThis.browser;

    if (pageInstance && typeof pageInstance.screenshot === 'function') {
      return pageInstance.screenshot({ path: outFile, fullPage: false })
        .then(() => console.log(`  Screenshot saved: ${outFile}`))
        .catch((error) => console.warn(`${LOG_PREFIX} Warning: Unable to save screenshot: ${error.message}\n`));
    }

    if (browserInstance && typeof browserInstance.saveScreenshot === 'function') {
      browserInstance.saveScreenshot(outFile);
      return Promise.resolve();
    }

    if (typeof cy !== 'undefined') {
      return new Promise((resolve) => {
        cy.screenshot(path.basename(outFile), {
          onAfterScreenshot: ($el, props) => {
            fs.copyFile(props.path, outFile);
            resolve();
          }
        });
      });
    }

    if (browserInstance && typeof browserInstance.takeScreenshot === 'function') {
      const file = path.resolve(outFile);
      return browserInstance.takeScreenshot()
        .then((png) => {
          fs.writeFileSync(file, png, { encoding: 'base64' });
          console.log(`  Screenshot saved: ${outFile}`);
        })
        .catch((error) => console.warn(`${LOG_PREFIX} Warning: Unable to save screenshot: ${error.message}\n`));
    }

    console.warn(`${LOG_PREFIX} Warning: No supported browser framework found for screenshots\n`);
    return Promise.resolve();
  } catch (error) {
    console.warn(`${LOG_PREFIX} Warning: Unable to save screenshot: ${error.message}\n`);
    return Promise.resolve();
  }
}

module.exports = {
  generateReport,
  saveToFile,
  saveScreenshotToFile,
  clearScreenshots
};
