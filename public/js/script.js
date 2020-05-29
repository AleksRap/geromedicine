"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

document.addEventListener('DOMContentLoaded', function () {
  /**
   * 100vh - высота без учета панелей инструментов на мобильных
   */
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
  var header = document.querySelector('.header').clientHeight;
  document.documentElement.style.setProperty('--header', "".concat(header, "px"));
  /**
   * Если видно мобильное меню
   */

  var screenWidth = document.documentElement.clientWidth;

  if (screenWidth < 1200) {
    /**
     * Открытие мобильного меню
     */
    var burger = document.querySelector('.burger');
    burger.addEventListener('click', function (event) {
      this.classList.toggle('open');
      this.closest('.navigation').querySelector('.navigation__content').classList.toggle('open');
    });
    /**
     * Переключение открытой навигации
     */

    var navigation = document.querySelector('.navigation');
    var arrDropdownItem = navigation.querySelectorAll('.navigation__item');
    navigation.addEventListener('click', function (event) {
      /**
       * Если клик был не по пункту с дропдауном, то выходим
       */
      var target = event.target.closest('.navigation__item_drop');
      if (!target) return;
      event.preventDefault();
      var itemOpen = target.classList.contains('open');
      /**
       * Закрываем все пункты
       */

      arrDropdownItem.forEach(function (item) {
        return item.closest('.open') && item.classList.remove('open');
      });
      /**
       * Открываем нужный
       */

      !itemOpen && target.classList.add('open');
    });
  }
  /** Прилипание меню после прокрутки */


  var firstMenu = document.querySelector('.navbar-first');
  var secondMenu = document.querySelector('.navbar-second');
  var secondMenuMb = +getComputedStyle(secondMenu).marginBottom.split('px').join('');
  var scrollHeight = firstMenu.clientHeight;
  var mb = secondMenu.clientHeight + secondMenuMb;

  function transferNavbarSecond() {
    window.pageYOffset > scrollHeight ? secondMenu.classList.add('navbar-second_glue') : secondMenu.classList.remove('navbar-second_glue');
    window.pageYOffset > scrollHeight ? firstMenu.style.marginBottom = "".concat(mb, "px") : firstMenu.style.marginBottom = '0px';
  }

  transferNavbarSecond();
  window.addEventListener('scroll', transferNavbarSecond);
  /** Инициализация слайдеров swiper */

  var swiperMain = new Swiper('.swiper-main', {
    slidesPerView: 'auto',
    initialSlide: 0,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    // autoplay: true,
    delay: 5000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      prevEl: '.swiper-main__prev',
      nextEl: '.swiper-main__next'
    },
    slideToClickedSlide: true,
    preloadImages: false,
    lazy: true,
    loadOnTransitionStart: true
  });
  var swiperSpecialist = new Swiper('.swiper-specialist', {
    initialSlide: 0,
    spaceBetween: 30,
    centeredSlides: false,
    allowTouchMove: false,
    navigation: {
      nextEl: '.specialists__next',
      prevEl: '.specialists__prev'
    },
    breakpoints: {
      480: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
      },
      1500: {
        slidesPerView: 6
      }
    }
  });
  var swipersComments = new Swiper('.swiper-comments', {
    initialSlide: 0,
    centeredSlides: true,
    loop: true,
    autoplay: false,
    navigation: {
      nextEl: '.comments__next',
      prevEl: '.comments__prev'
    }
  });
  var swipersComments2 = new Swiper('.swiper-comments-2', {
    initialSlide: 0,
    centeredSlides: true,
    loop: true,
    autoplay: false,
    navigation: {
      nextEl: '.comments__next',
      prevEl: '.comments__prev'
    }
  });
  /**
   * После инициализации всех слайдеров с комментами скрываем их
   * видны будут только те у которых есть класс .active
   */

  var commentsWrap = document.querySelectorAll('.comments__swiper');
  commentsWrap.forEach(function (el) {
    return el.style.display = 'none';
  });
  /** Табы внутри блока отзывов */

  var clinicWrap = document.querySelector('[data-wrap="clinic"]');
  var specialistWrap = document.querySelector('[data-wrap="specialist"]');
  var btnClinic = document.querySelector('[data-btn="clinic"]');
  var btnSpecialist = document.querySelector('[data-btn="specialist"]');

  function toggleFeedback() {
    btnClinic.classList.toggle('active');
    btnSpecialist.classList.toggle('active');
    clinicWrap.classList.toggle('active');
    specialistWrap.classList.toggle('active');
  }

  btnClinic && btnClinic.addEventListener('click', toggleFeedback);
  btnSpecialist && btnSpecialist.addEventListener('click', toggleFeedback);
  /**
   * Ленивая загрузка видео
   * событие скролла удаляется по достижению 50% прокрутки до видео
   */

  var videoWrap = document.querySelector('.video');

  if (videoWrap) {
    var loadVideo = function loadVideo() {
      var scrollTop = window.pageYOffset;

      if (scrollTop > videoScrollTop / 2) {
        window.removeEventListener('scroll', loadVideo);
        var source = video.querySelector('source');
        var urlVideo = source.dataset.src;
        source.setAttribute('src', urlVideo);
        video.load();
        /** Вешаем обработчик на воспроизведение/остановку видео */

        videoWrap.addEventListener('click', /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!video.paused) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 3;
                    return video.play();

                  case 3:
                    video.controls = true;
                    _context.next = 8;
                    break;

                  case 6:
                    video.pause();
                    video.controls = false;

                  case 8:
                    event.target.closest('.video').classList.toggle('play');

                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    };

    var video = videoWrap.querySelector('video');
    var videoScrollTop = Math.ceil(video.getBoundingClientRect().top);
    window.addEventListener('scroll', loadVideo);
  }
  /** Календарь в модалке */


  $('#datepicker').datepicker({
    minDate: new Date(),
    onSelect: function onSelect(dateText) {
      $('#appointment-date').val(dateText);
    }
  });
  /** Инициализация модалок */

  var modalCallFeedback = new Modal({
    idModal: 'modal-call-feedback',
    selectorBtnOpen: '[data-btn="modal-call-feedback-btn"]'
  });
  var modalDoctorCall = new Modal({
    idModal: 'modal-doctor-call',
    selectorBtnOpen: '[data-btn="modal-doctor-call-btn"]'
  });
  var modalAppointment = new Modal({
    idModal: 'modal-appointment',
    selectorBtnOpen: '[data-btn="modal-appointment-btn"]'
  });
  var modalFeedback = new Modal({
    idModal: 'modal-feedback',
    selectorBtnOpen: '[data-btn="modal-feedback-btn"]'
  });
  var modalThanksFeedback = new Modal({
    idModal: 'modal-thanks-feedback',
    selectorBtnOpen: '[data-btn="modal-thanks-feedback-btn"]'
  });
  var modalThanksAppointment = new Modal({
    idModal: 'modal-thanks-appointment',
    selectorBtnOpen: '[data-btn="modal-thanks-appointment-btn"]'
  });
  /** Проверка согласия на обработку персональных данных */

  function checkAgree() {
    var btn = this.closest('form').querySelector('.button');
    btn.toggleAttribute('disabled');
  }

  document.getElementById('call-feedback-checkbox').addEventListener('change', checkAgree);
  document.getElementById('doctor-call-checkbox').addEventListener('change', checkAgree);
  document.getElementById('appointment-checkbox').addEventListener('change', checkAgree);
  /** Плавная прокрутка до якоря */

  var anchors = document.querySelectorAll('a[href*="$"]');

  if (anchors.length) {
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var elementClick = this.getAttribute('href').split('');
        elementClick.splice(0, 1, '#');
        var normalName = elementClick.join('');
        var destination = $(normalName).offset().top - 130;
        $("html:not(:animated),body:not(:animated)").animate({
          scrollTop: destination
        }, 1100);
      });
    });
  }
  /** Маска номера телефона на поля. Maskedinput */


  $("#call-feedback-tel").mask("+7 (999) 999-9999");
  $("#call-doctor-call-tel").mask("+7 (999) 999-9999");
  $("#call-appointment-tel").mask("+7 (999) 999-9999");
  /** Инициализация галереи fancybox */

  document.querySelector('[data-fancybox="gallery"]') && $('[data-fancybox="gallery"]').fancybox({
    toolbar: false,
    transitionEffect: "zoom-in-out",
    loop: true
  });
  /** Спойлеры услуг */

  var spoilerWrap = document.querySelector('.amenities__spoilers');

  if (spoilerWrap) {
    var spoilers = document.querySelectorAll('.spoiler');
    spoilers.forEach(function (spoiler) {
      new Spoiler({
        spoiler: spoiler,
        wrap: spoilerWrap
      });
    });
  }
  /** Соотношение сторон баннера акций */


  var bannersStock = document.querySelectorAll('.banner-stock');
  bannersStock.forEach(function (banner) {
    return banner.style.height = "".concat(banner.clientWidth / 6, "px");
  });
});
/** Управляем событиями */

var ManagementEvents = /*#__PURE__*/function () {
  function ManagementEvents() {
    _classCallCheck(this, ManagementEvents);
  }

  _createClass(ManagementEvents, null, [{
    key: "addEventToArr",

    /**
     * На входе принимаем объект с параметрами
     * arr   - массив куда сохраняем события
     * el    - элемент, на который навешиваем обработчик
     * event - событие (str)
     * fn    - анонимная функция без вызова
     * @param data
     */
    value: function addEventToArr(data) {
      /** Добавляем событие в массив */
      data.arr.push({
        el: data.el,
        event: data.event,
        fn: data.fn
      });
      /** Вешаем слушатель */

      data.el.addEventListener(data.event, data.fn);
      return true;
    }
    /**
     * На входе принимаем массив событий
     * @param arr
     */

  }, {
    key: "removeEvents",
    value: function removeEvents(arr) {
      /** Снимаем обработчики события */
      arr.forEach(function (item) {
        item.el.removeEventListener(item.event, item.fn);
      });
      /** Очищаем массив */

      arr.splice(0, arr.length);
      return true;
    }
  }]);

  return ManagementEvents;
}();

var Modal = /*#__PURE__*/function () {
  function Modal(data) {
    _classCallCheck(this, Modal);

    this.arrEvents = [];
    this._modal = document.getElementById(data.idModal);
    this._modalWindow = this._modal.querySelector('[data-modal="window"]');
    this._btnsOpen = document.querySelectorAll(data.selectorBtnOpen);
    this._btnClose = this._modal.querySelector('[data-modal="close"]');
    this.bind();
  }

  _createClass(Modal, [{
    key: "open",
    value: function open() {
      this._modal.classList.add('modal_open');

      this._modalWindow.classList.add('modal__window_open');
    }
  }, {
    key: "close",
    value: function close() {
      this._modal.classList.remove('modal_open');

      this._modalWindow.classList.remove('modal__window_open');
    }
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;

      /**
       * Открытие модалки по клику на кнопку
       */
      this._btnsOpen.forEach(function (btn) {
        ManagementEvents.addEventToArr({
          arr: _this.arrEvents,
          el: btn,
          event: 'click',
          fn: function fn() {
            return _this.open();
          }
        });
      });
      /**
       * Закрытие модалки по клику вне нее
       */


      ManagementEvents.addEventToArr({
        arr: this.arrEvents,
        el: this._modal,
        event: 'click',
        fn: function fn(event) {
          return !event.target.closest('[data-modal=window]') && _this.close();
        }
      });
      /**
       * Закрытие модалки по клику на крестик
       */

      ManagementEvents.addEventToArr({
        arr: this.arrEvents,
        el: this._btnClose,
        event: 'click',
        fn: function fn() {
          return _this.close();
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      ManagementEvents.removeEvents(this.arrEvents);

      this._modal.remove();
    }
  }]);

  return Modal;
}();

var Spoiler = /*#__PURE__*/function () {
  function Spoiler(data) {
    _classCallCheck(this, Spoiler);

    this.spoiler = data.spoiler;
    this.body = this.spoiler.querySelector('.spoiler__body');
    this.wrap = data.wrap;
    this.spoilers = null;
    this.height = null;

    this._initialize();
  }

  _createClass(Spoiler, [{
    key: "open",
    value: function open() {
      this.spoiler.classList.add('open');
      this.body.style.height = "".concat(this.height, "px");
    }
  }, {
    key: "close",
    value: function close() {
      this.spoiler.classList.remove('open');
      this.body.style.height = '0px';
    }
  }, {
    key: "closeAll",
    value: function closeAll() {
      this.spoilers.forEach(function (spoiler) {
        spoiler.classList.remove('open');
        spoiler.querySelector('.spoiler__body').style.height = '0px';
      });
    }
  }, {
    key: "_initialize",
    value: function _initialize() {
      var _this2 = this;

      this.height = this.body.clientHeight;
      this.body.style.height = '0px';
      /** если есть this.wrap, значит включен режим аккордеона */

      if (this.wrap) this.spoilers = this.wrap.querySelectorAll('.spoiler');
      this.spoiler.addEventListener('click', function (event) {
        var spoiler = event.target.closest('.spoiler');
        if (!spoiler) return;
        /** открываем или закрываем спойлер */

        var open = spoiler.classList.contains('open');

        if (open) {
          _this2.close();
        } else {
          _this2.wrap && _this2.closeAll();

          _this2.open();
        }
      });
    }
  }]);

  return Spoiler;
}();