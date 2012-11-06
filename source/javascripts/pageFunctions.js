// Global Variables

var inprog = 0;
var speed = '250';

//Session storage
var storage = {
	enableGuide: function() {
		var $whichBanner = $('.banner').attr('id');
		if (sessionStorage.getItem($whichBanner) == 'show' || sessionStorage.getItem($whichBanner) === null) {
			$('.btn_toggle a[title="show"]').addClass('on').siblings().removeClass('on');
			if ($('body').is('.callouts')) {
				$('.banner').not('.modal').animate({
					height: '19px',
					top: '43px',
					opacity: 1
				}, 250, function() {
					$('.callout').fadeIn(400);
				});
				$('#view_calendar').animate({
					marginTop: '32px'
				}, 250);
			} else if ($('body').is('.static')) {
					$('.callout').delay(2000).fadeIn(400);
			}
		} else if (sessionStorage.getItem($whichBanner) == 'hide') {
			$('.btn_toggle a[title="hide"]').addClass('on').siblings().removeClass('on');
			if ($('body').is('.callouts')) {
				$('.banner').not('.modal').animate({
					height: '19px',
					top: '43px',
					opacity: 1
				}, 250);
				$('.callout').css('display', 'none');
				$('#view_calendar').animate({
					marginTop: '32px'
				}, 250);
			}
		}
	},
	checkIf: function() {
		if(sessionStorage.getItem('visited') === null) {
			return false;
		} else {
			var savedString = sessionStorage.getItem('visited');
			var vList = $.parseJSON(savedString);
		
			$.each(vList, function(key, value) {
				$('#explore nav a[title="'+value+'"]').addClass('complete');
			});
		}
	},
	sendTo: function() {
		var sort_visits = removeDupes(visits);

		function removeDupes(arr) {
			var nonDupes = [];
			arr.forEach(function(value) {
				if (nonDupes.indexOf(value) == -1) {
					nonDupes.push(value);
				}
			});
			return nonDupes;
    }

		sessionStorage.setItem('visited', JSON.stringify(sort_visits));
	}
}


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
	var view = $('#cal:visible, #plseFull:visible, #plseGadgetFull:visible, #plseConfig:visible, #scrty:visible');

	$('.dropdown-icon').parent().siblings('.options').fadeOut(100);

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
		alert('hi');
		var $this = obj;

		if($this.parent().is('.collapsed')) {
			$this.parent().animate({
				left: '-1px'
			}, speed, 'easeOutExpo').removeClass('collapsed');
		} else {
			$this.parent().stop(true,true).animate({
				left: '-134px'
			}, 150).addClass('collapsed');
		}
	},
	menuCollapse: function() {
		var $mHeight = $('#leftNav').outerHeight();
		$('#leftNav').parent().siblings('li').find('#title').removeClass('expanded');
		
		$(document).delay(200, 'mainMenuQueue');
		$(document).queue('mainMenuQueue', function(next) {
			$('#leftNav').animate({
				top:'-' + $mHeight + 'px'
			}, {
				duration: 800,
				easing: 'easeOutCirc'
			});
			next();
		});
		$(document).dequeue('mainMenuQueue');
	},
	menuExpand: function() {
		$('#leftNav').parent().siblings('li').find('#title').addClass('expanded');
		
		$(document).queue('mainMenuQueue', function(next) {
			$('#leftNav').animate({
				top: '32px'
			}, {
				duration: 800,
				easing: 'easeOutCirc'
			});
			next();
		});
		$(document).dequeue('mainMenuQueue');
	},
	bu: function(obj) {
		var $this = obj;
		var parW = $this.parent().innerWidth();
		if ($this.parent().find('.menu').is(':visible')) {
			$this.parent().find('.menu').fadeOut(speed);
			$this.removeClass('selected');
		} else {
			$this.parent().find('.menu').fadeIn(speed).css('left', '-' + (($this.parent().find('.menu').innerWidth() - parW) / 2) + 'px');
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
			$this.addClass('noDisplay'); // not a real solution
			$('.ribbon .navLeft').removeClass('noDisplay'); // not a real solution
			$this.parents('.container').find('header .squib').addClass('active');
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
			$this.addClass('noDisplay'); // not a real solution
			$('.ribbon .navRight').removeClass('noDisplay'); // not a real solution
			$this.parents('.container').find('header .squib').removeClass('active');
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
				eventImage: 'placeholders/eventTwitterThumbnail.png',
				eventTitle: 'Where you at, ATL?',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'red',
				eventAssoc: 'Best Buy Channel Program',
				eventType: 'Facebook',
				eventImage: 'placeholders/eventFacebooklThumbnail.png',
				eventTitle: 'You want to roll VIP with Soulja Boy?',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'red',
				eventAssoc: 'Best Buy Channel Program',
				eventType: 'Email',
				eventImage: 'placeholders/eventEmailThumbnail.png',
				eventTitle: 'Release Party Announcement',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: 'green',
				eventAssoc: 'Globetrotting Release Party',
				eventType: 'Twitter',
				eventImage: 'placeholders/eventTwitterThumbnail.png',
				eventTitle: 'Where you at, ATL?',
				eventDescrip: '9:00 AM'
			},
			// Start email only
			{
				eventColor: '',
				eventAssoc: 'No Campaign Associated',
				eventType: 'Email',
				eventImage: 'placeholders/eventEmailThumbnail_01.png',
				eventTitle: 'Northern Trail',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: '',
				eventAssoc: 'No Campaign Associated',
				eventType: 'Email',
				eventImage: 'placeholders/eventEmailThumbnail_02.png',
				eventTitle: 'Pre Sale Alert',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: '',
				eventAssoc: 'No Campaign Associated',
				eventType: 'Email',
				eventImage: 'placeholders/eventEmailThumbnail_03.png',
				eventTitle: 'NTO Summer Sweepstakes',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: '',
				eventAssoc: 'No Campaign Associated',
				eventType: 'Email',
				eventImage: '',
				eventTitle: 'NTO Pre Summer',
				eventDescrip: '9:00 AM'
			},
			{
				eventColor: '',
				eventAssoc: 'No Campaign Associated',
				eventType: 'Email',
				eventImage: 'placeholders/eventEmailThumbnail_05.png',
				eventTitle: '',
				eventDescrip: ''
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
		var $gridHeight = $('.rightCol .grid > div').innerHeight();
		
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
					height: '413px'
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
					height: '441px'
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
		var maxSrc = $('img.emails').attr('src').replace('_minMarketingEmailsFtux.png','_maxMonthlyNewsletter.png');
		var minSrc = $('img.emails').attr('src').replace('_maxMonthlyNewsletter.png','_minMarketingEmailsFtux.png');

		if ($this.hasClass('max')) {
			if ($this.is('.imageEmails')) {
					$this.find('img').attr('src', minSrc);
			} else if ($this.is('.imageFollowers')) {
					$this.find('img').addClass('noDisplay');
					$this.find('dl').removeClass('noDisplay');
			}
			$this
				.toggleClass('max flip', false)
				.toggleClass('min');
			$('.rail .count .gadget')
				.eq(index)
				.toggleClass('max', false)
				.toggleClass('min');
		} else if ($this.hasClass('toConfig')) {
			var rel = $('header .tools a[title*="Fullscreen"]', $this).attr('rel');
			var views = $("#" + rel);

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
		} else {
			if ($this.is('.imageEmails')) {
					$this.find('img').attr('src', maxSrc);
			} else if ($this.is('.imageFollowers')) {
					$this.find('img').removeClass('noDisplay');
					$this.find('dl').addClass('noDisplay');
			}
			$this
				.parents('.mainContent')
				.find('.max')
				.not($this)
				.toggleClass('max flip', false)
				.toggleClass('min');
			$this
				.parents('.mainContent')
				.find('.imageEmails')
				.not($this)
				.find('.emails').attr('src',minSrc);
			$this
				.parents('.mainContent')
				.find('.imageFollowers')
				.not($this)
				.find('img').addClass('noDisplay');
			$this
				.parents('.mainContent')
				.find('.imageFollowers')
				.not($this)
				.find('dl').removeClass('noDisplay');
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

	if (($('body').is('.main') == true)) {
		$('.fuel-loader.campaigns').addClass('noDisplay');
	}

	// remove expand class from collapsed docsMenu
	$('body.main .docsMenu').removeClass('expand');


	// Left Menu

	$('#topBar #title').on({
		click: function(e) {
			if (str == '/' || ($('body').is('.main, .callouts') == true)) {
				return;
			} else if ($('#topBar #title').is('.expanded')) {
				common.menuCollapse();
			} else if ($('#topBar #title').not('.expanded')) {
				common.menuExpand();
			}
			e.stopPropagation();
		}
	});

	$('.mainNav').on({
		mouseleave: function() {
			if (str == '/' || ($('body').is('.main, .callouts') == true)) {
				return false;
			} else {
				common.menuCollapse();
			}
		}
	});

	$('ul#leftNav li.categoryClosed').on({
		mouseenter: function() {
			if (inprog == 0) {
				inprog = 1;
				$('.flyout', this).stop().animate({
					left:'189px'
				}, {
					queue: false,
					duration: speed,
					easing: 'easeOutExpo'
				}).addClass('visible');
			}
		},
		mouseleave: function() {
			$('.flyout', this).stop().animate({
				left:'10px'
			}, {
				queue: true,
				duration: speed,
				easing: 'easeOutExpo'
			}).removeClass('visible');
			inprog = 0;
		}
	});


	// docsmenu UI
	$('.docsMenu .menu .secondary > a').on({
		click: function(e) {
			if ($(this).parent().hasClass('collapse')) {
				$(this).next('ul').slideToggle(400, 'swing');
				$(this).parent().toggleClass('collapse');
			} else {
				$(this).next('ul').slideUp(400, 'swing');
				$(this).parent().toggleClass('collapse');
			}
			e.stopPropagation();
		}
	});


	// '.on({})' method will break this redirect, keep it old school.
	$('.docsMenu .menu .secondary li a').click(function() {
		var rel = $(this).attr('rel');

		$.redirect( $(this).attr('href'), { view : $(this).attr('rel') } );
		return false;
	});


	// Taskbar menus

	$('.user-info').on({
		mouseenter: function() {
			var parW = $(this).innerWidth();
			$('.menu', this).stop(true, true).fadeIn(speed).css('left', '-' + (($('.menu', this).innerWidth() - parW) / 2) + 'px');
			$('a:first', this).addClass('selected');
		},
		mouseleave: function() {
			$('.menu', this).stop(true, true).fadeOut(speed);
			$('a:first', this).removeClass('selected');
		}
	});
	
	$('.buDropDown a:first').on({
		click: function(e) {
			common.bu($(this));
			e.stopPropagation();
		},
		mouseenter: function() {
			$('.mid').stop(true, true).delay(400).fadeIn(250);
		},
		mouseleave: function() {
			$('.mid').stop(true, true).delay(200).fadeOut(250);
		}
	});

	$('.businessSwitch .filter a').on({
		click: function(e) {
			var relCall = $(this).attr('rel');

			if ($(this).is('.active')) {
				return
			} else {
				if (relCall == 'list_all') {
					$('.businessSwitch .search').show();
				} else {
					$('.businessSwitch .search').hide();
				}

				$(this).parent().siblings('.content').find('.' + relCall + '').show().siblings().hide();
				$(this).addClass('active').siblings().removeClass('active');
			}
			e.stopPropagation();
		}
	});
	
	
	// Security Notifications
	
	$('#security').on({
		click: function(e) {
			common.secNotify($(this));
			e.stopPropagation();
		}
	});


	// Dropdown menus

	$('.dropdown-icon').on({
		click: function(e) {
			var options = $(this).closest('.dropdown').find('.options');
			var opHeight = options.outerHeight();
			var pos = $(this).closest('.dropdown').offset();

			if (options.is(':visible')) {
				options.fadeOut(100);
			} else {
				if ((pos.top + opHeight) > viewport.height()) {
					options.css("top", -opHeight-3).fadeIn(100);
				} else {
					options.css("top", "23px").fadeIn(100);
				}
			}
			e.stopPropagation();
		}
	});


	// Tab within IMH
	$('body.main .tab').on({
		click: function(e) {
			if ($(this).parents('.docsMenu').is('.expand')) {
				common.pushIn($(this));
			} else {
				common.pullOut($(this));
			}
			e.stopPropagation();
		}
	});


	//Fullscreen

	$('#topTools a[title*="Fullscreen"], .header a[title*="Fullscreen"], .alerts a[title*="Fullscreen"], .pulseConfigure a[title*="Fullscreen"]').on({
		click: function(e) {
			var rel = $(this).attr('rel');
			var views = $("#" + rel);
			var $this = $(this);

			$(document).delay(300, 'fullScreenQueue');
			$(document).queue('fullScreenQueue', function(next) {
				
				views.data("source", $this).growFrom($this, {
					duration: 400
				});
				storage.enableGuide();
				// gross
				views.find('.banner, .callout, #plseFull header a[title="settings"]').removeClass('noDisplay');
				$('.primary', views).show().siblings('section').hide();
				next();
			});
			$(document).queue('fullScreenQueue', function(next) {
				$('#overlay').fadeIn(400);
				next();
			});
			$(document).dequeue('fullScreenQueue');
			e.stopPropagation();
		}
	});

	$('#cal a[title="close"], #plseFull a[title="close"], #plseGadgetFull a[title="close"], #plseConfig a[title="close"], #plseConfig a[title="Cancel"], #scrty a[title="close"]').on({
		click: function(e) {
			var views = $(this).closest("div");

			$(document).delay(300, 'fullScreenQueue');
			$(document).queue('fullScreenQueue', function(next) {
				$('#overlay').fadeOut(400);
				storage.enableGuide();
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
			e.stopPropagation();
		}
	});

	$('#cal, #plseFull, #plseGadgetFull, #plseConfig, #scrty, #explore, #vidContent').on({
		click: function(e) {
			e.stopPropagation();
		}
	});


	// Calendar

	// Fade UI
	$('.ribbon').on({
		mouseenter: function() {
			if (inprog == 0) {
				inprog = 1;
				$('.navLeft, .navRight', this).fadeIn(speed);
			}
		},
		mouseleave: function() {
			$('.navLeft, .navRight', this).fadeOut(speed);
			inprog = 0;
		}
	});


	// Left/Right scrolling

	$('.ribbon .navRight').on({
		click: function(e) {
			calendar.scrollRight($(this));
			e.stopPropagation();
		}
	});

	$('.ribbon .navLeft').on({
		click: function(e) {
			calendar.scrollLeft($(this));
			e.stopPropagation();
		}
	});

	$('#view_calendar').on('click', '.squib.active', function(e) {
		calendar.scrollLeft($('.ribbon .navLeft'));
		e.stopPropagation();
	});


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

	$('.panel .toggle').on({
		click: function(e) {
			calendar.dayPanel($(this));
			e.stopPropagation();
		}
	});


	// Switch Views

	$('.toggleView .month a').on({
		click: function(e) {
			$(this).parents('li').find('.selected').removeClass('selected');
			$(this).addClass('selected');

			$('#cal > header span.label').text('');
			$('#cal > header h2').addClass('single').text('May 2012');

			//yuck!
			$(this).parents('header').siblings('section').find('.month').removeClass('noDisplay');
			$(this).parents('header').siblings('section').find('.week').addClass('noDisplay');

			e.stopPropagation();
		}
	});

	$('.toggleView .week a').on({
		click: function(e) {
			$(this).parents('li').find('.selected').removeClass('selected');
			$(this).addClass('selected');

			$('#cal > header span.label').text('Week Starting');
			$('#cal > header h2').removeClass('single').text('May 13, 2012');

			//yuck!
			$(this).parents('header').siblings('section').find('.month').addClass('noDisplay');
			$(this).parents('header').siblings('section').find('.week').removeClass('noDisplay');

			e.stopPropagation();
		}
	});



	// Pulse


	//Max/Min

	if ($('.mainContent .gadget').length >= 1) {
		$('.mainContent .gadget').each(function() {

			// clone each and append to pagination indicator
			$(this).clone().html('').appendTo('.rail footer .count').end();
		});

		$('.mainContent .gadget').on({
			click: function(e) {
				pulse.gadgetry($(this));
				e.stopPropagation();
			}
		});
	}

	//Fullscreen gadget
	$('.gadget .tools a[title*="Fullscreen"]').on({
		click: function(e) {
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
		}
	});


	// Left/Right hover scrolling Events

	$('.rail .navLeft').on({
		click: function(e) {
			$(this).addClass('noDisplay'); // not a real solution
			$('.rail .navRight').removeClass('noDisplay'); // not a real solution
			pulse.scrollLeft($(this));
			e.stopPropagation();
		}
	});

	$('.rail .navRight').on({
		click: function(e) {
			$(this).addClass('noDisplay'); // not a real solution
			$('.rail .navLeft').removeClass('noDisplay'); // not a real solution
			pulse.scrollRight($(this));
			e.stopPropagation();
		}
	});


	// P-type Switcher 

	$('.switcher .label').on({
		click: function(e) {
			common.ptypeMenu($(this));
			e.stopPropagation();
		}
	});

});


//When everythig is loaded
$(window).load(function() {
	draw_viewport();
	pulse.runIndicator();

	if ($('body').is('.main, .billboard, .entice, .welcome, .callouts')) {
		common.menuExpand();
	} else if ($('body').is('.static, .singleton')) {
		$('#leftNav').parent().siblings('li').find('#title').addClass('expanded');
		$(document).delay(1000, 'staticMenuQueue');
		$(document).queue('staticMenuQueue', function(next) {
			common.menuCollapse();
			next();
		});
		$(document).dequeue('staticMenuQueue');
	} else {
		common.menuCollapse();
	}
})

$(window).unload(function() {
  // Hack - empty unload so dropdown menu will automaticlaly occur after browser's 'back' button
});