$(function() {
    $("#datepicker").datepicker();
});

jQuery(document).ready(function($) {
    $('.popup-with-form').magnificPopup({
        removalDelay: 300,
        mainClass: 'mfp-fade',
        type: 'inline',
        focus: '#name',
        callbacks: {
            open: function() {
                document.querySelector('body').classList.add('popup-view');
            },
            close: function() {
                document.querySelector('body').classList.remove('popup-view');
            }
        }
    });
});

// Прилипание меню после прокрутки
document.addEventListener ("DOMContentLoaded", () => {
    let scrolHight = 80;

    if ($(window).width() < 960 && $(window).width() > 768) {
        scrolHight = 74;
    }
    if ($(window).width() <= 768 && $(window).width() > 576) {
        scrolHight = 62;
    }
    if ($(window).width() <= 576) {
        scrolHight = 52;
    }

    $(window).scroll(function(){
        $('.navbar-second-body').toggleClass('navbar-second_glue', $(this).scrollTop() > scrolHight);
        $('.navbar-first').toggleClass('navbar-first_mb', $(this).scrollTop() > scrolHight);
    });
});



// Воспроизведение видео
document.addEventListener ("DOMContentLoaded", () => {
    if(document.getElementById('about-us__overlay')) {
        let overlay = document.getElementById('about-us__overlay');
        let vid = document.getElementById('video_about-us');

        if(overlay.addEventListener) {
            overlay.addEventListener("click", play, false);
            vid.addEventListener("click", play, false)
        }

        function play() {
            if (vid.paused) {
                vid.play();
                vid.controls = true;
                overlay.className = "on";
            } else {
                vid.pause();
                vid.controls = false;
                overlay.classList = "";
            }
        }
    }
});


// DotDotDot
document.addEventListener ("DOMContentLoaded", () => {
    if(document.querySelectorAll("[data-dotdotdot=article-img]")) {
        let wrapperOne = document.querySelectorAll("[data-dotdotdot=article-img]");
        let optionsOne = {
            ellipsis: "\u2026 ",
            height: 80
        };

        for(let i = 0; i < wrapperOne.length; i++) {
            new Dotdotdot( wrapperOne[i], optionsOne );
        }
    }

  if (document.querySelectorAll("[data-dotdotdot=article-img-new]")) {
    let wrapperOne = document.querySelectorAll("[data-dotdotdot=article-img]");
    let optionsOne = {
      ellipsis: "\u2026 ",
      height: 80
    };

    for (let i = 0; i < wrapperOne.length; i++) {
      new Dotdotdot(wrapperOne[i], optionsOne);
    }
  }

    if(document.querySelectorAll("[data-dotdotdot=article-no-img]")) {
        let wrapperTwo = document.querySelectorAll("[data-dotdotdot=article-no-img]");
        let optionsTwo = {
            ellipsis: "\u2026 ",
            height: 'watch',
            watch: true,
        };

        for(let i = 0; i < wrapperTwo.length; i++) {
            new Dotdotdot( wrapperTwo[i], optionsTwo );
        }
    }


    if(document.querySelector('[data-dotdotdot=about-body]')) {
        let wrapperThree = document.querySelector('[data-dotdotdot=about-body]');
        let optionsThree = {
            ellipsis: "\u2026 ",
            height: 465,
            keep: '.about-us__buttons',
        };

        new Dotdotdot( wrapperThree, optionsThree );
    }
});




//lightslider
jQuery(document).ready(function($) {
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
});


// swiper
document.addEventListener ("DOMContentLoaded", () => {
    let swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        initialSlide: 1,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});

document.addEventListener ("DOMContentLoaded", () => {
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
});

document.addEventListener ("DOMContentLoaded", () => {
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
});

document.addEventListener ("DOMContentLoaded", () => {
    let swiperspec = new Swiper('.swiper-specialist', {
        slidesPerView: 4,
        initialSlide: 0,
        centeredSlides: false,
        spaceBetween: 22,
        allowTouchMove: false,
        navigation: {
            nextEl: '.swiper-navigation-next',
            prevEl: '.swiper-navigation-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
    });
});


// валидация
$(document).ready(function(){
    let pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    let mail = $('#mail');

    mail.blur(function(){
        if(mail.val() != ''){
            if(mail.val().search(pattern) == 0){
                $('#valid').text('Подходит');
                $('#submit').attr('disabled', false);
                //mail.removeClass('error').addClass('ok');
            }else{
                $('#valid').text('Не подходит');
                $('#submit').attr('disabled', true);
                //mail.addClass('ok');
            }
        }else{
            $('#valid').text('Поле e-mail не должно быть пустым!');
            mail.addClass('error');
            $('#submit').attr('disabled', true);
        }
    });
});


// Фильтрация внутри блока отзывов
let clinicWrap = document.querySelector('[data-clinic-wrap]');
let specialistWrap = document.querySelector('[data-specialist-wrap]');

if(document.querySelector('[data-clinic]')) {
    document.querySelector('[data-clinic]').onclick=function () {
        document.querySelector('[data-clinic]').classList.toggle('button-second_active');
        document.querySelector('[data-specialist]').classList.toggle('button-second_active');
        clinicWrap.classList.toggle('swiper_view_off');
        specialistWrap.classList.toggle('swiper_view_off');
    };
}

if(document.querySelector('[data-specialist]')) {
    document.querySelector('[data-specialist]').onclick=function () {
        document.querySelector('[data-clinic]').classList.toggle('button-second_active');
        document.querySelector('[data-specialist]').classList.toggle('button-second_active');
        specialistWrap.classList.toggle('swiper_view_off');
        clinicWrap.classList.toggle('swiper_view_off');
    };
}


// Фильтрация по направлениям
let arrAll = document.querySelectorAll('[data-card]');

if(document.querySelector('#selectItem')) {
    document.querySelector('#selectItem').onchange=function(){
        let valSel = this.value;

        [].forEach.call(arrAll, function(el){
            el.style.display=(valSel === 'all' || valSel === el.getAttribute('data-index')) ? 'block' : 'none';
        });


        // Формирование списка услуг, в зависимости от выбранного направления
        let arrAmenities = document.querySelectorAll('[data-amenities]');

        [].forEach.call(arrAmenities, function(el){
            el.style.display=(valSel === 'all' || valSel === el.getAttribute('data-direction')) ? 'block' : 'none';
        });


        // Фильтрация по услугам, в зависимости от выбранного направления
        let selectItem = '[data-index=' + valSel + ']';
        let arrAllInDirection = document.querySelectorAll(selectItem);

        if(document.querySelector('#selectAmenities')) {
            document.querySelector('#selectAmenities').onchange=function(){
                let valSelAmenities = this.value;

                [].forEach.call(arrAllInDirection, function(el){
                    el.style.display=(valSelAmenities === 'all' || valSelAmenities === el.getAttribute('data-amenities-item')) ? 'block' : 'none';
                });
            };
        }

        // Фильтрация по годам, в зависимости от выбранного направления
        let arrAllInYear = document.querySelectorAll(selectItem);

        if(document.querySelector('#selectYears')) {
            document.querySelector('#selectYears').onchange=function(){
                let valSelYear = this.value;

                [].forEach.call(arrAllInYear, function(el){
                    el.style.display=(valSelYear === 'all' || valSelYear === el.getAttribute('data-year-item')) ? 'block' : 'none';
                });
            };
        }
    };
}


// Maskedinput
jQuery(function($){
  $("#call-tel").mask("+7 (999) 999-9999");
  $("#appointment-tel").mask("+7 (999) 999-9999");
});


// Проверка согласия на обработку персональных данных
$(document).ready(function(){
  if ( !(document.querySelector("#appointment-checkbox").hasAttribute('checked')) ) {
    $("[value='запись на прием']").addClass('button-first_noactive')
  }
  if ( !(document.querySelector("#call-checkbox").hasAttribute('checked')) ) {
    $("[value='вызов врача']").addClass('button-first_noactive')
  }

  $('#appointment-checkbox').on('click', function () {
    $("[value='запись на прием']").toggleClass('button-first_noactive')
  });

  $('#call-checkbox').on('click', function () {
    $("[value='вызов врача']").toggleClass('button-first_noactive')
  });
});


// Fancybox
$('[data-fancybox="gallery"]').fancybox({
  toolbar: false,
  transitionEffect: "zoom-in-out",
  loop: true
});







