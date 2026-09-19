import type * as Mocha from 'mocha';

/**
 * User-facing reporter options, passed via mocha's `reporterOptions`.
 * Every option is optional; unset options fall back to the
 * `MOCHAWESOME_<OPTION>` environment variable and then stay disabled.
 */
export interface ReporterOptions {
  reportDir?: string;
  reportName?: string;
  reportTitle?: string;
  reportPageTitle?: string;
  inlineAssets?: boolean;
  autoOpen?: boolean;
  jsonReport?: boolean;
  clearOldScreenshots?: boolean;
  takePassedScreenshot?: boolean;
  shortScrFileNames?: boolean;
  framework?: string;
  multiReport?: boolean;
  /**
   * Delay in ms between the end of the run and writing the report.
   * Gives async screenshot pipelines (e.g. Cypress `onAfterScreenshot`)
   * time to finish writing files. Default: 500.
   */
  screenshotDelay?: number;
}

/** Fully resolved runtime configuration used by the reporter. */
export interface MochawesomeConfig {
  buildDir: string;
  buildFontsDir: string;
  buildCssDir: string;
  buildJsDir: string;
  reportDir: string;
  reportName: string;
  reportTitle?: string;
  reportPageTitle?: string;
  reportJsonFile: string;
  reportHtmlFile: string;
  reportScreenshotDir: string;
  reportJsDir: string;
  reportFontsDir: string;
  reportCssDir: string;
  inlineAssets?: boolean;
  autoOpen?: boolean;
  jsonReport?: boolean;
  clearOldScreenshots?: boolean;
  passedScreenshot?: boolean;
  shortScrFileNames?: boolean;
  screenshotMaxFileLength: number;
  screenshotDelay: number;
  multiReport?: boolean;
  framework?: string;
  splitChar: string;
}

/** Mocha test object augmented with reporter-specific runtime properties. */
export type AugmentedTest = Mocha.Test & {
  scrFileName?: string;
  logr?: string;
  customScrFileName?: [fileName: string, message: string][];
  reportName?: string;
};

/** Mocha suite object augmented with aggregated report properties. */
export type AugmentedSuite = Mocha.Suite & {
  uuid?: string;
  fullFile?: string;
  passes?: CleanTest[];
  failures?: CleanTest[];
  pending?: CleanTest[];
  skipped?: CleanTest[];
  hasTests?: boolean;
  hasSuites?: boolean;
  totalTests?: number;
  totalPasses?: number;
  totalFailures?: number;
  totalPending?: number;
  totalSkipped?: number;
  hasPasses?: boolean;
  hasFailures?: boolean;
  hasPending?: boolean;
  hasSkipped?: boolean;
  rootEmpty?: boolean;
  failedHook?: AugmentedTest;
  duration?: number;
};

/** Error object reduced to the properties the report renders. */
export interface ProcessedError {
  name?: string;
  message?: string;
  expected?: unknown;
  actual?: unknown;
  stack?: string;
  scr?: string;
}

/** Test object reduced to the properties the report renders. */
export interface CleanTest {
  title: string;
  fullTitle: string;
  timedOut?: boolean;
  duration: number;
  state?: Mocha.Test['state'];
  speed?: 'slow' | 'medium' | 'fast';
  pass: boolean;
  fail: boolean;
  pending?: boolean;
  isRoot: boolean;
  uuid: string;
  parentUUID?: string;
  code?: string;
  err?: ProcessedError | null;
  skipped: boolean;
  logr?: string;
  scr?: string;
}

/** Aggregate statistics rendered in the report summary. */
export interface ReportStats {
  suites?: number;
  tests?: number;
  passes?: number;
  pending?: number;
  failures?: number;
  start?: Date;
  end?: Date;
  duration?: number;
  testsRegistered?: number;
  passPercent?: number;
  pendingPercent?: number;
  other?: number;
  hasOther?: boolean;
  skipped?: number;
  hasSkipped?: boolean;
  passPercentClass?: string;
  pendingPercentClass?: string;
}

/** Top-level object passed to the HTML template and written as JSON report. */
export interface ReportObject {
  reportTitle: string;
  reportPageTitle: string;
  inlineAssets?: boolean;
  stats: ReportStats;
  suites: AugmentedSuite;
  allTests: CleanTest[];
  allPending: CleanTest[];
  allPasses: CleanTest[];
  allFailures: CleanTest[];
  copyrightYear: number;
  passedScr?: boolean;
}

export type ReportTemplate = (data: ReportObject, options?: unknown) => string;
