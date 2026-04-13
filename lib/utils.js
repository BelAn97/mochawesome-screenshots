/**
 * Utility functions for mochawesome reporter
 */

var debug = require('debug')('mocha:watch');

/**
 * Array#reduce
 *
 * @api private
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object} val Initial value.
 * @return {*}
 */
exports.reduce = function(arr, fn, val) {
    var rval = val;

    for (var i = 0, l = arr.length; i < l; i++) {
        rval = fn(rval, arr[i], i, arr);
    }

    return rval;
};

/**
 * Trim the given `str`.
 *
 * @api private
 * @param {string} str
 * @return {string}
 */
exports.trim = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
};

/**
 * Parse the given `qs`.
 *
 * @api private
 * @param {string} qs
 * @return {Object}
 */
exports.parseQuery = function(qs) {
    return exports.reduce(qs.replace('?', '').split('&'), function(obj, pair) {
        var i = pair.indexOf('=');
        var key = pair.slice(0, i);
        var val = pair.slice(++i);

        obj[key] = decodeURIComponent(val);
        return obj;
    }, {});
};

/**
 * Return a new Thing that has the keys in sorted order. Recursive.
 *
 * @api private
 * @see {@link exports.stringify}
 * @param {*} value Thing to inspect.  May or may not have properties.
 * @param {Array} [stack=[]] Stack of seen values
 * @return {(Object|Array|Function|string|undefined)}
 */
exports.canonicalize = function(value, stack) {
    var canonicalizedObj;
    var prop;
    var type = exports.type(value);
    function withStack(value, fn) {
        stack.push(value);
        fn();
        stack.pop();
    }

    stack = stack || [];

    if (exports.indexOf(stack, value) !== -1) {
        return '[Circular]';
    }

    switch (type) {
        case 'undefined':
        case 'buffer':
        case 'null':
            canonicalizedObj = value;
            break;
        case 'array':
            withStack(value, function() {
                canonicalizedObj = exports.map(value, function(item) {
                    return exports.canonicalize(item, stack);
                });
            });
            break;
        case 'function':
            for (prop in value) {
                canonicalizedObj = {};
                break;
            }
            if (!canonicalizedObj) {
                canonicalizedObj = emptyRepresentation(value, type);
                break;
            }
        /* falls through */
        case 'object':
            canonicalizedObj = canonicalizedObj || {};
            withStack(value, function() {
                exports.forEach(exports.keys(value).sort(), function(key) {
                    canonicalizedObj[key] = exports.canonicalize(value[key], stack);
                });
            });
            break;
        case 'date':
        case 'number':
        case 'regexp':
        case 'boolean':
            canonicalizedObj = value;
            break;
        default:
            canonicalizedObj = value + '';
    }

    return canonicalizedObj;
};

/**
 * Test if the given obj is type of string.
 *
 * @api private
 * @param {Object} obj
 * @return {boolean}
 */
exports.isString = function(obj) {
    return typeof obj === 'string';
};

/**
 * Array#forEach
 *
 * @api private
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object} scope
 */
exports.forEach = function(arr, fn, scope) {
    for (var i = 0, l = arr.length; i < l; i++) {
        fn.call(scope, arr[i], i);
    }
};

/**
 * Array#map
 *
 * @api private
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object} scope
 * @return {Array}
 */
exports.map = function(arr, fn, scope) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
        result.push(fn.call(scope, arr[i], i, arr));
    }
    return result;
};

/**
 * Array#indexOf
 *
 * @api private
 * @param {Array} arr
 * @param {Object} obj to find index of
 * @param {number} start
 * @return {number}
 */
exports.indexOf = function(arr, obj, start) {
    for (var i = start || 0, l = arr.length; i < l; i++) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return -1;
};

/**
 * Object.keys
 *
 * @api private
 * @param {Object} obj
 * @return {Array} keys
 */
exports.keys = Object.keys;

/**
 * Test if a value is a buffer.
 *
 * @api private
 * @param {*} value The value to test.
 * @return {boolean} True if `value` is a buffer, otherwise false
 */
exports.isBuffer = function(value) {
    return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
};

/**
 * Get the type of a value.
 *
 * @api private
 * @param {*} value The value to test.
 * @returns {string}
 */
exports.type = function type(value) {
    if (value === undefined) {
        return 'undefined';
    } else if (value === null) {
        return 'null';
    } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
        return 'buffer';
    }
    return Object.prototype.toString.call(value)
        .replace(/^\[.+\s(.+?)\]$/, '$1')
        .toLowerCase();
};

/**
 * Stringify `value`.
 *
 * @api private
 * @param {*} value
 * @return {string}
 */
exports.stringify = function(value) {
    var type = exports.type(value);

    if (exports.indexOf(['object', 'array', 'function'], type) === -1) {
        if (type !== 'buffer') {
            return JSON.stringify(value);
        }
        var json = value.toJSON();
        return JSON.stringify(json.data && json.type ? json.data : json, 2)
            .replace(/,(\n|$)/g, '$1');
    }

    for (var prop in value) {
        if (Object.prototype.hasOwnProperty.call(value, prop)) {
            return JSON.stringify(exports.canonicalize(value), 2).replace(/,(\n|$)/g, '$1');
        }
    }

    return emptyRepresentation(value, type);
};

/**
 * Generate an undefined error with a message warning the user.
 *
 * @return {Error}
 */
exports.undefinedError = function() {
    return new Error('Caught undefined error, did you throw without specifying what?');
};

/**
 * Generate an undefined error if `err` is not defined.
 *
 * @param {Error} err
 * @return {Error}
 */
exports.getError = function(err) {
    return err || exports.undefinedError();
};

/**
 * Return a plain-object representation of empty value.
 *
 * @api private
 * @param {*} value The value to inspect.
 * @param {string} [type] The type of the value, if known.
 * @returns {string}
 */
function emptyRepresentation(value, type) {
    type = type || exports.type(value);

    switch (type) {
        case 'function':
            return '[Function]';
        case 'object':
            return '{}';
        case 'array':
            return '[]';
        default:
            return value.toString();
    }
}
