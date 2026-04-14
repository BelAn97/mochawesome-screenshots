/**
 * Mochawesome Screenshots - Modern Mocha Reporter
 * ES2022+ syntax, modern practices, optimized code
 * Design & color palette preserved from original
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
const path = require('path');

// Load compiled templates
let templates;
try {
  templates = require('./templates');
} catch (e) {
  templates = {};
}

const { Base } = mocha.reporters;
const { generateReport, saveToFile, saveScreenshotToFile, clearScreenshots } = reportGen;

// Configure highlight.js
hljs.configure({ languages: ['javascript'] });

/**
 * Modern Mochawesome Reporter
 */
class Mochawesome {
  constructor(runner, options) {
    // Initialize state
    this.totalTestsRegistered = 0;
    this.config = createConfig(options?.reporterOptions || {});
    
    // Test duration thresholds (in ms)
    this.thresholds = {
      fast: 500,
      medium: 2000,
      slow: Infinity
    };
    
    this.allSuites = {};
    this.allHooks = [];
    this.allTests = [];
    this.allPending = [];
    this.allPasses = [];
    this.allFailures = [];
    this.endCalled = false;

    // Setup report structure
    if (this.config.clearOldScreenshots) {
      clearScreenshots(this.config);
    }
    generateReport(this.config);

    // Initialize Base reporter (stats, etc)
    Base.call(this, runner);
    this.runner = runner;

    // Show Spec Reporter in console
    new mocha.reporters.Spec(runner);

    // Bind event handlers
    this.#setupEventHandlers(runner);
  }

  #setupEventHandlers(runner) {
    const generateScrFileName = (test) => {
      const timestamp = Date.now();
      if (this.config.shortScrFileNames) {
        test.scrFileName = `${timestamp}.png`;
      } else {
        const title = test.fullTitle()
          .replace(/[^\w_\-]/g, '_')
          .replace(/_+/g, '_')
          .toLowerCase()
          .substring(0, this.config.screenshotMaxFileLenght);
        test.scrFileName = `${timestamp}_${title}.png`;
      }
    };

    // Store screenshot promises and their results
    this.screenshotPromises = [];
    this.screenshotResults = new Map();

    runner.on('test', generateScrFileName);
    runner.on('hook', generateScrFileName);
    runner.on('test end', (test) => this.allTests.push(test));
    runner.on('hook end', (test) => this.allHooks.push(test));
    runner.on('pending', (test) => this.allPending.push(test));

    runner.on('pass', (test) => {
      this.allPasses.push(test);
      if (this.config.passedScreenshot) {
        const scrPromise = saveScreenshotToFile(
          path.join(this.config.reportScreenshotDir, test.scrFileName),
          this.config
        ).then(() => {
          this.screenshotResults.set(test.scrFileName, true);
        }).catch(() => {
          this.screenshotResults.set(test.scrFileName, false);
        });
        
        if (scrPromise) {
          this.screenshotPromises.push(scrPromise);
        }
      }
    });

    runner.on('fail', (test) => {
      if (test.type === 'hook') {
        const target = test.ctx?.currentTest ? test.ctx.currentTest.parent : test.parent;
        target.failedHook = test;
      }
      this.allFailures.push(test);
      const scrPromise = saveScreenshotToFile(
        path.join(this.config.reportScreenshotDir, test.scrFileName),
        this.config
      ).then(() => {
        this.screenshotResults.set(test.scrFileName, true);
      }).catch(() => {
        this.screenshotResults.set(test.scrFileName, false);
      });
      
      if (scrPromise) {
        this.screenshotPromises.push(scrPromise);
      }
    });

    runner.on('end', () => {
      // Wait for all screenshots to complete
      Promise.all(this.screenshotPromises)
        .then(() => {
          setTimeout(() => this.#handleReportEnd(), 500);
        })
        .catch((error) => {
          console.error('Error waiting for screenshots:', error);
          setTimeout(() => this.#handleReportEnd(), 500);
        });
    });
  }

  async #handleReportEnd() {
    try {
      if (this.endCalled) return;
      this.endCalled = true;

      this.allSuites = this.runner.suite;
      this.#traverseSuites(this.allSuites);

      const reportObj = {
        reportTitle: this.config.reportTitle || process.cwd().split(this.config.splitChar).pop(),
        reportPageTitle: this.config.reportPageTitle || 'Mochawesome Report Card',
        inlineAssets: this.config.inlineAssets,
        stats: this.stats,
        suites: this.allSuites,
        allTests: map(this.allTests, Mochawesome.#cleanTest),
        allPending: map(this.allPending, Mochawesome.#cleanTest),
        allPasses: map(this.allPasses, Mochawesome.#cleanTest),
        allFailures: map(this.allFailures, Mochawesome.#cleanTest),
        copyrightYear: new Date().getFullYear(),
        passedScr: this.config.passedScreenshot
      };

      this.#calculateStatistics(reportObj);

      if (!templates.mochawesome) {
        console.error('Mochawesome was unable to load the template.');
        return;
      }

      this.#checkReportNameChange(this.config, [...this.allTests, ...this.allHooks]);

      const htmlContent = templates.mochawesome(reportObj);
      await saveToFile(htmlContent, this.config.reportHtmlFile);
      console.log(`\n[${chalk.gray('mochawesome')}] Report saved to ${this.config.reportHtmlFile}\n`);

      if (this.config.autoOpen) {
        opener(this.config.reportHtmlFile);
      }

      if (this.config.jsonReport) {
        await saveToFile(stringify(reportObj, null, 2), this.config.reportJsonFile);
      }
    } catch (error) {
      console.error('Problem with mochawesome:', error.stack);
    }
  }

  #calculateStatistics(obj) {
    obj.stats.testsRegistered = this.totalTestsRegistered;
    
    // Ensure all stats are numbers (prevent NaN)
    const passes = Number(obj.stats.passes) || 0;
    const failures = Number(obj.stats.failures) || 0;
    const pending = Number(obj.stats.pending) || 0;
    const tests = Number(obj.stats.tests) || 0;
    const testsRegistered = this.totalTestsRegistered;

    const passPercentage = testsRegistered - pending > 0
      ? Math.round((passes / (testsRegistered - pending)) * 1000) / 10
      : 0;

    const pendingPercentage = testsRegistered > 0
      ? Math.round((pending / testsRegistered) * 1000) / 10
      : 0;

    const other = (passes + failures + pending) - tests;
    const adjustedFailures = failures - (other > 0 ? other : 0);

    Object.assign(obj.stats, {
      passes,
      failures: adjustedFailures,
      pending,
      tests,
      testsRegistered,
      passPercent: passPercentage,
      pendingPercent: pendingPercentage,
      other: other > 0 ? other : 0,
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

    const duration = cleanTests.reduce((sum, test) => sum + (test.duration || 0), 0);
    this.totalTestsRegistered += suite.tests?.length || 0;

    Object.assign(suite, {
      tests: cleanTests,
      fullFile: suite.file || '',
      file: suite.file ? suite.file.replace(process.cwd(), '') : '',
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

    // Remove unwanted properties
    const keepProps = [
      'title', 'fullFile', 'file', 'tests', 'suites',
      'passes', 'failures', 'pending', 'skipped',
      'hasTests', 'hasSuites', 'totalTests', 'totalPasses',
      'totalFailures', 'totalPending', 'totalSkipped',
      'hasPasses', 'hasFailures', 'hasPending', 'hasSkipped',
      'root', 'uuid', 'duration', 'rootEmpty', '_timeout'
    ];

    for (const key of Object.keys(suite)) {
      if (!keepProps.includes(key)) delete suite[key];
    }
  }

  static #cleanTest(test) {
    // Process error object safely
    const err = test.err ? Mochawesome.#processError(test.err) : null;

    // Build screenshot HTML
    const scr = Mochawesome.#buildScreenshotHTML(test);

    const cleaned = {
      title: test.title,
      fullTitle: test.fullTitle(),
      timedOut: test.timedOut,
      duration: test.duration || 0,
      state: test.state,
      speed: Mochawesome.#calculateSpeed(test.duration),
      pass: test.state === 'passed',
      fail: test.state === 'failed',
      pending: test.pending,
      scr, // Always include screenshot HTML
      isRoot: test.parent.root,
      uuid: uuidv4(),
      parentUUID: test.parent.uuid
    };

    // Add code highlighting
    if (test.state !== undefined) {
      let code = null;
      
      if (test.fn) {
        code = test.fn.toString();
      } else if (test.body) {
        code = test.body;
      }
      
      if (code && code.trim() && !code.includes('[native code]')) {
        cleaned.code = Mochawesome.#cleanAndHighlightCode(code);
      }
    }

    // Add processed error
    if (err) {
      cleaned.err = err;
    }

    cleaned.skipped = !cleaned.pass && !cleaned.fail && !cleaned.pending;
    if (test.logr) cleaned.logr = test.logr;

    // Only set scr if there's actual screenshot HTML
    if (scr) {
      cleaned.scr = scr;
    }

    return cleaned;
  }

  static #processError(err) {
    const processedErr = {};
    const propsToCopy = ['name', 'message', 'expected', 'actual', 'stack', 'scr'];
    
    for (const prop of propsToCopy) {
      if (prop in err) {
        processedErr[prop] = err[prop];
      }
    }

    // Highlight error stack trace
    if (processedErr.stack) {
      try {
        processedErr.stack = hljs.highlightAuto(processedErr.stack).value;
      } catch (e) {
        // If highlighting fails, keep original stack
      }
    }

    return Object.keys(processedErr).length > 0 ? processedErr : null;
  }

  static #buildScreenshotHTML(test) {
    const screenshotPath = `screenshots/`;
    let scrHTML = '';

    // Custom screenshots
    if (test.customScrFileName && Array.isArray(test.customScrFileName)) {
      scrHTML = test.customScrFileName
        .filter(entry => entry && entry[0])
        .map(([fileName, msg]) => {
          const msgHtml = msg ? `<p class="scr-msg">${Mochawesome.#escapeHtml(msg)}</p>` : '';
          return `${msgHtml}<img src="${screenshotPath}${Mochawesome.#escapeHtml(fileName)}">`;
        })
        .join('');
    }

    // Auto screenshots
    if (!scrHTML && test.scrFileName) {
      scrHTML = `<img src="${screenshotPath}${Mochawesome.#escapeHtml(test.scrFileName)}">`;
    }

    // Return undefined if no screenshot HTML (so Handlebars {{#scr}} won't render)
    return scrHTML || undefined;
  }

  static #escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  static #calculateSpeed(duration) {
    if (duration === undefined || duration === null) return undefined;
    if (duration > 2000) return 'slow';
    if (duration > 500) return 'medium';
    return 'fast';
  }

  static #cleanAndHighlightCode(str) {
    str = str
      .replace(/\r\n?|\n|\u2028|\u2029/g, '\n')
      .replace(/^\uFEFF/, '')
      .replace(/^(async\s+)?function\s*\(.*\)\s*{/, '')
      .replace(/\s+\}$/, '');

    const spacesMatch = str.match(/^\n?( *)/);
    const tabsMatch = str.match(/^\n?(\t*)/);
    const spaces = spacesMatch?.[1].length || 0;
    const tabs = tabsMatch?.[1].length || 0;
    const re = new RegExp(`^\\n?(${tabs ? '\t' : ' '}){${tabs || spaces ? tabs : spaces}}`, 'gm');

    const cleaned = str.replace(re, '').trim();
    
    try {
      return hljs.highlightAuto(cleaned).value;
    } catch (e) {
      return cleaned;
    }
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
