/*
 * Flipper
 * https://github.com/cameronjroe/jquery-flipper
 * A simple way to add a CSS3 flip effect to your content.
 * Copyright (c) 2014 Cameron J Roe
 * Licensed under the MIT license.
 */

(function($, window, document, undefined) {

    var pluginName = 'flipper',
        defaults = {
            rotationType: 'right',
            depth: 1000,
            speed: 0.5
        };

    function Flipper(element, options) {

        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        
        this.flipperInside = this.$el.find('#flipper-inside');
        this.front = this.flipperInside.children().eq(0).addClass('_flipper-front');
        this.back = this.flipperInside.children().eq(1).addClass('_flipper-back');

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Flipper.prototype.init = function() {

        // set up our flipper container
        this.$el.addClass('flipper-container');

        var flipperPrefix = '_flipper-';
        if (this.options.rotationType) {
            this.$el.addClass(flipperPrefix + this.options.rotationType);
        }

        if (this.options.depth) {
            var depth = parseInt(this.options.depth);
            if (depth > 2000) {
                depth = 2000;
            } else if (depth < 100) {
                depth = 100;
            }

            this.$el.css({
                perspective: depth + 'px'
            });
        }

        if (this.options.speed) {
            var speed = parseFloat(this.options.speed);
            this.flipperInside.css({
                transition: 'all ' + speed + 's ease'
            });
        }
        var styles = '<style type="text/css">.flipper-container{position:relative;}.flipper-container #flipper-inside{position:relative;display:inline-block;-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;-o-transform-style:preserve-3d;transform-style:preserve-3d;}.flipper-container #flipper-inside>._flipper-front{position:relative;z-index:2;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;}.flipper-container #flipper-inside>._flipper-back{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);-moz-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);-ms-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);-o-transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);transform:rotate3d(0, 1, 0, 180deg) translateZ(1px);}.flipper-container._flipper-right:hover #flipper-inside{-webkit-transform:rotate3d(0, 1, 0, -180deg);-moz-transform:rotate3d(0, 1, 0, -180deg);-ms-transform:rotate3d(0, 1, 0, -180deg);-o-transform:rotate3d(0, 1, 0, -180deg);transform:rotate3d(0, 1, 0, -180deg);}.flipper-container._flipper-left:hover #flipper-inside{-webkit-transform:rotate3d(0, 1, 0, 180deg);-moz-transform:rotate3d(0, 1, 0, 180deg);-ms-transform:rotate3d(0, 1, 0, 180deg);-o-transform:rotate3d(0, 1, 0, 180deg);transform:rotate3d(0, 1, 0, 180deg);}.flipper-container._flipper-right-slide #flipper-inside{-webkit-transform-origin:center right;-moz-transform-origin:center right;-ms-transform-origin:center right;-o-transform-origin:center right;transform-origin:center right;}.flipper-container._flipper-right-slide:hover #flipper-inside{-webkit-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);-moz-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);-ms-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);-o-transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);transform:translateX(-100%) rotate3d(0, 1, 0, -180deg);}.flipper-container._flipper-left-slide #flipper-inside{-webkit-transform-origin:center left;-moz-transform-origin:center left;-ms-transform-origin:center left;-o-transform-origin:center left;transform-origin:center left;}.flipper-container._flipper-left-slide:hover #flipper-inside{-webkit-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);-moz-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);-ms-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);-o-transform:translateX(100%) rotate3d(0, 1, 0, 180deg);transform:translateX(100%) rotate3d(0, 1, 0, 180deg);}.flipper-container._flipper-up #flipper-inside{-webkit-transform-origin:center center;-moz-transform-origin:center center;-ms-transform-origin:center center;-o-transform-origin:center center;transform-origin:center center;}.flipper-container._flipper-up #flipper-inside>._flipper-back{-webkit-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);-moz-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);-ms-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);-o-transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);transform:rotate3d(1, 0, 0, 180deg) translateZ(1px);}.flipper-container._flipper-up:hover #flipper-inside{-webkit-transform:rotate3d(1, 0, 0, 180deg);-moz-transform:rotate3d(1, 0, 0, 180deg);-ms-transform:rotate3d(1, 0, 0, 180deg);-o-transform:rotate3d(1, 0, 0, 180deg);transform:rotate3d(1, 0, 0, 180deg);}.flipper-container._flipper-down #flipper-inside{-webkit-transform-origin:center center;-moz-transform-origin:center center;-ms-transform-origin:center center;-o-transform-origin:center center;transform-origin:center center;}.flipper-container._flipper-down #flipper-inside>._flipper-back{-webkit-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);-moz-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);-ms-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);-o-transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);transform:rotate3d(1, 0, 0, -180deg) translateZ(1px);}.flipper-container._flipper-down:hover #flipper-inside{-webkit-transform:rotate3d(1, 0, 0, -180deg);-moz-transform:rotate3d(1, 0, 0, -180deg);-ms-transform:rotate3d(1, 0, 0, -180deg);-o-transform:rotate3d(1, 0, 0, -180deg);transform:rotate3d(1, 0, 0, -180deg);}</style>';
        $(document.head).append(styles);

    };

    $.fn[pluginName] = function( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Flipper(this, options));
            }
        });
    };

}(jQuery, window, document));