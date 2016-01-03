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

	var _styles = __webpack_require__(2);

	var _styles2 = _interopRequireDefault(_styles);

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
	   * <section id="myFlipper">
	   *   <div>Front Content</div>
	   *   <div>Back Content</div>
	   * </section>
	   *
	   * After DOM Construction
	   * -----------------------
	   * <section id="myFlipper">
	   *   <div class="jqf-el">
	   *     <div class="jqf-front">Front Content</div>
	   *     <div class="jqf-back">Back Content</div>
	   *   </div>
	   * </section>
	   */
	  _create: function _create() {
	    var _this = this;

	    this.element.css(_styles2.default.container);
	    this.$el = (0, _jquery2.default)('<div class="jqf-el"></div>').css(_styles2.default.el);
	    this.flipped = false;

	    this._defaults = this.options;

	    this.element.addClass('container');

	    // append children to flipper element
	    this.element.children().filter(function (i) {
	      return i < 2;
	    }).map(function (i, el) {
	      if (i === 0) {
	        _this.front = (0, _jquery2.default)(el).addClass(_this._prefix('front'));
	        _this.front.css(_styles2.default.front);
	      } else if (i === 1) {
	        _this.back = (0, _jquery2.default)(el).addClass(_this._prefix('back'));
	        _this.back.css(_styles2.default.back);
	      }
	      return el;
	    }).wrapAll(this.$el);

	    this.element.show();

	    this._setOption('disabled', this.options.disabled);
	    this._setDepth();
	    this._setSpeed();
	    this._setRotation(this._defaults.rotationType);
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
	      (0, _jquery2.default)('.jqf-el').css('transition', 'all ' + _speed + 's ease');
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
	    // left, right, up, down, left-slide, right-slide
	    switch (v) {
	      case 'left':
	        this.selectedFlip = _styles2.default.left;
	        break;
	      case 'right':
	        this.selectedFlip = _styles2.default.right;
	        break;
	      case 'up':
	        this.selectedFlip = _styles2.default.up;
	        break;
	      case 'down':
	        this.selectedFlip = _styles2.default.down;
	        break;
	      case 'left-slide':
	        this.selectedFlip = _styles2.default.leftSlide;
	        break;
	      case 'right-slide':
	        this.selectedFlip = _styles2.default.rightSlide;
	        break;
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
	    if (this.flipped) {
	      (0, _jquery2.default)('.jqf-el').css(_styles2.default.default);
	    } else {
	      // set the parent styles
	      if (this.selectedFlip.parent) {
	        (0, _jquery2.default)('.jqf-el').parent().css(this.selectedFlip.parent);
	      }
	      // back styling
	      (0, _jquery2.default)('.jqf-el > .jqf-back').css(_styles2.default.back);
	      // set other element styles k, v
	      if (this.selectedFlip.finds) {
	        for (var f in this.selectedFlip.finds) {
	          (0, _jquery2.default)('.jqf-el').find(f).css(this.selectedFlip.finds[f]);
	        }
	      }
	      // set the element's style
	      (0, _jquery2.default)('.jqf-el').css(this.selectedFlip.flipper);
	      console.log((0, _jquery2.default)('.jqf-el').get(0));
	    }
	    this.flipped = !this.flipped;
	  },
	  _handleAction: function _handleAction(e) {
	    if (e.keyCode === this.options.eventListener.keyCode) {
	      this.toggleFlip();
	      e.stopImmediatePropagation();
	    }
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
	      (0, _jquery2.default)(window).on(this.options.eventListener.type, this._handleAction.bind(this));
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

	/*** IMPORTS FROM imports-loader ***/
	(function() {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * jQuery Flipper Styles
	 */

	exports.default = {
	  container: {
	    'position': 'relative',
	    'perspective': '1000px'
	  },
	  el: {
	    'position': 'relative',
	    'display': 'inline-block',
	    'width': '100%',
	    'height': '100%',
	    'transform-style': 'preserve-3d',
	    'transition': 'all 0.5s ease'
	  },
	  front: {
	    'position': 'relative',
	    'z-index': 2,
	    'width': '100%',
	    'height': '100%',
	    'backface-visibility': 'hidden',
	    'transform': 'translateZ(1px)'
	  },
	  back: {
	    'position': 'absolute',
	    'top': 0,
	    'left': 0,
	    'width': '100%',
	    'height': '100%',
	    'z-index': 0,
	    'backface-visibility': 'hidden',
	    'transform': 'rotate3d(0, 1, 0, 180deg) translateZ(1px)'
	  },
	  default: {
	    'transform': 'rotate3d(0, 1, 0, 0)'
	  },
	  right: {
	    flipper: {
	      'transform-origin': 'center center',
	      'transform': 'rotate3d(0, 1, 0, -180deg)'
	    }
	  },
	  left: {
	    flipper: {
	      'transform-origin': 'center center',
	      'transform': 'rotate3d(0, 1, 0, 180deg)'
	    }
	  },
	  rightSlide: {
	    flipper: {
	      'transform-origin': 'center right',
	      'transform': 'translateX(-100%) rotate3d(0, 1, 0, -180deg)'
	    }
	  },
	  leftSlide: {
	    flipper: {
	      'transform-origin': 'center left',
	      'transform': 'translateX(100%) rotate3d(0, 1, 0, 180deg)'
	    }
	  },
	  up: {
	    parent: {
	      'transform-origin': 'center center'
	    },
	    finds: {
	      '> .jqf-back': {
	        'transform': 'rotate3d(1, 0, 0, 180deg) translateZ(1px)'
	      }
	    },
	    flipper: {
	      'transform': 'rotate3d(1, 0, 0, 180deg)'
	    }
	  },
	  down: {
	    parent: {
	      'transform-origin': 'center center'
	    },
	    finds: {
	      '> .jqf-back': {
	        'transform': 'rotate3d(1, 0, 0, 180deg) translateZ(1px)'
	      }
	    },
	    flipper: {
	      'transform': 'rotate3d(1, 0, 0, -180deg)'
	    }
	  }
	};
	}.call(window));

/***/ }
/******/ ]);