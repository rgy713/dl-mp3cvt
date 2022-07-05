$(function(){

	$('.menu').on('click',function(){

		$('#menus').fadeToggle();

		if( $('#menus_out').is(':visible') ){

			$('#menus_out').hide();

			if( $(window).width() < 600 ){

				$('html').css({"overflow":"auto"});
				$(window).off('.noScroll');
			}

		}else{

			$('#menus_out').show();

			if( $(window).width() < 600 ){

				$('html').css({"overflow":"hidden"});
				$(window).on('touchmove.noScroll',function(e){ e.preventDefault(); });
			}
		}
	});
	$('#menus_out').on('click',function(){

		$(this).hide();
		$('#menus').fadeToggle();

		if( $(window).width() < 600 ){

			$('html').css({"overflow":"auto"});
			$(window).off('.noScroll');
		}
	});

	$('#menus').find('a').on('click',function(){

		$('#menus_out').hide();
		$('#menus').hide();
		$('.disabled').attr('disabled', 'disabled');

		$('html').css({"overflow":"hidden"});
		$(window).on('touchmove.noScroll',function(e){ e.preventDefault(); });
	});

	$('#file').on('change',function(){

		$('.disabled').removeAttr('disabled');
	});
	$('.radio').on('change',function(){

		$('.disabled').removeAttr('disabled');
	});

	$('.exit').on('click',function(){

		$(this).parents('.modal').find('.reset').trigger('click');
		$('html').css({"overflow":"auto"});
		$(window).off('.noScroll');
	});
	$('.reset').on('click',function(){

		$('html').css({"overflow":"auto"});
		$(window).off('.noScroll');
	});

	$('.input').on('focus',function(){

		$(this).parents('td').css({"border":"2px solid #0076d7"});

	}).on('blur',function(){

		$(this).parents('td').css({"border":"1px solid #b2b2b2"});
	});

	if( /#import|#settings/.test(location.href) ){

		$('html').css({"overflow":"hidden"});
		$(window).on('touchmove.noScroll',function(e){ e.preventDefault(); });
	}

});