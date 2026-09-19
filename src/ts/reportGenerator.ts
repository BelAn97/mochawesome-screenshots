/**
 * Report Generator - async/await with node:fs/promises
 */

import { copyFile, cp, mkdir, writeFile } from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import type { MochawesomeConfig } from './types.js';

const LOG_PREFIX = `[${pc.gray('mochawesome')}]`;

/* Framework globals exposed by test runners (Playwright/Puppeteer, WebdriverIO, Cypress). */
interface FrameworkPage {
  screenshot(options: { path: string; fullPage: boolean }): Promise<unknown>;
}
interface FrameworkBrowser {
  saveScreenshot(filePath: string): unknown;
  takeScreenshot(): Promise<string>;
}
interface CypressGlobal {
  screenshot(
    name: string,
    options: { onAfterScreenshot: (element: unknown, props: { path: string }) => void }
  ): void;
}

declare global {
  var page: FrameworkPage | undefined;
  var browser: FrameworkBrowser | undefined;
  var cy: CypressGlobal | undefined;
}

/**
 * Generate report structure and copy assets
 */
export async function generateReport(config: MochawesomeConfig): Promise<void> {
  console.log(`${LOG_PREFIX} Generating report files...\n`);

  try {
    await createDirs(config, config.inlineAssets);

    if (!config.inlineAssets) {
      await Promise.allSettled([
        copyFiles(config.buildJsDir, config.reportJsDir, 'scripts'),
        copyFiles(config.buildFontsDir, config.reportFontsDir, 'fonts'),
        copyFiles(config.buildCssDir, config.reportCssDir, 'CSS')
      ]);
    }
  } catch (error) {
    console.error(`${LOG_PREFIX} Error generating report: ${(error as Error).message}\n`);
  }
}

/**
 * Create necessary directories
 */
async function createDirs(config: MochawesomeConfig, inline?: boolean): Promise<void> {
  const dirs = [config.reportDir, config.reportScreenshotDir];

  if (!inline) {
    dirs.push(config.reportJsDir, config.reportFontsDir, config.reportCssDir);
  }

  await Promise.all(dirs.map((dir) => mkdir(dir, { recursive: true })));
}

/**
 * Copy files from source to destination directory
 */
async function copyFiles(srcDir: string, destDir: string, label: string): Promise<void> {
  try {
    await cp(srcDir, destDir, { recursive: true, force: true });
  } catch (error) {
    console.warn(`${LOG_PREFIX} Warning: Unable to copy ${label}: ${(error as Error).message}\n`);
  }
}

/**
 * Save data to file
 */
export async function saveToFile(data: string, outFile: string): Promise<string> {
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, data, 'utf8');
  return outFile;
}

/**
 * Clear screenshots directory
 */
export function clearScreenshots(config: MochawesomeConfig): void {
  try {
    fsSync.rmSync(config.reportScreenshotDir, { recursive: true, force: true });
    fsSync.mkdirSync(config.reportScreenshotDir, { recursive: true });
    console.log('Clear old screenshots: Success!');
  } catch (error) {
    console.warn(`${LOG_PREFIX} Warning: Unable to clear old screenshots: ${(error as Error).message}\n`);
  }
}

/**
 * Save screenshot to file (framework-specific)
 */
export function saveScreenshotToFile(outFile: string): Promise<unknown> | undefined {
  try {
    const pageInstance = globalThis.page;
    const browserInstance = globalThis.browser;

    if (pageInstance && typeof pageInstance.screenshot === 'function') {
      return pageInstance
        .screenshot({ path: outFile, fullPage: false })
        .then(() => console.log(`  Screenshot saved: ${outFile}`))
        .catch((error: Error) =>
          console.warn(`${LOG_PREFIX} Warning: Unable to save screenshot: ${error.message}\n`)
        );
    }

    if (browserInstance && typeof browserInstance.saveScreenshot === 'function') {
      return Promise.resolve(browserInstance.saveScreenshot(outFile)).then(() =>
        console.log(`  Screenshot saved: ${outFile}`)
      );
    }

    if (globalThis.cy) {
      return new Promise<void>((resolve) => {
        globalThis.cy!.screenshot(path.basename(outFile), {
          onAfterScreenshot: (_element, props) => {
            copyFile(props.path, outFile)
              .then(() => resolve(), () => resolve());
          }
        });
      });
    }

    if (browserInstance && typeof browserInstance.takeScreenshot === 'function') {
      const file = path.resolve(outFile);
      return browserInstance
        .takeScreenshot()
        .then((png: string) => {
          fsSync.writeFileSync(file, png, { encoding: 'base64' });
          console.log(`  Screenshot saved: ${outFile}`);
        })
        .catch((error: Error) =>
          console.warn(`${LOG_PREFIX} Warning: Unable to save screenshot: ${error.message}\n`)
        );
    }

    console.warn(`${LOG_PREFIX} Warning: No supported browser framework found for screenshots\n`);
    return Promise.resolve();
  } catch (error) {
    console.warn(`${LOG_PREFIX} Warning: Unable to save screenshot: ${(error as Error).message}\n`);
    return Promise.resolve();
  }
}
