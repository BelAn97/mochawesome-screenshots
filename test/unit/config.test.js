import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createConfig } from '../../dist/esm/config.js';

describe('createConfig', () => {
  beforeEach(() => {
    delete process.env.MOCHAWESOME_REPORTDIR;
    delete process.env.MOCHAWESOME_REPORTNAME;
    delete process.env.MOCHAWESOME_JSONREPORT;
  });

  afterEach(() => {
    delete process.env.MOCHAWESOME_REPORTDIR;
    delete process.env.MOCHAWESOME_REPORTNAME;
    delete process.env.MOCHAWESOME_JSONREPORT;
  });

  test('applies defaults', () => {
    const config = createConfig();
    assert.equal(config.reportName, 'mochawesome');
    assert.ok(config.reportDir.includes('mochawesome-reports'));
    assert.equal(config.reportHtmlFile, path.join(config.reportDir, 'mochawesome.html'));
    assert.equal(config.screenshotDelay, 500);
  });

  test('options take precedence over defaults', () => {
    const config = createConfig({ reportDir: './out', reportName: 'custom' });
    assert.equal(config.reportDir, './out');
    assert.equal(config.reportName, 'custom');
    assert.equal(config.reportHtmlFile, path.join('./out', 'custom.html'));
  });

  test('environment variables take precedence over defaults', () => {
    process.env.MOCHAWESOME_REPORTNAME = 'from-env';
    const config = createConfig();
    assert.equal(config.reportName, 'from-env');
  });

  test('options take precedence over environment variables', () => {
    process.env.MOCHAWESOME_REPORTNAME = 'from-env';
    const config = createConfig({ reportName: 'from-options' });
    assert.equal(config.reportName, 'from-options');
  });

  test('coerces boolean strings', () => {
    const config = createConfig({ jsonReport: 'false' });
    assert.equal(config.jsonReport, false);
  });

  test('multiReport adds timestamp suffix to report name', () => {
    const config = createConfig({ multiReport: true });
    assert.match(config.reportName, /^mochawesome_\d+$/);
  });

  test('multiReport does not mutate the options object', () => {
    // Regression: the old implementation appended the timestamp to
    // options.reportName as a side effect.
    const options = { multiReport: true, reportName: 'named' };
    createConfig(options);
    assert.equal(options.reportName, 'named');
  });

  test('screenshotMaxFileLength derived from report dir', () => {
    const config = createConfig({ reportDir: './out' });
    assert.equal(config.screenshotMaxFileLength, 254 - path.resolve('./out', 'screenshots').length);
  });
});
