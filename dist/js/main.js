// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
    e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function disableScroll() {
  if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
  if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

$(document).ready(function() {
  $('.bxslider').bxSlider({
    adaptiveHeight: true,
    auto: true,
    mode: 'fade'
  });

  /*Показ меню при клике на гамбургер*/
  $('.hamburger').click(function() {
    if ($('.main-header .navigation').is(':visible')) {
      $('.main-header .navigation').fadeOut();
      enableScroll();
    } else {
      $('.main-header .navigation').fadeIn().css('display', 'flex');
      disableScroll();
    }
  });

  /*Закрытие меню при клике на крестик*/
  $('.navigation__btn').click(function() {
    $('.main-header .navigation').fadeOut();
    enableScroll();
  });

  /*Открытие формы*/
  $('.main-header__form').click(function() {
    if ($('.popupform').is(':visible')) {
      $('.popupform').fadeOut();
      enableScroll();
    } else {
      $('.popupform').fadeIn().css('display','flex');
      disableScroll();
    }
  });

  /*Закрытие формы*/
  $('.popupform__btn').click(function() {
    $('.popupform').fadeOut();
    enableScroll();
  });

  /*Открытие попапа при клике на блок партнера*/
  $('.partners__item').click(function() {
    let partnersIndex = $(this).index();
    $('.partners__popups li .popup').fadeOut().delay(200);
    $('.partners__popups li .popup').eq(partnersIndex).fadeIn();
  });

  /*Закрытие попапа при клике на кнопку закрытия*/
  $('.popup__btn').click(function() {
    $(this).parent().fadeOut();
  });

  /*Проверка выпадающего списка*/
  if ($('.switch').hasClass('switch--checked')) {
    $('.switch--checked').parent().parent().siblings('.container').children('.dropdown-item-content').slideDown();
  }
  /*Открытие и закрытие выпадающего списка при клике*/
  $('.dropdown-title').click(function() {
    if ($(this).siblings('.container').children('.dropdown-item-content').is(':visible')) {
      $(this).children('.container').children('.switch').removeClass('switch--checked');
      $(this).siblings('.container').children('.dropdown-item-content').slideUp();
      $(this).siblings('.container').css('border-bottom', 'none');
    } else {
      $('.dropdown-title .switch').removeClass('switch--checked');
      $('.dropdown-title + .container').css('border-bottom', 'none');
      $(this).children('.container').children('.switch').addClass('switch--checked');
      $('.dropdown-title + .container > .dropdown-item-content').slideUp();
      $(this).siblings('.container').children('.dropdown-item-content').slideDown();
      $(this).siblings('.container').css('border-bottom', '1px solid #eceded');
    }
  });

  /*Переключение вакансий*/
  $('.vacancies.team .team__item').click(function() {
    let index = $(this).index();
    if ($('.vacancies__info').is(':visible')) {
      $('.vacancies.team .team__item').css('border-bottom', 'none');
      $('.vacancies.team .team__item').removeClass('team__item--active');
      $(this).addClass('team__item--active');
      $('.vacancies__info_item').fadeOut().delay(500);
      $('.vacancies__info_item').eq(index).fadeIn();
    } else {
      $('.vacancies.team .team__item').css('border-bottom', 'none');
      $('.vacancies__info').css('display', 'block');
      $('.vacancies.team .team__item').removeClass('team__item--active');
      $(this).addClass('team__item--active');
      $('.vacancies__info_item').eq(index).fadeIn();
    }
  });

  $('.switch--checked').parent().siblings('.catalog__links').css('display', 'block');

  $('.catalog__groupname').click(function() {
    if( $(this).children('.switch').hasClass('switch--checked') ) {
      $(this).siblings(".catalog__links").slideUp();
      $(this).children('.switch').removeClass('switch--checked');
      $(this).parent().removeClass('catalog__item--active');
    } else {
      $('.switch--checked').removeClass('switch--checked');
      $('.catalog__links').slideUp();
      $('.catalog__item--active').removeClass('catalog__item--active');
      $(this).siblings('.catalog__links').slideDown();
      $(this).children('.switch').addClass('switch--checked');
      $(this).parent().addClass('catalog__item--active');
    }
  })
});

//Валидация формы #mainForm
$(function() {
  $('#mainForm').validate({
    rules: {
      organization: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true,
        digits: true
      },
      message: {
        required: true
      }

    },
    messages: {
      organization: {
        required: 'Это поле обязательно для заполнения',
        minlength: 'Введите не менее трех символов'
      },
      email: {
        required: 'Это поле обязательно для заполнения',
        email: 'Введите email в верном формате'
      },
      tel: {
        required: 'Это поле обязательно для заполнения',
        digits: 'Поле может содержать только цифры'
      },
      message: {
        required: 'Это поле обязательно для заполнения'
      }
    },
    submitHandler: function(form) {
      submitMainForm();
    }
  });
});

//Отправка формы #mainForm
function submitMainForm() {
  $("#mainForm").ajaxSubmit({
    type: "POST",
    data: $("#mainForm").serialize(),
    url: "./mail.php",
    success: function() {
      alert('Письмо отправлено');
    },
    error: function() {
      alert("Ошибка");
    }
  });
};
