# mochawesome-screenshots
This is a fork of Mochawesome(MochawesomePlusPlus) reporter with added screenshots functionality for Protractor.
A reporter takes a screenshot after each failed Protractor test.

Installation of the module:
```
$ npm install mochawesome-screenshots --save-dev
```

Usage remains the same as the Mocahwesome.

In your Protractor configuration file:
```
  framework: 'mocha',

  mochaOpts: {
      reporter: 'mochawesome-screenshots',
      reporterOptions: {
          reportDir: 'customReportDir',
          reportName: 'customReportName',
          reportTitle: 'customReportTitle',
          takePassedScreenshot: false,
          clearOldScreenshots: true
      },
      timeout: 600000
  },
```