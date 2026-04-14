/**
 * Utility Functions - Modern ES6+ with removed obsolete polyfills
 * Clean, minimal utility functions needed for the reporter
 */

'use strict';

/**
 * Trim whitespace from string
 */
const trim = (str) => str.replace(/^\s+|\s+$/g, '');

/**
 * Parse query string to object
 */
const parseQuery = (qs) => {
  return qs.replace('?', '').split('&').reduce((obj, pair) => {
    const [key, val] = pair.split('=');
    obj[key] = decodeURIComponent(val);
    return obj;
  }, {});
};

/**
 * Get type of value
 */
const getType = (value) => {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) return 'buffer';
  
  return Object.prototype.toString.call(value)
    .replace(/^\[.+\s(.+?)\]$/, '$1')
    .toLowerCase();
};

/**
 * Check if value is buffer
 */
const isBuffer = (value) => typeof Buffer !== 'undefined' && Buffer.isBuffer(value);

/**
 * Check if value is string
 */
const isString = (obj) => typeof obj === 'string';

/**
 * Canonicalize object - sort keys recursively, handle circular refs
 */
function canonicalize(value, stack = []) {
  // Check for circular references
  if (stack.includes(value)) {
    return '[Circular]';
  }

  const type = getType(value);

  switch (type) {
    case 'undefined':
    case 'null':
    case 'buffer':
      return value;

    case 'array':
      stack.push(value);
      const result = value.map((item) => canonicalize(item, stack));
      stack.pop();
      return result;

    case 'function':
      // Check if function has properties
      const props = Object.keys(value);
      if (props.length === 0) {
        return '[Function]';
      }
      return Object.fromEntries(props.map(key => [key, canonicalize(value[key], stack)]));

    case 'object':
      stack.push(value);
      const objResult = Object.fromEntries(
        Object.keys(value)
          .sort()
          .map(key => [key, canonicalize(value[key], stack)])
      );
      stack.pop();
      return objResult;

    case 'date':
    case 'number':
    case 'regexp':
    case 'boolean':
      return value;

    default:
      return String(value);
  }
}

/**
 * Stringify value with custom formatting
 */
function stringifyValue(value) {
  const type = getType(value);

  // Handle primitives
  if (!['object', 'array', 'function'].includes(type)) {
    if (type !== 'buffer') {
      return JSON.stringify(value);
    }
    const json = value.toJSON();
    return JSON.stringify(json.data && json.type ? json.data : json, 2)
      .replace(/,(\n|$)/g, '$1');
  }

  // Check for properties
  if (Object.keys(value).length > 0) {
    return JSON.stringify(canonicalize(value), 2).replace(/,(\n|$)/g, '$1');
  }

  // Empty representation
  switch (type) {
    case 'function': return '[Function]';
    case 'object': return '{}';
    case 'array': return '[]';
    default: return String(value);
  }
}

/**
 * Create undefined error
 */
const undefinedError = () => new Error('Caught undefined error, did you throw without specifying what?');

/**
 * Get error or return undefinedError
 */
const getError = (err) => err || undefinedError();

// Export utilities
module.exports = {
  trim,
  parseQuery,
  getType,
  isBuffer,
  isString,
  canonicalize,
  stringify: stringifyValue,
  undefinedError,
  getError
};
