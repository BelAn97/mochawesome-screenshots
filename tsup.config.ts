import { defineConfig } from 'tsup';

const entry = ['src/ts/mochawesome.ts', 'src/ts/logReport.ts', 'src/ts/utils.ts', 'src/ts/config.ts'];
// mocha is a peer dependency; the rest are regular runtime dependencies.
const external = ['mocha', 'handlebars', 'highlight.js', 'dayjs', 'diff', 'picocolors'];

export default defineConfig([
  {
    entry,
    format: ['esm'],
    outDir: 'dist/esm',
    outExtension: () => ({ js: '.js' }),
    dts: true,
    sourcemap: false,
    clean: true,
    shims: true,
    target: 'node20',
    external,
    silent: true
  },
  {
    entry,
    format: ['cjs'],
    outDir: 'dist/cjs',
    outExtension: () => ({ js: '.cjs' }),
    dts: true,
    sourcemap: false,
    clean: true,
    shims: true,
    target: 'node20',
    external,
    silent: true,
    // Mocha (and Cypress) `require()` the reporter and expect the constructor
    // itself as module.exports, not an ES-module namespace object.
    footer: {
      js: "if (module.exports.default) { module.exports = module.exports.default; }"
    }
  }
]);
