/* jshint strict: false */
/* global window, Chart, _ */

(function ($, Chart, _) {
  'use strict';
  let self;

  const Mochawesome = function () {
    this.filterClasses = 'filter-passed filter-failed filter-pending';
    this.activeFilters = [];

    this.chartOpts = {
      percentageInnerCutout: 60,
      segmentShowStroke: true,
      segmentStrokeWidth: 2,
      animationEasing: 'easeOutQuint',
      showTooltips: false,
      responsive: true
    };

    this.chartColors = {
      green: '#5cb85c',
      red: '#d9534f',
      gray: '#999999',
      ltGray: '#CCCCCC',
      ltBlue: '#5bc0de'
    };

    this.breakpoints = {
      sm: 768,
      md: 992,
      lg: 1200
    };

    // Cache Elements
    this.$window = $(window);
    this.$body = $('body');
    this.$navbar = $('.navbar');
    this.$navOpenBtn = $('.nav-menu-btn.open-menu');
    this.$navCloseBtn = $('.close-menu');
    this.$navMenu = $('.nav-menu-wrap');
    this.$navMenuLink = $('.nav-menu-item-link');
    this.$summary = $('.summary');
    this.$statusBar = $('.statusbar');
    this.$quickSum = $('.quick-summary');
    this.$details = $('.details');
    this.$suites = $('.suite');
    this.$filterBtns = $('[data-filter]');
    this.$suiteCharts = $('.suite-chart');

    this._setMeasurements();
    this.listeningToScroll = this.windowWidth >= this.breakpoints.sm;

    self = this;
    this.initialize();
  };

  Mochawesome.prototype.initialize = function () {
    this.$filterBtns.on('click', self._onFilterClick.bind(self));
    this.$navOpenBtn.on('click', self.openNavMenu.bind(self));
    this.$navCloseBtn.on('click', self.closeNavMenu.bind(self));
    this.$navMenuLink.on('click', self.goToSuite.bind(self));

    if (this.windowWidth > this.breakpoints.sm) {
      this.listenToScroll(true);
    }

    this.$window.on('resize', _.debounce(self._onWindowResize.bind(self), 200));
    this.makeSuiteCharts();
    this.setupToggleButtons();
  };

  Mochawesome.prototype.setupToggleButtons = function () {
    $(document).on('click', '.toggle-btn', function () {
      const $btn = $(this);
      const $span = $btn.find('.btn-text');
      const currentText = $span.text();

      if (currentText.indexOf('Show') === 0) {
        $span.text(currentText.replace('Show', 'Hide'));
      } else {
        $span.text(currentText.replace('Hide', 'Show'));
      }
    });
  };

  Mochawesome.prototype._setMeasurements = function () {
    this.windowWidth = this.$window.outerWidth();
    this.windowScrollTop = this.$window.scrollTop();
    this.quickSummaryScrollOffset = this.$summary.outerHeight() - this.$navbar.outerHeight();
    this.scrolledPastQuickSummaryOffset = this.windowScrollTop > this.quickSummaryScrollOffset;
  };

  Mochawesome.prototype._onFilterClick = function (e) {
    const $el = $(e.currentTarget);

    if ($el.hasClass('qs-item') && this.$quickSum.css('opacity') === '0') {
      return;
    }

    const filter = $el.data('filter');
    const $btns = $('[data-filter=' + filter + ']');
    const filterIndex = this.activeFilters.indexOf(filter);
    const filterIsActive = filterIndex !== -1;

    if (filterIsActive) {
      this.activeFilters.splice(filterIndex, 1);
    } else {
      this.activeFilters.push(filter);
    }

    $btns.toggleClass('active', !filterIsActive);
    this.updateFilteredTests();
  };

  Mochawesome.prototype._onWindowScroll = function () {
    this._setMeasurements();

    if (this.scrolledPastQuickSummaryOffset && this.$body.hasClass('show-quick-summary')) {
      return;
    }

    this.$body.toggleClass('show-quick-summary', this.scrolledPastQuickSummaryOffset);
  };

  Mochawesome.prototype._onWindowResize = function () {
    this._setMeasurements();

    if (this.windowWidth < this.breakpoints.sm && this.listeningToScroll) {
      this.listenToScroll(false);
    } else if (this.windowWidth >= this.breakpoints.sm && !this.listeningToScroll) {
      this.listenToScroll(true);
      this.$body.toggleClass('show-quick-summary', this.scrolledPastQuickSummaryOffset);
    }
  };

  Mochawesome.prototype._getScrollOffset = function () {
    return this.windowWidth < this.breakpoints.sm ? 199 : 89;
  };

  Mochawesome.prototype.openNavMenu = function () {
    this.$navMenu.addClass('open');
  };

  Mochawesome.prototype.closeNavMenu = function () {
    this.$navMenu.removeClass('open');
  };

  Mochawesome.prototype.goToSuite = function (e) {
    e.preventDefault();
    const offset = this._getScrollOffset();
    const scrollY = $(e.currentTarget.getAttribute('href')).offset().top - offset;
    window.scrollTo(0, scrollY);
    this.closeNavMenu();
  };

  Mochawesome.prototype.listenToScroll = function (start) {
    if (start) {
      this.$window.on('scroll', _.throttle(self._onWindowScroll.bind(self), 200));
    } else {
      this.$window.off('scroll');
      this.$body.removeClass('show-quick-summary');
    }
    this.listeningToScroll = start;
  };

  Mochawesome.prototype._createFilterClasses = function (prefix) {
    return this.activeFilters.map(function (activeFilter) {
      return prefix + activeFilter;
    });
  };

  Mochawesome.prototype.updateFilteredTests = function () {
    const activeFiltersExist = this.activeFilters.length > 0;
    const filterClassesToAdd = this._createFilterClasses('filter-');
    const testClassesToFilter = this._createFilterClasses('.');

    this.$details
      .removeClass(this.filterClasses)
      .toggleClass('filters-active', activeFiltersExist);

    if (filterClassesToAdd.length) {
      this.$details.addClass(filterClassesToAdd.join(' '));
    }

    this.$suites.toggleClass('hidden', activeFiltersExist);

    if (activeFiltersExist) {
      for (let i = this.$suites.length - 1; i >= 0; i--) {
        const $suite = this.$suites.eq(i);
        const hasVisibleTests = $suite.find('.test').filter(testClassesToFilter.join()).length > 0;
        if (hasVisibleTests) {
          $suite.removeClass('hidden');
        }
      }
    }
  };

  Mochawesome.prototype.makeSuiteCharts = function () {
    if (this.$suiteCharts.length > 50) {
      this.chartOpts.animation = false;
    }

    for (let i = 0; i < this.$suiteCharts.length; i++) {
      const $chart = this.$suiteCharts.eq(i);
      const ctx = $chart[0].getContext('2d');
      const data = $chart.data();

      const chartData = [
        { value: data.totalPasses * 10, color: this.chartColors.green, highlight: this.chartColors.gray, label: 'Passed' },
        { value: data.totalFailures * 10, color: this.chartColors.red, highlight: this.chartColors.gray, label: 'Failed' },
        { value: data.totalPending * 10, color: this.chartColors.ltBlue, highlight: this.chartColors.gray, label: 'Pending' },
        { value: data.totalSkipped * 10, color: this.chartColors.ltGray, highlight: this.chartColors.gray, label: 'Skipped' }
      ];

      const chart = new Chart(ctx);
      chart.Doughnut(chartData, this.chartOpts);
    }
  };

  new Mochawesome();

})(jQuery, Chart, _);
