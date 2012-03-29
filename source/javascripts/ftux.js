//First Time User Experience

var visits = [];

//Session storage
var storage = {
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


// Global - hide modal
$(document).click(function() {
		var view = $('#explore:visible, #explore:visible');
		try {
			var coords = view.data("source").position();
		} catch (e) {}

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
});



$(document).ready(function() {
	var $category = address.getUrlCategory();
	var $feature = address.getUrlFeature();
	var $pres = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
	var $fClass = '';
	var $title = '';

	storage.checkIf();

	//Retrieve Initial Entry URL
	if (sessionStorage.getItem('initialEntry') === null) {
	} else {
		$('.accessTour a').attr('href', sessionStorage.getItem('initialEntry'));
	}


	if ($feature != null) {
		$fClass = $feature.join().replace(",","").replace("#","");
	} else {
		return;
	}

	$('body').addClass($pres);

	if ($pres == 'billboard' && $fClass == 'false') {
		$('.grid-table-data, .container .tools').addClass('noDisplay');
		$('.grid-table-scroll .noData').css('display', 'block');
		$('.navRight, .navLeft').remove();
	} else if ($pres == 'entice' && $fClass == 'false') {
		$('.container .tools').addClass('noDisplay');
		$('.entice').removeClass('noDisplay');
		$('.navRight, .navLeft').remove();
	} else if ($pres == 'welcome') {
		$('.grid-table-data, .billboard').addClass('noDisplay');
		$('#view_pulse .noData').removeClass('noDisplay');
		$('.grid-table-scroll .noData').css('display', 'block');
	}

	$('.callout').on({
		mouseenter: function() {
			$(this).siblings('.callout').css('z-index','19');
			$('> div', this).fadeIn(200);
		},
		mouseleave: function() {
			$(this).siblings('.callout').css('z-index','20');
			$('> div', this).fadeOut(200);
		}
	});

	$('.entice #calendar .seven:first-child').on({
		mouseenter: function() {
			$('> ul', this).fadeIn(200);
			$('.entice', this).fadeOut(200);
		},
		mouseleave: function() {
			$('> ul', this).fadeOut(200);
			$('.entice', this).fadeIn(200);
		}
	});

	$('.entice #view_campaigns .grid-table-scroll').on({
		mouseenter: function() {
			$('.noData', this).fadeIn(200);
			$('.entice', this).fadeOut(200);
		},
		mouseleave: function() {
			$('.noData', this).fadeOut(200);
			$('.entice', this).fadeIn(200);
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

	$('#explore a[title="Close Window"]').click(function() {
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
		$(document).dequeue('fullScreenQueue');
		return false;
	});

	$('#exit a[title="Close Window"]').click(function() {
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
		return false;
	});

	$('#cal, #plse, #scrty, #explore, #exit').click(function(e){
		e.stopPropagation();
		return false;
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

	$('.tourNav a.next').click(function() {
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
	});

	$('.tourNav a.prev').click(function() {
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

});