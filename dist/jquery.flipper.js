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
            
            var head = $(document.head);
            if(!head.hasClass('flipper-styles')) {
                head.append('<style type="text/css class="flipper-styles">.flipper-container{position:relative;}.flipper-container #flipper-inside{position:relative;display:inline-block;-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;-o-transform-style:preserve-3d;transform-style:preserve-3d;}.flipper-container #flipper-inside>._flipper-front{position:relative;z-index:2;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.flipper-container #flipper-inside>._flipper-back{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);-moz-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);-ms-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);-o-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);}.flipper-container._flipper-right:hover #flipper-inside{-webkit-transform:rotate3d(0, 1, 0, -180deg);-moz-transform:rotate3d(0, 1, 0, -180deg);-ms-transform:rotate3d(0, 1, 0, -180deg);-o-transform:rotate3d(0, 1, 0, -180deg);transform:rotate3d(0, 1, 0, -180deg);}.flipper-container._flipper-left:hover #flipper-inside{-webkit-transform:rotate3d(0, 1, 0, 180deg);-moz-transform:rotate3d(0, 1, 0, 180deg);-ms-transform:rotate3d(0, 1, 0, 180deg);-o-transform:rotate3d(0, 1, 0, 180deg);transform:rotate3d(0, 1, 0, 180deg);}.flipper-container._flipper-right-slide #flipper-inside{-webkit-transform-origin:center right;-moz-transform-origin:center right;-ms-transform-origin:center right;-o-transform-origin:center right;transform-origin:center right;}.flipper-container._flipper-right-slide:hover #flipper-inside{-webkit-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);-moz-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);-ms-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);-o-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);}.flipper-container._flipper-left-slide #flipper-inside{-webkit-transform-origin:center left;-moz-transform-origin:center left;-ms-transform-origin:center left;-o-transform-origin:center left;transform-origin:center left;}.flipper-container._flipper-left-slide:hover #flipper-inside{-webkit-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);-moz-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);-ms-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);-o-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);transform:translateX(100%) rotate3d(0, 1, 0, 180deg);}.flipper-container._flipper-up #flipper-inside{-webkit-transform-origin:center center;-moz-transform-origin:center center;-ms-transform-origin:center center;-o-transform-origin:center center;transform-origin:center center;}.flipper-container._flipper-up #flipper-inside>._flipper-back{-webkit-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);-moz-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);-ms-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);-o-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);}.flipper-container._flipper-up:hover #flipper-inside{-webkit-transform:rotate3d(1, 0, 0, 180deg);-moz-transform:rotate3d(1, 0, 0, 180deg);-ms-transform:rotate3d(1, 0, 0, 180deg);-o-transform:rotate3d(1, 0, 0, 180deg);transform:rotate3d(1, 0, 0, 180deg);}.flipper-container._flipper-down #flipper-inside{-webkit-transform-origin:center center;-moz-transform-origin:center center;-ms-transform-origin:center center;-o-transform-origin:center center;transform-origin:center center;}.flipper-container._flipper-down #flipper-inside>._flipper-back{-webkit-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);-moz-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);-ms-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);-o-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);}.flipper-container._flipper-down:hover #flipper-inside{-webkit-transform:rotate3d(1, 0, 0, -180deg);-moz-transform:rotate3d(1, 0, 0, -180deg);-ms-transform:rotate3d(1, 0, 0, -180deg);-o-transform:rotate3d(1, 0, 0, -180deg);transform:rotate3d(1, 0, 0, -180deg);}</style>');
            }
            
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
                    if ($.type(v) === 'string') {
                        this.element.switchClass(this._prefix(this.options.rotationType), this._prefix(v));
                    }
                    break;
                case 'depth':
                    var depth = v = parseInt(v);
                    this._setDepth(depth);
                    break;
                case 'speed':
                    var speed = v = parseFloat(v);
                    this._setSpeed(speed);
                    break;
                default: return;
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