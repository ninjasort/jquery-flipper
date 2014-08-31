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
            _faces: ['front', 'back'],
            // the type of rotation applied to the element (left, right, up, down, left-slide, right-slide)
            rotationType: 'left',
            // the css perspective applied to the container of the rotating element
            depth: 1000,
            // the speed of the rotation
            speed: 0.5
        },

        _prefix: function (className) {
            return [this.options._classPrefix, className].join('-');
        },

        /**
         * Create widget
         * ======================================
         * <section class="flipper-container">
         *     <div id="flipper-inside">
         *         <div class="_flipper-front"></div>
         *         <div class="_flipper-back"></div>
         *     </div>
         * </section>
         */
        _create: function () {
            this._defaults = this.options;

            this.element.addClass('flipper-container');
            this.flipperInside = this.element.find('#flipper-inside');

            // create faces
            this.flipperInside.children().each(function (i, el) {
                this[this.options._faces[i]] = $(el).addClass(this._prefix(this.options._faces[i]));
            }.bind(this));

            if ($.type(this.options.rotationType) === 'string') {
                this.element.addClass(this._prefix(this.options.rotationType));
            }

            this._setDepth();

            this._setSpeed();
        },

        _setSpeed: function (speed) {
            if ($.type(this.options.speed) === 'number') {
                var _speed = parseFloat(this.options.speed);
                if (speed || speed > 0.1) {
                    if (speed > 2) {
                        _speed = 2.0;
                    } else if (speed < 0.1) {
                        _speed = 0.1;
                    } else {
                        _speed = speed;
                    }
                }
                this.flipperInside.css({
                    transition: 'all ' + _speed + 's ease'
                });
            }
        },

        _setDepth: function (v) {
            if ($.type(this.options.depth) === 'number'){
                var depth = parseInt(this.options.depth);
                if (depth > 2000) {
                    depth = 2000;
                } else if (depth < 100) {
                    depth = 100;
                }

                if (v) {
                    depth = v;
                }
                this.element.css({
                    perspective: depth + 'px'
                });
            } else {
                throw new Error(this.options.depth + ' must be typeof Number');
            }
        },

        _setOption: function (k, v) {
            
            switch(k) {
                case 'rotationType':
                    if ($.type(v) == 'string') {
                        this.element.switchClass(this._prefix(this.options.rotationType), this._prefix(v));
                    }
                    break;
                case 'depth':
                    var v = depth = parseInt(v);
                    this._setDepth(depth);
                    break;
                case 'speed':
                    var v = speed = parseFloat(v);
                    this._setSpeed(speed);
                default: '';
            }
            this._update(k, v);
        },

        _update: function (k, v) {
            this.options[k] = v;
        },

        _destroy: function () {
            this.element.removeClass('flipper-container');
            this.front.removeClass(this._prefix(this.options._faces[0]));
            this.back.removeClass(this._prefix(this.options._faces[1]));
        }

    });

}(jQuery, window, document));