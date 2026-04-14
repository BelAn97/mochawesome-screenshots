/**
 * Gulp Build System - Modern ES6+ syntax
 * Gulp 4+ with clean task definitions
 */

'use strict';

const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const path = require('path');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const watch = require('gulp-watch');
const mocha = require('gulp-mocha');
const config = require('./lib/config')();

// Mocha options
const mochaOpts = {
  reporter: path.join(__dirname, 'lib', 'mochawesome'),
  timeout: 30000,
  slow: 1,
  exit: false
};

// Watch files
const watchFiles = [
  path.join(config.srcLessDir, '*.less'),
  path.join(config.srcJsDir, '*.js'),
  path.join('!', config.srcJsDir, 'hbsHelpers.js'),
  path.join(config.srcHbsDir, '*.mu')
];

// Test paths
const testPaths = {
  basic: ['./test/basic/test.js'],
  mem: ['./test/basic/mem-test.js'],
  recursive: ['./test/basic'],
  fiveby: ['./test/fiveby/*.js', './test/fiveby/**/*.js']
};

// Lint paths
const lintPaths = {
  server: './.jshintrc',
  client: './client.jshintrc',
  lint: ['./lib/*.js', '!./lib/templates.js', '!./lib/mochawesome.js'],
  felint: ['./src/js/*.js', '!./src/js/lodash.custom.js']
};

/**
 * Watch file change handler
 */
function onWatchFileChanged(file) {
  const ext = file.path.slice(file.path.lastIndexOf('.') + 1);
  log(colors.yellow(`Change detected in ${file.path.replace(file.cwd, '')}`));

  const taskMap = {
    less: 'styles',
    js: 'clientScripts',
    mu: 'templates'
  };

  if (taskMap[ext]) {
    gulp.series(taskMap[ext])();
  }
}

// ============================================
// LINTING TASKS
// ============================================

/**
 * Lint server-side JS
 */
const svrlint = () => gulp
  .src(lintPaths.lint)
  .pipe(jshint(lintPaths.server))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));

/**
 * Lint client-side JS
 */
const felint = () => gulp
  .src(lintPaths.felint)
  .pipe(jshint(lintPaths.client))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));

/**
 * Run all linting
 */
const lint = gulp.parallel(svrlint, felint);

// ============================================
// BUILD TASKS
// ============================================

/**
 * Copy fonts
 */
const fonts = () => gulp
  .src(path.join(config.srcFontsDir, '*'))
  .pipe(gulp.dest(config.buildFontsDir));

/**
 * Compile LESS to CSS
 */
const styles = () => gulp
  .src(path.join(config.srcLessDir, '[^_]*.less'))
  .pipe(plumber({ errorHandler: log }))
  .pipe(less({
    paths: [config.srcLessDir, config.bsLessDir, config.faLessDir],
    compress: true
  }))
  .pipe(plumber({ errorHandler: log }))
  .pipe(gulp.dest(config.buildCssDir));

/**
 * Concat and minify vendor scripts
 */
const vendorScripts = () => gulp
  .src(config.vendorJsFiles)
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.buildJsDir));

/**
 * Concat and minify client scripts
 */
const clientScripts = gulp.series(lint, () => gulp
  .src(config.clientJsFiles)
  .pipe(concat('mochawesome.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.buildJsDir)));

/**
 * Compile Handlebars templates
 */
const templates = () => {
  const partials = gulp
    .src(path.join(config.srcHbsDir, '_*.mu'))
    .pipe(handlebars({
      handlebars: require('handlebars'),
      compilerOptions: { preventIndent: true }
    }))
    .pipe(wrap(
      'Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));',
      {},
      {
        imports: {
          processPartialName: (fileName) => JSON.stringify(path.basename(fileName, '.js'))
        }
      }
    ));

  const templateFiles = gulp
    .src(path.join(config.srcHbsDir, '[^_]*.mu'))
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      root: 'exports',
      noRedeclare: true,
      processName: (filePath) => declare.processNameByPath(
        filePath.replace('src/templates/'.replace(/\//g, path.sep), '')
      )
    }));

  const helpers = gulp.src(path.join(config.srcJsDir, 'hbsHelpers.js'));

  return merge(partials, templateFiles, helpers)
    .pipe(concat('templates.js'))
    .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
    .pipe(gulp.dest(config.libDir));
};

// ============================================
// WATCH TASKS
// ============================================

/**
 * Watch for file changes
 */
const watchTask = () => {
  watch(watchFiles, onWatchFileChanged);
};

// ============================================
// TEST TASKS
// ============================================

/**
 * Run basic tests
 */
const test = () => gulp
  .src(testPaths.basic)
  .pipe(mocha(mochaOpts))
  .on('error', console.warn.bind(console));

/**
 * Run memory tests
 */
const memTest = () => gulp
  .src(testPaths.mem)
  .pipe(mocha(mochaOpts))
  .on('error', console.warn.bind(console));

/**
 * Run recursive tests
 */
const testRecursive = () => {
  mochaOpts.recursive = true;
  return gulp
    .src(testPaths.recursive)
    .pipe(mocha(mochaOpts))
    .on('error', console.warn.bind(console));
};

// ============================================
// COMPOSITE TASKS
// ============================================

/**
 * Assemble all build artifacts
 */
const assemble = gulp.parallel(fonts, styles, clientScripts, vendorScripts, templates);

/**
 * Full build (lint + assemble)
 */
const build = gulp.series(lint, assemble);

/**
 * Default task (run tests)
 */
const defaultTask = gulp.series(test);

// ============================================
// EXPORT TASKS
// ============================================

exports.fonts = fonts;
exports.styles = styles;
exports.vendorScripts = vendorScripts;
exports.clientScripts = clientScripts;
exports.templates = templates;
exports.svrlint = svrlint;
exports.felint = felint;
exports.lint = lint;
exports.watch = watchTask;
exports.test = test;
exports.memTest = memTest;
exports.testRecursive = testRecursive;
exports.assemble = assemble;
exports.build = build;
exports.default = defaultTask;
