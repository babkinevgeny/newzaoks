$(document).ready(function() {
  /*Открытие попапа при клике на блок партнера*/
  $('.companies__list--flex .companies__item').click(function() {
    let companiesIndex = $(this).index();
    console.log(companiesIndex);
    $('.companies__popups li .popup').fadeOut().delay(200);
    $('.companies__popups li .popup').eq(companiesIndex).fadeIn();
  });

  $('.companies__slide .companies__item').click(function() {
    let companiesIndex;
    if ($(this).parent().hasClass('companies__slide--2')) {
      companiesIndex = $(this).index() + 15;
    } else if ($(this).parent().hasClass('companies__slide--3')) {
      companiesIndex = $(this).index() + 30;
    } else {
      companiesIndex = $(this).index();
    }
    $('.companies__popups li .popup').fadeOut().delay(200);
    $('.companies__popups li .popup').eq(companiesIndex).fadeIn();
  });

  /*Закрытие попапа при клике на кнопку закрытия*/
  $('.popup__btn').click(function() {
    $(this).parent().fadeOut();
  });
});
