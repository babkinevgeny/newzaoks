$(document).ready(function() {
  $("#performed_works").owlCarousel({
    loop:true,
    autoplay:true,
    items:6,
    margin:10,
    dots:true
  });

  /*Переключение вкладок во внутренних страницах*/
  $('.main__buttons div').click(function() {
    let btnIndex = $(this).index();
    $('.main__buttons .active').removeClass('active');
    $(this).addClass('active');
    $('.main__article--active').removeClass('main__article--active');
    $('.main__article').eq(btnIndex).addClass('main__article--active');
  });

  /*Показ всплывающей полоски*/
  $(window).scroll(function(){
    let scrolled = $(this).scrollTop();
    if (scrolled > 10) {
      $('.header-article').slideDown();
    } else {
      $('.header-article').slideUp();
    }
  });

  catalogLinks();
});

function catalogLinks () {
  let title = $('title').text();
  let catalog = $('.catalog__item a');
  let activeLink = catalog.filter(function() {
    return $(this).text() === title;
  });
  activeLink.addClass('active');
  activeLink.parent().parent().css('display','block');
  activeLink.parent().parent().siblings('.catalog__groupname').children('.switch').addClass('switch--checked');
};
