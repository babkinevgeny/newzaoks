$(document).ready(function() {
  /*Открытие попапа при клике на блок партнера*/
  $('.companies__item').click(function() {
    let companiesIndex = $(this).index();
    $('.companies__popups li .popup').fadeOut().delay(200);
    $('.companies__popups li .popup').eq(companiesIndex).fadeIn();
  });

  /*Закрытие попапа при клике на кнопку закрытия*/
  $('.popup__btn').click(function() {
    $(this).parent().fadeOut();
  });
});
