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

/* List.js is required to make this table work. */

var options = {
  valueNames: [ { data: ['timestamp'] }, { data: ['status'] }, 'jSortNumber', 'jSortName', 'jSortTotal' ],
  page: 6,
  pagination: {
    innerWindow: 1,
    left: 0,
    right: 0,
    paginationClass: "pagination",
  }
};

var tableList = new List('table', options);

$('.jPaginateNext').on('click', function(){
  var list = $('.pagination').find('li');
  $.each(list, function(position, element){
    if($(element).is('.active')){
      $(list[position+1]).trigger('click');
    }
  })
});


$('.jPaginateBack').on('click', function(){
  var list = $('.pagination').find('li');
  $.each(list, function(position, element){
    if($(element).is('.active')){
      $(list[position-1]).trigger('click');
    }
  })
});
