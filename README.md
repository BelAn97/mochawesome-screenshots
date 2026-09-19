# mochawesome-screenshots

This is a fork of Mochawesome (MochawesomePlusPlus) reporter with added screenshots functionality.

The reporter takes a screenshot after each failed test.

Installation of the module:

```
$ npm install mochawesome-screenshots --save-dev
```

Usage remains the same as Mochawesome. Works with both `require()` (CJS) and `import` (ESM):

```js
// CommonJS
const Mochawesome = require('mochawesome-screenshots');
const logReport = require('mochawesome-screenshots/logReport');

// ES modules
import Mochawesome from 'mochawesome-screenshots';
import { log, setScreenshot, setReportName } from 'mochawesome-screenshots/logReport';
```

Requires Node.js >= 20 and Mocha >= 10.

## Reporter options

| Option | Description |
| --- | --- |
| `reportDir` | Report output directory (default `./mochawesome-reports`) |
| `reportName` | Report file name (default `mochawesome`) |
| `reportTitle` | Report title shown in the navbar |
| `reportPageTitle` | Browser tab title |
| `takePassedScreenshot` | Take screenshots of passed tests too |
| `clearOldScreenshots` | Clear the screenshots folder on start |
| `shortScrFileNames` | Use short screenshot file names |
| `jsonReport` | Also save a `.json` report |
| `multiReport` | Add a timestamp to the report file name (parallel runs) |
| `inlineAssets` | Embed CSS/JS into the HTML instead of linking |
| `autoOpen` | Open the report in the browser after the run |
| `screenshotDelay` | Delay in ms before the report is written (default `500`), lets async screenshot pipelines settle |

Every option can also be set via a `MOCHAWESOME_<OPTION>` environment variable.

For protractor - configuration file example:

```
  framework: 'mocha',

  mochaOpts: {
      reporter: 'mochawesome-screenshots',
      reporterOptions: {
          reportDir: 'customReportDir',
          reportName: 'customReportName',
          reportTitle: 'customReportTitle',
          reportPageTitle: 'customReportPageTitle',
          takePassedScreenshot: false,
          clearOldScreenshots: true,
          shortScrFileNames: false,
          jsonReport: false,
          multiReport: false
      },
      timeout: 600000
  },
```

For playwright and puppeteer:

* Make global your "page" variable.
* Add reporterOptions:
```
framework: playwright (puppeteer)
```
For cypress:
```
framework: cypress
```
For webdriver.io:
```
framework: webdriverio
```
For nightwatch.js:
```
framework: nightwatchjs
```

Use 'multiReport = true' for parallel test execution (adding timestamp in report file name),
 or change report name in tests or hooks for shardTestFiles option:

    const logReport = require('mochawesome-screenshots/logReport');
        
    it('Change report name', function() {
        logReport.setReportName(this, 'customReportName');
    });

Log data to report:

    const logReport = require('mochawesome-screenshots/logReport');

    it('Log build number', function() {
        logReport.log(this, 'build number:' + buildNumber);
    });

Add custom screenshots from mochawesome-reports/screenshots folder to report:

    it('Custom screenshot', function() {
        ..
        save screenshot 1 to ('./mochawesome-reports/screenshots/'+imageFileName1);
        save screenshot 2 to ('./mochawesome-reports/screenshots/'+imageFileName2);
        ..
        logReport.setScreenshot(this, imageFileName1, 'message1');
        logReport.setScreenshot(this, imageFileName2, 'message2');
    });

## Development

The reporter runtime is written in strict TypeScript and published as a dual
CJS + ESM package. The report client is vanilla JS bundled with esbuild
(Chart.js 4 included); styles are LESS on top of Bootstrap 3.

```
$ npm install          # install dependencies
$ npm run build        # templates -> lib (tsup, CJS+ESM) -> assets (less/esbuild)
$ npm run dev          # watch mode (tsup + templates + less + client)
$ npm test             # build + unit tests (node:test) + smoke tests (mocha + playwright)
$ npm run lint         # eslint (flat config) + tsc --noEmit
$ npm run format       # prettier
```

Layout:

```
src/ts/         reporter runtime (TypeScript, strict)
src/js/         report client script (vanilla JS + Chart.js)
src/less/       report styles (LESS + Bootstrap 3)
src/templates/  Handlebars templates (.mu)
scripts/        build scripts (templates, assets, watch)
dist/           build output (published to npm)
e2e/            smoke tests that dogfood the reporter
test/unit/      unit tests (node:test runner)
```

CI runs lint, build and tests on Node 20/22/24 via GitHub Actions.

## Changelog

See [changelog.md](./changelog.md).
