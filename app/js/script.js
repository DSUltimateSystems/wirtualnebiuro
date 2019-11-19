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
      $('.collapse-group').on('click', function () {
          $(this).toggleClass('active');
          $(this).closest('.search-form__item').find('.collapse-wrapper').slideToggle(300);
      });

      $('.btn--reset').on('click', function (e) {
          e.preventDefault();
          $('.search-form__filter')[0].reset();
      });

      $('.dropdown').on('click', function () {
          $(this).closest('.dropdown').toggleClass('active');
      });
      // Select all or unselect checkbox
      $('#select-all, #select-all2').click(function () {
          $('.selected-id').prop('checked', this.checked);
      });

      $('.selected-id').change(function () {
          var check = ($('.selected-id').filter(":checked").length == $('.selected-id').length);
          $('#select-all').prop("checked", check);
      });

      $('.table-actions__show i').on('click', function () {
          $(this).toggleClass('active');
          $('.table-actions__content').slideToggle(300);
      });
      $('.change-mark').on('click', function () {
          $(this).text(function(i, v){
              return v === 'zaznacz wszystko' ? 'odznacz wszystko' : 'zaznacz wszystko'
          });
      });
      /*Select2 Initlization*/
      $('.js-example-basic-single').select2();
      $('b[role="presentation"]').hide();
      $('.select2-selection__arrow').append('<i class="fas fa-chevron-down"></i>');
      function formatText (icon) {
          return $('<span><i class="fas far ' + $(icon.element).data('icon') + '"></i> ' + icon.text + '</span>');
      };

      $('.select2-icon').select2({
          width: "50%",
          templateSelection: formatText,
          templateResult: formatText
      });

      // Panel-edit
      $('.panel-edit .btn--edit, .panel-edit .btn--cancel, .panel-edit .btn--save').click(function (e) {
          e.preventDefault();
          $(this).closest('.panel-edit').find('input, textarea').each(function () {
              $(this).prop('readonly', function(i, v) {
                  return !v;
              });
          });
          $(this).closest('.panel-edit').toggleClass('active');
          $(this).closest('.panel-edit').find('.btn--hidden').toggleClass('hidden');
      });

      $('.panel-edit .btn--cancel').click(function (e) {
          e.preventDefault();
          $(this).closest('.panel-edit').find('input, textarea').each(function () {
              var that = $(this);
              that.val(that.data('value'));
          });
      });

      $('.panel-edit .btn--save').click(function (e) {
          e.preventDefault();
          $(this).closest('.panel-edit').find('input, textarea').each(function () {
              var that = $(this);
              that.data('value', that.val());
          });
      });
        //Panel-add
      $('.panel-add .btn-add, .panel-add .btn--cancel').click(function (e) {
          e.preventDefault();
          $(this).closest('.panel-add').find('.panel-add__status').fadeToggle(300);
      });
        //Panel Add Deposit
      $('.add-deposit .btn-add, .add-deposit .btn--cancel').click(function (e) {
          e.preventDefault();
          $(this).closest('.add-deposit').find('.panel-add__deposit__wrapper').fadeToggle(300);
      });

        //   Show/Hide modal
      $('.close-modal').on('click', function(e) {
          e.preventDefault();
          $(this).closest('.modal').removeClass('is-visible');
      });

      $('.show-modal').on('click', function(e) {
          e.preventDefault();
          $(this.hash).addClass('is-visible');
      });

      $('[data-scroll]').click(function (e) {
          var that = $(this);
          $(that.data('scroll')).next().fadeToggle(300);
          $(that.data('scroll')).find('.fa-plus-square').toggleClass('active');
          $([document.documentElement, document.body]).animate({
              scrollTop: $(that.data('scroll')).offset().top
          }, 1000);
      });

      $('.expand-content').click(function (e) {
          e.preventDefault();
          var that = $(this);
          that.toggleClass('active');
          that.closest('tr').next().fadeToggle(300);
      });

      //Close-content
      $('.times').on('click', function(e) {
          e.preventDefault();
          $(this).closest('tr').fadeToggle(300);
      });
      //  Show/Add Status in card-user
      $('.show-status .toggle-status').click(function (e) {
          e.preventDefault();
          $(this).closest('.show-status').find('.statuses').toggleClass('active');
      });
      $('.toggle-status').on('click', function () {
          $(this).text(function(i, v){
              return v === 'Pokaż statusy' ? 'Ukryj statusy' : 'Pokaż statusy'
          });
      });

      $("#status_list_active").sortable({
          connectWith: "#status_list_avaible",
          scroll: true,
          scrollSensitivity: 30,
          scrollSpeed: 10,
          cursor: 'move',
          tolerance: 'pointer',
          axis: 'y',
          opacity: 0.6,
          //forcePlaceholderSize: true,
          //placeholder: 'ui-placeholder',

          receive: function (event, ui) {
              sortable_receive($(this));
              save_original_order(ui.item);
          },
          remove: function (event, ui) {
              sortable_remove($(this));
          },
          'start': function (event, ui) {
              ui.placeholder.height(ui.helper.outerHeight());
          },
          update: function () {
              // save_list_active($(this));
          },

      });
      $("#status_list_avaible").sortable({
          connectWith: "#status_list_active",
          scroll: true,
          scrollSensitivity: 30,
          scrollSpeed: 10,
          cursor: 'move',
          tolerance: 'pointer',
          axis: 'y',
          opacity: 0.6,
          //forcePlaceholderSize: true,
          //placeholder: 'ui-placeholder'
          receive: function (event, ui) {
              sortable_receive($(this));
          },
          remove: function (event, ui) {
              sortable_remove($(this));
          },
          'start': function (event, ui) {
              ui.placeholder.height(ui.helper.outerHeight());
          },
          update: function () {

          },
      });
      //DATAPICKER
      $('[data-toggle="datepicker"]').datepicker({
          dateFormat: 'dd-mm-yy',
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



