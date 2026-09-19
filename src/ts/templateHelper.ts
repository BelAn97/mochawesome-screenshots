/**
 * Template Helper Functions
 */

import { createPatch } from 'diff';
import { isString, stringify } from './utils.js';

/** Error object shape consumed by the diff renderer. */
interface DiffError {
  message?: string;
  inspect?: () => string;
  stack?: string;
  actual?: unknown;
  expected?: unknown;
}

/**
 * Print differences between actual and expected
 */
export function printDifferences(errorObject: DiffError): string | undefined {
  const obj = errorObject;
  let message: string;
  let msg: string | undefined;

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
    if (!(isString(obj.actual) && isString(obj.expected))) {
      obj.actual = stringify(obj.actual);
      obj.expected = stringify(obj.expected);
    }

    const match = (obj.actual as string).match(/^([^:]+): expected/);
    msg = `\n      ${match?.[1] ?? msg}`;
    msg += unifiedDiff(obj);
  }

  return msg;
}

/**
 * Generate unified diff
 */
function unifiedDiff(err: DiffError): string {
  const indent = '      ';

  function cleanUp(line: string): string | null {
    const cleaned = escapeInvisibles(line);
    if (line.startsWith('+')) return indent + colorLines('diff added', cleaned);
    if (line.startsWith('-')) return indent + colorLines('diff removed', cleaned);
    if (line.includes('@@') || line.includes(String.raw`\ No newline`)) return null;
    return indent + cleaned;
  }

  const msg = createPatch('string', err.actual as string, err.expected as string);
  const lines = msg.split('\n').slice(4);

  return `\n      ${colorLines('diff added', '+ expected')} ${colorLines('diff removed', '- actual')}\n\n${lines
    .map(cleanUp)
    .filter((line) => line !== null)
    .join('\n')}`;
}

/**
 * Escape invisible characters
 */
function escapeInvisibles(line: string): string {
  return line.replaceAll('\t', '<tab>').replaceAll('\r', '<CR>').replaceAll('\n', '<LF>\n');
}

/**
 * Color lines (no-op, kept for report CSS class parity)
 */
function colorLines(_name: string, str: string): string {
  return str;
}

/**
 * Check if same type
 */
function sameType(a: unknown, b: unknown): boolean {
  return Object.prototype.toString.call(a) === Object.prototype.toString.call(b);
}
