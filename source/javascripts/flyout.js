// Global Variables
var inprog = 0;
var speed = '250';

$(document).ready(function() {
    //Flyout funtionality
    // $("ul#leftNav li.categoryClosed").hover(function() {
    //     //When mouse over ...
    //     //Following event is applied to the flyout - makes it visible and then moves it to the right
    //     //window.alert('this');
    //     $(this).find("ul.flyout").css({
    //         visibility: "visible"
    //     });
    //     $(this).find("ul.flyout").stop().animate({
    //         left: 187,
    //         opacity: '1'
    //     },
    //     {
    //         queue: false,
    //         duration: 200,
    //         easing: 'easeOutExpo'
    //     })
    // });
    // //
    // $("ul#leftNav li.categoryClosed").mouseout(function() {
    //     //When mouse out ...
    //     //Following event is applied to the flyout - and moves it to the left makes it invisible
    //     //window.alert('this');
    //     $(this).find("ul.flyout").stop().animate({
    //         left: -187,
    //         opacity: '.01'
    //     },
    //     {
    //         queue: false,
    //         duration: 1,
    //         easing: 'linear'
    //     })
    //     $(this).find("ul.flyout").css({
    //         visibility: "hidden"
    //     });
    // });


	// Flyout functionality

	$("ul#leftNav li.categoryClosed").hover(function() {
		if (inprog == 0) {
			inprog = 1;
			$('.flyout', this).stop().animate({
				left:187
				// opacity:'1' handled by CSS now
			}, {
				queue: false,
				duration: speed,
				easing: 'easeOutExpo'
			}).addClass('visible');
		}
	}, function() {
		$('.flyout', this).animate({
			left:-187
			// opacity:'.01' handled by CSS now
		}, {
			queue: true,
			duration: speed,
			easing: 'easeOutExpo'
		}).removeClass('visible');
		inprog = 0;
	});

    // taskbar
	

});


