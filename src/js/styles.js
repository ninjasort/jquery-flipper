/**
 * jQuery Flipper Styles
 */

export default {
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
}