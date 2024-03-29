$(document).ready(function() {
  /*Проверка выпадающего списка*/
  if ($('.switch').hasClass('switch--checked')) {
    $('.switch--checked').parent().parent().siblings('.container').children('.dropdown-item-content').slideDown();
  }
  /*Открытие и закрытие выпадающего списка при клике*/
  $('.dropdown-title').click(function() {
    let self = $(this);
    if (self.parents('.dropdown').hasClass('dropdown--multi')) {
      if (self.siblings('.container').children('.dropdown-item-content').is(':visible')) {
        self.children('.container').children('.switch').removeClass('switch--checked');
        self.siblings('.container').children('.dropdown-item-content').slideUp();
        self.siblings('.container').css('border-bottom', 'none');
      } else {
        $('.dropdown-title + .container').css('border-bottom', 'none');
        self.children('.container').children('.switch').addClass('switch--checked');
        self.siblings('.container').children('.dropdown-item-content').slideDown();
        self.siblings('.container').css('border-bottom', '1px solid #eceded');
      }
    } else {
      if (self.siblings('.container').children('.dropdown-item-content').is(':visible')) {
        self.children('.container').children('.switch').removeClass('switch--checked');
        self.siblings('.container').children('.dropdown-item-content').slideUp();
        self.siblings('.container').css('border-bottom', 'none');
      } else {
        $('.dropdown-title .switch').removeClass('switch--checked');
        $('.dropdown-title + .container').css('border-bottom', 'none');
        self.children('.container').children('.switch').addClass('switch--checked');
        $('.dropdown-title + .container > .dropdown-item-content').slideUp();
        self.siblings('.container').children('.dropdown-item-content').slideDown();
        self.siblings('.container').css('border-bottom', '1px solid #eceded');
      }
    }
    
  });

  $('.switch--checked').parent().siblings('.catalog__links').css('display', 'block');

  $('.catalog__list--folded .catalog__groupname').click(function() {
    if( $(this).children('.switch').hasClass('switch--checked')) {
      $(this).siblings(".catalog__links").slideUp();
      $(this).children('.switch').removeClass('switch--checked');
      $(this).parent().removeClass('catalog__item--active');
    } else {
      $('.switch--checked').removeClass('switch--checked');
      $('.catalog__item:not(.catalog__item--without-title) .catalog__links').slideUp();
      $('.catalog__item--active').removeClass('catalog__item--active');
      $(this).siblings('.catalog__links').slideDown();
      $(this).children('.switch').addClass('switch--checked');
      $(this).parent().addClass('catalog__item--active');
    }
  });
});
