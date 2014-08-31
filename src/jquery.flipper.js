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
            rotationType: 'right',
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
            this.element.addClass('flipper-container');
            this.flipperInside = this.element.find('#flipper-inside');
            this.front = this.flipperInside.children().eq(0).addClass(this._prefix('front'));
            this.back = this.flipperInside.children().eq(1).addClass(this._prefix('back'));

            if ($.type(this.options.rotationType) === 'string') {
                this.element.addClass(this._prefix(this.options.rotationType));
            }

            if ($.type(this.options.depth) === 'number'){
                var depth = parseInt(this.options.depth);
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

            if ($.type(this.options.speed) === 'number') {
                var speed = parseFloat(this.options.speed);
                this.flipperInside.css({
                    transition: 'all ' + speed + 's ease'
                });
            }
        },

        _setOption: function (k, v) {
            this.options[k] = v;
            this._update();
        },

        _destroy: function () {
            this.element.removeClass('flipper-container');
            this.front.removeClass(this._prefix('front'));
            this.back.removeClass(this._prefix('back'));
        }

    });

}(jQuery, window, document));