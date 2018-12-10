$(document).ready(function() {

  let $grid = $('.portfolio__grid').isotope({
    itemSelector: '.portfolio__item',
    layoutMode: 'fitRows'
  });

  $('.portfolio__btns').on( 'click', 'li.btn', function() {
    let filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  $('.portfolio__btns .btn').click(function() {
    $('.portfolio__btns .btn--active').removeClass('btn--active');
    $(this).addClass('btn--active');
  });
  
});
