//First Time User Experience

var visits = [];
var t;

//Video Counter
function startCount() {
	var $thisVid = document.getElementsByTagName('video')[0];
	t = window.setInterval(function() {
		if ($thisVid.ended != true) {
			// Hide Timer for now until we can format it better
			// $('.timer').html(Math.round($thisVid.currentTime + 1)).show();
		} else {
			// Hide Timer for now until we can format it better
			// $('.timer').hide();
			window.clearInterval(t);
		}
	},250);
}

function pauseCount() {
	window.clearInterval(t);
}

var video = {
	pre: function(v) {
		var $this = v;

		if ($this.paused == false) {
			$this.pause();
			pauseCount();
		} else {
			$('#vidContent .playback').fadeOut(250);
			$('video').fadeIn(250).css('top', '1px');
			$this.play();
			startCount();
		}

		if ($this.ended == true) {
			$('#vidContent .playback').fadeOut(250);
			$('video').fadeIn(250);
			$this.play().css('top', '1px');
			startCount();
		}
	},
	post: function(v) {
		$('video').css('display', 'none').css('top', '0px');
		$('#vidContent .playback').fadeIn(250);
	}
}

var button = {
	lightSwitch: function(obj) {
		var $this = obj;
		
		if ($this.is('.on')) {
			$('> div', $this).animate({
				left:'-33px'
			}, 250, 'easeOutSine');
			$this.toggleClass('on', false).addClass('off');
			$('.icon.guide, .callout').fadeOut(speed);
			sessionStorage.setItem('isGuide', 'off');
		} else if ($this.is('.off')) {
			$('> div', $this).animate({
				left:'0px'
			}, 250, 'easeOutSine');
			$this.toggleClass('off', false).addClass('on');
			$('.icon.guide, .callout').fadeIn(speed);
			sessionStorage.setItem('isGuide', 'on');
		}
	},
	toggle: function(obj) {
		var $this = obj;

		if ($this.is('.on')) {
			return
		} else {
			$this.addClass('on').siblings().removeClass('on');
			// sessionStorage.setItem('whichBanner', $this.parrents('.banner').attr('id'));
			sessionStorage.setItem($this.parents('.banner').attr('id'), $this.attr('title'));
			if ($this.attr('title') == 'show') {
				$('.callout').fadeIn(speed);
			} else {
				$('.callout').fadeOut(speed);
			}
		}
	}
}

var tour = {
	setUpPager: function() {
		var totalItems = $('.tourMenu li li').length;
		var curItem = $('li.active');
		var index = $('.tourMenu li li').index(curItem);

		if (index == '0') {
			$('.tourNav .prev').addClass('inactive').removeAttr('rel');
			$('.tourNav .next').attr('rel', (index + 1));
		} else if (index == (totalItems - 1)) {
			$('.tourNav .next').addClass('inactive').removeAttr('rel');
			$('.tourNav .prev').attr('rel', (index - 1));
		} else {
			$('.tourNav .prev, .tourNav .next').removeClass('inactive');
			$('.tourNav .next').attr('rel', (index + 1));
			$('.tourNav .prev').attr('rel', (index - 1));
		}

		$('#explore .sectionTitle').text(curItem.parents('ul').attr('title'));
		$('#explore .subsectionTitle').text(curItem.text());

	},
	nav: function(i) {
		var $item = i;
		
		var contents = [
			{
				section: 'Hub Dashboard',
				subsection: 'Welcome Menu',
				description: 'The Hub Dashboard is comprised of three main sections: Calendar, Pulse, and Campaigns. This tour will guide you through each section with examples and animations. To skip or replay a section, use the arrow buttons. You can also click on the section or subsection title to explore it at your convenience. To resume or restart this tour, hover your mouse pointer over your name in the Hub Header. Welcome to the Hub!',
				picSource: 'ftux/01_HubWithData.png',
				vidSource: '',
				vidPoster: ''
			},
			{
				section: 'Hub Dashboard',
				subsection: 'Navigation',
				description: 'Use the left navigation area of your screen to toggle between Channels, Tools, Apps, Exchange and the Hub. The Hub Dashboard header offers full screen overlays of the calendar, Pulse, and Security. You will also find the Business Unit switcher, and Settings menus near the top right of your screen.',
				picSource: '',
				vidSource: '<source src="../../images/ftux/media/02_Navigation.mp4" type="video/mp4" width="618" height="376" /><source src="../../images/ftux/media/02_Navigation.webm" type="video/webm" width="618" height="376" /><source src="../../images/ftux/media/02_Navigation.ogg" type="video/ogg" width="618" height="376" />',
				vidPoster: '../../images/ftux/media/poster/02_Navigation.png'
			},
			{
				section: 'Hub Dashboard',
				subsection: 'Resources',
				description: 'To Resume or restart this tour, hover your mouse pointer over your name in the Hub Header and resume the tour. You can also access 3sixty and our Help system, and Hub settings from here.',
				picSource: 'ftux/03_Resume.png',
				vidSource: '',
				vidPoster: ''
			},
			{
				section: 'Hub Dashboard',
				subsection: 'Contextual Help',
				description: 'Hover your mouse pointer over help bubble icons to learn more about specific functionality, including tips and tricks.',
				picSource: 'ftux/04_HubWithLexis.png',
				vidSource: '',
				vidPoster: ''
			},
			{
				section: 'Calendar',
				subsection: 'Views',
				description: 'You can plan and share one view of all marketing activities across the organization with the IMH Calendar. The comprehensive view allows you to quickly spot trends in strategy across channels. Change the calendar view by week, month, or day and deep-­link into channels and applications for immediate action. The full screen view is also conveniently located in the header ribbon at the top of your screen from anywhere in the Hub or applications.',
				picSource: '',
				vidSource: '<source src="../../images/ftux/media/05_CalendarViews.mp4" type="video/mp4" width="618" height="376" /><source src="../../images/ftux/media/05_CalendarViews.webm" type="video/webm" width="618" height="376" /><source src="../../images/ftux/media/05_CalendarViews.ogg" type="video/ogg" width="618" height="376" />',
				vidPoster: '../../images/ftux/media/poster/05_CalendarViews.png'
			},
			{
				section: 'Calendar',
				subsection: 'Icons and Messages Types',
				description: 'Whether in the Hub Dashboard or in the full screen view, color-­coded icons in the Calendar allow you to easily see all of the marketing activities planned throughout your organization. Conveniently located on the bottom left of the full screen Calendar view, you can quickly make selections of which types of activities you would like to see at any given time.',
				picSource: '',
				vidSource: '<source src="../../images/ftux/media/06_Icon_MessageTypes.mp4" type="video/mp4" width="618" height="376" /><source src="../../images/ftux/media/06_Icon_MessageTypes.webm" type="video/webm" width="618" height="376" /><source src="../../images/ftux/media/06_Icon_MessageTypes.ogg" type="video/ogg" width="618" height="376" />',
				vidPoster: '../../images/ftux/media/poster/06_Icon_MessageTypes.png'
			},
			{
				section: 'Pulse',
				subsection: 'Views',
				description: 'With the ability to monitor real-­time marketing activity, Pulse gadgets can be described in three different states — small, large and full screen. You can use the arrows to navigate through gadgets and the entire section can be made fullscreen as well.',
				picSource: '',
				vidSource: '<source src="../../images/ftux/media/07_PulseViews.mp4" type="video/mp4" width="618" height="376" /><source src="../../images/ftux/media/07_PulseViews.webm" type="video/webm" width="618" height="376" /><source src="../../images/ftux/media/07_PulseViews.ogg" type="video/ogg" width="618" height="376" />',
				vidPoster: '../../images/ftux/media/poster/07_PulseViews.png'
			},
			{
				section: 'Pulse',
				subsection: 'Types',
				description: 'Once configured, gadgets will appear in the scrolling ribbon on your Hub dashboard. Add as many gadgets as you need to be able to monitor the counts of your Twitter Followers, Facebook Fans and Email Sends in real-time!',
				picSource: 'ftux/08_PulseTypes.png',
				vidSource: '',
				vidPoster: ''
			},
			{
				section: 'Pulse',
				subsection: 'Settings',
				description: 'Accessing the Settings option in Pulse allows you to add and configure gadgets via drag and drop method from the gadget tray. There is no limit to the number of gadgets you can create!',
				picSource: '',
				vidSource: '<source src="../../images/ftux/media/09_PulseSettings.mp4" type="video/mp4" width="617" height="370" /><source src="../../images/ftux/media/09_PulseSettings.webm" type="video/webm" width="617" height="370" /><source src="../../images/ftux/media/09_PulseSettings.ogg" type="video/ogg" width="617" height="370" />',
				vidPoster: '../../images/ftux/media/poster/09_PulseSettings.png'
			},
			{
				section: 'Campaigns',
				subsection: 'Views and Actions',
				description: 'View all campaigns across your organization from the Hub dashboard or in the Calendar. Color-­coding makes viewing campaigns in the calendar easy to see exactly what is happening and when.',
				picSource: 'ftux/09_CampaignsView.png',
				vidSource: '',
				vidPoster: ''
			},
			{
				section: 'Campaigns',
				subsection: 'Activity',
				description: 'Monitor email sends and automations in the full screen view of the calendar. Expand the Campaigns pane at the bottom of your screen to see the details of items such as events, sends, and automations. With options to view all activities at once or to see them sorted by a particular campaign, track the day’s activities as they happen and link directly into the appropriate application as needed.',
				picSource: '',
				vidSource: '<source src="../../images/ftux/media/10_CampaignsActivity.mp4" type="video/mp4" width="618" height="376" /><source src="../../images/ftux/media/10_CampaignsActivity.webm" type="video/webm" width="618" height="376" /><source src="../../images/ftux/media/10_CampaignsActivity.ogg" type="video/ogg" width="618" height="376" />',
				vidPoster: '../../images/ftux/media/poster/10_CampaignsActivity.png'
			}
		];

		var myTemplate = $('#sectionTemplate').template();
		var $view = $.tmpl(myTemplate, contents[$item]);

		$('.content .main').html($view).show();
	}
}

var callouts = {
	header: function() {
		var $obj = $('<figure class="header_01">');
		var $obj2 = $('<figure class="header_02">');
		var $obj3 = $('<figure class="header_03">');

		$(document).queue('calloutQueue', function(next) {
			$('#topBar > div').prepend($obj, $obj2, $obj3);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(450);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	appMenu: function() {
		var $obj = $('<figure class="appMenu_01">');
		var $obj2 = $('<figure class="appMenu_02">');

		$(document).queue('calloutQueue', function(next) {
			$('#topBar > div').prepend($obj, $obj2);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	calendar: function() {
		var $obj = $('<figure class="calendar_01">');
		var $obj2 = $('<figure class="calendar_02">');
		var $obj3 = $('<figure class="calendar_03">');

		$(document).queue('calloutQueue', function(next) {
			$('#topBar > div').prepend($obj);
			$('#mainContent').prepend($obj2, $obj3);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	calendarHeader: function() {
		var $obj = $('<figure class="calendarHeader_01">');
		var $obj2 = $('<figure class="calendarHeader_02">');
		var $obj3 = $('<figure class="calendarHeader_03">');

		$(document).queue('calloutQueue', function(next) {
			$('#cal').prepend($obj, $obj3);
			$('.panel').prepend($obj2);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	calendarPanel: function() {
		var $obj = $('<figure class="calendarPanel_01">');
		var $obj2 = $('<figure class="calendarPanel_02">');
		var $obj3 = $('<figure class="calendarPanel_03">');

		$(document).queue('calloutQueue', function(next) {
			$('#cal').prepend($obj, $obj3);
			$('.panel').prepend($obj2);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	calendarSidebar: function() {
		var $obj = $('<figure class="calendarSidebar_01">');
		var $obj2 = $('<figure class="calendarSidebar_02">');
		var $obj3 = $('<figure class="calendarSidebar_03">');

		$(document).queue('calloutQueue', function(next) {
			$('#cal').prepend($obj, $obj2, $obj3);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	pulse: function() {
		var $obj = $('<figure class="pulse_01">');
		var $obj2 = $('<figure class="pulse_02">');
		var $obj3 = $('<figure class="pulse_03">');
		var $obj4 = $('<figure class="pulse_04">');

		$(document).queue('calloutQueue', function(next) {
			$('#topBar > div').prepend($obj);
			$('#mainContent').prepend($obj2, $obj3, $obj4);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	pulseFullscreen: function() {
		var $obj = $('<figure class="pulseFullscreen_01">');
		var $obj2 = $('<figure class="pulseFullscreen_02">');

		$(document).queue('calloutQueue', function(next) {
			$('#plseFull').prepend($obj, $obj2);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	campaignsGrid: function() {
		var $obj = $('<figure class="campaignsGrid_01">');

		$(document).queue('calloutQueue', function(next) {
			$('#topBar > div').prepend($obj);
			next();
		});
		$(document).queue('calloutQueue', function(next) {
			$('figure').fadeIn(250);
			next();
		});
		$(document).dequeue('calloutQueue');
	},
	video: function(i) {
		var $item = i;
		
		var contents = [
			{
				title: 'Hub Header',
				time: '0:10',
				vidSource: '<source src="../../images/ftux/media/header.mp4" type="video/mp4" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/header.webm" type="video/webm" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/header.ogg" type="video/ogg" width="855" height="480" preload="auto" />',
				vidPoster: '../../images/ftux/media/poster/header.png'
			},
			{
				title: 'Application Menu & Quick Links',
				time: '0:13',
				vidSource: '<source src="../../images/ftux/media/appMenu.mp4" type="video/mp4" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/appMenu.webm" type="video/webm" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/appMenu.ogg" type="video/ogg" width="855" height="480" preload="auto" />',
				vidPoster: '../../images/ftux/media/poster/appMenu.png'
			},
			{
				title: 'Calendar',
				time: '0:19',
				vidSource: '<source src="../../images/ftux/media/calendar.mp4" type="video/mp4" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/calendar.webm" type="video/webm" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/calendar.ogg" type="video/ogg" width="855" height="480" preload="auto" />',
				vidPoster: '../../images/ftux/media/poster/calendar.png'
			},
			{
				title: 'Pulse',
				time: '0:17',
				vidSource: '<source src="../../images/ftux/media/pulse.mp4" type="video/mp4" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/pulse.webm" type="video/webm" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/pulse.ogg" type="video/ogg" width="855" height="480" preload="auto" />',
				vidPoster: '../../images/ftux/media/poster/pulse.png'
			},
			{
				title: 'Campaigns Grid',
				time: '0:19',
				vidSource: '<source src="../../images/ftux/media/campaigns.mp4" type="video/mp4" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/campaigns.webm" type="video/webm" width="855" height="480" preload="auto" /><source src="../../images/ftux/media/campaigns.ogg" type="video/ogg" width="855" height="480" preload="auto" />',
				vidPoster: '../../images/ftux/media/poster/campaigns.png'
			}

		];

		var myTemplate = $('#videoTemplate').template();
		var $view = $.tmpl(myTemplate, contents[$item]);

		$('#vidContent h2 strong').html(contents[$item].title);
		$('#vidContent h2 span').html(contents[$item].time);
		$('#vidContent .content').html($view).show();
	}
}


// Global - hide modal
$(document).on({
	click: function(e) {
		var view = $('#explore:visible, #vidContent:visible');

		try {
			var coords = view.data("source").position();
		} catch (e) {}

		pauseCount();

		$(document).queue('fullScreenQueue', function(next) {
			view.shrinkTo(view.data(coords), {
				complete: function() {
					view.fadeOut(400);
				}
			});
			next();
		});
		$(document).delay(300, 'fullScreenQueue');
		$(document).queue('fullScreenQueue', function(next) {
			$('#overlay').fadeOut(400);
			next();
		});
		$(document).dequeue('fullScreenQueue');
		e.stopPropagation();
	}
});



$(document).ready(function() {
	var $category = address.getUrlCategory();
	var $feature = address.getUrlFeature();
	var $pres = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
	var $path = window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1).split('.')[0];
	var $fClass = '';
	var $title = '';
	storage.checkIf();

	//Retrieve Initial Entry URL
	if (sessionStorage.getItem('initialEntry') === null || $pres == 'callouts') {
			$('.accessTour').remove();
	} else {
		$('.accessTour a').attr('href', sessionStorage.getItem('initialEntry'));
	}

	if ($feature != null) {
		$fClass = $feature.join().replace(",","").replace("#","");
	} else {
		$('.fuel-loader').addClass('noDisplay');
	}

	$('body').not('.static').addClass($pres);

	if ($pres == 'billboard' && $fClass == 'false') {
    $('.grid-table-data, .container .tools, .fuel-loader').addClass('noDisplay');
    $('#view_pulse .billboard, .grid-table-scroll .noData').css('display', 'block');
    $('.navRight, .navLeft').remove();
	} else if ($pres == 'entice' && $fClass == 'false') {
    $('#view_pulse .billboard').css('display', 'block');
    $('.container .tools, .fuel-loader').addClass('noDisplay');
    $('.entice').removeClass('noDisplay');
    $('.navRight, .navLeft').remove();
	} else if ($pres == 'callouts' && $fClass == 'false') {
    $('.grid-table-data, .fuel-loader.full').addClass('noDisplay');
    $('#view_pulse .navRight, #view_pulse .navLeft').remove();

    // initiate loading sequence
    $(document).delay(3000, 'loadingQueue');
    $(document).queue('loadingQueue', function(next) {
        $('.fuel-loader.pulse, .fuel-loader.campaigns').fadeOut(250);
        $('.eventList, #view_pulse .gadget, .pulseConfigure, .grid-table-scroll .noData').fadeIn(400);
        next();
    });
    $(document).delay(1000, 'loadingQueue');
    $(document).queue('loadingQueue', function(next) {
        storage.enableGuide();
        next();
    });
    $(document).dequeue('loadingQueue');
	} else if ($pres == 'welcome') {
    $('.grid-table-data, .billboard, .fuel-loader').addClass('noDisplay');
    $('#view_pulse .noData').removeClass('noDisplay');
    $('.grid-table-scroll .noData').css('display', 'block');
	} else if ($('body').is('.static')) {
		
		storage.enableGuide();
	}

	$('.callout').on({
		mouseenter: function() {
			$('.callout').not($(this)).stop(true, true).fadeOut(250);
			// $(this).siblings('.callout').css('z-index','19');
			$('> div', this).stop(true, true).fadeIn(250);

			if ($(this).is('.header')) {
				callouts.header();
			} else if ($(this).is('.appMenu')) {
				callouts.appMenu();
			} else if ($(this).is('.cal')) {
				callouts.calendar();
			} else if ($(this).is('.calHeader')) {
				callouts.calendarHeader();
			} else if ($(this).is('.calPanel')) {
				callouts.calendarPanel();
			} else if ($(this).is('.calSidebar')) {
				callouts.calendarSidebar();
			} else if ($(this).is('.plse')) {
				callouts.pulse();
			} else if ($(this).is('.pulseFullscreen')) {
				callouts.pulseFullscreen();
			} else if ($(this).is('.cmpgns')) {
				callouts.campaignsGrid();
			}
		},
		mouseleave: function() {
			$('.callout').not($(this)).stop(true, true).fadeIn(250);
			// $(this).siblings('.callout').css('z-index','20');
			$('> div', this).stop(true, true).delay(100).fadeOut(250);
			$('figure').fadeOut(250, function() {
				$(this).remove();
			});
		}
	});

	$('.entice #calendar .seven:first-child').on({
		mouseenter: function() {
			$('> ul', this).fadeIn(250);
			$('.entice', this).fadeOut(250);
		},
		mouseleave: function() {
			$('> ul', this).fadeOut(250);
			$('.entice', this).fadeIn(250);
		}
	});

	$('.entice #view_campaigns .grid-table-scroll').on({
		mouseenter: function() {
			$('.noData', this).fadeIn(250);
			$('.entice', this).fadeOut(250);
		},
		mouseleave: function() {
			$('.noData', this).fadeOut(250);
			$('.entice', this).fadeIn(250);
		}
	});


	//UI
	$('.btn_switch').on({
		click: function(e) {
			button.lightSwitch($(this));
			e.stopPropagation();
		}
	});

	$('.btn_toggle a').on({
		click: function(e) {
			button.toggle($(this));
			e.stopPropagation();
		}
	});

	//Video Content Modal Round 2

	$('.playVid').not('.modal').on({
		click: function(e) {
			var rel = $(this).attr('rel');
			var views = $("#vidContent");
			var $this = $(this);

			views.data("source", $this).growFrom($this, {
				duration: 400
			});
			$('#overlay').fadeIn(400);
			callouts.video(rel);
			e.stopPropagation();
		}
	});

	//Explore Modal

	$('.btn_explore').on({
		click: function(e) {
			var rel = $(this).attr('rel');
			var views = $("#explore");
			var $this = $(this);

			$(document).delay(300, 'exploreHubQueue');
			$(document).queue('exploreHubQueue', function(next) {
				views.data("source", $this).growFrom($this, {
					duration: 400
				});
				$('nav li').removeClass('active');
				next();
			});
			$(document).queue('exploreHubQueue', function(next) {
				$('#overlay').fadeIn(400);
				next();
			});
			$(document).queue('exploreHubQueue', function(next) {
				var which = '';

				$('.tourMenu li ul').each(function() {
					if ($(this).hasClass(rel)) {
						$('li:first-child', this).addClass(function() {
							$(this).addClass('active').children().addClass('complete');
							which = $(this).children().attr('rel');
						});
						visits.push($('li:first-child', this).children().attr('title'));
						storage.sendTo();
					}
					tour.nav(which);
				});
				next();
			});
			$(document).queue('exploreHubQueue', function(next) {
				tour.setUpPager();
				next();
			});
			$(document).dequeue('exploreHubQueue');
			e.stopPropagation();
		}
	});

	//Exit Tour
	$('.btn_exit').on({
		click: function(e) {
			sessionStorage.setItem('initialEntry', window.location);

			var rel = $(this).attr('rel');
			var views = $("#exit");
			var $this = $(this);

			$(document).delay(300, 'exitHubQueue');
			$(document).queue('exitHubQueue', function(next) {
				views.data("source", $this).growFrom($this, {
					duration: 400
				});
				$('nav li, nav ul').removeClass('active');
				next();
			});
			$(document).queue('exitHubQueue', function(next) {
				if ($('#overlay').css('display') == 'block') {
					$('#explore').hide();
				} else {
					$('#overlay').fadeIn(400);
				}
				next();
			});
			$(document).dequeue('exitHubQueue');
			e.stopPropagation();
		}
	});

	$('#explore a[title="Close Window"], #vidContent a[title="Close Window"]').on({
		click: function(e) {
			var views = $(this).closest("div");
			var coords = views.data("source").position();

			pauseCount();

			$(document).delay(300, 'fullScreenQueue');
			$(document).queue('fullScreenQueue', function(next) {
				$('#overlay').fadeOut(400);
				next();
			});
			$(document).queue('fullScreenQueue', function(next) {
				views.shrinkTo(views.data(coords), {
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

	$('#exit a[title="Close Window"]').on({
		click: function(e) {
			var views = $(this).closest("div");
			var coords = views.data("source").position();

			$(document).delay(300, 'fullScreenQueue');
			$(document).queue('fullScreenQueue', function(next) {
				$('#overlay').fadeOut(400);
				next();
			});
			$(document).queue('fullScreenQueue', function(next) {
				views.shrinkTo(views.data(coords), {
					complete: function() {
						views.fadeOut(400);
					}
				});
				next();
			});
			$(document).queue('fullScreenQueue', function(next) {
				$.redirect('../welcome?exit=true')
				next();
			});
			$(document).dequeue('fullScreenQueue');
			e.stopPropagation();
		}
	});

	$('#plseFull header a[title="settings"], #plseGadgetFull header a[title="settings"]').on({
		click: function(e) {
			$(this).addClass('noDisplay');
			$(this).closest('div').find('.banner, .callout').addClass('noDisplay');
			$('.swap').show().siblings('section').hide();
			e.stopPropagation();
		}
	});

	$('#plseFull .swap > header a[title="Cancel"], #plseGadgetFull .swap > header a[title="Cancel"]').on({
		click: function(e) {
			$('#plseFull header a[title="settings"], #plseGadgetFull header a[title="settings"]').removeClass('noDisplay');
			$(this).closest('section').hide().siblings('.primary').show();
			$(this).parents('#plseFull').find('.banner, .callout').removeClass('noDisplay');
			e.stopPropagation();
		}
	});

	$('#cal, #plse, #scrty, #explore, #exit, #vidContent').on({
		click: function(e) {
			e.stopPropagation();
		}
	});

	$('.tourMenu a').each(function() {
		var parSect = $(this).parents('ul').attr('title');
		var subSect	= $(this).text();

		$(this).on({
			mouseup: function() {
				var rel = $(this).attr('rel');

				visits.push(parSect+' '+subSect);

				$('#explore .sectionTitle').text(parSect);
				$('#explore .subsectionTitle').text(subSect);

				$(this).addClass('complete');
				$(this).parents('.tourMenu').find('li li').removeClass('active');
				$(this).parent().addClass('active');

				tour.setUpPager();
				tour.nav(rel);
				storage.sendTo();
			}
		});
	});

	$('.tourNav a.next').on({
		click: function(e) {
			var totalItems = $('.tourMenu li li').length;
			var curItem = $('li.active');
			var index = $('.tourMenu li li').index(curItem);

			if (index == (totalItems - 1)) {
				return false;
			} else {
				$('li.active').removeClass('active');
				$('.tourMenu li li').eq(index + 1).addClass('active').children().addClass('complete');

				$('#explore .sectionTitle').text($('.tourMenu li li').eq(index + 1).parents('ul').attr('title'));
				$('#explore .subsectionTitle').text($('.tourMenu li li').eq(index + 1).text());

				tour.nav(index + 1);
				visits.push($('.tourMenu li li').eq(index + 1).children().attr('title'));
				storage.sendTo();
			}
			e.stopPropagation();
		}
	});

	$('.tourNav a.prev').on({
		click: function(e) {
			var totalItems = $('.tourMenu li li').length;
			var curItem = $('li.active');
			var index = $('.tourMenu li li').index(curItem);

			if (index == '0') {
				return false;
			} else {
				$('li.active').removeClass('active');
				$('.tourMenu li li').eq(index - 1).addClass('active').children().addClass('complete');

				$('#explore .sectionTitle').text($('.tourMenu li li').eq(index - 1).parents('ul').attr('title'));
				$('#explore .subsectionTitle').text($('.tourMenu li li').eq(index - 1).text());

				tour.nav(index - 1);
				visits.push($('.tourMenu li li').eq(index - 1).children().attr('title'));
				storage.sendTo();
			}
			e.stopPropagation();
		}
	});

	$('#explore section.main').delegate('a', 'click', function() {
		var $this = $(this);
		var $video = document.getElementsByTagName('video')[0];
		
		if ($video.ended || $video.paused) {
			$this.removeAttr('href').addClass('inactive');
			$video.play();
		}

		$video.onended = function() {
			$this.attr('href', '#').removeClass('inactive');
		}
		return false;
	});


	// Ftux Round 2 video content

	$('#vidContent .content').delegate('video, .again a', 'click', function(e) {
		var $thisVid = document.getElementsByTagName('video')[0];

		video.pre($thisVid);

		$('video').bind('ended', function() {
			$(this).ended = 'true';
			video.post($(this));
		});

		e.stopPropagation();
	});

	$('.billboard ul#leftNav').delegate('li.categoryClosed', 'hover', function() {
		$('.flyout', this).stop().animate({
			left:0
		}, {
			queue: false,
			duration: speed,
			easing: 'easeOutExpo'
		}).removeClass('visible');
	});

	$('.billboard ul#leftNav li, .entice ul#leftNav li').delegate('a', 'click', function() {
		var $this = $(this);
		$this.removeAttr('href');
		return false;
	});

	$('.billboard #security > ul, .entice #security > ul').addClass('contain');
	$('.static #topTools a').removeAttr('title');

});