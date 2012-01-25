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



// Global - hide modal
$(document).click(function() {
		
	var view = $('#cal:visible, #plse:visible, #scrty:visible');
	$('#overlay').fadeOut(speed);
	view.shrinkTo(view.data("source"), {
		complete: function() {
			view.fadeOut(speed);
		}
	});

});


// Common UI Functions
var common = {
	ptypeMenu: function(obj) {
		var $this = obj;

		if($this.parent().is('.collapsed')) {
			$this.parent().animate({
				left: '-1px'
			}, speed, 'easeOutExpo').removeClass('collapsed');
		} else {
			$this.parent().animate({
				left: '-134px'
			}, 150).addClass('collapsed');
		}
	},
	menuExpand: function() {
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
	menuCollapse: function() {
		$('#leftNav').animate({
			top:-350,
			opacity: '.01'
		}, {
			duration: 500,
			easing: 'easeOutExpo'
		})
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
	},
	removeEvent: function(obj) {
		var $this = obj;
		$this.next('.detail').remove();
	},
	getEvent: function(obj, i) {
		var $this = obj;
		var $item = i;
		var $dayPos = $this.parents('.day').position();
		var $parPos = $this.parents('.day').parent().position();
		var $pos = $this.parent().position();
		var $cwidth = $('.seven').innerWidth();
		var events = [
			{
				eventColor: 'purple',
				eventAssoc: 'iTunes Download Program',
				eventType: 'Mobile',
				eventImage: '',
				eventTitle: 'Release Party Text Message',
				eventDescrip: '8:00 AM'
			},
			{
				eventColor: 'red',
				eventAssoc: 'Best Buy Channel Program',
				eventType: 'Twitter',
				eventImage: 'images/placeholders/eventTwitterThumbnail.png',
				eventTitle: 'Where you at, ATL?',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'red',
				eventAssoc: 'Best Buy Channel Program',
				eventType: 'Facebook',
				eventImage: 'images/placeholders/eventFacebooklThumbnail.png',
				eventTitle: 'You want to roll VIP with Soulja Boy?',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'red',
				eventAssoc: 'Best Buy Channel Program',
				eventType: 'Email',
				eventImage: 'images/placeholders/eventEmailThumbnail.png',
				eventTitle: 'Release Party Announcement',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'green',
				eventAssoc: 'Globetrotting Release Party',
				eventType: 'Twitter',
				eventImage: 'images/placeholders/eventTwitterThumbnail.png',
				eventTitle: 'Where you at, ATL?',
				eventDescrip: '9:00 AM'
			}
		];

		// alert($parPos.left + $pos.left);

		if ($('.eventDetail').is(':visible')) {
			if ($cwidth - $parPos.left < 265) {
				$('#view_' + $this.attr('rel'))
					.stop()
					.animate({
						right: $dayPos.left + 159,
						opacity: 0
					}, 400);
			} else {
				$('#view_' + $this.attr('rel'))
					.stop()
					.animate({
						left: $parPos.left + $pos.left + $this.outerWidth(true) + 9,
						opacity: 0
					}, 400);
			}
		} else {
			$.get('templates.htm', function(template) {
				$view = $.tmpl(template, events[$item]);
			
				if ($cwidth - $parPos.left < 265) {
					$this.parents('#calendar.ribbon').before($view);
					$view
						.stop()
						.css({
							'top' : $parPos.top + $pos.top + 10,
							'right' : $dayPos.left + 157
						})
						.addClass('right')
						.animate({
							right: $dayPos.left + 148,
							opacity: 1
						}, 400)
						.attr('id','view_' + $this.attr('rel'));
				} else {
					$this.parents('#calendar.ribbon').before($view);
					$view
						.stop()
						.css({
							'top' : $parPos.top + $pos.top + 10,
							'left' : $parPos.left + $pos.left + $this.outerWidth(true) + 9
						})
						.animate({
							left: $parPos.left + $pos.left + $this.outerWidth(true) + 2,
							opacity: 1
						}, 400)
						.attr('id','view_' + $this.attr('rel'));
				}
			});
		}
	}
}


// Pulse Functions
var pulse = {
	scrollRight: function(obj) {
		var $this = obj;
		var indPos = $('.indicator').position();
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
		var indPos = $('.indicator').position();
		var pulseWidth = $('#view_pulse .rail').innerWidth();
		var curPulsePos = $this.parent().find('.mainContent ').position();
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
	common.menuExpand();


	// Left Menu

	$('#leftNav li a').click(function() {
		var ref = $(this).attr('href');

		common.menuCollapse();
	});

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

	$('#cal a[title*="close"], #plse a[title*="close"], #scrty a[title*="close"]').click(function() {
		var views = $(this).closest("div");
		$('#overlay').fadeOut(speed);
		views.shrinkTo(views.data("source"), {
			complete: function() {
				views.fadeOut(speed);
			}
		});
		return false;
	});

	$('#cal, #plse, #scrty').click(function(e){
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

	// Event Hover

	$('.eventList .event').each(function() {
		$(this).on({
			mouseenter: function() {
				var item = $(this).attr('rel');
				calendar.getEvent($(this),item);
			},
			mouseleave: function() {
				var item = $(this).attr('rel');
				calendar.getEvent($(this),item);

				window.setTimeout(function() {
					$('#view_'+ item).remove();
				}, 1000);
			}
		});
	});


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


	// P-type Switcher 

	$('.switcher .label').click(function() {
		common.ptypeMenu($(this));
	});

});


//When everythig is loaded
$(window).load(function() {
	pulse.runIndicator();
})