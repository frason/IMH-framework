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

	var ribbonWidth = $('#view_calendar .ribbon').innerWidth();
	var pulseWidth = $('#view_pulse .rail').innerWidth();

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

	// Dropdown menus

	$('.dropdown-icon').click(function() {
		var options = $(this).closest('.dropdown').find('.options');
		if (options.is(':visible')) {
			options.fadeOut(100);
		} else {
			options.fadeIn(100);
		}
	});



	// Calendar

	// Fade UI
	$('.ribbon').hover(function() {
		if (inprog == 0) {
			inprog = 1;
			$('.navLeft, .navRight', this).fadeIn(speed);
		}
	}, function() {
		$('.navLeft, .navRight', this).fadeOut(speed);
		inprog = 0;
	});

	// Left/Right scrolling Events

	$('.ribbon .navRight').click(function() {
		var curWeekPos = $(this).parent().find('.table').position();

		if (curWeekPos.left < ribbonWidth) {
			$(this).parent().find('.table').animate({
					left: ("-"+ribbonWidth)
			}, speed, 'swing');	
		}
	})

	$('.ribbon .navLeft').click(function() {
		var curWeekPos = $(this).parent().find('.table').position();

		if (curWeekPos.left < ribbonWidth) {
			$(this).parent().find('.table').animate({
					left: 0
			}, speed, 'swing');
		}
	})

	// Pulse


	//Max/Min

	$('.gadget').each(function() {


		// clone each and append to pagination indicator
		$(this).clone().html('').appendTo('.rail footer .count').end();


		$(this).click(function() {

			// our current index
			var index = $('.mainContent .gadget').index(this);

			// is it maxed?
			if ($(this).hasClass('max')) {
				$(this).toggleClass('max flip', false).toggleClass('min');
				$('.rail .count .gadget').eq(index).toggleClass('max', false).toggleClass('min');
			}	else {
				$(this).parents('.mainContent').find('.max').not($(this)).toggleClass('max flip', false).toggleClass('min');
				$(this).toggleClass('min', false).toggleClass('max flip');

				$('.rail .count').find('.max:not(:eq('+index+'))').toggleClass('max', false).toggleClass('min');
				$('.rail .count .gadget').eq(index).toggleClass('min', false).toggleClass('max');
			}
		});
	});

	// Left/Right scrolling Events

	$('.rail .navRight').click(function() {
		var curPulsePos = $(this).parent().find('.mainContent').position();

		if (curPulsePos.left < pulseWidth) {
			$(this).parent().find('.mainContent').animate({
				left: ("-"+pulseWidth)
			}, speed, 'easeInOutBack');
			$('.indicator').animate({
				left: 25
			}, speed, 'easeInOutBack');
		}
	});

	$('.rail .navLeft').click(function() {
		var curPulsePos = $(this).parent().find('.mainContent').position();

		if (curPulsePos.left < pulseWidth) {
			$(this).parent().find('.mainContent').animate({
				left: 0
			}, speed, 'easeInOutBack');
			$('.indicator').animate({
				left: -3
			}, speed, 'easeInOutBack');
		}
	});

// Indicator

if ($('.gadget').size() >= 1 ) {
	
	var gadgetCount = $('.gadget').size();
	var totalWidth = 0;

	var arr = [];
	$('.rail footer .gadget').each(function() {
		arr.push($(this).outerWidth(true));
	});

	$.each(arr, function() {
		totalWidth += this;
	});

	$('.rail footer .count').width(totalWidth+3);

		
}

























});