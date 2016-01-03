/**
 * jquery-flipper
 * Author: @cameronjroe
 * A simple way to add a CSS3 flip effect to your content.
 * Licensed under the MIT license
 */
import $ from 'jquery';
import styles from './styles';

$.widget('cjroe.flipper', {

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

  _prefix(className) {
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
  _create() {

    this.element.css(styles.container);
    this.$el = $('<div class="jqf-el"></div>').css(styles.el);
    this.flipped = false;

    this._defaults = this.options;

    this.element.addClass('container');

    // append children to flipper element
    this.element
      .children()
      .filter((i) => {
        return i < 2;
      })
      .map((i, el) => {
        if (i === 0) {
          this.front = $(el).addClass(this._prefix('front'));
          this.front.css(styles.front);
        } else if (i === 1) {
          this.back = $(el).addClass(this._prefix('back'));
          this.back.css(styles.back);
        }
        return el;
      })
      .wrapAll(this.$el);

    this.element.show();

    this._setOption('disabled', this.options.disabled);
    this._setDepth();
    this._setSpeed();
    this._setRotation(this._defaults.rotationType);
    this._bindEvents();
  },

  _setSpeed(speed) {
    if ($.type(this.options.speed) === 'number') {
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
      $('.jqf-el').css('transition', 'all ' + _speed + 's ease');
    } else {
      throw new Error(this.options.speed + ' must be typeof Number');
    }
  },

  _setDepth(v) {
    if ($.type(this.options.depth) === 'number') {
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

  _setRotation(v) {
    var $el = this.$el;
    // left, right, up, down, left-slide, right-slide
    switch(v) {
      case 'left':
        this.selectedFlip = styles.left;
        break;
      case 'right':
        this.selectedFlip = styles.right;
        break;
      case 'up':
        this.selectedFlip = styles.up;
        break;
      case 'down':
        this.selectedFlip = styles.down;
        break;
      case 'left-slide':
        this.selectedFlip = styles.leftSlide;
        break;
      case 'right-slide':
        this.selectedFlip = styles.rightSlide;
        break;
    }
  },

  _setOption(k, v) {

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

  toggleFlip(e) {
    if (this.flipped) {
      $('.jqf-el').css(styles.default);
    } else {
      // set the parent styles
      if (this.selectedFlip.parent) {
        $('.jqf-el').parent().css(this.selectedFlip.parent);
      }
      // back styling
      $('.jqf-el > .jqf-back').css(styles.back);
      // set other element styles k, v
      if (this.selectedFlip.finds) {
        for (var f in this.selectedFlip.finds) {
          $('.jqf-el').find(f).css(this.selectedFlip.finds[f]);
        }
      }
      // set the element's style
      $('.jqf-el').css(this.selectedFlip.flipper);
      console.log($('.jqf-el').get(0));
    }
    this.flipped = !this.flipped;
  },

  _handleAction(e) {
    if (e.keyCode === this.options.eventListener.keyCode) {
      this.toggleFlip();
      e.stopImmediatePropagation();
    }
  },

  _bindEvents(events) {
    if (events) {
      this.element.off();
      this.options.eventListener = events;
    }

    var isTouch = 'ontouchstart' in window,
      eStart = isTouch ? 'touchstart' : 'mousedown';

    if ($.isPlainObject(this.options.eventListener)) {
      var self = this;
      $(window).on(this.options.eventListener.type, this._handleAction.bind(this));
    } else if (this.options.eventListener.match(/click|touch/i)) {
      this.element.on(eStart, this.toggleFlip.bind(this));
    } else if (this.options.eventListener.match(/hover/i)) {
      this.element[this.options.eventListener](this.toggleFlip.bind(this), this.toggleFlip.bind(this));
    } else {}
  },

  _update(k, v) {
    this.options[k] = v;
  },

  _destroy() {
    this.element.removeClass('container').attr('style', '');
    this.$el.attr('style', '').unwrap();
    this.front.removeClass(this._prefix('front')).attr('style', '');
    this.back.removeClass(this._prefix('back')).attr('style', '');
    this.remove();
  }

});


export default $;