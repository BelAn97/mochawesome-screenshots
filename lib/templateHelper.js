/**
 * Template Helper Functions - Modern ES6+ syntax
 * Helpers for error diff formatting and template utilities
 */

'use strict';

const diff = require('diff');
const utils = require('./utils');

/**
 * Print differences between actual and expected
 */
function printDifferences(errorObject, diffMode) {
  const obj = errorObject;
  let message;
  let msg;
  let stack;

  // Get message
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
    stack = stackContent.slice(endIndex + 1);
  }

  // Generate diff if types match
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

  const cleanUp = (line) => {
    if (escape) line = escapeInvisibles(line);
    if (line[0] === '+') return indent + colorLines('diff added', line);
    if (line[0] === '-') return indent + colorLines('diff removed', line);
    if (line.match(/\@\@/)) return null;
    if (line.match(/\\ No newline/)) return null;
    return indent + line;
  };

  const notBlank = (line) => line !== undefined && line !== null;

  const msg = diff.createPatch('string', err.actual, err.expected);
  const lines = msg.split('\n').splice(4);

  return `\n      ${colorLines('diff added', '+ expected')} ${colorLines('diff removed', '- actual')}\n\n${lines.map(cleanUp).filter(notBlank).join('\n')}`;
}

/**
 * Escape invisible characters
 */
function escapeInvisibles(line) {
  return line
    .replace(/\t/g, '<tab>')
    .replace(/\r/g, '<CR>')
    .replace(/\n/g, '<LF>\n');
}

/**
 * Color lines (for browser display)
 */
const colorLines = (name, str) => str;

/**
 * Check if same type
 */
const sameType = (a, b) => Object.prototype.toString.call(a) === Object.prototype.toString.call(b);

// Export helpers
module.exports = {
  printDifferences
};
