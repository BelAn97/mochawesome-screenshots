// JavaScript source code


var objToString = Object.prototype.toString;
var diff = require('diff');
var utils = require('./utils.js');


function isString(obj) {
    return typeof obj === 'string';
}

exports.printDifferences = function (errorObject, diffMode) {
    var obj = errorObject;
    var message;
    var msg;
    
    if (obj.message) {
        message = obj.message;
    } else if (typeof obj.inspect === 'function') {
        message = obj.inspect() + '';
    } else {
        message = '';
    }
    var stack = obj.stack || message;
    var index = stack.indexOf(message);
    
    if (index === -1) {
        msg = message;
    } else {
        index += message.length;
        msg = stack.slice(0, index);
        // remove msg from stack
        stack = stack.slice(index + 1);
    }
    
    if (sameType(obj.actual, obj.expected) && obj.expected !== undefined) {
        if (!(isString(obj.actual) && isString(obj.expected))) {
            obj.actual = utils.stringify(obj.actual);
            obj.expected = utils.stringify(obj.expected);
        }

        var fmt = color('error title', '  %s) %s:\n%s') + color('error stack', '\n%s\n');
        var match = (obj.actual).match(/^([^:]+): expected/);
        msg = '\n      ' + color('error message', match ? match[1] : msg);
        msg += unifiedDiff(obj, function(str) { return str; });
    }
    return msg;
};

function unifiedDiff(err, escape) {
    var indent = '      ';
    function cleanUp(line) {
        if (escape) {
            line = escapeInvisibles(line);
        }
        if (line[0] === '+') {
            return indent + colorLines('diff added', line);
        }
        if (line[0] === '-') {
            return indent + colorLines('diff removed', line);
        }
        if (line.match(/\@\@/)) {
            return null;
        }
        if (line.match(/\\ No newline/)) {
            return null;
        }
        return indent + line;
    }
    
    function notBlank(line) {
        return typeof line !== 'undefined' && line !== null;
    }
    
    var msg = diff.createPatch('string', err.actual, err.expected);
    var lines = msg.split('\n').splice(4);
    return '\n      ' +
      colorLines('diff added', '+ expected') + ' ' +
      colorLines('diff removed', '- actual') +
      '\n\n' +
      lines.map(cleanUp).filter(notBlank).join('\n');
}


function escapeInvisibles(line) {
    return line.replace(/\t/g, '<tab>')
      .replace(/\r/g, '<CR>')
      .replace(/\n/g, '<LF>\n');
}

function colorLines(name, str) {
    return str.split('\n').map(function (str) {
        return String(str);
    }).join('\n');
}

function color(type, str) {
    return String(str);
}

function errorDiff(err, type, escape) {
    var actual = escape ? escapeInvisibles(err.actual) : err.actual;
    var expected = escape ? escapeInvisibles(err.expected) : err.expected;
    return diff['diff' + type](actual, expected).map(function (str) {
        if (str.added) {
            return colorLines('diff added', str.value);
        }
        if (str.removed) {
            return colorLines('diff removed', str.value);
        }
        return str.value;
    }).join('');
}

function sameType(a, b) {
    return objToString.call(a) === objToString.call(b);
}

function pad(str, len) {
    str = String(str);
    return Array(len - str.length + 1).join(' ') + str;
}
