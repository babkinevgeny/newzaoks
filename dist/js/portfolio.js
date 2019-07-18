$(document).ready(function() {

  // let $grid = $('.portfolio__grid').isotope({
  //   itemSelector: '.portfolio__item',
  //   layoutMode: 'fitRows'
  // });

  // $('.portfolio__btns').on( 'click', 'li.btn', function() {
  //   let filterValue = $(this).attr('data-filter');
  //   $grid.isotope({ filter: filterValue });
  // });


  function toggleBtn() {
    $(this).siblings('.btn--active').removeClass('btn--active');
    $(this).addClass('btn--active');
  };

  $('.portfolio__btns .btn').click( toggleBtn);


  var itemSelector = '.portfolio__item'; 

	var $container = $('.portfolio__grid').isotope({
		itemSelector: itemSelector,
		masonry: {
		  columnWidth: itemSelector,
		  isFitWidth: true
		}
  });
  
  var responsiveIsotope = [
		[1340, 15]
	];
  
  var itemsPerPageDefault = 15;
	var itemsPerPage = defineItemsPerPage();
	var currentNumberPages = 1;
	var currentPage = 1;
	var currentFilter = '*';
	var filterAtribute = 'data-filter';
	var pageAtribute = 'data-page';
	var pagerClass = 'isotope-pager';

	function changeFilter(selector) {
    //let filterValue = $(this).attr('data-filter');
  //   $grid.isotope({ filter: filterValue });
		$container.isotope({
			filter: selector
		});
	}


	function goToPage(n) {
		currentPage = n;

		var selector = itemSelector;
      selector += ( currentFilter != '*' ) ? currentFilter : '';
      selector += '['+pageAtribute+'="'+currentPage+'"]';

    changeFilter(selector);
	}

	function defineItemsPerPage() {
		var pages = itemsPerPageDefault;

		for( var i = 0; i < responsiveIsotope.length; i++ ) {
			if( $(window).width() <= responsiveIsotope[i][0] ) {
				pages = responsiveIsotope[i][1];
				break;
			}

			

		}

		return pages;
	}
	
	function setPagination() {

		var SettingsPagesOnItems = function(){

			var itemsLength = $container.children(itemSelector).length;
			
			var pages = Math.ceil(itemsLength / itemsPerPage);
			var item = 1;
			var page = 1;
			var selector = itemSelector;
				selector += ( currentFilter != '*' ) ? currentFilter : '';
			
			$container.children(selector).each(function(){
				if( item > itemsPerPage ) {
					page++;
					item = 1;
				}
				$(this).attr(pageAtribute, page);
				item++;
			});

			currentNumberPages = page;

		}();

		var CreatePagers = function() {

			var $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<ul class="'+pagerClass+'"></ul>') : $('.'+pagerClass);

			$isotopePager.html('');
			
			for( var i = 0; i < currentNumberPages; i++ ) {
				var $pager = i === 0 ? $('<li class="pager btn btn--active" '+pageAtribute+'="'+(i+1)+'"></li>') : $('<li class="pager btn" '+pageAtribute+'="'+(i+1)+'"></li>');
					$pager.html(i+1);
					
					$pager.click(function(){
            var page = $(this).eq(0).attr(pageAtribute);
            goToPage(page);
            toggleBtn.call( $(this) );
					});

				$pager.appendTo($isotopePager);
			}

			$container.after($isotopePager);

		}();

	}

	setPagination();
	goToPage(1);

  //Adicionando Event de Click para as categorias
  $('.portfolio__btns').on( 'click', 'li.btn', function() {
	//$('.filters a').click(function(){
		var filter = $(this).attr(filterAtribute);
		currentFilter = filter;

		setPagination();
		goToPage(1);


	});

	//Evento Responsivo
	$(window).resize(function(){
		itemsPerPage = defineItemsPerPage();
		setPagination();
		goToPage(1);
	});




  
  
});
