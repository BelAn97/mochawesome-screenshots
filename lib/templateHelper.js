/**
 * Template Helper Functions - Modern ES6+ syntax
 */

'use strict';

const diff = require('diff');
const utils = require('./utils');

/**
 * Print differences between actual and expected
 */
function printDifferences(errorObject) {
  const obj = errorObject;
  let message;
  let msg;

  if (obj.message) {
    message = obj.message;
  } else if (typeof obj.inspect === 'function') {
    message = obj.inspect();
  } else {
    message = '';
  }

  const stackContent = obj.stack || message;
  const index = stackContent.indexOf(message);

  if (index === -1) {
    msg = message;
  } else {
    const endIndex = index + message.length;
    msg = stackContent.slice(0, endIndex);
  }

  if (sameType(obj.actual, obj.expected) && obj.expected !== undefined) {
    if (!(utils.isString(obj.actual) && utils.isString(obj.expected))) {
      obj.actual = utils.stringify(obj.actual);
      obj.expected = utils.stringify(obj.expected);
    }

    const match = obj.actual.match(/^([^:]+): expected/);
    msg = `\n      ${match ? match[1] : msg}`;
    msg += unifiedDiff(obj, (str) => str);
  }

  return msg;
}

/**
 * Generate unified diff
 */
function unifiedDiff(err, escape) {
  const indent = '      ';

  function cleanUp(line) {
    let cleaned = escape ? escapeInvisibles(line) : line;
    if (line[0] === '+') return indent + colorLines('diff added', cleaned);
    if (line[0] === '-') return indent + colorLines('diff removed', cleaned);
    if (line.includes('@@') || line.includes(String.raw`\ No newline`)) return null;
    return indent + cleaned;
  }

  const msg = diff.createPatch('string', err.actual, err.expected);
  const lines = msg.split('\n').splice(4);

  return `\n      ${colorLines('diff added', '+ expected')} ${colorLines('diff removed', '- actual')}\n\n${lines.map(cleanUp).filter(isNotBlank).join('\n')}`;
}

/**
 * Escape invisible characters
 */
function escapeInvisibles(line) {
  return line
    .replaceAll('\t', '<tab>')
    .replaceAll('\r', '<CR>')
    .replaceAll('\n', '<LF>\n');
}

/**
 * Check if line is not blank
 */
function isNotBlank(line) {
  return line !== undefined && line !== null;
}

/**
 * Color lines (for browser display)
 */
function colorLines(name, str) {
  return str;
}

/**
 * Check if same type
 */
function sameType(a, b) {
  return Object.prototype.toString.call(a) === Object.prototype.toString.call(b);
}

module.exports = {
  printDifferences
};
