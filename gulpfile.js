/**
 * Gulp Build System
 */

'use strict';

const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const path = require('node:path');
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

const MOCHA_OPTS = {
  reporter: path.join(__dirname, 'lib', 'mochawesome'),
  timeout: 30000,
  slow: 1,
  exit: false
};

const WATCH_FILES = [
  path.join(config.srcLessDir, '*.less'),
  path.join(config.srcJsDir, '*.js'),
  path.join('!', config.srcJsDir, 'hbsHelpers.js'),
  path.join(config.srcHbsDir, '*.mu')
];

const LINT_PATHS = {
  server: './.jshintrc',
  client: './client.jshintrc',
  lint: ['./lib/*.js', '!./lib/templates.js', '!./lib/mochawesome.js'],
  felint: ['./src/js/*.js', '!./src/js/lodash.custom.js']
};

const processPartialName = (fileName) => JSON.stringify(path.basename(fileName, '.js'));

// ============================================
// LINTING TASKS
// ============================================

const svrlint = () => gulp
  .src(LINT_PATHS.lint)
  .pipe(jshint(LINT_PATHS.server))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));

const felint = () => gulp
  .src(LINT_PATHS.felint)
  .pipe(jshint(LINT_PATHS.client))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));

const lint = gulp.parallel(svrlint, felint);

// ============================================
// BUILD TASKS
// ============================================

const fonts = () => gulp
  .src(path.join(config.srcFontsDir, '*'))
  .pipe(gulp.dest(config.buildFontsDir));

const styles = () => gulp
  .src(path.join(config.srcLessDir, '[^_]*.less'))
  .pipe(plumber({ errorHandler: log }))
  .pipe(less({
    paths: [config.srcLessDir, config.bsLessDir, config.faLessDir],
    compress: true
  }))
  .pipe(plumber({ errorHandler: log }))
  .pipe(gulp.dest(config.buildCssDir));

const vendorScripts = () => gulp
  .src(config.vendorJsFiles)
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.buildJsDir));

const clientScripts = gulp.series(lint, () => gulp
  .src(config.clientJsFiles)
  .pipe(concat('mochawesome.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.buildJsDir)));

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
      { imports: { processPartialName } }
    ));

  const templateFiles = gulp
    .src(path.join(config.srcHbsDir, '[^_]*.mu'))
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      root: 'exports',
      noRedeclare: true,
      processName: (filePath) => declare.processNameByPath(
        filePath.replace('src/templates/'.replaceAll('/', path.sep), '')
      )
    }));

  const helpers = gulp.src(path.join(config.srcJsDir, 'hbsHelpers.js'));

  return merge(partials, templateFiles, helpers)
    .pipe(concat('templates.js'))
    .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
    .pipe(gulp.dest(config.libDir));
};

const assemble = gulp.parallel(fonts, styles, clientScripts, vendorScripts, templates);
const build = gulp.series(lint, assemble);

// ============================================
// WATCH TASKS
// ============================================

const TASK_MAP = { less: 'styles', js: 'clientScripts', mu: 'templates' };

const onWatchFileChanged = (file) => {
  const ext = file.path.slice(file.path.lastIndexOf('.') + 1);
  log(colors.yellow(`Change detected in ${file.path.replace(file.cwd, '')}`));

  if (TASK_MAP[ext]) {
    gulp.series(TASK_MAP[ext])();
  }
};

const watchTask = () => watch(WATCH_FILES, onWatchFileChanged);

// ============================================
// TEST TASKS
// ============================================

const test = () => gulp
  .src(['./test/smoke/playwright-smoke.js'])
  .pipe(mocha(MOCHA_OPTS))
  .on('error', console.warn.bind(console));

const memTest = () => gulp
  .src(['./test/basic/mem-test.js'])
  .pipe(mocha(MOCHA_OPTS))
  .on('error', console.warn.bind(console));

const testRecursive = () => gulp
  .src(['./test/basic'], { read: false })
  .pipe(mocha({ ...MOCHA_OPTS, recursive: true }))
  .on('error', console.warn.bind(console));

// ============================================
// EXPORTS
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
exports.default = test;
