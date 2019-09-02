$(document).ready(function() {
  /*Переключение вакансий*/
  $('.vacancies.team .team__item').click(function() {
    let index = $(this).index();
    $('.vacancies.team .team__item').css('border-bottom', 'none');
    $('.vacancies.team .team__item').removeClass('team__item--active');
    $(this).addClass('team__item--active');
    $('.vacancies__info_item').fadeOut().delay(500);
    $('.vacancies__info_item').eq(index).fadeIn();
  });
});
