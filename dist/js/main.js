// $(document).ready(function() {
//   $('.bxslider').bxSlider({
//     adaptiveHeight: true,
//     auto: true,
//     mode: 'fade'
//   });
//   counter();
// });

$(document).ready(function() {
  $('.products .assortiment, .services .assortiment, .metal-structures .assortiment').owlCarousel({
    loop: true,
    nav: true,
    navText: [],
    items: 5,
    autoplay: false,
    dots: false ,
    responsive:{
      0:{
          items:1,
      },
      600:{
        items:2,
      },
      800:{
        items:3,
      },
      1340:{
          items:5,
      }
  }
  });
  $('.products .assortiment .owl-stage-outer').prepend('<h2 class="title title--uppercase"><a href="metal-products.html">Продукция</a></h2>');
  $('.services .assortiment .owl-stage-outer').prepend('<h2 class="title title--uppercase"><a href="metalworking.html">Услуги</a></h2>');
  $('.metal-structures .assortiment .owl-stage-outer').prepend('<h2 class="title title--uppercase"><a href="metalstructures.html">Металлоконструкции</a></h2>');
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
  $('.companies--clients .companies__list').owlCarousel({
    loop: true,
    nav: false,
    navText: [],
    items: 1,
    autoplay: false,
    autoHeight: true,
    dots: false,
    responsive:{
      1200: {
        nav: true
      }
    }
  });
  $('.companies--clients .companies__list .owl-stage-outer').prepend('<h2 class="title title--uppercase"><a href="/about/our-clients.html">Наши клиенты</a></h2>');


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

  if ($(window).scrollTop() > ($('.intro__inner h1.title').offset().top - 60)) {
    $('.main-header').addClass('main-header--fixed');
    $('.intro__inner').css('height', 'calc((100% - 70px - 60px))');
  } else{
    $('.main-header').removeClass('main-header--fixed');
    $('.intro__inner').css('height', 'calc((100% - 70px - 60px - 62px))');
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
  var heightHeader =Math.round($('.intro').height() - 58);
  console.log(heightHeader);
  $("body,html").animate({"scrollTop":heightHeader},700);
});
