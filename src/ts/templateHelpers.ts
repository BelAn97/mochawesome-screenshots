/**
 * Handlebars helpers used by the compiled report templates.
 * Registered once via `registerTemplateHelpers()` (called by the
 * generated templates module).
 */

import Handlebars from 'handlebars';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
import relativeTimePlugin from 'dayjs/plugin/relativeTime.js';
import { readFileSync } from 'node:fs';
import path from 'node:path';

dayjs.extend(durationPlugin);
dayjs.extend(relativeTimePlugin);

// `never` params make every concrete helper signature assignable.
type HbsHelper = (...args: never[]) => unknown;

interface HbsOptions {
  fn?: (context?: unknown) => unknown;
  inverse?: (context?: unknown) => unknown;
}

interface DurationParts {
  hrs: number;
  min: number;
  sec: number;
  ms: number;
}

function registerHelper(name: string, helper: HbsHelper): void {
  Handlebars.registerHelper(name, helper as unknown as Handlebars.HelperDelegate);
}

function getDurationObj(durationInMilliseconds: number): DurationParts {
  const dur = dayjs.duration(durationInMilliseconds);
  return {
    hrs: dur.hours(),
    min: dur.minutes(),
    sec: dur.seconds(),
    ms: dur.milliseconds()
  };
}

export function registerTemplateHelpers(): void {
  registerHelper('isBlank', function (this: unknown, context: unknown, options: HbsOptions) {
    return context === '' || context == null ? options.fn?.(this) : options.inverse?.(this);
  });

  registerHelper('getPlural', (context: unknown) => (context === 1 ? '' : 's'));

  registerHelper('formatSummaryDuration', (context: unknown) => {
    const duration = Number(context) || 0;
    const dur = getDurationObj(duration);
    if (dur.hrs < 1) {
      if (dur.min < 1) {
        if (dur.sec < 1) {
          return duration;
        }
        return `${dur.sec}.${dur.ms}`;
      }
      return `${dur.min}:${dur.sec < 10 ? `0${dur.sec}` : dur.sec}`;
    }
    return `${dur.hrs}:${dur.min < 10 ? `0${dur.min}` : dur.min}`;
  });

  registerHelper('getSummaryDurationUnits', (context: unknown) => {
    const dur = getDurationObj(Number(context) || 0);
    if (dur.hrs < 1) {
      if (dur.min < 1) {
        return dur.sec < 1 ? 'MS' : 'S';
      }
      return 'M';
    }
    return 'H';
  });

  registerHelper('formatDuration', (context: unknown) => {
    const duration = Number(context) || 0;
    const dur = getDurationObj(duration);
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    if (dur.hrs < 1) {
      if (dur.min < 1) {
        if (dur.sec < 1) {
          return `${duration} ms`;
        }
        return `${dur.sec}.${dur.ms} s`;
      }
      return `${pad(dur.min)}:${pad(dur.sec)}.${dur.ms} m`;
    }
    return `${dur.hrs}:${pad(dur.min)}:${pad(dur.sec)}.${dur.ms} h`;
  });

  registerHelper('dateFormat', (context: unknown, format: unknown) => {
    const date = dayjs(context as string | Date);
    if (format === 'fromNow') {
      return date.fromNow();
    }
    return date.format(String(format));
  });

  registerHelper('inlineAsset', (context: unknown) => {
    // Compiled module lives in <package>/dist/{cjs,esm}; assets live in <package>/dist/*.
    const distDir = path.resolve(__dirname, '..');
    switch (context) {
      case 'styles':
        return readFileSync(path.join(distDir, 'css', 'mochawesome-64.css'), 'utf8');
      case 'scripts':
        return readFileSync(path.join(distDir, 'js', 'mochawesome.js'), 'utf8');
      default:
        return '';
    }
  });
}
