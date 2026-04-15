/**
 * Utility functions - Modern ES6+
 */

'use strict';

/**
 * Trim whitespace from string
 */
exports.trim = function (str) {
  return str.replaceAll(/(^\s+)|(\s+$)/g, '');
};

/**
 * Parse query string to object
 */
exports.parseQuery = function (qs) {
  return qs.replace('?', '').split('&').reduce(function (obj, pair) {
    const parts = pair.split('=');
    obj[parts[0]] = decodeURIComponent(parts[1]);
    return obj;
  }, {});
};

/**
 * Get type of value
 */
exports.getType = function (value) {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (exports.isBuffer(value)) return 'buffer';

  return Object.prototype.toString.call(value)
    .replaceAll(/^\[.+\s(.+?)\]$/, '$1')
    .toLowerCase();
};

/**
 * Check if value is buffer
 */
exports.isBuffer = function (value) {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
};

/**
 * Check if value is string
 */
exports.isString = function (obj) {
  return typeof obj === 'string';
};

/**
 * Canonicalize object - sort keys recursively, handle circular refs
 */
exports.canonicalize = function (value, stack) {
  stack = stack || [];

  if (stack.includes(value)) {
    return '[Circular]';
  }

  const type = exports.getType(value);

  switch (type) {
    case 'undefined':
    case 'null':
    case 'buffer':
      return value;

    case 'array':
      {
        stack.push(value);
        const result = value.map(function (item) {
          return exports.canonicalize(item, stack);
        });
        stack.pop();
        return result;
      }

    case 'function':
      {
        const props = Object.keys(value);
        if (props.length === 0) {
          return '[Function]';
        }
        return Object.fromEntries(props.map(function (key) {
          return [key, exports.canonicalize(value[key], stack)];
        }));
      }

    case 'object':
      {
        stack.push(value);
        const objResult = Object.fromEntries(
          Object.keys(value)
            .sort((a, b) => a.localeCompare(b))
            .map(function (key) {
              return [key, exports.canonicalize(value[key], stack)];
            })
        );
        stack.pop();
        return objResult;
      }

    case 'date':
    case 'number':
    case 'regexp':
    case 'boolean':
      return value;

    default:
      return String(value);
  }
};

/**
 * Stringify value with custom formatting
 */
exports.stringify = function (value) {
  const type = exports.getType(value);

  if (!['object', 'array', 'function'].includes(type)) {
    if (type !== 'buffer') {
      return JSON.stringify(value);
    }
    const json = value.toJSON();
    return JSON.stringify(json.data && json.type ? json.data : json, 2)
      .replaceAll(/,(\n|$)/g, '$1');
  }

  for (const prop in value) {
    if (Object.hasOwn(value, prop)) {
      return JSON.stringify(exports.canonicalize(value), 2).replaceAll(/,(\n|$)/g, '$1');
    }
  }

  return emptyRepresentation(value, type);
};

/**
 * Create undefined error
 */
exports.undefinedError = function () {
  return new Error('Caught undefined error, did you throw without specifying what?');
};

/**
 * Get error or return undefinedError
 */
exports.getError = function (err) {
  return err || exports.undefinedError();
};

/**
 * Return a plain-object representation of empty value
 */
function emptyRepresentation(value, type) {
  switch (type) {
    case 'function': return '[Function]';
    case 'object': return '{}';
    case 'array': return '[]';
    default: return String(value);
  }
}
