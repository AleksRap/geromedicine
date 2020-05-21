"use strict";

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
    },
    preloadImages: false,
    lazy: true,
    loadOnTransitionStart: true
  });
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
  /** Ужимка текста. Инициализация dotdotdot */


  {
    var arrDotDotDot = [{
      selector: '[data-dotdotdot=article-img]',
      options: {
        ellipsis: "\u2026 ",
        height: 80
      }
    }, {
      selector: '[data-dotdotdot=article-img2]',
      options: {
        ellipsis: "\u2026 ",
        height: 140
      }
    }, {
      selector: '[data-dotdotdot=about-body]',
      options: {
        ellipsis: "\u2026 ",
        height: 232,
        keep: '.about-us__buttons'
      }
    }, {
      selector: '[data-dotdotdot="comment"]',
      options: {
        ellipsis: "\u2026 ",
        height: 200
      }
    }, {
      selector: '[data-dotdotdot="slider"]',
      options: {
        ellipsis: "\u2026 ",
        height: 85
      }
    }];
    arrDotDotDot.forEach(function (item) {
      var bigArticlesImg = document.querySelectorAll(item.selector);
      if (bigArticlesImg.length) bigArticlesImg.forEach(function (article) {
        return new Dotdotdot(article, item.options);
      });
    });
  }
  /** Календарь в модалке */

  $("#datepicker").datepicker({
    minDate: new Date(),
    onSelect: function onSelect(dateText) {
      $('#appointment-date').val(dateText);
    }
  });
  /** Модалки */

  $('.popup-with-form').magnificPopup({
    removalDelay: 300,
    mainClass: 'mfp-fade',
    type: 'inline',
    focus: '#name',
    callbacks: {
      open: function open() {
        document.querySelector('body').classList.add('popup-view');
      },
      close: function close() {
        document.querySelector('body').classList.remove('popup-view');
      }
    }
  });
  /** Инициализация lightslider */

  $('#lightSlider').lightSlider({
    item: 1,
    loop: true,
    gallery: true,
    thumbItem: 4,
    thumbMargin: 5,
    galleryMargin: 30,
    onAfterSlide: function onAfterSlide() {
      var video = document.querySelector('.slider video');
      if (!video.paused) video.pause();
    },
    responsive: [{
      breakpoint: 576,
      settings: {
        thumbItem: 3
      }
    }]
  });
  /** Инициализация слайдеров swiper */

  {
    var swipers = new Swiper('.swiper-second', {
      initialSlide: 0,
      centeredSlides: true,
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-navigation-next',
        prevEl: '.swiper-navigation-prev'
      }
    });
    var swipers2 = new Swiper('.swiper-thrity', {
      initialSlide: 0,
      centeredSlides: true,
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-navigation-next',
        prevEl: '.swiper-navigation-prev'
      }
    });
  }
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


  {
    $("#call-tel").mask("+7 (999) 999-9999");
    $("#call-feedback-tel").mask("+7 (999) 999-9999");
    $("#appointment-tel").mask("+7 (999) 999-9999");
  }
  /** Инициализация галереи fancybox */

  $('[data-fancybox="gallery"]').fancybox({
    toolbar: false,
    transitionEffect: "zoom-in-out",
    loop: true
  });
  /** Проверка согласия на обработку персональных данных */

  {
    var checkAgree = function checkAgree() {
      var checkbox = this;

      if (checkbox && checkbox.hasAttribute('checked')) {
        var btnSubmit = checkbox.closest('form').querySelector('[type=submit]');
        btnSubmit.classList.toggle('button-first_noactive');
      }
    };

    document.getElementById('call-feedback-checkbox').addEventListener('change', checkAgree);
    document.getElementById('appointment-checkbox').addEventListener('change', checkAgree);
    document.getElementById('call-checkbox').addEventListener('change', checkAgree);
  }
  /** Фильтрация внутри блока отзывов */

  {
    var toggleFeedback = function toggleFeedback() {
      btnClinic.classList.toggle('button-second_active');
      btnSpecialist.classList.toggle('button-second_active');
      clinicWrap.classList.toggle('swiper_view_off');
      specialistWrap.classList.toggle('swiper_view_off');
    };

    var clinicWrap = document.querySelector('[data-clinic-wrap]');
    var specialistWrap = document.querySelector('[data-specialist-wrap]');
    var btnClinic = document.querySelector('[data-clinic]');
    var btnSpecialist = document.querySelector('[data-specialist]');
    if (btnClinic) btnClinic.addEventListener('click', toggleFeedback);
    if (btnSpecialist) btnSpecialist.addEventListener('click', toggleFeedback);
  }
});