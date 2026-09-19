/**
 * Mochawesome Screenshots - Modern Mocha Reporter
 */

import Mocha from 'mocha';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import pc from 'picocolors';
import hljs from 'highlight.js';
import { createConfig } from './config.js';
import { clearScreenshots, generateReport, saveScreenshotToFile, saveToFile } from './reportGenerator.js';
import { openBrowser } from './openBrowser.js';
import { stringifySafe } from './utils.js';
import { mochawesome as reportTemplate } from '../generated/templates.js';
import type {
  AugmentedSuite,
  AugmentedTest,
  CleanTest,
  MochawesomeConfig,
  ProcessedError,
  ReportObject,
  ReportStats,
  ReporterOptions
} from './types.js';

// Configure highlight.js
hljs.configure({ languages: ['javascript'] });

interface TestLists {
  allTests: AugmentedTest[];
  allHooks: AugmentedTest[];
  allPending: AugmentedTest[];
  allPasses: AugmentedTest[];
  allFailures: AugmentedTest[];
}

/**
 * Modern Mochawesome Reporter
 */
export default class Mochawesome extends Mocha.reporters.Base {
  static KEEP_PROPS = new Set([
    'title', 'fullFile', 'file', 'tests', 'suites',
    'passes', 'failures', 'pending', 'skipped',
    'hasTests', 'hasSuites', 'totalTests', 'totalPasses',
    'totalFailures', 'totalPending', 'totalSkipped',
    'hasPasses', 'hasFailures', 'hasPending', 'hasSkipped',
    'root', 'uuid', 'duration', 'rootEmpty', '_timeout'
  ]);

  config: MochawesomeConfig;
  totalTestsRegistered = 0;
  endCalled = false;
  screenshotPromises: Promise<unknown>[] = [];

  constructor(runner: Mocha.Runner, options?: Mocha.MochaOptions) {
    super(runner);
    this.config = createConfig((options?.reporterOptions as ReporterOptions | undefined) ?? {});

    // Spec reporter is instantiated purely for its console-output side effects.
    new Mocha.reporters.Spec(runner);

    if (this.config.clearOldScreenshots) {
      clearScreenshots(this.config);
    }
    // Schedule report structure generation to occur after constructor completes
    process.nextTick(() => {
      void generateReport(this.config);
    });

    this.#setupEventHandlers(runner);
  }

  #setupEventHandlers(runner: Mocha.Runner): void {
    const lists: TestLists = {
      allTests: [],
      allHooks: [],
      allPending: [],
      allPasses: [],
      allFailures: []
    };

    const generateScrFileName = (test: Mocha.Test): void => {
      const augmented = test as AugmentedTest;
      const timestamp = Date.now();
      if (this.config.shortScrFileNames) {
        augmented.scrFileName = `${timestamp}.png`;
      } else {
        const title = augmented
          .fullTitle()
          .replaceAll(/[^\w]/g, '_')
          .replaceAll(/_+/g, '_')
          .toLowerCase()
          .slice(0, this.config.screenshotMaxFileLength);
        augmented.scrFileName = `${timestamp}_${title}.png`;
      }
    };

    const handleScreenshot = (test: AugmentedTest): void => {
      generateScrFileName(test);
      const scrPromise = saveScreenshotToFile(
        path.join(this.config.reportScreenshotDir, test.scrFileName ?? '')
      );
      if (scrPromise) {
        this.screenshotPromises.push(scrPromise);
      }
    };

    runner.on('test end', (test) => lists.allTests.push(test as AugmentedTest));
    runner.on('hook end', (test) => lists.allHooks.push(test as unknown as AugmentedTest));
    runner.on('pending', (test) => lists.allPending.push(test as AugmentedTest));

    runner.on('pass', (test) => {
      const augmented = test as AugmentedTest;
      lists.allPasses.push(augmented);
      if (this.config.passedScreenshot) {
        handleScreenshot(augmented);
      }
    });

    runner.on('fail', (test) => {
      // The runner emits both Test and Hook objects on failure.
      const augmented = test as unknown as AugmentedTest;
      const testType = (test as unknown as { type?: string }).type;
      if (testType === 'hook') {
        const ctx = (augmented as unknown as { ctx?: { currentTest?: Mocha.Test } }).ctx;
        const parent = (ctx?.currentTest?.parent ?? augmented.parent) as AugmentedSuite | undefined;
        if (parent) {
          parent.failedHook = augmented;
        }
      }
      lists.allFailures.push(augmented);
      handleScreenshot(augmented);
    });

    runner.on('end', () => {
      void Promise.all(this.screenshotPromises)
        .catch((error: unknown) => {
          console.error('Error waiting for screenshots:', error);
        })
        .then(() => {
          setTimeout(() => {
            void this.#handleReportEnd(lists);
          }, this.config.screenshotDelay);
        });
    });
  }

  async #handleReportEnd(lists: TestLists): Promise<void> {
    if (this.endCalled) return;
    this.endCalled = true;

    const allSuites = this.runner.suite as AugmentedSuite;
    this.#traverseSuites(allSuites);

    const reportObj: ReportObject = {
      reportTitle: this.config.reportTitle ?? path.basename(process.cwd()),
      reportPageTitle: this.config.reportPageTitle ?? 'Mochawesome Report Card',
      inlineAssets: this.config.inlineAssets,
      stats: this.stats as ReportStats,
      suites: allSuites,
      allTests: lists.allTests.map(Mochawesome.#cleanTest),
      allPending: lists.allPending.map(Mochawesome.#cleanTest),
      allPasses: lists.allPasses.map(Mochawesome.#cleanTest),
      allFailures: lists.allFailures.map(Mochawesome.#cleanTest),
      copyrightYear: new Date().getFullYear(),
      passedScr: this.config.passedScreenshot
    };

    this.#calculateStatistics(reportObj);

    this.#checkReportNameChange([...lists.allTests, ...lists.allHooks]);

    const htmlContent = reportTemplate(reportObj);
    await saveToFile(htmlContent, this.config.reportHtmlFile);
    console.log(`\n[${pc.gray('mochawesome')}] Report saved to ${this.config.reportHtmlFile}\n`);

    if (this.config.autoOpen) {
      openBrowser(this.config.reportHtmlFile);
    }

    if (this.config.jsonReport) {
      await saveToFile(stringifySafe(reportObj, 2), this.config.reportJsonFile);
    }
  }

  #calculateStatistics(obj: ReportObject): void {
    const stats = obj.stats;
    stats.testsRegistered = this.totalTestsRegistered;

    const passes = Number(stats.passes) || 0;
    const failures = Number(stats.failures) || 0;
    const pending = Number(stats.pending) || 0;
    const tests = Number(stats.tests) || 0;
    const testsRegistered = this.totalTestsRegistered;

    const passPercentage = Math.max(0, testsRegistered - pending) > 0
      ? Math.round((passes / (testsRegistered - pending)) * 1000) / 10
      : 0;

    const pendingPercentage = testsRegistered > 0
      ? Math.round((pending / testsRegistered) * 1000) / 10
      : 0;

    const other = passes + failures + pending - tests;
    const adjustedFailures = failures - Math.max(0, other);

    Object.assign(stats, {
      passes,
      failures: adjustedFailures,
      pending,
      tests,
      testsRegistered,
      passPercent: passPercentage,
      pendingPercent: pendingPercentage,
      other: Math.max(0, other),
      hasOther: other > 0,
      skipped: testsRegistered - tests,
      hasSkipped: testsRegistered - tests > 0,
      passPercentClass: this.#getPercentClass(passPercentage),
      pendingPercentClass: this.#getPercentClass(pendingPercentage)
    });
  }

  #traverseSuites(suite: AugmentedSuite): void {
    const queue = [suite];

    while (queue.length > 0) {
      const current = queue.shift() as AugmentedSuite;
      if (current.root) this.#cleanSuite(current);

      if (current.suites.length) {
        for (const childSuite of current.suites) {
          const augmented = childSuite as AugmentedSuite;
          this.#cleanSuite(augmented);
          queue.push(augmented);
        }
      }
    }
  }

  #cleanSuite(suite: AugmentedSuite): void {
    suite.uuid = randomUUID();

    const cleanTests = (suite.tests as AugmentedTest[]).map(Mochawesome.#cleanTest);
    const passingTests = cleanTests.filter((test) => test.state === 'passed');
    const failingTests = cleanTests.filter((test) => test.state === 'failed');
    const pendingTests = cleanTests.filter((test) => test.pending === true);
    const skippedTests = cleanTests.filter((test) => test.skipped === true);

    const duration = cleanTests.reduce((sum, test) => sum + (test.duration ?? 0), 0);
    const testCount = suite.tests?.length ?? 0;
    this.totalTestsRegistered += testCount;

    Object.assign(suite, {
      tests: cleanTests,
      fullFile: suite.file ?? '',
      file: suite.file ? suite.file.replaceAll(process.cwd(), '') : '',
      passes: passingTests,
      failures: failingTests,
      pending: pendingTests,
      skipped: skippedTests,
      hasTests: cleanTests.length > 0,
      hasSuites: suite.suites.length > 0,
      totalTests: cleanTests.length,
      totalPasses: passingTests.length,
      totalFailures: failingTests.length,
      totalPending: pendingTests.length,
      totalSkipped: skippedTests.length,
      hasPasses: passingTests.length > 0,
      hasFailures: failingTests.length > 0,
      hasPending: pendingTests.length > 0,
      hasSkipped: skippedTests.length > 0,
      duration
    });

    if (suite.root) suite.rootEmpty = suite.totalTests === 0;
    if (suite.failedHook) {
      const suiteTests = suite.tests as unknown as CleanTest[];
      suiteTests.unshift(Mochawesome.#cleanTest(suite.failedHook));
    }

    const mutable = suite as unknown as Record<string, unknown>;
    for (const key of Object.keys(mutable)) {
      if (!Mochawesome.KEEP_PROPS.has(key)) delete mutable[key];
    }
  }

  static #cleanTest(test: AugmentedTest): CleanTest {
    const err = test.err ? Mochawesome.#processError(test.err as Error & Record<string, unknown>) : null;
    const scr = Mochawesome.#buildScreenshotHTML(test);

    const cleaned: CleanTest = {
      title: test.title,
      fullTitle: test.fullTitle(),
      timedOut: test.timedOut,
      duration: test.duration ?? 0,
      state: test.state,
      speed: Mochawesome.#calculateSpeed(test.duration),
      pass: test.state === 'passed',
      fail: test.state === 'failed',
      pending: test.pending,
      isRoot: test.parent?.root ?? false,
      uuid: randomUUID(),
      parentUUID: (test.parent as unknown as { uuid?: string } | undefined)?.uuid,
      skipped: false
    };

    if (test.state !== undefined) {
      const code = test.fn ? test.fn.toString() : test.body;
      if (code?.trim() && !code.includes('[native code]')) {
        cleaned.code = Mochawesome.#cleanAndHighlightCode(code);
      }
    }

    if (err) {
      cleaned.err = err;
    }

    cleaned.skipped = !cleaned.pass && !cleaned.fail && !cleaned.pending;
    if (test.logr) cleaned.logr = test.logr;
    if (scr) cleaned.scr = scr;

    return cleaned;
  }

  static #processError(err: Error & Record<string, unknown>): ProcessedError | null {
    const processedErr: ProcessedError = {};
    const propsToCopy = ['name', 'message', 'expected', 'actual', 'stack', 'scr'] as const;

    for (const prop of propsToCopy) {
      if (Object.hasOwn(err, prop)) {
        (processedErr as Record<string, unknown>)[prop] = err[prop];
      }
    }

    if (processedErr.stack) {
      processedErr.stack = hljs.highlightAuto(processedErr.stack).value;
    }

    return Object.keys(processedErr).length > 0 ? processedErr : null;
  }

  static #buildScreenshotHTML(test: AugmentedTest): string | undefined {
    const screenshotPath = 'screenshots/';
    let scrHTML = '';

    if (test.customScrFileName && test.customScrFileName.length > 0) {
      scrHTML = test.customScrFileName
        .filter((entry) => entry?.[0])
        .map(([fileName, msg]) => {
          const msgHtml = msg ? `<p class="scr-msg">${Mochawesome.#escapeHtml(msg)}</p>` : '';
          return `${msgHtml}<img src="${screenshotPath}${Mochawesome.#escapeHtml(fileName)}">`;
        })
        .join('');
    }

    if (!scrHTML && test.scrFileName) {
      scrHTML = `<img src="${screenshotPath}${Mochawesome.#escapeHtml(test.scrFileName)}">`;
    }

    return scrHTML || undefined;
  }

  static #escapeHtml(str: unknown): string {
    if (typeof str !== 'string') return '';
    return str
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  static #calculateSpeed(duration: number | undefined): 'slow' | 'medium' | 'fast' | undefined {
    if (duration === undefined || duration === null) return undefined;
    if (duration > 2000) return 'slow';
    if (duration > 500) return 'medium';
    return 'fast';
  }

  static #cleanAndHighlightCode(str: string): string {
    let cleaned = str
      .replaceAll(/\r\n?|\n|\u2028|\u2029/g, '\n')
      .replace(/^\uFEFF/, '')
      .replace(/^(async\s+)?function\s*\(.*\)\s*{/, '')
      .replace(/\s+\}$/, '');

    const spacesMatch = cleaned.match(/^\n?( *)/);
    const tabsMatch = cleaned.match(/^\n?(\t*)/);
    const spaces = spacesMatch?.[1]?.length ?? 0;
    const tabs = tabsMatch?.[1]?.length ?? 0;
    const indentLength = tabs || spaces;
    const indentChar = tabs ? '\t' : ' ';
    const re = new RegExp(String.raw`^\n?${indentChar}{${indentLength}}`, 'gm');

    cleaned = cleaned.replace(re, '').trim();
    return hljs.highlightAuto(cleaned).value;
  }

  #getPercentClass(pct: number): string {
    if (pct <= 50) return 'danger';
    if (pct < 80) return 'warning';
    return 'success';
  }

  #checkReportNameChange(tests: AugmentedTest[]): void {
    for (const test of tests) {
      if (test.reportName) {
        this.config.reportJsonFile = path.join(this.config.reportDir, `${test.reportName}.json`);
        this.config.reportHtmlFile = path.join(this.config.reportDir, `${test.reportName}.html`);
      }
    }
  }
}
