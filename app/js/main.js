$(document).ready(function() {
  $('.bxslider').bxSlider({
    adaptiveHeight: true,
    auto: true,
    mode: 'fade'
  });
  counter();
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

  if ($(window).scrollTop() > 300) {
    $('.main-header--hiding').slideDown();
  } else{
    $('.main-header--hiding').slideUp();
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
   $("body,html").animate({"scrollTop":heightHeader-60},700);
});
