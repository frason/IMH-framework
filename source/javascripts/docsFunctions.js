//Protototype Docs


// Menu specific
var menuDocs = {
	pullOut: function(obj) {
		var $this = obj;
		var wrapWidth = $('#wrapper').innerWidth();

		$(document).queue('menuQueue', function(next) {
			$('#wrapper').animate({
				width: (wrapWidth - 281) + 'px',
				marginLeft: '281px'
			}, 340, 'easeInSine');
			next();
		});
		$(document).delay(50, 'menuQueue');
		$(document).queue('menuQueue', function(next) {
			$this.parents('.docsMenu').addClass('expand').animate({
				left: '0',
				width: '281px'
			}, 340, 'easeInSine');
			next();
		});
		$(document).queue('menuQueue', function(next) {
			$this.parents('.docsMenu').find('section').animate({
				marginLeft: '0'
				// width:'0'
			}, 340, 'easeInSine');
			next();
		});
		$(document).dequeue('menuQueue');
	},
	pushIn: function(obj) {
		var $this = obj;
		var wrapWidth = $('#wrapper').innerWidth();

		$(document).queue('menuQueue', function(next) {
			$this.parents('.docsMenu').find('section').animate({
				marginLeft: '-261px'
				// width:'0'
			}, 340, 'easeInSine');
			next();
		});
		$(document).queue('menuQueue', function(next) {
			$this.parents('.docsMenu').removeClass('expand').animate({
				// left: '-261px',
				width: '20px'
			}, 340, 'easeInSine');
			next();
		});
		$(document).delay(100, 'menuQueue');
		$(document).queue('menuQueue', function(next) {
			$('#wrapper').animate({
				width: (wrapWidth + 261) + 'px',
				marginLeft: '20px'
			}, 340, 'easeInSine');
			next();
		});
		$(document).dequeue('menuQueue');
	}
}


// Calendar functions
var calendarDocs = {
	doRibbonScroll: function() {
		// make sure cal is in the start position
		$(document).queue('calendarQueue', function(next) {
			calendar.scrollLeft($('.ribbon .navLeft'));
			next();
		});
		$(document).delay(500, 'calendarQueue');
		// fade UI in after .5 sec
		$(document).queue('calendarQueue', function(next) {
			$('.ribbon .navRight, .ribbon .navLeft').fadeIn(250);
			next();
		});
		$(document).delay(1000, 'calendarQueue');
		// simulate mousedown on nav-right arrow
		$(document).queue('calendarQueue', function(next) {
			$('.ribbon .navRight a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'calendarQueue');
		// simulate mouseup & scroll cal right
		$(document).queue('calendarQueue', function(next) {
			$('.ribbon .navRight').addClass('noDisplay'); // not a real solution
			$('.ribbon .navLeft').removeClass('noDisplay'); // not a real solution
			$('.ribbon .navRight a').toggleClass('sim');
			calendar.scrollRight($('.ribbon .navRight'));
			next();
		});
		$(document).delay(1000, 'calendarQueue');
		// simulate mousedown on nav-left arrow
		$(document).queue('calendarQueue', function(next) {
			$('.ribbon .navLeft a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'calendarQueue');
		// simulate mouseup & scroll cal left
		$(document).queue('calendarQueue', function(next) {
			$('.ribbon .navLeft').addClass('noDisplay'); // not a real solution
			$('.ribbon .navRight').removeClass('noDisplay'); // not a real solution
			$('.ribbon .navLeft a').toggleClass('sim');
			calendar.scrollLeft($('.ribbon .navLeft'));
			next();
		});
		$(document).delay(1000, 'calendarQueue');
		// fade UI out after 3.5 secs
		$(document).queue('calendarQueue', function(next) {
			$('.ribbon .navRight, .ribbon .navLeft').fadeOut(250);
			next();
		});
		$(document).dequeue('calendarQueue');
	},
	doFullScreen: function() {
		// var wrapWidth = $('div[role="main"]').innerWidth();
		$(document).delay(700, 'calendarQueue');
		// simulate mousedown on 'Full Screen' link
		$(document).queue('calendarQueue', function(next) {
			$('.header a[title*="Fullscreen"]').toggleClass('sim');
			next();
		});
		$(document).delay(300, 'calendarQueue');
		// simulate mouseup on 'Full Screen' link & invoke calendar modal from origin
		$(document).queue('calendarQueue', function(next) {
			$('.header a[title*="Fullscreen"]').toggleClass('sim');

			var $this = $('.header a[title*="Fullscreen"]');
			var rel = $this.attr('rel');
			var views = $("#" + rel);

			views.data("source", $this).growFrom($this, {
				duration: 400, 
				complete: function() {
				}
			});
			// views.css('left', ((wrapWidth - views.width())/2) + 'px');
			$('#overlay').fadeIn(400);
			next();
		});
		$(document).delay(2500, 'calendarQueue');
		// simulate mousedown on close 'X' link
		$(document).queue('calendarQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');
			next();
		});
		$(document).delay(500, 'calendarQueue');
		// simulate mouseup on close 'X' link & shrink calendar modal to origin
		$(document).queue('calendarQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');

			var $this = $('#cal a[title*="close"]');
			var views = $this.closest("div");

			$('#overlay').fadeOut(400);
			views.shrinkTo(views.data("source"), {
				complete: function() {
					views.fadeOut(400);
				}
			});
			next();
		});
		$(document).dequeue('calendarQueue');
	},
	doDayPanel: function() {
		$(document).delay(700, 'calendarQueue');
		// simulate mousedown on 'Full Screen' link
		$(document).queue('calendarQueue', function(next) {
			$('.header a[title*="Fullscreen"]').toggleClass('sim');
			next();
		});
		$(document).delay(300, 'calendarQueue');
		// simulate mouseup on 'Full Screen' link & invoke calendar modal from origin
		$(document).queue('calendarQueue', function(next) {
			$('.header a[title*="Fullscreen"]').toggleClass('sim');

			var $this = $('.header a[title*="Fullscreen"]');
			var rel = $this.attr('rel');
			var views = $("#" + rel);

			views.data("source", $this).growFrom($this, {
				duration: 400, 
				complete: function() {
				}
			});
			// views.css('left', ((wrapWidth - views.width())/2) + 'px');
			$('#overlay').fadeIn(400);
			next();
		});
		$(document).delay(1500, 'calendarQueue');
		// simulate mousedown on toggle bar
		$(document).queue('calendarQueue', function(next) {
			$('.panel .toggle').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'calendarQueue');
		// invoke day panel up
		$(document).queue('calendarQueue', function(next) {
			$('.panel .toggle').toggleClass('sim');
			calendar.dayPanel($('.panel .toggle'));
			next();
		});
		$(document).delay(1500, 'calendarQueue');
		// simulate mousedown on toggle bar
		$(document).queue('calendarQueue', function(next) {
			$('.panel .toggle').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'calendarQueue');
		// invoke day panel down
		$(document).queue('calendarQueue', function(next) {
			$('.panel .toggle').toggleClass('sim');
			calendar.dayPanel($('.panel .toggle'));
			next();
		});
		$(document).delay(2000, 'calendarQueue');
		// simulate mousedown on close 'X' link
		$(document).queue('calendarQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');
			next();
		});
		$(document).delay(500, 'calendarQueue');
		// simulate mouseup on close 'X' link & shrink calendar modal to origin
		$(document).queue('calendarQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');

			var $this = $('#cal a[title*="close"]');
			var views = $this.closest("div");

			$('#overlay').fadeOut(400);
			views.shrinkTo(views.data("source"), {
				complete: function() {
					views.fadeOut(400);
				}
			});
			next();
		});
		$(document).dequeue('calendarQueue');
	}
}


// Pulse Functions
var pulseDocs = {
	doRibbonScroll: function() {
		// make sure pulse is in the start position
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft').addClass('noDisplay'); // not a real solution
			$('.navRight').removeClass('noDisplay'); // not a real solution
			pulse.scrollLeft($('.navLeft'));
			next();
		});
		$(document).delay(700, 'pulseQueue');
		// fade UI in right after .5 sec
		$(document).queue('pulseQueue', function(next) {
			$('.navRight a').animate({
					opacity: '1'
				}, 250);
				next();
		});
		$(document).delay(1000, 'pulseQueue');
		// simulate mousedown on nav-right arrow
		$(document).queue('pulseQueue', function(next) {
			$('.navRight a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'pulseQueue');
		// simulate mouseup & scroll pulse right
		$(document).queue('pulseQueue', function(next) {
			$('.navRight').addClass('noDisplay'); // not a real solution
			$('.rail .navLeft').removeClass('noDisplay'); // not a real solution
			$('.navRight a').toggleClass('sim');
			pulse.scrollRight($('.navRight'));
			$('.navRight a').animate({
				opacity: '0'
			}, 250);
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		// fade UI in left after
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft a').animate({
				opacity: '1'
			}, 250);
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		// simulate mousedown on nav-left arrow
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'pulseQueue');
		// simulate mouseup & scroll pulse left
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft').addClass('noDisplay'); // not a real solution
			$('.navRight').removeClass('noDisplay'); // not a real solution
			$('.navLeft a').toggleClass('sim');
			pulse.scrollLeft($('.navLeft'));
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft a').animate({
				opacity: '0'
			}, 250, function() {
				$('.navRight a, .navLeft a').removeAttr('style');
			});
			next();
		});
		$(document).dequeue('pulseQueue');
	},
	doPaginationScroll: function() {
		// make sure pulse is in the start position
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft').addClass('noDisplay'); // not a real solution
			$('.navRight').removeClass('noDisplay'); // not a real solution
			pulse.scrollLeft($('.navLeft'));
			$('.count').append('<div class="sim">');
			next();
		});
		$(document).delay(700, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.count .sim').fadeIn(250);
			next();
		});
		$(document).delay(500, 'pulseQueue');
		// fade UI in right after .5 sec
		$(document).queue('pulseQueue', function(next) {
			$('.navRight a').animate({
					opacity: '1'
				}, 250);
			$('.count .sim').fadeIn(250);
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		// simulate mousedown on nav-right arrow
		$(document).queue('pulseQueue', function(next) {
			$('.navRight a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'pulseQueue');
		// simulate mouseup & scroll pulse right
		$(document).queue('pulseQueue', function(next) {
			$('.navRight').addClass('noDisplay'); // not a real solution
			$('.rail .navLeft').removeClass('noDisplay'); // not a real solution
			$('.navRight a').toggleClass('sim');
			pulse.scrollRight($('.navRight'));
			$('.navRight a').animate({
				opacity: '0'
			}, 250);
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		// fade UI in left after
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft a').animate({
				opacity: '1'
			}, 250);
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		// simulate mousedown on nav-left arrow
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'pulseQueue');
		// simulate mouseup & scroll pulse left
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft').addClass('noDisplay'); // not a real solution
			$('.navRight').removeClass('noDisplay'); // not a real solution
			$('.navLeft a').toggleClass('sim');
			pulse.scrollLeft($('.navLeft'));
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft a').animate({
				opacity: '0'
			}, 250, function() {
				$('.navRight a, .navLeft a').removeAttr('style');
			});
			$('.count .sim').fadeOut(250);
			next();
		});
		$(document).delay(500, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.count .sim').remove();
		});
		$(document).dequeue('pulseQueue');
	},
	doGadgetHover: function() {
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent').find('.gadget:eq(0)').addClass('max').toggleClass('min', false).siblings().addClass('min').toggleClass('max flip', false);
			$('.rail .count .gadget')
				.eq('0')
				.removeClass('min')
				.addClass('max');
			$('.rail .count .gadget')
				.not(':eq(0)')
				.toggleClass('max', false)
				.toggleClass('min');
			$('.navLeft').addClass('noDisplay'); // not a real solution
			$('.navRight').removeClass('noDisplay'); // not a real solution
			pulse.scrollLeft($('.navLeft'));
			$('.mainContent .gadget.min:eq(0)').append('<span class="highlight">');
			next();
		});
		$(document).delay(700, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget.min:eq(0) .highlight').fadeIn(250);
			next();
		});
		$(document).delay(100, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget.min:eq(0)').first().toggleClass('sim');
			next();
		});
		$(document).delay(1000, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget.min:eq(0)').toggleClass('sim');
			$('.mainContent .gadget.min:eq(0) .highlight').fadeOut(250);
			next();
		});
		$(document).delay(300, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget.min:eq(0) .highlight').remove();
			next();
		});
		$(document).dequeue('pulseQueue');
	},
	doGadgetExpand: function() {
		$(document).queue('pulseQueue', function(next) {
			$('.navLeft').addClass('noDisplay'); // not a real solution
			$('.navRight').removeClass('noDisplay'); // not a real solution
			pulse.scrollLeft($('.navLeft'));
			$('.mainContent .gadget:eq(2)').append('<span class="simClick">');
			next();
		});
		$(document).delay(700, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget:eq(2)').toggleClass('sim');
			$('.mainContent .gadget:eq(2) .simClick').fadeIn(150);
			next();
		});
		$(document).delay(200, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget:eq(2) .simClick').fadeOut(150);
			next();
		});
		$(document).delay(200, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget:eq(2)').toggleClass('sim');
			pulse.gadgetry($('.mainContent > div').first().find('.gadget:eq(2)'));
			next();
		});
		$(document).delay(1700, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget:eq(2) .simClick').fadeIn(150);
			next();
		});
		$(document).delay(200, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget:eq(2) .simClick').fadeOut(150);
			next();
		});
		$(document).delay(200, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			// $('.mainContent .gadget:eq(2)').toggleClass('sim');
			pulse.gadgetry($('.mainContent .gadget:eq(2)'));
			next();
		});
		$(document).delay(200, 'pulseQueue');
		$(document).queue('pulseQueue', function(next) {
			$('.mainContent .gadget:eq(2) .simClick').remove();
		});
		$(document).dequeue('pulseQueue');
	},
	doFullScreen: function() {
		// var wrapWidth = $('div[role="main"]').innerWidth();
		$(document).delay(700, 'pulseQueue');
		// simulate mousedown on 'Full Screen' link
		$(document).queue('pulseQueue', function(next) {
			$('.header a[title*="Fullscreen"]').toggleClass('sim');
			next();
		});
		$(document).delay(500, 'pulseQueue');
		// simulate mouseup on 'Full Screen' link & invoke calendar modal from origin
		$(document).queue('pulseQueue', function(next) {
			$('.header a[title*="Fullscreen"]').toggleClass('sim');

			var $this = $('.header a[title*="Fullscreen"]');
			var rel = $this.attr('rel');
			var views = $("#" + rel);

			views.data("source", $this).growFrom($this, {
				duration: 400, 
				complete: function() {
				}
			});
			$('#overlay').fadeIn(400);
			next();
		});
		$(document).delay(2500, 'pulseQueue');
		// simulate mousedown on close 'X' link
		$(document).queue('pulseQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');
			next();
		});
		$(document).delay(300, 'pulseQueue');
		// simulate mouseup on close 'X' link & shrink calendar modal to origin
		$(document).queue('pulseQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');

			var $this = $('#plseFull a[title*="close"]');
			var views = $this.closest("div");

			$('#overlay').fadeOut(400);
			views.shrinkTo(views.data("source"), {
				complete: function() {
					views.fadeOut(400);
				}
			});
			next();
		});
		$(document).dequeue('pulseQueue');
	}
}


// Security Functions
var securityDocs = {
	doNotifier: function() {
		// make sure notifier is in the down position
		$(document).queue('securityQueue', function(next) {
			if ($('#security .expanded').is(':visible')) {
				$('#security .collapsed').slideToggle('fast');
				$('#security .expanded').slideToggle('fast');
			};
			next();
		});
		$(document).delay(1000, 'securityQueue');
		// simulate mousedown on collapsed security notifier
		$(document).queue('securityQueue', function(next) {
			$('#security .collapsed').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'securityQueue');
		// simulate mouseup on collapsed security notifier & expand
		$(document).queue('securityQueue', function(next) {
			$('#security .collapsed').toggleClass('sim');
			common.secNotify($('#security'));
			next();
		});
		$(document).delay(1500, 'securityQueue');
		// simulate mousedown on 'Account Activity' title
		$(document).queue('securityQueue', function(next) {
			$('#security .expanded h2 a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'securityQueue');
		// simulate mouseup on 'Account Activity' title & collapse
		$(document).queue('securityQueue', function(next) {
			$('#security .expanded h2 a').toggleClass('sim');
			common.secNotify($('#security'));
			next();
		});
		$(document).dequeue('securityQueue');
	},
	doFullScreen: function() {
		// make sure notifier is in the down position
		$(document).queue('securityQueue', function(next) {
			if ($('#security .expanded').is(':visible')) {
				$('#security .collapsed').slideToggle('fast');
				$('#security .expanded').slideToggle('fast');
			};
			next();
		});
		$(document).delay(1000, 'securityQueue');
		// simulate mousedown on collapsed security notifier
		$(document).queue('securityQueue', function(next) {
			$('#security .collapsed').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'securityQueue');
		// simulate mouseup on collapsed security notifier & expand
		$(document).queue('securityQueue', function(next) {
			$('#security .collapsed').toggleClass('sim');
			common.secNotify($('#security'));
			next();
		});
		$(document).delay(1500, 'securityQueue');
		// simulate mousedown for Fullscreen view
		$(document).queue('securityQueue', function(next) {
			$('#security a[title*="Fullscreen"]').toggleClass('sim');
			next();
		});
		$(document).delay(300, 'securityQueue');
		// simulate mouseup for Fullscreen view & invoke fullscreen
		$(document).queue('securityQueue', function(next) {
			

			$('#security a[title*="Fullscreen"]').toggleClass('sim');

			var $this = $('#security a[title*="Fullscreen"]');
			var rel = $this.attr('rel');
			var views = $("#" + rel);

			views.data("source", $this).growFrom($this, {
				duration: 400, 
				complete: function() {
				// $('#overlay').fadeIn(speed);
				}
			});
			$('#overlay').fadeIn(400);
			next();
		});
		$(document).delay(2000, 'securityQueue');
		// simulate mousedown on close 'X'
		$(document).queue('securityQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'securityQueue');
		// simulate mouseup on close 'X' link & shrink calendar modal to origin
		$(document).queue('securityQueue', function(next) {
			$('header a[title*="close"]').toggleClass('sim');
			
			var $this = $('#scrty a[title*="close"]');
			var views = $this.closest("div");

			$('#overlay').fadeOut(400);
			views.shrinkTo(views.data("source"), {
				complete: function() {
					views.fadeOut(400);
				}
			});
			next();
		});
		$(document).delay(1500, 'securityQueue');
		// simulate mousedown on 'Account Activity' title
		$(document).queue('securityQueue', function(next) {
			$('#security .expanded h2 a').toggleClass('sim');
			next();
		});
		$(document).delay(200, 'securityQueue');
		// simulate mouseup on 'Account Activity' title & collapse
		$(document).queue('securityQueue', function(next) {
			$('#security .expanded h2 a').toggleClass('sim');
			common.secNotify($('#security'));
			next();
		});
		$(document).dequeue('securityQueue');
	}
}



$(document).ready(function() {

	var $category = address.getUrlCategory();
	var $feature = address.getUrlFeature();
	var $fClass = '';
	var $title = '';

	if ($feature != null) {
		$fClass = $feature.join().replace(",","").replace("#","");

		$('.secondary li a').each(function() {

			if (($(this).attr('rel') == $fClass) && ($(this).parents('.secondary').find('> a').text() == $category)) {
				var $title = $(this).text();

				$(this).addClass('active');
				$('.indv-options span').append($title);
			}
		});

	} else {
		$('.secondary > a').each(function() {
			if ($(this).text() == $category) {
				$(this).siblings('ul').find('li:first-child a').addClass('active');
				$('.indv-options span').append($(this).siblings('ul').find('li:first-child a').text());
			}


		})

		$('.indv-documentation article').first().css('display', 'block');
	}

	// Parse Url and...

	// ...append category & feature as classes to body
	$('body').addClass(function() {
		$('.docsMenu .menu').find('.' + $category + '').removeClass('collapse');
		return $category + ' ' + $fClass;
	});

	$('body.docs .tab').click(function() {
		if ($(this).parents('.docsMenu').is('.expand')) {
			menuDocs.pushIn($(this));
		} else {
			menuDocs.pullOut($(this));
		}
		return false;
	});

});
