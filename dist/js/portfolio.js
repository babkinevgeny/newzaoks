$(document).ready(function() {

  function toggleBtn() {
    $(this).siblings('.btn--active').removeClass('btn--active');
    $(this).addClass('btn--active');
  };

  $('.portfolio__btns .btn').click( toggleBtn );

  $('.portfolio__item').click(function() {
	  const currentSrc = $(this).children('img').attr('src');
	  $('.modal').fadeIn().css('display', 'flex');
	  $('.modal img').attr('src', currentSrc);
  });

  $('.modal').click(function() {
	$('.modal').fadeOut();
  });


  var itemSelector = '.portfolio__item'; 

	var $container = $('.portfolio__grid').isotope({
		itemSelector: itemSelector,
		masonry: {
		  columnWidth: itemSelector,
		  isFitWidth: true
		}
  });
  
  var responsiveIsotope = [
		[1340, 24]
	];
  
  var itemsPerPageDefault = 24;
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
				if (currentNumberPages === 1) return;
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
