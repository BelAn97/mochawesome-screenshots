import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  trim,
  parseQuery,
  getType,
  isBuffer,
  isString,
  canonicalize,
  stringify,
  stringifySafe
} from '../../dist/esm/utils.js';

describe('utils', () => {
  describe('trim', () => {
    test('removes leading and trailing whitespace', () => {
      assert.equal(trim('  hello world  '), 'hello world');
    });
  });

  describe('parseQuery', () => {
    test('parses query string', () => {
      assert.deepEqual(parseQuery('?a=1&b=2'), { a: '1', b: '2' });
    });

    test('handles missing value', () => {
      assert.deepEqual(parseQuery('flag='), { flag: '' });
    });
  });

  describe('getType', () => {
    // Regression: the old implementation used replaceAll() with a non-global
    // regex, which throws TypeError on every object argument.
    test('does not throw for objects', () => {
      assert.doesNotThrow(() => getType({}));
    });

    test('returns correct type names', () => {
      assert.equal(getType(undefined), 'undefined');
      assert.equal(getType(null), 'null');
      assert.equal(getType([1, 2]), 'array');
      assert.equal(getType({ a: 1 }), 'object');
      assert.equal(getType(new Date()), 'date');
      assert.equal(getType(/re/), 'regexp');
      assert.equal(getType(42), 'number');
      assert.equal(getType(true), 'boolean');
      assert.equal(getType(() => {}), 'function');
    });

    test('detects buffers', () => {
      assert.equal(getType(Buffer.from('x')), 'buffer');
      assert.equal(isBuffer(Buffer.from('x')), true);
    });
  });

  describe('isString', () => {
    test('type guard', () => {
      assert.equal(isString('s'), true);
      assert.equal(isString(1), false);
    });
  });

  describe('canonicalize', () => {
    test('sorts object keys recursively', () => {
      const result = canonicalize({ b: 2, a: { d: 4, c: 3 } });
      assert.deepEqual(Object.keys(result), ['a', 'b']);
      assert.deepEqual(Object.keys(result.a), ['c', 'd']);
    });

    test('handles circular references', () => {
      const obj = { name: 'root' };
      obj.self = obj;
      assert.doesNotThrow(() => canonicalize(obj));
      assert.equal(canonicalize(obj).self, '[Circular]');
    });

    test('represents empty functions', () => {
      assert.equal(canonicalize(() => {}), '[Function]');
    });
  });

  describe('stringify', () => {
    test('JSON-stringifies primitives', () => {
      assert.equal(stringify('abc'), '"abc"');
      assert.equal(stringify(5), '5');
    });

    test('pretty-prints objects with sorted keys', () => {
      const result = stringify({ b: 1, a: 2 });
      assert.ok(result.includes('"a"'));
      assert.ok(result.includes('\n'));
    });
  });

  describe('stringifySafe', () => {
    test('behaves like JSON.stringify for plain values', () => {
      assert.equal(stringifySafe({ a: 1 }), '{"a":1}');
      assert.equal(stringifySafe({ a: 1 }, 2), '{\n  "a": 1\n}');
    });

    test('replaces circular references without throwing', () => {
      const obj = { name: 'root' };
      obj.self = obj;
      const result = stringifySafe(obj);
      assert.ok(result.includes('"name":"root"'));
      assert.ok(result.includes('[Circular ~]'));
    });

    test('marks nested circular paths', () => {
      const obj = { child: {} };
      obj.child.parent = obj;
      assert.ok(stringifySafe(obj).includes('[Circular ~]'));
    });
  });
});
