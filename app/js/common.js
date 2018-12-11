/*Preloader*/

let loader = document.querySelector('.animate'),
    offset = 0;

const offsetMe = function() {
  if(offset < 0) {offset = 600;}
  loader.style.strokeDashoffset = offset;
  offset= offset- 5;

  requestAnimationFrame(offsetMe);
}
offsetMe();

$(window).on('load', function() {
	$("#preloader").fadeOut();
});

/*Preloader*/


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
  $('.infobuttons .btn--form, li.header-article__item.btn-form').click(function() {
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
    url: "/mail.php",
    success: function() {
      alert('Письмо отправлено');
    },
    error: function() {
      alert("Ошибка");
    }
  });
};
