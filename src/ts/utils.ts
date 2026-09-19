/**
 * Utility functions.
 */

/**
 * Stringify a value that may contain circular references.
 * Cycles are replaced with `[Circular ~]` markers (same output format
 * as the previously used `json-stringify-safe` package).
 */
export function stringifySafe(value: unknown, spaces?: number): string {
  const stack: unknown[] = [];
  const keys: string[] = [];

  const cycleReplacer = (key: string, val: unknown): string => {
    if (stack[0] === val) return '[Circular ~]';
    return `[Circular ~.${keys.slice(0, stack.indexOf(val)).join('.')}[${key}]]`;
  };

  const replacer = function (this: unknown, key: string, val: unknown): unknown {
    if (stack.length === 0) {
      stack.push(val);
      keys.push(key);
      return val;
    }
    const thisPos = stack.indexOf(this);
    if (thisPos !== -1) {
      stack.splice(thisPos + 1);
      keys.splice(thisPos + 1);
    } else {
      stack.push(this);
      keys.push(key);
    }
    if (stack.includes(val)) return cycleReplacer(key, val);
    return val;
  };

  return JSON.stringify(value, replacer, spaces) ?? 'null';
}

/**
 * Trim leading and trailing whitespace
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Parse query string to object
 */
export function parseQuery(qs: string): Record<string, string> {
  return qs
    .replace('?', '')
    .split('&')
    .reduce<Record<string, string>>((obj, pair) => {
      const [key, value] = pair.split('=');
      obj[key ?? ''] = decodeURIComponent(value ?? '');
      return obj;
    }, {});
}

/**
 * Get type of value
 */
export function getType(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (isBuffer(value)) return 'buffer';

  return Object.prototype.toString.call(value)
    .replace(/^\[.+\s(.+?)\]$/, '$1')
    .toLowerCase();
}

/**
 * Check if value is buffer
 */
export function isBuffer(value: unknown): boolean {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
}

/**
 * Check if value is string
 */
export function isString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

/**
 * Canonicalize object - sort keys recursively, handle circular refs
 */
export function canonicalize(value: unknown, stack: unknown[] = []): unknown {
  if (stack.includes(value)) {
    return '[Circular]';
  }

  const type = getType(value);

  switch (type) {
    case 'undefined':
    case 'null':
    case 'buffer':
    case 'date':
    case 'number':
    case 'regexp':
    case 'boolean':
      return value;

    case 'array': {
      stack.push(value);
      const result = (value as unknown[]).map((item) => canonicalize(item, stack));
      stack.pop();
      return result;
    }

    case 'function': {
      const props = Object.keys(value as object);
      if (props.length === 0) {
        return '[Function]';
      }
      stack.push(value);
      const result = Object.fromEntries(
        props.map((key) => [key, canonicalize((value as Record<string, unknown>)[key], stack)])
      );
      stack.pop();
      return result;
    }

    case 'object': {
      stack.push(value);
      const result = Object.fromEntries(
        Object.keys(value as object)
          .sort((a, b) => a.localeCompare(b))
          .map((key) => [key, canonicalize((value as Record<string, unknown>)[key], stack)])
      );
      stack.pop();
      return result;
    }

    default:
      return String(value);
  }
}

/**
 * Stringify value with custom formatting
 */
export function stringify(value: unknown): string {
  const type = getType(value);

  if (!['object', 'array', 'function'].includes(type)) {
    if (type !== 'buffer') {
      return JSON.stringify(value) ?? 'undefined';
    }
    const json = (value as Buffer).toJSON();
    return JSON.stringify(json.data && json.type ? json.data : json, null, 2).replaceAll(
      /,(\n|$)/g,
      '$1'
    );
  }

  if (Object.keys(value as object).length > 0) {
    return JSON.stringify(canonicalize(value), null, 2).replaceAll(/,(\n|$)/g, '$1');
  }

  return emptyRepresentation(value, type);
}

/**
 * Create undefined error
 */
export function undefinedError(): Error {
  return new Error('Caught undefined error, did you throw without specifying what?');
}

/**
 * Get error or return undefinedError
 */
export function getError(err: unknown): unknown {
  return err || undefinedError();
}

/**
 * Return a plain-object representation of empty value
 */
function emptyRepresentation(value: unknown, type: string): string {
  switch (type) {
    case 'function':
      return '[Function]';
    case 'object':
      return '{}';
    case 'array':
      return '[]';
    default:
      return String(value);
  }
}
