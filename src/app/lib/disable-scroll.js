import window from 'app/adaptors/server/window';

var disableScroll = {
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  // left: 37, up: 38, right: 39, down: 40
  options: {
    disableWheel: true,
    disableScrollbar: true,
    disableKeys: true,
    scrollEventKeys: [32, 33, 34, 35, 36, 37, 38, 39, 40]
  },
  element: window.body,
  lockToScrollPos: [0, 0],

  /**
   * Disable Page Scroll
   * @external Node
   *
   * @param {external:Node} [element] - DOM Element, usually document.body
   * @param {object} [options] - Change the initial options
   */
  on: function (element, options) {
    this.element = element || document.body;
    this.options = this._extend(this.options, options);

    if (this.options.disableWheel) {
      window.addEventListener('mousewheel', this._handleWheel);
      window.addEventListener('DOMMouseScroll', this._handleWheel);
      window.addEventListener('touchmove', this._handleWheel);
    }

    if (this.options.disableScrollbar) {
      this.lockToScrollPos = [
        this.element.scrollLeft,
        this.element.scrollTop
      ];
      this._disableScrollbarFn = this._handleScrollbar.bind(this);
      window.addEventListener('scroll', this._disableScrollbarFn);
    }

    if (this.options.disableKeys) {
      this._disableKeysFn = this._handleKeydown.bind(this);
      window.addEventListener('keydown', this._disableKeysFn);
    }
  },

  /**
   * Re-enable page scrolls
   */
  off: function () {
    window.removeEventListener('mousewheel', this._handleWheel);
    window.removeEventListener('DOMMouseScroll', this._handleWheel);
    window.removeEventListener('touchmove', this._handleWheel);
    window.removeEventListener('scroll', this._disableScrollbarFn);
    window.removeEventListener('keydown', this._disableKeysFn);
  },

  _handleWheel: function (e) {
    e.preventDefault();
  },

  _handleScrollbar: function () {
    window.scrollTo(this.lockToScrollPos[0], this.lockToScrollPos[1]);
  },

  _handleKeydown: function (event) {
    for (var i = 0; i < this.options.scrollEventKeys.length; i++) {
      if (event.keyCode === this.options.scrollEventKeys[i]) {
        event.preventDefault();
        return false;
      }
    }
  },

  _extend: function (original, extender) {
    var destination = original;

    for (var prop in extender) {
      if (extender.hasOwnProperty(prop)) {
        destination[prop] = extender[prop];
      }
    }

    return destination;
  }
};

module.exports = disableScroll;
