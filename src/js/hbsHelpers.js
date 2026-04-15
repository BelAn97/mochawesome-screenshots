/* global Handlebars, __dirname */
/* jshint strict: false, esversion: 6 */

(function () {
  'use strict';

  const moment = require('moment');
  const path = require('node:path');
  const fs = require('node:fs');

function getDurationObj(durationInMilliseconds) {
  const dur = moment.duration(durationInMilliseconds, 'ms');
  return {
    duration: dur,
    hrs: dur.get('h'),
    min: dur.get('m'),
    sec: dur.get('s'),
    ms: dur.get('ms')
  };
}

Handlebars.registerHelper('isBlank', function (context, options) {
  return context === '' ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('getPlural', function (context) {
  return context === 1 ? '' : 's';
});

Handlebars.registerHelper('formatSummaryDuration', function (context) {
  const dur = getDurationObj(context);
  if (dur.hrs < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return context;
      }
      return dur.sec + '.' + dur.ms;
    }
    return dur.min + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec);
  }
  return dur.hrs + ':' + (dur.min < 10 ? ('0' + dur.min) : dur.min);
});

Handlebars.registerHelper('getSummaryDurationUnits', function (context) {
  const dur = getDurationObj(context);
  if (dur.hrs < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return 'MS';
      }
      return 'S';
    }
    return 'M';
  }
  return 'H';
});

Handlebars.registerHelper('formatDuration', function (context) {
  const dur = getDurationObj(context);
  if (dur.hrs < 1) {
    if (dur.min < 1) {
      if (dur.sec < 1) {
        return context + ' ms';
      }
      return dur.sec + '.' + dur.ms + ' s';
    }
    return dur.min + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec) + '.' + dur.ms + ' m';
  }
  return dur.hrs + ':' + (dur.min < 10 ? ('0' + dur.min) : dur.min) + ':' + (dur.sec < 10 ? ('0' + dur.sec) : dur.sec) + '.' + dur.ms + ' h';
});

Handlebars.registerHelper('dateFormat', function (context, format) {
  if (format === 'fromNow') {
    return moment(context).fromNow();
  }
  return moment(context).format(format);
});

Handlebars.registerHelper('inlineAsset', function (context) {
  const distDir = path.join(__dirname, '..', 'dist');
  switch (context) {
    case 'styles':
      return fs.readFileSync(path.join(distDir, 'css', 'mochawesome-64.css'));
    case 'scripts': {
      const vendorScripts = fs.readFileSync(path.join(distDir, 'js', 'vendor.js'));
      const mochawesomeScript = fs.readFileSync(path.join(distDir, 'js', 'mochawesome.js'));
      return vendorScripts + '\n' + mochawesomeScript;
    }
    default:
      return '';
  }
});

})();
