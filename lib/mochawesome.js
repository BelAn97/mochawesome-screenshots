/**
 * Mochawesome Screenshots - Modern Mocha Reporter
 */

'use strict';

const mocha = require('mocha');
const { filter, map, each } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const chalk = require('chalk');
const hljs = require('highlight.js');
const reportGen = require('./reportGenerator');
const stringify = require('json-stringify-safe');
const createConfig = require('./config');
const opener = require('opener');
const path = require('node:path');

// Load compiled templates
const templates = (() => {
  try {
    return require('./templates');
  } catch {
    return {};
  }
})();

const { Base } = mocha.reporters;
const { generateReport, saveToFile, saveScreenshotToFile, clearScreenshots } = reportGen;

// Configure highlight.js
hljs.configure({ languages: ['javascript'] });

/**
 * Modern Mochawesome Reporter
 */
class Mochawesome {
  static KEEP_PROPS = new Set([
    'title', 'fullFile', 'file', 'tests', 'suites',
    'passes', 'failures', 'pending', 'skipped',
    'hasTests', 'hasSuites', 'totalTests', 'totalPasses',
    'totalFailures', 'totalPending', 'totalSkipped',
    'hasPasses', 'hasFailures', 'hasPending', 'hasSkipped',
    'root', 'uuid', 'duration', 'rootEmpty', '_timeout'
  ]);

  totalTestsRegistered = 0;
  endCalled = false;
  screenshotPromises = [];

  constructor(runner, options) {
    this.config = createConfig(options?.reporterOptions || {});
    this.runner = runner;

    if (this.config.clearOldScreenshots) {
      clearScreenshots(this.config);
    }
    // Schedule report generation to occur after constructor completes
    process.nextTick(() => {
      generateReport(this.config);
    });

    Base.call(this, runner);
    // Spec reporter is instantiated for its side effects (event registration)
    this.specReporter = new mocha.reporters.Spec(runner);

    this.#setupEventHandlers(runner);
  }

  #setupEventHandlers(runner) {
    const allTests = [];
    const allHooks = [];
    const allPending = [];
    const allPasses = [];
    const allFailures = [];

    const generateScrFileName = (test) => {
      const timestamp = Date.now();
      if (this.config.shortScrFileNames) {
        test.scrFileName = `${timestamp}.png`;
      } else {
        const title = test.fullTitle()
          .replaceAll(/[^\w]/g, '_')
          .replaceAll(/_+/g, '_')
          .toLowerCase()
          .substring(0, this.config.screenshotMaxFileLenght);
        test.scrFileName = `${timestamp}_${title}.png`;
      }
    };

    const handleScreenshot = (test) => {
      const scrPromise = saveScreenshotToFile(
        path.join(this.config.reportScreenshotDir, test.scrFileName),
        this.config
      );
      if (scrPromise) {
        this.screenshotPromises.push(scrPromise);
      }
    };

    runner.on('test', generateScrFileName);
    runner.on('hook', generateScrFileName);
    runner.on('test end', (test) => allTests.push(test));
    runner.on('hook end', (test) => allHooks.push(test));
    runner.on('pending', (test) => allPending.push(test));

    runner.on('pass', (test) => {
      allPasses.push(test);
      if (this.config.passedScreenshot) {
        handleScreenshot(test);
      }
    });

    runner.on('fail', (test) => {
      if (test.type === 'hook') {
        const parent = test.ctx?.currentTest?.parent ?? test.parent;
        if (parent) {
          parent.failedHook = test;
        }
      }
      allFailures.push(test);
      handleScreenshot(test);
    });

    runner.on('end', () => {
      Promise.all(this.screenshotPromises)
        .then(() => {
          setTimeout(() => {
            this.#handleReportEnd({ allTests, allHooks, allPending, allPasses, allFailures });
          }, 500);
        })
        .catch((error) => {
          console.error('Error waiting for screenshots:', error);
          setTimeout(() => {
            this.#handleReportEnd({ allTests, allHooks, allPending, allPasses, allFailures });
          }, 500);
        });
    });
  }

  async #handleReportEnd({ allTests, allHooks, allPending, allPasses, allFailures }) {
    if (this.endCalled) return;
    this.endCalled = true;

    const allSuites = this.runner.suite;
    this.#traverseSuites(allSuites);

    const reportObj = {
      reportTitle: this.config.reportTitle ?? process.cwd().split(this.config.splitChar).pop(),
      reportPageTitle: this.config.reportPageTitle ?? 'Mochawesome Report Card',
      inlineAssets: this.config.inlineAssets,
      stats: this.stats,
      suites: allSuites,
      allTests: map(allTests, Mochawesome.#cleanTest),
      allPending: map(allPending, Mochawesome.#cleanTest),
      allPasses: map(allPasses, Mochawesome.#cleanTest),
      allFailures: map(allFailures, Mochawesome.#cleanTest),
      copyrightYear: new Date().getFullYear(),
      passedScr: this.config.passedScreenshot
    };

    this.#calculateStatistics(reportObj);

    if (!templates.mochawesome) {
      console.error('Mochawesome was unable to load the template.');
      return;
    }

    this.#checkReportNameChange(this.config, [...allTests, ...allHooks]);

    const htmlContent = templates.mochawesome(reportObj);
    await saveToFile(htmlContent, this.config.reportHtmlFile);
    console.log(`\n[${chalk.gray('mochawesome')}] Report saved to ${this.config.reportHtmlFile}\n`);

    if (this.config.autoOpen) {
      opener(this.config.reportHtmlFile);
    }

    if (this.config.jsonReport) {
      await saveToFile(stringify(reportObj, null, 2), this.config.reportJsonFile);
    }
  }

  #calculateStatistics(obj) {
    obj.stats.testsRegistered = this.totalTestsRegistered;

    const passes = Number(obj.stats.passes) || 0;
    const failures = Number(obj.stats.failures) || 0;
    const pending = Number(obj.stats.pending) || 0;
    const tests = Number(obj.stats.tests) || 0;
    const testsRegistered = this.totalTestsRegistered;

    const passPercentage = Math.max(0, testsRegistered - pending) > 0
      ? Math.round((passes / (testsRegistered - pending)) * 1000) / 10
      : 0;

    const pendingPercentage = testsRegistered > 0
      ? Math.round((pending / testsRegistered) * 1000) / 10
      : 0;

    const other = (passes + failures + pending) - tests;
    const adjustedFailures = failures - Math.max(0, other);

    Object.assign(obj.stats, {
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

  #traverseSuites(suite) {
    const queue = [suite];

    while (queue.length > 0) {
      const current = queue.shift();
      if (current.root) this.#cleanSuite(current);

      if (current.suites.length) {
        each(current.suites, (childSuite) => {
          this.#cleanSuite(childSuite);
          queue.push(childSuite);
        });
      }
    }
  }

  #cleanSuite(suite) {
    suite.uuid = uuidv4();

    const cleanTests = map(suite.tests, Mochawesome.#cleanTest);
    const passingTests = filter(cleanTests, { state: 'passed' });
    const failingTests = filter(cleanTests, { state: 'failed' });
    const pendingTests = filter(cleanTests, { pending: true });
    const skippedTests = filter(cleanTests, { skipped: true });

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
    if (suite.failedHook) suite.tests.unshift(Mochawesome.#cleanTest(suite.failedHook));

    for (const key of Object.keys(suite)) {
      if (!Mochawesome.KEEP_PROPS.has(key)) delete suite[key];
    }
  }

  static #cleanTest(test) {
    const err = test.err ? Mochawesome.#processError(test.err) : null;
    const scr = Mochawesome.#buildScreenshotHTML(test);

    const cleaned = {
      title: test.title,
      fullTitle: test.fullTitle(),
      timedOut: test.timedOut,
      duration: test.duration ?? 0,
      state: test.state,
      speed: Mochawesome.#calculateSpeed(test.duration),
      pass: test.state === 'passed',
      fail: test.state === 'failed',
      pending: test.pending,
      isRoot: test.parent.root,
      uuid: uuidv4(),
      parentUUID: test.parent.uuid
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

  static #processError(err) {
    const processedErr = {};
    const propsToCopy = ['name', 'message', 'expected', 'actual', 'stack', 'scr'];

    for (const prop of propsToCopy) {
      if (Object.hasOwn(err, prop)) {
        processedErr[prop] = err[prop];
      }
    }

    if (processedErr.stack) {
      processedErr.stack = hljs.highlightAuto(processedErr.stack).value;
    }

    return Object.keys(processedErr).length > 0 ? processedErr : null;
  }

  static #buildScreenshotHTML(test) {
    const screenshotPath = 'screenshots/';
    let scrHTML = '';

    if (test.customScrFileName?.length > 0) {
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

  static #escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  static #calculateSpeed(duration) {
    if (duration === undefined || duration === null) return undefined;
    if (duration > 2000) return 'slow';
    if (duration > 500) return 'medium';
    return 'fast';
  }

  static #cleanAndHighlightCode(str) {
    let cleaned = str
      .replaceAll(/\r\n?|\n|\u2028|\u2029/g, '\n')
      .replaceAll(/^\uFEFF/, '')
      .replaceAll(/^(async\s+)?function\s*\(.*\)\s*{/, '')
      .replaceAll(/\s+\}$/, '');

    const spacesMatch = cleaned.match(/^\n?( *)/);
    const tabsMatch = cleaned.match(/^\n?(\t*)/);
    const spaces = spacesMatch?.[1].length ?? 0;
    const tabs = tabsMatch?.[1].length ?? 0;
    const indentLength = tabs || spaces;
    const indentChar = tabs ? '\t' : ' ';
    const re = new RegExp(String.raw`^\n?${indentChar}{${indentLength}}`, 'gm');

    cleaned = cleaned.replace(re, '').trim();
    return hljs.highlightAuto(cleaned).value;
  }

  #getPercentClass(pct) {
    if (pct <= 50) return 'danger';
    if (pct < 80) return 'warning';
    return 'success';
  }

  #checkReportNameChange(config, tests) {
    for (const test of tests) {
      if (test.reportName) {
        config.reportJsonFile = path.join(config.reportDir, `${test.reportName}.json`);
        config.reportHtmlFile = path.join(config.reportDir, `${test.reportName}.html`);
      }
    }
  }
}

module.exports = Mochawesome;
