var async = require('async'),
    fs = require('fs-extra'),
    path = require('path'),
    ncp = require('ncp'),
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
        return createDirs(config, true, _.noop);
    }
    async.auto({
        createDirs: function (callback) {
            // console.log('createDirs');
            // async code to create directories to store files
            createDirs(config, null, callback);
        },
        copyStyles: ['createDirs', function (callback) {
            // after creating directories,
            // copy styles to css dir
            copyStyles(config, callback);
        }],
        copyScripts: ['createDirs', function (callback) {
            // after creating directories,
            // copy scripts to js dir
            copyScripts(config, callback);
        }],
        copyFonts: ['createDirs', function (callback) {
            // after creating directories,
            // copy fonts to fonts dir
            copyFonts(config, callback);
        }]
    }, function (err, results) {
        // if (err) throw err;
        // console.log('err = ', err);
        // console.log('results = ', results);
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
    callback(null, 'done');
}

function copyFonts(config, callback) {
    ncp(config.buildFontsDir, config.reportFontsDir, function (err) {
        if (err) callback(err);
        callback(null, 'done');
    });
}

function copyStyles(config, callback) {
    ncp(config.buildCssDir, config.reportCssDir, function (err) {
        if (err) callback(err);
        callback(null, 'done');
    });
}

function copyScripts(config, callback) {
    ncp(config.buildJsDir, config.reportJsDir, function (err) {
        if (err) callback(err);
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
        console.log('Clear old screenshots: Success!')
    } catch (err) {
        console.log('\n[' + chalk.gray('mochawesome') + '] Error: Unable to clear old screenshots \n' + err + '\n');
    }
}

function saveScreenshotToFile(outFile, config) {
    try {
        switch (config.framework) {
            case "playwright":
            case "puppeteer":
                page.screenshot({path: outFile});
                break;
            case "webdriverio":
            case "nightwatchjs":
                browser.saveScreenshot(outFile);
                break;
            case "cypress":
                cy.screenshot('cy-screenshot', {
                    onAfterScreenshot($el, props) {
                        fs.copyFile(props.path, outFile);
                    }
                });
                break;
            case "protractor":
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
