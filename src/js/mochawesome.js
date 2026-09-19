/**
 * Mochawesome report client script.
 * Vanilla JS + Chart.js 4 (bundled by esbuild at build time).
 */

import Chart from 'chart.js/auto';

const BREAKPOINTS = { sm: 768 };
const SCROLL_OFFSET = { mobile: 199, desktop: 89 };
const FILTER_CLASSES = 'filter-passed filter-failed filter-pending';

const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

const throttle = (fn, ms) => {
  let lastCall = 0;
  let timer;
  return (...args) => {
    const now = Date.now();
    const remaining = ms - (now - lastCall);
    if (remaining <= 0) {
      clearTimeout(timer);
      timer = undefined;
      lastCall = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = undefined;
        fn(...args);
      }, remaining);
    }
  };
};

class MochawesomeReport {
  constructor() {
    this.activeFilters = [];

    this.chartColors = {
      green: '#5cb85c',
      red: '#d9534f',
      ltGray: '#CCCCCC',
      ltBlue: '#5bc0de'
    };

    // Cached elements
    this.body = document.body;
    this.navbar = document.querySelector('.navbar');
    this.navOpenBtn = document.querySelector('.nav-menu-btn.open-menu');
    this.navMenu = document.querySelector('.nav-menu-wrap');
    this.summary = document.querySelector('.summary');
    this.quickSum = document.querySelector('.quick-summary');
    this.details = document.querySelector('.details');
    this.suites = Array.from(document.querySelectorAll('.suite'));
    this.filterBtns = Array.from(document.querySelectorAll('[data-filter]'));

    this.measure();
    this.initialize();
  }

  initialize() {
    for (const btn of this.filterBtns) {
      btn.addEventListener('click', (event) => this.onFilterClick(event));
    }
    this.navOpenBtn?.addEventListener('click', () => this.openNavMenu());
    for (const closeBtn of document.querySelectorAll('.close-menu')) {
      closeBtn.addEventListener('click', () => this.closeNavMenu());
    }
    for (const link of document.querySelectorAll('.nav-menu-item-link')) {
      link.addEventListener('click', (event) => this.goToSuite(event));
    }

    if (this.windowWidth >= BREAKPOINTS.sm) {
      this.listenToScroll(true);
    }

    window.addEventListener('resize', debounce(() => this.onWindowResize(), 200));
    document.addEventListener(
      'click',
      (event) => {
        const toggle = event.target.closest('[data-toggle="collapse"]');
        if (toggle) this.onCollapseToggle(toggle);
      },
      false
    );

    this.makeSuiteCharts();
  }

  measure() {
    this.windowWidth = window.innerWidth;
    this.windowScrollTop = window.scrollY;
    this.quickSummaryScrollOffset =
      (this.summary?.offsetHeight ?? 0) - (this.navbar?.offsetHeight ?? 0);
    this.scrolledPastQuickSummaryOffset = this.windowScrollTop > this.quickSummaryScrollOffset;
  }

  onFilterClick(event) {
    const el = event.currentTarget;

    if (
      el.classList.contains('qs-item') &&
      this.quickSum &&
      getComputedStyle(this.quickSum).opacity === '0'
    ) {
      return;
    }

    const filter = el.getAttribute('data-filter');
    const btns = document.querySelectorAll(`[data-filter="${filter}"]`);
    const filterIndex = this.activeFilters.indexOf(filter);
    const filterIsActive = filterIndex !== -1;

    if (filterIsActive) {
      this.activeFilters.splice(filterIndex, 1);
    } else {
      this.activeFilters.push(filter);
    }

    for (const btn of btns) {
      btn.classList.toggle('active', !filterIsActive);
    }
    this.updateFilteredTests();
  }

  onWindowScroll() {
    this.measure();

    if (this.scrolledPastQuickSummaryOffset && this.body.classList.contains('show-quick-summary')) {
      return;
    }

    this.body.classList.toggle('show-quick-summary', this.scrolledPastQuickSummaryOffset);
  }

  onWindowResize() {
    this.measure();

    if (this.windowWidth < BREAKPOINTS.sm && this.listeningToScroll) {
      this.listenToScroll(false);
    } else if (this.windowWidth >= BREAKPOINTS.sm && !this.listeningToScroll) {
      this.listenToScroll(true);
      this.body.classList.toggle('show-quick-summary', this.scrolledPastQuickSummaryOffset);
    }
  }

  getScrollOffset() {
    return this.windowWidth < BREAKPOINTS.sm ? SCROLL_OFFSET.mobile : SCROLL_OFFSET.desktop;
  }

  openNavMenu() {
    this.navMenu?.classList.add('open');
  }

  closeNavMenu() {
    this.navMenu?.classList.remove('open');
  }

  goToSuite(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href') ?? '';
    const target = href.startsWith('#') ? document.getElementById(href.slice(1)) : null;
    if (!target) return;
    const scrollY = target.getBoundingClientRect().top + window.scrollY - this.getScrollOffset();
    window.scrollTo(0, scrollY);
    this.closeNavMenu();
  }

  listenToScroll(start) {
    if (start) {
      if (!this.scrollHandler) {
        this.scrollHandler = throttle(() => this.onWindowScroll(), 200);
      }
      window.addEventListener('scroll', this.scrollHandler);
    } else {
      window.removeEventListener('scroll', this.scrollHandler);
      this.body.classList.remove('show-quick-summary');
    }
    this.listeningToScroll = start;
  }

  /**
   * Minimal replacement of the Bootstrap 3 collapse plugin.
   * Toggles `in` on the data-target elements and keeps the button's
   * `collapsed` class / aria-expanded state and Show/Hide text in sync.
   */
  onCollapseToggle(toggle) {
    const targetSelector = toggle.getAttribute('data-target');
    if (!targetSelector) return;

    const targets = document.querySelectorAll(targetSelector);
    let nowOpen = false;
    for (const target of targets) {
      nowOpen = target.classList.toggle('in');
    }

    toggle.classList.toggle('collapsed', !nowOpen);
    toggle.setAttribute('aria-expanded', String(nowOpen));

    const text = toggle.querySelector('.btn-text');
    if (text) {
      if (nowOpen) {
        text.textContent = text.textContent.replace('Show', 'Hide');
      } else {
        text.textContent = text.textContent.replace('Hide', 'Show');
      }
    }
  }

  updateFilteredTests() {
    const activeFiltersExist = this.activeFilters.length > 0;
    const filterClassesToAdd = this.activeFilters.map((filter) => `filter-${filter}`);

    if (this.details) {
      this.details.classList.remove(...FILTER_CLASSES.split(' '));
      this.details.classList.toggle('filters-active', activeFiltersExist);
      this.details.classList.add(...filterClassesToAdd);
    }

    for (const suite of this.suites) {
      suite.classList.toggle('hidden', activeFiltersExist);
    }

    if (activeFiltersExist) {
      // Tests carry their result as a class (.passed/.failed/.pending); the CSS
      // pairs .filters-active with .suite.has-* to reveal matching suites.
      const visibleTestSelector = this.activeFilters.map((filter) => `.test.${filter}`).join(',');
      for (let i = this.suites.length - 1; i >= 0; i--) {
        const suite = this.suites[i];
        if (suite.querySelector(visibleTestSelector)) {
          suite.classList.remove('hidden');
        }
      }
    }
  }

  makeSuiteCharts() {
    const canvases = Array.from(document.querySelectorAll('canvas.suite-chart'));

    for (const canvas of canvases) {
      const data = canvas.dataset;
      new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: ['Passed', 'Failed', 'Pending', 'Skipped'],
          datasets: [
            {
              data: [
                Number(data.totalPasses) || 0,
                Number(data.totalFailures) || 0,
                Number(data.totalPending) || 0,
                Number(data.totalSkipped) || 0
              ],
              backgroundColor: [
                this.chartColors.green,
                this.chartColors.red,
                this.chartColors.ltBlue,
                this.chartColors.ltGray
              ],
              borderColor: '#fff',
              borderWidth: 2
            }
          ]
        },
        options: {
          cutout: '60%',
          responsive: true,
          events: [],
          animation: canvases.length > 50 ? false : { duration: 800, easing: 'easeOutQuint' },
          plugins: { tooltip: { enabled: false }, legend: { display: false } }
        }
      });
    }
  }
}

new MochawesomeReport();
