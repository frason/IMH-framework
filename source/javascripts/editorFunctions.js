// Global Variables

var inprog = 0;
var speed = '250';
var sortableIn = 0;


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


//Gear markup
var doGear = {
	i: function() {
		// var $this = obj;
		var $markup;
		var no = common.random();

		$markup = '<div id="item_' + no + '">';
		$markup += '<img src="../images/placeholders/editor_image560-230.png" /><div class="controls">';
		$markup += '<ul><li class="save"><a href="#" title="Save"></a></li><li class="copy"><a href="#" title="Copy"></a></li><li class="remove"><a href="#" title="Remove"></a></li></ul>';
		$markup += '</div></div>';

		return $markup;

		// $(document).queue('gearQueue', function(next) {
		// 	$($markup).appendTo($this);
		// 	next();
		// });
		// $(document).delay(100, 'gearQueue');
		// $(document).queue('gearQueue', function(next) {
		// 	$('.item_' + no + '').fadeIn(speed);
		// 	next();
		// });
		// $(document).dequeue('gearQueue');
	},
	t: function() {
		// var $this = obj;
		var $markup;
		var no = common.random();

		$markup = '<div id="item_' + no + '">';
		$markup += '<div class="textarea editMe" contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div><div class="controls">';
		$markup += '<ul><li class="save"><a href="#" title="Save"></a></li><li class="copy"><a href="#" title="Copy"></a></li><li class="remove"><a href="#" title="Remove"></a></li></ul>';
		$markup += '</div></div>';

		return $markup;

		// $(document).queue('gearQueue', function(next) {
		// 	$($markup).appendTo($this);
		// 	next();
		// });
		// $(document).delay(100, 'gearQueue');
		// $(document).queue('gearQueue', function(next) {
		// 	$('.item_' + no + '').fadeIn(speed);
		// 	next();
		// });
		// $(document).dequeue('gearQueue');
	},
	tI: function() {
		// var $this = obj;
		var $markup;
		var no = common.random();

		$markup = '<div id="item_' + no + '">';
		$markup += '<div class="imageArea"><img src="../images/placeholders/editor_image270-203.png" /></div>';
		$markup += '<p class="editMe" contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><div class="controls">';
		$markup += '<ul><li class="save"><a href="#" title="Save"></a></li><li class="copy"><a href="#" title="Copy"></a></li><li class="remove"><a href="#" title="Remove"></a></li></ul>';
		$markup += '</div></div>';

		return $markup;

		// $(document).queue('gearQueue', function(next) {
		// 	$($markup).appendTo($this);
		// 	next();
		// });
		// $(document).delay(100, 'gearQueue');
		// $(document).queue('gearQueue', function(next) {
		// 	$('.item_' + no + '').fadeIn(speed);
		// 	next();
		// });
		// $(document).dequeue('gearQueue');
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
  }

  var subHeadHeight = $('.subhead').outerHeight(true);
  var wizardHeight = $('.wiz').outerHeight(true);
  var toolBarHaight = $('.toolbar').outerHeight(true);
  var footHeight = $('.editor footer').outerHeight(true);

  var mastDim = (subHeadHeight + wizardHeight + toolBarHaight);
  var workPort = (((viewport.height() - mastDim) - footHeight) - 32);

  $('#topBar').width(viewport.width());
  $('#container').height(viewport.height() - 32);
  $('.workspace, .sidebar').height(workPort);
  $('.sidebar aside').height(workPort - 20);

  $('#wrapper').width(viewport.width()).height(viewport.height());
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
/*$(document).click(function() {

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
}); */


// Common UI Functions
var common = {
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
	random: function() {
		var rand = Math.floor((Math.random()*100)+1);
		return rand;
	},
	stopSort: function() {
		$('#canvas').sortable('disable');
	},
	startSort: function() {
		$('#canvas').sortable('enable');
		$('.palette').fadeOut(speed);
		$('#canvas').children('.editMe').blur()
	}
}




// When document is scriptable
$(document).ready(function() {
	var url = location.href.substring(location.href);
	var str = url.charAt(url.length-1);

	if (($('body').is('.main') == true)) {
		$('.fuel-loader.campaigns').addClass('noDisplay');
	}

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

	$('#canvas').sortable({
		beforeStop: function(event, ui) {
			if ( sortableIn == 0 ) {
				ui.item.remove();
			}
		},
		change: function(event, ui) {
		},
		// containment: '#canvas',
		helper: function(event, ui) {
			var $itemClass = $(ui).attr('class');
			$helper = '<div class="' + $itemClass + '" style="width:112px, height:46px"><span></span></div>'
			return $helper;
		},
		over: function(event, ui) {
			sortableIn = 1;
			// console.log(ui.position);
		},
		out: function(event, ui) {
			sortableIn = 0;
		},
		receive: function(event, ui) {
			sortableIn = 1;
		},
		start: function(event, ui) {
			sortableIn = 1;
			ui.placeholder.height('2px').css('visibility', 'visible');
			ui.helper.height('46px');

			if ( $(ui.item).hasClass('gear image') ) {
				$placed = doGear.i();
				$(ui.item).html($placed).addClass('bound');
				ui.helper.width('75px');
			} else if ( $(ui.item).hasClass('gear text') ) {
				$placed = doGear.t();
				$(ui.item).html($placed).addClass('bound');
				ui.helper.width('65px');
			} else if ( $(ui.item).hasClass('gear textImage') ) {
				$placed = doGear.tI();
				$(ui.item).html($placed).addClass('bound');
				ui.helper.width('112px');
			}
		},
		stop: function(event, ui) {
			$(ui.item).removeClass('dragging');

			var $canvasHeight = $('#canvas').outerHeight(true);
			var $totalHeight = 0;

			$("#canvas").children().each(function() {
				$totalHeight += $(this).outerHeight(true);

				if ( $totalHeight > $canvasHeight ) {
					$('#canvas').innerHeight($totalHeight);
				}

			});
		},
		tolerance: 'pointer',
		update: function(event, ui) {
		}
	});

	$('.gearsList div').draggable({
		connectToSortable:'#canvas',
		cursor:'move',
		cursorAt: { bottom:0, right:0 },
		helper:'clone',
		revert: 'invalid'
	});

	$('#canvas').on('click', '.bound', function(e) {
		common.stopSort();

		$(this).addClass('active').find('.editMe').focus();
		$(this).parents('#canvas').addClass('editing');
		$(this).siblings().removeClass('active');

		if ( $(this).hasClass('text') ) {
			$('.palette.text, .palette.html').fadeIn(speed);
			$('.palette.image').fadeOut(speed); /*gross!*/
		} else if ( $(this).hasClass('image') ) {
			$('.palette.image').fadeIn(speed);
			$('.palette.text, .palette.html').fadeOut(speed); /*gross!*/
		}

		e.stopPropagation();
	});

	// $('#canvas').on('click', '.bound:not(.active)', function(e) {
	// 	$(this).siblings().removeClass('active');
	// 	$('.palette:visible').fadeOut(speed);
		
	// 	e.stopPropagation();
	// });

	$('#canvas').on({
		click: function(e) {
			$(this).children('.bound').removeClass('active');
			$('.palette:visible').fadeOut(speed);
			common.startSort();
			
			e.stopPropagation();
		}
	});

	$('.palette').draggable({
		containment: "parent"
	});

});


//When everythig is loaded
$(window).load(function() {
	draw_viewport();
})

$(window).unload(function() {
  // Hack - empty unload so dropdown menu will automaticlaly occur after browser's 'back' button
});