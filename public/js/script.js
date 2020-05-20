"use strict";

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
  window.addEventListener('scroll', function () {
    window.pageYOffset > scrollHeight ? secondMenu.classList.add('navbar-second_glue') : secondMenu.classList.remove('navbar-second_glue');
    window.pageYOffset > scrollHeight ? firstMenu.style.marginBottom = "".concat(mb, "px") : firstMenu.style.marginBottom = '0px';
  });
  /** Инициализация слайдеров swiper */

  var swiper = new Swiper('.swiper-main', {
    slidesPerView: 'auto',
    initialSlide: 1,
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
  /** Ленивая загрузка видео */

  {
    var video = document.getElementById('video_about-us2');

    if (video) {
      var loadVideo = function loadVideo() {
        var scrollTop = window.pageYOffset;
        var result = scrollTop * 100 / videoScrollTop;

        if (result > 50 && !change) {
          change = true;
          var source = video.querySelector('source');
          var urlVideo = source.dataset.src;
          source.setAttribute('src', urlVideo);
          video.load();
        }
      };

      var videoScrollTop = Math.ceil(video.getBoundingClientRect().top);
      var change = false;
      window.addEventListener('scroll', loadVideo);
    }
  }
  /** Воспроизведение видео */

  {
    var playStopVideo = function playStopVideo(el, video) {
      if (video) {
        el.addEventListener('click', function () {
          return play(el, video);
        });
        video.addEventListener('click', function () {
          return play(el, video);
        });
      }
    };

    var play = function play(el, video) {
      if (video.paused) {
        video.play();
        video.controls = true;
        el.className = 'on';
      } else {
        video.pause();
        video.controls = false;
        el.classList = '';
      }
    };

    var overlay = document.getElementById('about-us__overlay');

    var _video = document.getElementById('video_about-us');

    var video2 = document.getElementById('video_about-us2');
    playStopVideo(overlay, _video);
    playStopVideo(overlay, video2);
  }
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
    var swiperspec = new Swiper('.swiper-specialist', {
      slidesPerView: 6,
      initialSlide: 0,
      centeredSlides: false,
      spaceBetween: 22,
      allowTouchMove: false,
      navigation: {
        nextEl: '.swiper-navigation-next',
        prevEl: '.swiper-navigation-prev'
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      },
      preloadImages: false,
      lazy: true,
      loadOnTransitionStart: true
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