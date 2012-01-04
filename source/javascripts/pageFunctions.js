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
    $('#overlay').width(viewport.width()).height(viewport.height());

}

$(window).resize(function() {

  $('#innerContent').height((viewport.height() - barHeight));
  $('#overlay').width(viewport.width()).height(viewport.height());

});

// Easy centering
// jQuery.fn.center = function () {
//     this.css("position","absolute");
//     this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
//     this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
//     return this;
// }



// Global - hide modal
$(document).click(function() {
		
	var view = $('#cal:visible, #plse:visible');
	$('#overlay').fadeOut(speed);
	view.shrinkTo(view.data("source"), {
		complete: function() {
			view.fadeOut(speed);
		}
	});

});


// Common UI Functions
var common = {
	menuAnimate: function() {
		// Animate Left Menu
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
	},
	bu: function(obj) {
		var $this = obj;
		if ($this.parent().find('.menu').is(':visible')) {
			$this.parent().find('.menu').fadeOut(speed);
			$this.removeClass('selected');
		} else {
			$this.parent().find('.menu').fadeIn(speed);
			$this.addClass('selected');
			$this.parent().find('.menu').hover(function() {
				$this.parent().find('.menu').show();	
			}, function() {
				$this.parent().find('.menu').fadeOut(speed);
				$this.parent().find('a:first').removeClass('selected');
			});
		}
	}
}



// Calendar Functions
var calendar = {
	scrollRight: function(obj) {
		var $this = obj;
		var ribbonWidth = $('#view_calendar .ribbon').innerWidth();
		var curWeekPos = $this.parent().find('.table').position();
		if (curWeekPos.left < ribbonWidth) {
			$this.parent().find('.table').animate({
				left: ("-"+ribbonWidth)
			}, speed, 'swing');	
		}
	},
	scrollLeft: function(obj) {
		var $this = obj;
		var ribbonWidth = $('#view_calendar .ribbon').innerWidth();
		var curWeekPos = $this.parent().find('.table').position();
		if (curWeekPos.left < ribbonWidth) {
			$this.parent().find('.table').animate({
					left: 0
			}, speed, 'swing');
		}
	}
}


// Pulse Functions
var pulse = {
	scrollRight: function(obj) {
		var $this = obj;
		var pulseWidth = $('#view_pulse .rail').innerWidth();
		var curPulsePos = $this.parent().find('.mainContent').position();
		if (curPulsePos.left < pulseWidth) {
			$this.parent().find('.mainContent').animate({
				left: ("-"+pulseWidth)
			}, speed, 'easeInOutBack');
			$('.indicator').animate({
				left: 25
			}, speed, 'easeInOutBack');
		}
	},
	scrollLeft: function(obj) {
		var $this = obj;
		var pulseWidth = $('#view_pulse .rail').innerWidth();
		var curPulsePos = $this.parent().find('.mainContent').position();
		if (curPulsePos.left < pulseWidth) {
			$this.parent().find('.mainContent').animate({
				left: 0
			}, speed, 'easeInOutBack');
			$('.indicator').animate({
				left: -3
			}, speed, 'easeInOutBack');
		}
	},
	gadgetry: function(obj) {
		var $this = obj;
		var index = $('.mainContent .gadget').index($this);

		// is it maxed?
		if ($this.hasClass('max')) {
			$this
				.toggleClass('max flip', false)
				.toggleClass('min');
			$('.rail .count .gadget')
				.eq(index)
				.toggleClass('max', false)
				.toggleClass('min');
		}	else {
			$this
				.parents('.mainContent')
				.find('.max')
				.not($this)
				.toggleClass('max flip', false)
				.toggleClass('min');
			$this
				.toggleClass('min', false)
				.toggleClass('max flip');
			$('.rail .count .gadget.max')
				.not(':eq('+index+')')
				.toggleClass('max', false)
				.toggleClass('min');
			$('.rail .count .gadget')
				.eq(index)
				.toggleClass('min', false)
				.toggleClass('max');
		}
	},
	runIndicator: function() {
		var gadgetCount = $('.gadget').length;
		var totalWidth = 0;
		var arr = [];
		$('.rail footer .gadget').each(function() {
			arr.push($(this).outerWidth(true));
		});
		$.each(arr, function() {
			totalWidth += this;
		});
		$('.rail .count').width(totalWidth + 9).addClass('show');
	}
}







// When document is scriptable
$(document).ready(function() {

	draw_viewport();
	common.menuAnimate();


	// Menu Flyout functionality

	$('ul#leftNav li.categoryClosed').hover(function() {
		if (inprog == 0) {
			inprog = 1;
			$('.flyout', this).stop().animate({
				left:187
			}, {
				queue: false,
				duration: speed,
				easing: 'easeOutExpo'
			}).addClass('visible');
		}
	}, function() {
		$('.flyout', this).stop().animate({
			left:-187
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
		common.bu($(this));
		return false;
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
		return false;
	});

	// Dropdown menus

	$('.dropdown-icon').click(function() {
		var options = $(this).closest('.dropdown').find('.options');
		var opHeight = options.outerHeight();
		var pos = $(this).closest('.dropdown').offset();

		if (options.is(':visible')) {
			options.fadeOut(100);
		} else {
			if ((pos.top + opHeight) > viewport.height()) {
				
				options.css("top", -opHeight).fadeIn(100);
			} else {
				options.fadeIn(100);
			}
		}
		return false;
	});



	//Fullscreen

	$('a[title*="Fullscreen"]').click(function(e) {
		
		var rel = $(this).attr('rel');
		var views = $("#" + rel);

		views.data("source", $(this)).growFrom($(this), {
			duration: speed, 
			complete: function() {
				// $('#overlay').fadeIn(speed);
			}
		});
		$('#overlay').fadeIn(speed);
		e.stopPropagation();
		return false;
	});

	$('#cal a[title*="close"], #plse a[title*="close"]').click(function() {
		var views = $(this).closest("div");
		$('#overlay').fadeOut(speed);
		views.shrinkTo(views.data("source"), {
			complete: function() {
				views.fadeOut(speed);
			}
		});
		return false;
	});

	$('#cal, #plse').click(function(e){
		e.stopPropagation();
		return false;
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

	// Left/Right scrolling

	$('.ribbon .navRight').click(function() {
		calendar.scrollRight($(this));
		return false;
	})

	$('.ribbon .navLeft').click(function() {
		calendar.scrollLeft($(this));
		return false;
	})

	// Switch Views

	$('.toggleView .month a, .toggleView .week a').click(function() {
		$(this).parents('li').find('.selected').removeClass('selected');
		$(this).addClass('selected');
		return false;
	});



	// Pulse


	//Max/Min

	if ($('.mainContent .gadget').length >= 1) {

		$('.mainContent .gadget').each(function() {

			// clone each and append to pagination indicator
			$(this).clone().html('').appendTo('.rail footer .count').end();

		});

		$('.mainContent .gadget').click(function() {
			pulse.gadgetry($(this));
			return false;
		});

	}


	// Left/Right scrolling Events

	$('.rail .navRight').click(function() {
		pulse.scrollRight($(this));
		return false;
	});

	$('.rail .navLeft').click(function() {
		pulse.scrollLeft($(this));
		return false;
	});


});


//When everythig is loaded
$(window).load(function() {
	pulse.runIndicator();
})