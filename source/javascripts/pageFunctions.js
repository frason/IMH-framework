// Global Variables

var inprog = 0;
var speed = '250';
var barHeight = $('#topBar').outerHeight();


// Let's get the viewport dimensions

function draw_viewport () {
   
    window.viewport = {
        height: function() {
            return $(window).height();
        },
        width: function() {
            return $(window).width();
        },
        scrollTop: function() {
            return $(window).scrollTop();
        },
        scrollLeft: function() {
            return $(window).scrollLeft();
        }
    };

    $('#innerContent').height((viewport.height() - barHeight));

}

$(window).resize(function() {

  $('#innerContent').height((viewport.height() - barHeight));

});

$(document).ready(function() {

	draw_viewport();

	// Left navigation
	
	$('#leftNav').css({
		top: -350,
		opacity: '.01'
	});
	
	$('#leftNav').delay(500).animate({
		top: 32,
		opacity: '1'
	}, {
		duration: 500,
		easing: 'easeOutExpo'
	});


	// Flyout functionality

	$('ul#leftNav li.categoryClosed').hover(function() {
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
		$('.flyout', this).stop().animate({
			left:-187
			// opacity:'.01' handled by CSS now
		}, {
			queue: true,
			duration: speed,
			easing: 'easeOutExpo'
		}).removeClass('visible');
		inprog = 0;
	});


	// Taskbar menus

	$('.user-info').hover(function() {
		if (inprog == 0) {
			inprog = 1;
			$('.menu', this).fadeIn(speed);
			$('a:first', this).addClass('selected');
		}
	}, function() {
		$('.menu', this).fadeOut(speed);
		$('a:first', this).removeClass('selected');
		inprog = 0;
	});
	
	$('.buDropDown a:first').click(function() {
		if ($(this).parent().find('.menu').is(':visible')) {
			$(this).parent().find('.menu').fadeOut(speed);
			$(this).removeClass('selected');
		} else {
			$(this).parent().find('.menu').fadeIn(speed);
			$(this).addClass('selected');
		}

	});
	
	
	// Security Notifications
	
	$('#security').click(function() {
		$max = $('.expanded', this);
		$min = $('.collapsed', this);
		
		if ($min.is(':visible')) {
			$min.slideToggle('fast');
			$max.slideToggle('fast');
		} else {
			$min.slideToggle('fast');
			$max.slideToggle('fast');
		}
	});

});