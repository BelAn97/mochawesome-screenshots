/* global page, browser, cy */
var async = require('async'),
    fs = require('fs-extra'),
    path = require('path'),
    _ = require('lodash'),
    chalk = require('chalk'),
    mkdirp = require('mkdirp');

exports.generateReport = generateReport;
exports.saveToFile = saveToFile;
exports.saveScreenshotToFile = saveScreenshotToFile;
exports.clearScreenshots = clearScreenshots;

function generateReport(config) {
    console.log('[' + chalk.gray('mochawesome') + '] Generating report files...\n');
    if (config.inlineAssets) {
        createDirs(config, true);
        return;
    }
    async.series([
        function (callback) {
            createDirs(config, null, callback);
        },
        function (callback) {
            copyFiles(config.buildFontsDir, config.reportFontsDir, callback);
        },
        function (callback) {
            copyFiles(config.buildCssDir, config.reportCssDir, callback);
        },
        function (callback) {
            copyFiles(config.buildJsDir, config.reportJsDir, callback);
        }
    ], function (err) {
        if (err) {
            console.log('\n[' + chalk.gray('mochawesome') + '] Error: Unable to generate report files\n' + err + '\n');
        }
    });
}

function createDirs(config, inline, callback) {
    var dirs = [config.reportDir];
    if (!inline) {
        dirs = dirs.concat([config.reportJsDir, config.reportFontsDir, config.reportCssDir, config.reportScreenshotDir]);
    }
    dirs.forEach(function (dir) {
        mkdirp.sync(dir);
    });
    if (callback) {
        callback(null, 'done');
    }
}

function copyFiles(srcDir, destDir, callback) {
    fs.copy(srcDir, destDir, { overwrite: true }, function (err) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, 'done');
    });
}

function saveToFile(data, outFile, callback) {
    var writeFile;
    try {
        writeFile = fs.openSync(outFile, 'w');
        fs.writeSync(writeFile, data);
        fs.closeSync(writeFile);
        callback(null, outFile);
    } catch (err) {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Unable to save ' + outFile + '\n' + err + '\n');
        callback(err);
    }
}

function clearScreenshots(config) {
    try {
        fs.emptyDirSync(config.reportScreenshotDir);
        console.log('Clear old screenshots: Success!');
    } catch (err) {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Unable to clear old screenshots \n' + err + '\n');
    }
}

function saveScreenshotToFile(outFile, config) {
    try {
        switch (config.framework) {
            case 'playwright':
            case 'puppeteer':
                page.screenshot({path: outFile});
                break;
            case 'webdriverio':
            case 'nightwatchjs':
                browser.saveScreenshot(outFile);
                break;
            case 'cypress':
                cy.screenshot('cy-screenshot', {
                    onAfterScreenshot: function($el, props) {
                        fs.copyFile(props.path, outFile);
                    }
                });
                break;
            case 'protractor':
            default:
                if (typeof browser === 'undefined') {
                    return;
                }
                var file = path.resolve(outFile);
                browser.takeScreenshot().then(function (png) {
                    fs.writeFileSync(file, png, {encoding: 'base64'});
                }, function (err) {
                    console.log('\n[' + chalk.gray('mochawesome') + '] Error: Unable to save screenshot - ' + outFile + '\n' + err + '\n');
                });
        }
    } catch (err) {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Unable to save screenshot - ' + outFile + '\n' + err + '\n');
    }
}
