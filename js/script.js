$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 1200,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
      responsive: [
          {
            breakpoint: 992,
            settings: {
              dots: true,
              arrows: false
            }
          }
      ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // $('.catalog__cart__link').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog__cart__front').eq(i).toggleClass('catalog__cart__front_active');
  //     $('.catalog__cart__back').eq(i).toggleClass('catalog__cart__back_active');
  //   });
  // });

  // $('.catalog__cart__link_back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog__cart__front').eq(i).toggleClass('catalog__cart__front_active');
  //     $('.catalog__cart__back').eq(i).toggleClass('catalog__cart__back_active');
  //   });
  // });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog__cart__front').eq(i).toggleClass('catalog__cart__front_active');
        $('.catalog__cart__back').eq(i).toggleClass('catalog__cart__back_active');
      });
    });
  }
  toggleSlide('.catalog__cart__link');
  toggleSlide('.catalog__cart__link_back');

  // Modal

  $('[data-modal=consultation]').on('click', function() {
    $('#consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.modal').fadeOut('fast');
  });

  // $('.btn-cart').on('click', function() {
  //   $('#order').fadeIn('slow');
  // });

  $('.btn-cart').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__content__descr').text($('.catalog__cart__title').eq(i).text());
      $('#order').fadeIn('slow');
    });
  });

  // $('#consultation form').validate();
  
  // $('#consultation-form').validate();
  
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите свое имя',
          minlength: jQuery.validator.format('Введите {0} символа!')
        },
        phone: 'Пожалуйста, введите свой номер телефона',
        email: {
          required: 'Пожалуйста, введите свою почту',
          email: 'Неправильно введен адрес почты'
        }
      }
    });
  }
  validateForms('#consultation form');
  validateForms('#order form');
  validateForms('#consultation-form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('#thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  // Smooth scroll and pageup

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href=#up]").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();

});


// const slider = tns({
//   container: '.carousel__inner',
//   items: 1,
//   slideBy: 'page',
//   autoplay: false,
//   controls: false,
//   navPosition: 'bottom',
//   nav: false,
//   responsive: {
//     992: {
//       nav: true
//     }
//   }
// });

// document.querySelector('.slick-prev').addEventListener('click',  function () {
//   slider.goTo('prev')
// }); 

// document.querySelector('.slick-next').addEventListener('click',  function () {
//   slider.goTo('next')
// }); 