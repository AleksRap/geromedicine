document.addEventListener('DOMContentLoaded', () => {
  /**
   * 100vh - высота без учета панелей инструментов на мобильных
   */
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const header = document.querySelector('.header').clientHeight;
  document.documentElement.style.setProperty('--header', `${header}px`);


  /**
   * Если видно мобильное меню
   */
  const screenWidth = document.documentElement.clientWidth;
  if (screenWidth < 1200) {

    /**
     * Открытие мобильного меню
     */
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', function (event) {
      this.classList.toggle('open');
      this
        .closest('.navigation')
        .querySelector('.navigation__content')
        .classList.toggle('open');
    });

    /**
     * Переключение открытой навигации
     */
    const navigation = document.querySelector('.navigation');
    const arrDropdownItem = navigation.querySelectorAll('.navigation__item');

    navigation.addEventListener('click', event => {
      /**
       * Если клик был не по пункту с дропдауном, то выходим
       */
      const target = event.target.closest('.navigation__item_drop');
      if (!target) return;

      event.preventDefault();

      const itemOpen = target.classList.contains('open');

      /**
       * Закрываем все пункты
       */
      arrDropdownItem.forEach(item => item.closest('.open') && item.classList.remove('open'));

      /**
       * Открываем нужный
       */
      !itemOpen && target.classList.add('open');
    })
  }


  /** Прилипание меню после прокрутки */
  const firstMenu = document.querySelector('.navbar-first');
  const secondMenu = document.querySelector('.navbar-second');
  const secondMenuMb = +getComputedStyle(secondMenu).marginBottom.split('px').join('');
  const scrollHeight = firstMenu.clientHeight;
  const mb = secondMenu.clientHeight + secondMenuMb;

  function transferNavbarSecond() {
    window.pageYOffset > scrollHeight
      ? secondMenu.classList.add('navbar-second_glue')
      : secondMenu.classList.remove('navbar-second_glue');

    window.pageYOffset > scrollHeight
      ? firstMenu.style.marginBottom = `${mb}px`
      : firstMenu.style.marginBottom = '0px';
  }

  transferNavbarSecond();
  window.addEventListener('scroll', transferNavbarSecond);


  /** Инициализация слайдеров swiper */
  const swiperMain = new Swiper('.swiper-main', {
    slidesPerView: 'auto',
    initialSlide: 0,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    // autoplay: true,
    delay: 5000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
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

  const swiperSpecialist = new Swiper('.swiper-specialist', {
    initialSlide: 0,
    spaceBetween: 30,
    centeredSlides: false,
    allowTouchMove: false,
    navigation: {
      nextEl: '.specialists__next',
      prevEl: '.specialists__prev',
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
  const videoWrap = document.querySelector('.video');

  if (videoWrap) {
    const video = videoWrap.querySelector('video');
    const videoScrollTop = Math.ceil(video.getBoundingClientRect().top);

    window.addEventListener('scroll', loadVideo);

    function loadVideo() {
      const scrollTop = window.pageYOffset;

      if (scrollTop > videoScrollTop / 2) {
        window.removeEventListener('scroll', loadVideo);

        const source = video.querySelector('source');
        const urlVideo = source.dataset.src;
        source.setAttribute('src', urlVideo);
        video.load();

        /** Вешаем обработчик на воспроизведение/остановку видео */
        videoWrap.addEventListener('click', async event => {

          if (video.paused) {
            await video.play();
            video.controls = true;
          } else {
            video.pause();
            video.controls = false;
          }

          event.target.closest('.video').classList.toggle('play');
        });
      }
    }
  }












  /** Ужимка текста. Инициализация dotdotdot */
  {
    const arrDotDotDot = [
      {selector: '[data-dotdotdot=article-img]', options: {ellipsis: "\u2026 ", height: 80}},
      {selector: '[data-dotdotdot=article-img2]', options: {ellipsis: "\u2026 ", height: 140}},
      {selector: '[data-dotdotdot=about-body]', options: {ellipsis: "\u2026 ", height: 232, keep: '.about-us__buttons',}},
      {selector: '[data-dotdotdot="comment"]', options: {ellipsis: "\u2026 ", height: 200,}},
      {selector: '[data-dotdotdot="slider"]', options: {ellipsis: "\u2026 ", height: 85,}}
    ];

    arrDotDotDot.forEach(item => {
      const bigArticlesImg = document.querySelectorAll(item.selector);
      if (bigArticlesImg.length) bigArticlesImg.forEach(article => new Dotdotdot(article, item.options));
    });
  }

  /** Календарь в модалке */
  $("#datepicker").datepicker({
    minDate: new Date(),
    onSelect: function (dateText) {
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
      open: function () {
        document.querySelector('body').classList.add('popup-view');
      },
      close: function () {
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
    onAfterSlide: function () {
      let video = document.querySelector('.slider video');
      if (!video.paused) video.pause();
    },
    responsive: [
      {
        breakpoint: 576,
        settings: {
          thumbItem: 3,
        }
      }
    ]
  });

  /** Инициализация слайдеров swiper */
  {
    let swipers = new Swiper('.swiper-second', {
      initialSlide: 0,
      centeredSlides: true,
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-navigation-next',
        prevEl: '.swiper-navigation-prev',
      },
    });

    let swipers2 = new Swiper('.swiper-thrity', {
      initialSlide: 0,
      centeredSlides: true,
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-navigation-next',
        prevEl: '.swiper-navigation-prev',
      },
    });
  }

  /** Плавная прокрутка до якоря */
  const anchors = document.querySelectorAll('a[href*="$"]');
  if (anchors.length) {
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const elementClick = this.getAttribute('href').split('');
        elementClick.splice(0, 1, '#');
        const normalName = elementClick.join('');
        const destination = $(normalName).offset().top - 130;

        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
      })
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
    function checkAgree() {
      const checkbox = this;

      if (checkbox && checkbox.hasAttribute('checked')) {
        const btnSubmit = checkbox.closest('form').querySelector('[type=submit]');
        btnSubmit.classList.toggle('button-first_noactive');
      }
    }

    document.getElementById('call-feedback-checkbox').addEventListener('change', checkAgree);
    document.getElementById('appointment-checkbox').addEventListener('change', checkAgree);
    document.getElementById('call-checkbox').addEventListener('change', checkAgree);
  }

  /** Фильтрация внутри блока отзывов */
  {
    const clinicWrap = document.querySelector('[data-clinic-wrap]');
    const specialistWrap = document.querySelector('[data-specialist-wrap]');
    const btnClinic = document.querySelector('[data-clinic]');
    const btnSpecialist = document.querySelector('[data-specialist]');

    function toggleFeedback() {
      btnClinic.classList.toggle('button-second_active');
      btnSpecialist.classList.toggle('button-second_active');
      clinicWrap.classList.toggle('swiper_view_off');
      specialistWrap.classList.toggle('swiper_view_off');
    }

    if (btnClinic) btnClinic.addEventListener('click', toggleFeedback);
    if (btnSpecialist) btnSpecialist.addEventListener('click', toggleFeedback);
  }

});