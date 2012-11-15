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

