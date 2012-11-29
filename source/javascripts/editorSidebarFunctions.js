var myAccord = function() {
        $( "#accordion" ).accordion({
            header: 'section',
            heightStyle: "fill",
            clearstyle:'true',
            activate: function(event, ui) {
            	//alert($(ui.oldHeader).html());
            	$('header', ui.oldHeader).addClass('clickable');
            	$('header', ui.newHeader).removeClass('clickable');
            }

       });

}

$(window).load(function() {
	//draw_viewport();
	myAccord();

})


$(document).ready(function() {

	$('.tabs ul li a').on({
		
		click: function(e) {
			//alert("test");
			if (($(this).parent().hasClass('collapsed')) && ($(this).parent().hasClass('inActive'))) {
				//alert("collapsed + inActive");
				$('section.sidebar').animate({"left": 0}, 250);
				$('ul li').toggleClass('collapsed', false);
				$('ul li').toggleClass('active');
				$('ul li').toggleClass('inActive');
				$('aside div').toggle();
				e.stopPropagation();
			}

			else if ($(this).parent().hasClass('collapsed')) {
				//alert("collapsed + active");
				$('section.sidebar').animate({"left": 0}, 250);
				$('ul li').toggleClass('collapsed', false);
				//$('aside div').toggle();
				e.stopPropagation();
			}


			else if ($(this).parent().hasClass('inActive')) {
				//alert("inActive");
				$('ul li').toggleClass('active');
				$('ul li').toggleClass('inActive');
				$('aside div').toggle();
				
				e.stopPropagation();
			} 

			else if ($(this).parent().hasClass('active')){
				//alert("active");
				$('section.sidebar').animate({"left": -230}, 250);	
				$('ul li').toggleClass('collapsed', true);
				e.stopPropagation();
			}
			else {
				return nothing;
			}
/*
			if (($(this).parent().not('collapsed')) && ($(this).parent().hasClass('active'))) {
				alert("test 1");
				$('section.sidebar').animate({"left": -230}, 250);
				//$("section.sidebar").hide("slide", {}, 1000);
				$('ul li').addClass('collapsed');
				//$('ul li.active').removeClass('active');
				
			} 

			else if (($(this).parent().not('collapsed')) && ($(this).parent().not('active'))) {
				alert("test 2");
	
				$('ul li').toggleClass('active');
				$('ul li').toggleClass('inActive');
				$('aside div').toggle();
	
				e.stopPropagation()
			} 

			else if (($(this).parent().hasClass('active')) && ($(this).parent().hasClass('collapsed'))) {
				alert("test 3");
				$('section.sidebar').animate({"left": 0}, 250);
				//$('ul li').addClass('active');
				$('ul li.active').removeClass('collapsed');
				e.stopPropagation()
			} 

			else if (($(this).parent().not('active')) && ($(this).parent().hasClass('collapsed'))) {
				alert("test 4");
				$('section.sidebar').animate({"left": 0}, 250);
				//$('ul li').addClass('active');
				$('ul li.active').removeClass('collapsed');
				e.stopPropagation()
			}
		*/
		}
		
	});

});

