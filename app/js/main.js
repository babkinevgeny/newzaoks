// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

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
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

$(document).ready(function(){
  $('.bxslider').bxSlider({
    adaptiveHeight: true,
    pager: false,
    auto: true,
    mode: 'fade'
  });

	/*Показ меню при клике на гамбургер*/
	$('.hamburger').click(function(){
		if($('.main-header .navigation').is(':visible')){
			$('.main-header .navigation').fadeOut();
			enableScroll();
		} else {
			$('.main-header .navigation').fadeIn().css('display', 'flex');
			disableScroll();
		}
	});

	/*Закрытие меню при клике на крестик*/
	$('.navigation__btn').click(function(){
	  $('.main-header .navigation').fadeOut();
	  enableScroll();
	});

 /*Открытие попапа при клике на блок партнера*/
  $('.partners__item').click(function(){
 		let partnersIndex = $(this).index();
 		$('.partners__popups li .popup').fadeOut().delay(200);
 		$('.partners__popups li .popup').eq(partnersIndex).fadeIn();
 	});

  /*Закрытие попапа при клике на кнопку закрытия*/
 	$('.popup__btn').click(function(){
	  $(this).parent().fadeOut();
	});
});
