// Global Variables

var inprog = 0;
var speed = '250';


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

  var containHeight;
	var docsMenuWidth = $('.docsMenu').outerWidth(true);

  if ($('body').hasClass('docs')) {
  	var footerHeight = ($('#indv-footer').outerHeight());
  	var subHeight = $('#wrapper .subContent').innerHeight();

  	if (subHeight >= (viewport.height() - footerHeight)) {
  		containHeight = 0;
  	} else {
  		containHeight = ((viewport.height() - subHeight) - footerHeight);
  	}

  	$('#wrapper .subContent').css('margin-bottom', containHeight + "px");
  } else {
  	// $('#wrapper').width(viewport.width() - docsMenuWidth).height(viewport.height());
  	$('#topBar').width(viewport.width()  - docsMenuWidth);
  	$('#innerContent, #container').height(viewport.height());
  }

  $('#wrapper').width(viewport.width() - docsMenuWidth).height(viewport.height());
  $('.docsMenu section, .docsMenu .tab').height(viewport.height());
  $('#overlay').width(viewport.width()).height(viewport.height());
}

$(window).resize(function() {
	draw_viewport();
});

//Redirect & nicename URLs
jQuery.redirect = function(url, params) {
	url = url || window.location.href || '';
	url = url.match(/\?/) ? url : url + '?';

	for ( var key in params ) {
		var re = RegExp( ';?' + key + '=?[^&;]*', 'g' );
		url = url.replace( re, '');
		url += ';' + key + '=' + params[key];
	}

	// cleanup url
	url = url.replace(/[;&]$/, '');
	url = url.replace(/\?[;&]/, '?');
	url = url.replace(/[;&]{2}/g, ';');

	// $(location).attr('href', url);
	window.location.replace( url );

};

var address = {
  getUrlCategory: function() {
  	return window.location.pathname.split("/").slice(-2, -1).toString();
  	// if (window.location.href.substring(window.location.href.length-1) == "/") {
  	// 	return window.location.href.split(window.location.hostname)[1].split('/')[2];
  	// } else {
  	// 	return window.location.pathname.split("/").slice(-2, -1).toString();
  	// 	// return window.location.href.slice(window.location.href.lastIndexOf('/') + 1).split(/[&?]/, 1);
  	// }
  },
  getUrlFeature: function(){
    if (window.location.href.indexOf('?') != -1) {
    	return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/);
    } else {
    	return;
    }
  }
}

// Global - hide modal
$(document).click(function() {
	var view = $('#cal:visible, #plse:visible, #scrty:visible');

	$(document).delay(300, 'fullScreenQueue');
	$(document).queue('fullScreenQueue', function(next) {
		$('#overlay').fadeOut(400);
		next();
	});
	$(document).queue('fullScreenQueue', function(next) {
		view.shrinkTo(view.data("source"), {
			complete: function() {
				view.fadeOut(400);
			}
		});
		next();
	});
	$(document).dequeue('fullScreenQueue');
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
	menuCollapse: function() {
		$('#leftNav').animate({
			top:-350,
			opacity: '.01'
		}, {
			duration: 500,
			easing: 'easeOutExpo'
		});
		$('#leftNav').siblings('#title').removeClass('expanded');
	},
	menuExpand: function() {
		$('#leftNav').animate({
			top: 32,
			opacity: '1'
		}, {
			duration: 500,
			easing: 'easeOutExpo'
		});
		$('#leftNav').siblings('#title').addClass('expanded');
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
	},
	secNotify: function(obj) {
		var $this = obj;
		var $max = $('.expanded', $this);
		var $min = $('.collapsed', $this);
		
		if ($min.is(':visible')) {
			$min.slideToggle('fast');
			$max.slideToggle('fast');
		} else {
			$min.slideToggle('fast');
			$max.slideToggle('fast');
		}
		return false;
	},
	pullOut: function(obj) {
		var $this = obj;
		var wrapWidth = $('#wrapper').innerWidth();

		$(document).queue('menuQueue', function(next) {
			$('#topBar').animate({
				width: (wrapWidth - 260) + 'px'
			}, 340, 'easeInSine');
			next();
		});
		$(document).queue('menuQueue', function(next) {
			$('#wrapper').animate({
				width: (wrapWidth - 260) + 'px',
				marginLeft: '281px'
			}, 340, 'easeInSine');
			next();
		});
		// $(document).delay(50, 'menuQueue');
		$(document).queue('menuQueue', function(next) {
			$this.parents('.docsMenu').addClass('expand').animate({
				marginLeft: '0',
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
			}, 340, 'easeInSine');
			next();
		});
		// $(document).delay(50, 'menuQueue');
		$(document).queue('menuQueue', function(next) {
			$this.parents('.docsMenu').removeClass('expand').animate({
				width: '21px'
			}, 340, 'easeInSine');
			next();
		});
		$(document).delay(50, 'menuQueue');
		$(document).queue('menuQueue', function(next) {
			$('#wrapper').animate({
				width: (wrapWidth + 260) + 'px',
				marginLeft: '21px'
			}, 340, 'easeInSine');
			next();
		});
		// $(document).delay(100, 'menuQueue');
		$(document).queue('menuQueue', function(next) {
			$('#topBar').animate({
				width: (wrapWidth + 260) + 'px'
			}, 340, 'easeInSine');
			next();
		});
		$(document).dequeue('menuQueue');
	}
}



// Calendar Functions
var calendar = {
	scrollRight: function(obj) {
		var $this = obj;
		var ribbonWidth = $('#view_calendar .ribbon').innerWidth();
		var curWeekPos = $this.parent().find('.table').position();
		if (curWeekPos.left < ribbonWidth) {
			$this.parent().find('.table').delay(150).animate({
				left: ("-"+ribbonWidth)
			}, speed, 'swing');	
		}
	},
	scrollLeft: function(obj) {
		var $this = obj;
		var ribbonWidth = $('#view_calendar .ribbon').innerWidth();
		var curWeekPos = $this.parent().find('.table').position();
		if (curWeekPos.left < ribbonWidth) {
			$this.parent().find('.table').delay(150).animate({
					left: 0
			}, speed, 'swing');
		}
	},
	findEvent: function(obj, i) {
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
				eventImage: '/images/placeholders/eventTwitterThumbnail.png',
				eventTitle: 'Where you at, ATL?',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'red',
				eventAssoc: 'Best Buy Channel Program',
				eventType: 'Facebook',
				eventImage: '/images/placeholders/eventFacebooklThumbnail.png',
				eventTitle: 'You want to roll VIP with Soulja Boy?',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'red',
				eventAssoc: 'Best Buy Channel Program',
				eventType: 'Email',
				eventImage: '/images/placeholders/eventEmailThumbnail.png',
				eventTitle: 'Release Party Announcement',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'green',
				eventAssoc: 'Globetrotting Release Party',
				eventType: 'Twitter',
				eventImage: '/images/placeholders/eventTwitterThumbnail.png',
				eventTitle: 'Where you at, ATL?',
				eventDescrip: '9:00 AM'
			}
		];

		var myTemplate = $( "#eventTemplate" ).template();
		var $view = $.tmpl(myTemplate, events[$item]);
			
		if ($cwidth - $parPos.left < 265) {
			$this
				.parents('#calendar.ribbon')
				.before($view);
			$view
				.stop(true, true)
				.delay(100)
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
			$this
				.parents('#calendar.ribbon')
				.before($view);
			$view
				.stop(true, true)
				.delay(100)
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
	},
	loseEvent: function(obj, i) {
		var $this = obj;
		var $item = i;
		var $dayPos = $this.parents('.day').position();
		var $parPos = $this.parents('.day').parent().position();
		var $pos = $this.parent().position();
		var $cwidth = $('.seven').innerWidth();

		if ($cwidth - $parPos.left < 265) {
			$('#view_' + $this.attr('rel'))
				.stop(true, true)
				.delay(300)
				.animate({
					right: $dayPos.left + 159,
					opacity: 0
				}, 400);
		} else {
			$('#view_' + $this.attr('rel'))
				.stop(true, true)
				.delay(300)
				.animate({
					left: $parPos.left + $pos.left + $this.outerWidth(true) + 9,
					opacity: 0
				}, 400);
		}
	},
	dayPanel: function(obj) {
		var $this = obj;
		
		if ($this.hasClass('open')) {
			$(document).queue('panelQueue', function(next) {
				$this.siblings('div').animate({
					height: '163px'
				}, 250, 'easeInOutQuad');
				next();
			});
			$(document).delay(300, 'pulseQueue');
			$(document).queue('panelQueue', function(next) {
				$this.parents('.rightCol').find('.grid > div').animate({
					height: '454px'
				}, 250, 'easeInOutQuad');
				$this.toggleClass('open');
				next();
			});
			$(document).dequeue('panelQueue');
		} else {
			$(document).queue('panelQueue', function(next) {
				$this.parents('.rightCol').find('.grid > div').animate({
					height: '135px'
				}, 250, 'easeInOutQuad');
				$this.toggleClass('open');
				next();
			});
			$(document).delay(300, 'pulseQueue');
			$(document).queue('panelQueue', function(next) {
				$this.siblings('div').animate({
					height: '480px'
				}, 250, 'easeInOutQuad');
				next();
			});
			$(document).dequeue('panelQueue');
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
			$('.rail .count .gadget')
				.eq(index)
				.toggleClass('min', false)
				.toggleClass('max');
			$('.rail .count .gadget')
				.not(':eq('+index+')')
				.toggleClass('max', false)
				.toggleClass('min');
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
	var url = location.href.substring(location.href);
	var str = url.charAt(url.length-1);

	if (str == '/' || str == '#' || ($('body').is('.main') == true)) {
		common.menuExpand();
	} else {
		common.menuCollapse();
	}

	// remove expand class from collapsed docsMenu
	$('body.main .docsMenu').removeClass('expand');

	// Left Menu

	$('#topBar #title a').click(function() {
		if (str == '/' || str == '#' || ($('body').is('.main') == true)) {
			return;
		} else if ($('#topBar #title').is('.expanded')) {
			common.menuCollapse();
		} else {
			common.menuExpand();
		}
	});

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


	// docsmenu UI
	$('.docsMenu .menu .secondary > a').click(function() {
		if ($(this).parent().hasClass('collapse')) {
			$(this).next('ul').slideToggle(400, 'swing');
			$(this).parent().toggleClass('collapse');
		} else {
			$(this).next('ul').slideUp(400, 'swing');
			$(this).parent().toggleClass('collapse');
		}
	});

	$('.docsMenu .menu .secondary li a').click(function() {
		var par = $(this).attr('href').slice($(this).attr('href').lastIndexOf('/') + 1);
		var rel = $(this).attr('rel');

		$.redirect( $(this).attr('href'), { view : $(this).attr('rel') } );
		return false;
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
		common.secNotify($(this));
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

	// Tab within IMH
	$('body.main .tab').click(function() {
		if ($(this).parents('.docsMenu').is('.expand')) {
			common.pushIn($(this));
		} else {
			common.pullOut($(this));
		}
		return false;
	});

	//Fullscreen

	$('#topTools a[title*="Fullscreen"], .header a[title*="Fullscreen"], .alerts a[title*="Fullscreen"]').click(function(e) {
		
		var rel = $(this).attr('rel');
		var views = $("#" + rel);
		var $this = $(this);

		$(document).delay(300, 'fullScreenQueue');
		$(document).queue('fullScreenQueue', function(next) {
			views.data("source", $this).growFrom($this, {
				duration: 400
			});
			next();
		});
		$(document).queue('fullScreenQueue', function(next) {
			$('#overlay').fadeIn(400);
			next();
		});
		$(document).dequeue('fullScreenQueue');
		e.stopPropagation();
	});

	$('#cal a[title*="close"], #plse a[title*="close"], #scrty a[title*="close"]').click(function() {
		var views = $(this).closest("div");

		$(document).delay(300, 'fullScreenQueue');
		$(document).queue('fullScreenQueue', function(next) {
			$('#overlay').fadeOut(400);
			next();
		});
		$(document).queue('fullScreenQueue', function(next) {
			views.shrinkTo(views.data("source"), {
				complete: function() {
					views.fadeOut(400);
				}
			});
			next();
		});
		$(document).dequeue('fullScreenQueue');
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
		$(this).addClass('noDisplay'); // not a real solution
		$('.ribbon .navLeft').removeClass('noDisplay'); // not a real solution
		calendar.scrollRight($(this));
		return false;
	})

	$('.ribbon .navLeft').click(function() {
		$(this).addClass('noDisplay'); // not a real solution
		$('.ribbon .navRight').removeClass('noDisplay'); // not a real solution
		calendar.scrollLeft($(this));
		return false;
	})

	// Event Hover



	$('.eventList .event').each(function() {
		var item = $(this).attr('rel');
		$(this).on({
			mouseenter: function() {
				calendar.findEvent($(this),item);
			},
			mouseleave: function() {
				calendar.loseEvent($(this),item);

				window.setTimeout(function() {
					$('#view_'+ item).remove();
				}, 500);
			}
		});
	});


	// Day Panel

	$('.panel .toggle').click(function() {
		calendar.dayPanel($(this));
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


	// Left/Right hover scrolling Events

	$('.rail .navLeft').click(function() {
		$(this).addClass('noDisplay'); // not a real solution
		$('.rail .navRight').removeClass('noDisplay'); // not a real solution
		pulse.scrollLeft($(this));
		return false;
	});

	$('.rail .navRight').click(function() {
		$(this).addClass('noDisplay'); // not a real solution
		$('.rail .navLeft').removeClass('noDisplay'); // not a real solution
		pulse.scrollRight($(this));
		return false;
	});


	// P-type Switcher 

	$('.switcher .label').click(function() {
		common.ptypeMenu($(this));
	});

});


//When everythig is loaded
$(window).load(function() {
	draw_viewport();
	pulse.runIndicator();
})

$(window).unload(function() {
  // empty unload so dropdown menu will automaticlaly occur after browser's 'back' button
});