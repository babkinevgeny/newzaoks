// $(document).ready(function() {
//   $('.bxslider').bxSlider({
//     adaptiveHeight: true,
//     auto: true,
//     mode: 'fade'
//   });
//   counter();
// });

$(document).ready(function() {
  $('.products .assortiment, .services .assortiment').owlCarousel({
    loop: true,
    nav: true,
    navText: [],
    items: 5,
    autoplay: true,
    dots: false 
  });
  $('.products .assortiment .owl-stage-outer').prepend('<h2 class="title title--uppercase"><a href="metal-products.html">Продукция</a></h2>');
  $('.services .assortiment .owl-stage-outer').prepend('<h2 class="title title--uppercase"><a href="metalworking.html">Услуги</a></h2>');
  // $('.products .assortiment').bxSlider({
  //   auto: false,
  //   minSlides: 5,
  //   wrapperClass: 'bx-wrapper bx-wrapper--products',
  //   pager: false,
  // });
  // $('.bx-wrapper--products').prepend('<h2 class="title title--uppercase">Продукция</h2>');

  // $('.services .assortiment').bxSlider({
  //   auto: false,
  //   minSlides: 5,
  //   wrapperClass: 'bx-wrapper bx-wrapper--services',
  //   pager: false
  // });
  // $('.bx-wrapper--services').prepend('<h2 class="title title--uppercase">Услуги</h2>');

  $('.intro__slider').bxSlider({
    auto: true,
    controls: false,
    mode: 'fade',
    minSlides: 1,
    pager: false
  });
});

let counter = () => {
  $('.counter__value').each(function() {
    var $this = $(this),
      countTo = $this.attr('data-count');
    $({
      countNum: $this.text()
    }).animate({
        countNum: countTo
      },

      {

        duration: 2000,
        easing: 'swing',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
          //alert('finished');
        }

      });
  });
}

$(window).scroll(function() {

  if ($(window).scrollTop() > (window.innerHeight - 60)) {
    $('.main-header').removeClass('main-header--hiding');
  } else{
    $('.main-header').addClass('main-header--hiding');
  }

});

// var a = 0;
// $(window).scroll(function() {

//   var oTop = $('#counter').offset().top - window.innerHeight;
//   if (a == 0 && $(window).scrollTop() > oTop) {
//     counter();
//     a = 1;
//   }

// });

$('.mouse').click(function () {
  var heightHeader = $('.intro').height();
  $("body,html").animate({"scrollTop":heightHeader},700);
});
