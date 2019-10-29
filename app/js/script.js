import {Animate} from './libs/Animate.js';


// Nodelist Foreach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

const App = (() => {

  // Animations
  const animate = new Animate({
    target: '[data-animate]',
    animatedClass: 'visible',
    offset: [0.1, 0.1],
    delay: 0,
    remove: false,
    reverse: false,
    scrolled: false,
    debug: true,
    onLoad: true,
    onScroll: true,
    onResize: false
  });

  // Listeners
  const initListeners = () => {
      $('.btn--expand-filters').on('click', () => {
          $('.search-form__filter').slideToggle(300);
      });

      $('.collapse-group').on('click', function () {
          $(this).toggleClass('active');
          $(this).closest('.search-form__item').find('.collapse-wrapper').slideToggle(300);
      });

      $('.btn--reset').on('click', function (e) {
          e.preventDefault();
          $('.search-form__filter')[0].reset();
      });
      $('.dropdown button').on('click', () => {
          $('.dropdown ul').toggleClass('active');
      });

  };

  return {
    // Public
    init: () => {
      // Animations
      animate.init();
      // Init Eventlisteners
      initListeners();
    }
  };

})();


// Init
App.init();
