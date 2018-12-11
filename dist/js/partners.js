$(document).ready(function() {
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
});
