$(document).ready(function() {
  $('.log-services__item').click(function() {
    let listBtns = $('.log-services__item');
    let listTexts = $('.log-descriptions__item');
    let index = listBtns.index($(this));
    listBtns.removeClass('active');
    $(this).addClass('active');
    listTexts.removeClass('show');
    listTexts.eq(index).addClass('show');
  });
});
