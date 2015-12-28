/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	(function() {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * jquery-flipper
	 * Author: @cameronjroe
	 * A simple way to add a CSS3 flip effect to your content.
	 * Licensed under the MIT license
	 */

	_jquery2.default.widget('cjroe.flipper', {

	  options: {
	    _classPrefix: 'jqf',
	    // the type of rotation applied to the element (left, right, up, down, left-slide, right-slide)
	    rotationType: 'left',
	    // the css perspective applied to the container of the rotating element
	    depth: 1000,
	    // the speed of the rotation
	    speed: 0.5,
	    // the event to listen for hover, click/touch, or keyCode {keyCode: 32}
	    eventListener: 'hover'
	  },

	  _prefix: function _prefix(className) {
	    return [this.options._classPrefix, className].join('-');
	  },

	  /**
	   * Create widget
	   * ======================================
	   * Before DOM Construction
	   * -----------------------
	   * <section class="flipper-container">
	   *   <div>Front Content</div>
	   *   <div>Back Content</div>
	   * </section>
	   *
	   * After DOM Construction
	   * -----------------------
	   * <section class="flipper-container">
	   *   <div id="flipper-element">
	   *     <div class="_flipper-front">Front Content</div>
	   *     <div class="_flipper-back">Back Content</div>
	   *   </div>
	   * </section>
	   */
	  _create: function _create() {
	    var _this = this;

	    this._defaults = this.options;

	    this.element.addClass('container');

	    // append children to flipper element
	    this.element.children().filter(function (i) {
	      return i < 2;
	    }).map(function (i, el) {
	      if (i === 0) {
	        _this.front = (0, _jquery2.default)(el).addClass(_this._prefix('front'));
	      } else if (i === 1) {
	        _this.back = (0, _jquery2.default)(el).addClass(_this._prefix('back'));
	      }
	      return el;
	    }).wrapAll('<div class="jqf-el"></div>');

	    // cache flipper element
	    this.$el = this.element.find('.jqf');
	    this.element.show();

	    this._setOption('disabled', this.options.disabled);
	    this._setDepth();
	    this._setSpeed();
	    this._setRotation();
	    this._bindEvents();
	  },

	  _setSpeed: function _setSpeed(speed) {
	    if (_jquery2.default.type(this.options.speed) === 'number') {
	      var _speed = parseFloat(this.options.speed);
	      if (speed) {
	        if (speed > 2) {
	          _speed = 2.0;
	        } else if (speed < 0.1) {
	          _speed = 0.1;
	        } else {
	          _speed = speed;
	        }
	      }
	      this.$el.css({
	        transition: 'all ' + _speed + 's ease'
	      });
	    } else {
	      throw new Error(this.options.speed + ' must be typeof Number');
	    }
	  },

	  _setDepth: function _setDepth(v) {
	    if (_jquery2.default.type(this.options.depth) === 'number') {
	      var depth = parseInt(this.options.depth || v);
	      if (depth > 2000) {
	        depth = 2000;
	      } else if (depth < 100) {
	        depth = 100;
	      }

	      this.element.css({
	        perspective: depth + 'px'
	      });
	    } else {
	      throw new Error(this.options.depth + ' must be typeof Number');
	    }
	  },

	  _setRotation: function _setRotation(v) {
	    var $el = this.$el;
	    if ($el.hasClass(this._prefix(this.options.rotationType))) {
	      $el.switchClass(this._prefix(this.options.rotationType), this._prefix(v));
	    } else {
	      $el.addClass(this._prefix(this.options.rotationType), this._prefix(v));
	    }
	  },

	  _setOption: function _setOption(k, v) {

	    switch (k) {
	      case 'rotationType':
	        this._setRotation(v);
	        break;
	      case 'depth':
	        var depth = v = parseInt(v);
	        this._setDepth(depth);
	        break;
	      case 'speed':
	        var speed = v = parseFloat(v);
	        this._setSpeed(speed);
	        break;
	      case 'event':
	        this._bindEvents(v);
	        break;
	      default:
	        return;
	    }
	    this._update(k, v);
	  },

	  toggleFlip: function toggleFlip(e) {
	    this.$el.toggleClass('flipper-flipped');
	  },

	  _bindEvents: function _bindEvents(events) {
	    if (events) {
	      this.element.off();
	      this.options.eventListener = events;
	    }

	    var isTouch = 'ontouchstart' in window,
	        eStart = isTouch ? 'touchstart' : 'mousedown';

	    if (_jquery2.default.isPlainObject(this.options.eventListener)) {
	      var self = this;
	      (0, _jquery2.default)(window).on(this.options.eventListener.type, function (e) {
	        if (e.keyCode === self.options.eventListener.keyCode) {
	          self.toggleFlip();
	          e.stopImmediatePropagation();
	        }
	      });
	    } else if (this.options.eventListener.match(/click|touch/i)) {
	      this.element.on(eStart, this.toggleFlip.bind(this));
	    } else if (this.options.eventListener.match(/hover/i)) {
	      this.element[this.options.eventListener](this.toggleFlip.bind(this), this.toggleFlip.bind(this));
	    } else {}
	  },

	  _update: function _update(k, v) {
	    this.options[k] = v;
	  },

	  _destroy: function _destroy() {
	    this.element.removeClass('container').attr('style', '');
	    this.$el.attr('style', '').unwrap();
	    this.front.removeClass(this._prefix('front')).attr('style', '');
	    this.back.removeClass(this._prefix('back')).attr('style', '');
	    this.remove();
	  }

	});

	exports.default = _jquery2.default;
	}.call(window));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);