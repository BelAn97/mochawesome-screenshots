/**
 * Report Generator - Modern async/await with fs/promises
 * ES2022+ syntax, optimized file operations
 */

/* global page, browser, cy */
'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Generate report structure and copy assets
 */
async function generateReport(config) {
  console.log(`[${chalk.gray('mochawesome')}] Generating report files...\n`);

  try {
    // Always create directories
    await createDirs(config, config.inlineAssets);

    // Always copy JS files (needed for Bootstrap collapse and interactivity)
    await copyFiles(config.buildJsDir, config.reportJsDir, 'scripts');

    // Copy fonts and CSS only if not inlining
    if (!config.inlineAssets) {
      await Promise.allSettled([
        copyFiles(config.buildFontsDir, config.reportFontsDir, 'fonts'),
        copyFiles(config.buildCssDir, config.reportCssDir, 'CSS')
      ]);
    }

  } catch (error) {
    console.error(`\n[${chalk.gray('mochawesome')}] Error generating report: ${error.message}\n`);
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

  // Create all directories in parallel using fs-extra
  await Promise.all(dirs.map(dir => fs.ensureDir(dir)));
}

/**
 * Copy files from source to destination directory
 */
async function copyFiles(srcDir, destDir, label) {
  try {
    await fs.copy(srcDir, destDir, { overwrite: true });
  } catch (error) {
    console.warn(`\n[${chalk.gray('mochawesome')}] Warning: Unable to copy ${label}: ${error.message}\n`);
  }
}

/**
 * Save data to file
 */
async function saveToFile(data, outFile) {
  try {
    await fs.outputFile(outFile, data, 'utf8');
    return outFile;
  } catch (error) {
    console.error(`\n[${chalk.gray('mochawesome')}] Error: Unable to save ${outFile}\n${error.message}\n`);
    throw error;
  }
}

/**
 * Clear screenshots directory
 */
function clearScreenshots(config) {
  try {
    fs.emptyDirSync(config.reportScreenshotDir);
    console.log('Clear old screenshots: Success!');
  } catch (error) {
    console.warn(`\n[${chalk.gray('mochawesome')}] Warning: Unable to clear old screenshots: ${error.message}\n`);
  }
}

/**
 * Save screenshot to file (framework-specific)
 * Returns a promise that resolves when screenshot is saved
 */
function saveScreenshotToFile(outFile, config) {
  try {
    // Try Playwright (global.page)
    if (global.page && typeof global.page.screenshot === 'function') {
      return global.page.screenshot({ path: outFile, fullPage: false })
        .then(() => {
          console.log(`  Screenshot saved: ${outFile}`);
        })
        .catch((error) => {
          console.warn(`\n[${chalk.gray('mochawesome')}] Warning: Unable to save screenshot: ${error.message}\n`);
        });
    }

    // Try Puppeteer (global.page)
    if (global.page && typeof global.page.screenshot === 'function') {
      return global.page.screenshot({ path: outFile })
        .then(() => {
          console.log(`  Screenshot saved: ${outFile}`);
        })
        .catch((error) => {
          console.warn(`\n[${chalk.gray('mochawesome')}] Warning: Unable to save screenshot: ${error.message}\n`);
        });
    }

    // Try WebdriverIO
    if (typeof global.browser !== 'undefined' && global.browser.saveScreenshot) {
      global.browser.saveScreenshot(outFile);
      return Promise.resolve();
    }

    // Try Cypress
    if (typeof cy !== 'undefined') {
      return new Promise((resolve) => {
        cy.screenshot(outFile.split('/').pop(), {
          onAfterScreenshot: ($el, props) => {
            fs.copyFile(props.path, outFile);
            resolve();
          }
        });
      });
    }

    // Try Protractor
    if (typeof global.browser !== 'undefined' && global.browser.takeScreenshot) {
      const file = require('path').resolve(outFile);
      return global.browser.takeScreenshot().then((png) => {
        fs.writeFileSync(file, png, { encoding: 'base64' });
        console.log(`  Screenshot saved: ${outFile}`);
      }).catch((error) => {
        console.warn(`\n[${chalk.gray('mochawesome')}] Warning: Unable to save screenshot: ${error.message}\n`);
      });
    }

    // No supported framework found
    console.warn(`\n[${chalk.gray('mochawesome')}] Warning: No supported browser framework found for screenshots\n`);
    return Promise.resolve();
  } catch (error) {
    console.warn(`\n[${chalk.gray('mochawesome')}] Warning: Unable to save screenshot: ${error.message}\n`);
    return Promise.resolve();
  }
}

// Export functions
module.exports = {
  generateReport,
  saveToFile,
  saveScreenshotToFile,
  clearScreenshots
};
