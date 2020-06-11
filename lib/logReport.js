var chalk = require('chalk');
var stringify = require('json-stringify-safe');

var logReport = function logReport() {

    if ((!arguments[0].test && !arguments[0].ctx) || !arguments[1]) {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Invalid log report arguments.');
        return;
    }

    var test = arguments[0].test ? arguments[0].test: arguments[0];
    var data = arguments[1];

    if (!test.logr) {
        test.logr = eval(stringify(data,null,2));
    } else {
        test.logr += '<br>'+eval(stringify(data,null,2));
    }
};
var setReportName = function setReportName() {

    if ((!arguments[0].test && !arguments[0].ctx) || !arguments[1] || typeof arguments[1] !== 'string') {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Invalid arguments.');
        return;
    }

    var test = arguments[0].test ? arguments[0].test: arguments[0];
    test.reportName = arguments[1];
};

var setScreenshot = function setScreenshot() {

    if ((!arguments[0].test && !arguments[0].ctx) || !arguments[1] || typeof arguments[1] !== 'string') {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Invalid arguments.');
        return;
    }

    var test = arguments[0].test ? arguments[0].test: arguments[0];
    var scr = [arguments[1], arguments[2] ? arguments[2] : ''];
    if (!test.customScrFileName) {
        test.customScrFileName = [scr];
    } else {
        test.customScrFileName.push(scr);
    }
};

module.exports = {
    log:logReport,
    setReportName:setReportName,
    setScreenshot:setScreenshot
};
