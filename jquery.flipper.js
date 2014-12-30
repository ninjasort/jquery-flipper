/**
 * jquery-flipper
 * Author: @cameronjroe
 * A simple way to add a CSS3 flip effect to your content.
 * Licensed under the MIT license
 */
;(function($, window, document, undefined) {

    $.widget('cjroe.flipper', {

        options: {
            _classPrefix: '_flipper',
            // the type of rotation applied to the element (left, right, up, down, left-slide, right-slide)
            rotationType: 'left',
            // the css perspective applied to the container of the rotating element
            depth: 1000,
            // the speed of the rotation
            speed: 0.5,
            // the event to listen for hover, click/touch, or keyCode {keyCode: 32}
            eventListener: 'hover'
        },

        _prefix: function (className) {
            return [this.options._classPrefix, className].join('-');
        },

        /**
         * Create widget
         * ======================================
         * Before DOM Construction
         * -----------------------
         * <section class="flipper-container">
         *     <div>Front Content</div>
         *     <div>Back Content</div>
         * </section>
         *
         * After DOM Construction
         * -----------------------
         * <section class="flipper-container">
         *     <div id="flipper-element">
         *         <div class="_flipper-front">Front Content</div>
         *         <div class="_flipper-back">Back Content</div>
         *     </div>
         * </section>
         */
        _create: function () {
            this._defaults = this.options;
            
            this.container = this.element;
            this.container.addClass('flipper-container');

            // append children to flipper element
            this.container
                .children()
                .filter(function (i) {
                    return i < 2;
                })
                .map(function (i, el) {
                    if (i === 0) {
                        this.front = $(el).addClass(this._prefix('front'));
                    } else if (i === 1) {
                        this.back = $(el).addClass(this._prefix('back'));
                    }
                    return el;
                }.bind(this))
                .wrapAll('<div class="flipper-element"></div>');
                
            // cache flipper element
            this.$el = this.container.find('.flipper-element');
            this.container.show();
            
            this._setOption('disabled', this.options.disabled);
            this._setDepth();
            this._setSpeed();
            this._setRotation();
            this._bindEvents();
        },

        _setSpeed: function (speed) {
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
                this.$el.css({
                    transition: 'all ' + _speed + 's ease'
                });
            } else {
                throw new Error(this.options.speed + ' must be typeof Number');
            }
        },

        _setDepth: function (v) {
            if ($.type(this.options.depth) === 'number'){
                var depth = parseInt(this.options.depth || v);
                if (depth > 2000) {
                    depth = 2000;
                } else if (depth < 100) {
                    depth = 100;
                }

                this.container.css({
                    perspective: depth + 'px'
                });
            } else {
                throw new Error(this.options.depth + ' must be typeof Number');
            }
        },

        _setRotation: function (v) {
            var $el = this.$el;
            if ( $el.hasClass(this._prefix(this.options.rotationType)) ) {
                $el.switchClass(this._prefix(this.options.rotationType), this._prefix(v));
            } else {
                $el.addClass(this._prefix(this.options.rotationType), this._prefix(v));
            }
        },

        _setOption: function (k, v) {
            
            switch(k) {
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
                default: return;
            }
            this._update(k, v);
        },

        toggleFlip: function (e) {
            this.$el.toggleClass('flipper-flipped');
        },

        _bindEvents: function (v) {

            if (v) {
                this.container.off();
                this.options.eventListener = v;
            }

            var isTouch = 'ontouchstart' in window,
                eStart = isTouch ? 'touchstart' : 'mousedown';

            if ($.isPlainObject(this.options.eventListener)) {
                var self = this;
                $(window).on(this.options.eventListener.type, function (e) {
                    if (e.keyCode === self.options.eventListener.keyCode) {
                        self.toggleFlip();
                        e.stopImmediatePropagation();
                    }
                });
            } else if (this.options.eventListener.match(/click|touch/i)) {
                this.container.on(eStart, this.toggleFlip.bind(this));
            } else if (this.options.eventListener.match(/hover/i)) {
                this.container[this.options.eventListener](this.toggleFlip.bind(this), this.toggleFlip.bind(this));
            } else {}
        },

        _update: function (k, v) {
            this.options[k] = v;
        },

        _destroy: function () {
            this.container.removeClass('flipper-container').attr('style', '');
            this.$el.attr('style', '').unwrap();
            this.front.removeClass(this._prefix('front')).attr('style', '');
            this.back.removeClass(this._prefix('back')).attr('style', '');
            this.remove();
        }

    });

}(jQuery, window, document));