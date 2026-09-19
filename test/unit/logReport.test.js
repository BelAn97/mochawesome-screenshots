import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { log, setReportName, setScreenshot } from '../../dist/esm/logReport.js';

/** Mimics the mocha `this` context available inside a test function. */
function makeContext() {
  const test = {
    title: 'test',
    fullTitle: () => 'suite test'
  };
  return { ctxObject: test, context: { test } };
}

describe('logReport', () => {
  describe('log', () => {
    test('appends formatted data to test.logr via mocha context', () => {
      const { context, ctxObject } = makeContext();
      log(context, { url: 'https://example.com' });
      assert.ok(ctxObject.logr.includes('<pre>'));
      assert.ok(ctxObject.logr.includes('example.com'));
    });

    test('supports multiple calls', () => {
      const { context, ctxObject } = makeContext();
      log(context, 'first');
      log(context, 'second');
      assert.ok(ctxObject.logr.includes('<br>'));
      assert.ok(ctxObject.logr.includes('first'));
      assert.ok(ctxObject.logr.includes('second'));
    });

    test('stringifies circular data safely', () => {
      const { context, ctxObject } = makeContext();
      const data = { name: 'root' };
      data.self = data;
      assert.doesNotThrow(() => log(context, data));
      assert.ok(ctxObject.logr.includes('[Circular ~]'));
    });

    test('ignores invalid arguments without throwing', () => {
      assert.doesNotThrow(() => log(null, 'data'));
      assert.doesNotThrow(() => log(undefined, 'data'));
      assert.doesNotThrow(() => log({ test: null }, null));
    });
  });

  describe('setReportName', () => {
    test('sets trimmed name on test', () => {
      const { context, ctxObject } = makeContext();
      setReportName(context, '  custom-name  ');
      assert.equal(ctxObject.reportName, 'custom-name');
    });

    test('ignores empty names', () => {
      const { context, ctxObject } = makeContext();
      setReportName(context, '   ');
      assert.equal(ctxObject.reportName, undefined);
    });
  });

  describe('setScreenshot', () => {
    test('pushes screenshot entry with message', () => {
      const { context, ctxObject } = makeContext();
      setScreenshot(context, 'shot.png', 'after login');
      assert.deepEqual(ctxObject.customScrFileName, [['shot.png', 'after login']]);
    });

    test('accumulates multiple screenshots', () => {
      const { context, ctxObject } = makeContext();
      setScreenshot(context, 'one.png');
      setScreenshot(context, 'two.png', 'msg');
      assert.equal(ctxObject.customScrFileName.length, 2);
      assert.deepEqual(ctxObject.customScrFileName[1], ['two.png', 'msg']);
    });
  });
});
