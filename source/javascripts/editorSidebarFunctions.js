$(document).ready(function() {
	/* This is a way to animate the hover shift... but it seems laggy

	$('div#accordion header.heading').mouseenter(function() {
		if($(this).parent().hasClass('saved')&!($(this).parent().hasClass('current'))) {
			
			$(this).parent().animate({
				"bottom": 5,
				}, 250, function() { 
					$(this).mouseleave(function() {
						$(this).animate({"bottom": 0,}, 100);
					});
					//alert("yopu"); 
				});
		} else if($(this).parent().hasClass('content')&!($(this).parent().hasClass('current')) ){
			//alert("in the ELSE IF");
			$('section.saved').animate({
				"bottom": 5,
				}, 250, function() { 
					$(this).mouseleave(function() {
						$(this).animate({"bottom": 0,}, 100);
					});
					//alert("yopu"); 
				});
		};
	})*/

	


	$('div#accordion header.heading').click(function() {
		$(this).css('outline','none');
		if($(this).parent().hasClass('saved')&!($(this).parent().hasClass('current'))) {
			$('section').removeClass('hidden', 500);
			var myPos = $(this).parent().position();
			var myHeight = $('section.saved').height();
			//alert("myPos.top is " + myPos.top + " myHeight is " + myHeight);
			
			$(this).parent().animate({
				"bottom": myPos.top - myHeight,
				}, 500, function() {
					$(this).addClass('current');
					$(this).removeClass('savedLoaded');
					
					$('header.heading').removeClass('clickable');
					$('section.content').removeClass('current'); 
					
					$('section.content header').addClass('clickable'); 
					$('section.content section').addClass('hidden');
					//$('section.content > header.heading').css('cursor','pointer')
				});
	
        } else if($(this).parent().hasClass('content')&!($(this).parent().hasClass('current')) ){  
			$('section.saved').addClass('savedLoaded');
			$('section.savedLoaded section').addClass('hidden');
			$('section.content section').removeClass('hidden', 500);
			$('section.saved').animate({"bottom": 0,}, 500);
			$(this).removeClass('clickable');
			$(this).addClass('current');
			$('section.saved').removeClass('current'); 
			$('section.saved').addClass('savedLoaded');
			$('section.saved header').addClass('clickable'); 
        }  
        return false; 
    });

	$('ul li a').on({
		
		click: function(e) {
			//alert("test");
			if($(this).parent().hasClass('active')) {
				$('section.sidebar').animate({"left": -230}, 250);
				$('ul li').addClass('collapsed');
				$('ul li.active').removeClass('active');
				e.stopPropagation();
			} else {
				$('section.sidebar').animate({"left": 0}, 250);
				$('ul li').addClass('active');
				$('ul li.active').removeClass('collapsed');
				e.stopPropagation()
			}
		}
		
	});


});

