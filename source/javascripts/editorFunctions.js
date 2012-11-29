// Global Variables

var inprog = 0;
var speed = '250';
var sortableIn = 0;

//Gear markup
var doGear = {
	i: function() {
		// var $this = obj;
		var $markup;
		var no = common.random();

		$markup = '<div id="item_' + no + '">';
		$markup += '<img src="../images/placeholders/editor_image560-230.png" class="image" /><div class="controls">';
		$markup += '<ul><li class="save"><a href="#" title="Save"></a></li><li class="copy"><a href="#" title="Copy"></a></li><li class="remove"><a href="#" title="Remove"></a></li></ul>';
		$markup += '</div></div>';

		return $markup;
	},
	t: function() {
		// var $this = obj;
		var $markup;
		var no = common.random();

		$markup = '<div id="item_' + no + '">';
		$markup += '<div class="textarea" contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div><div class="controls">';
		$markup += '<ul><li class="save"><a href="#" title="Save"></a></li><li class="copy"><a href="#" title="Copy"></a></li><li class="remove"><a href="#" title="Remove"></a></li></ul>';
		$markup += '</div></div>';

		return $markup;
	},
	tI: function() {
		// var $this = obj;
		var $markup;
		var no = common.random();

		$markup = '<div id="item_' + no + '">';
		$markup += '<div class="imageArea"><img src="../images/placeholders/editor_image270-203.png" class="image" /></div>';
		$markup += '<div class="editMe" contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div><div class="controls">';
		$markup += '<ul><li class="save"><a href="#" title="Save"></a></li><li class="copy"><a href="#" title="Copy"></a></li><li class="remove"><a href="#" title="Remove"></a></li></ul>';
		$markup += '</div></div>';

		return $markup;
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
  var toolBarHeight = $('.toolbar').outerHeight(true);
  var footHeight = $('.editor footer').outerHeight(true);

  var mastDim = (subHeadHeight + wizardHeight + toolBarHeight);
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


$.ui.plugin.add("resizable", "alsoResizeReverse", {

	start: function(event, ui) {

		var self = $(this).data("resizable"),
			o = self.options;

		var _store = function(exp) {
				$(exp).each(function() {
					$(this).data("resizable-alsoresize-reverse", {
						width: parseInt($(this).width(), 10),
						// height: parseInt($(this).height(), 10),
						left: parseInt($(this).css('left'), 10),
						top: parseInt($(this).css('top'), 10)
					});
				});
			};

		if (typeof(o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.parentNode) {
			if (o.alsoResizeReverse.length) {
				o.alsoResize = o.alsoResizeReverse[0];
				_store(o.alsoResizeReverse);
			} else {
				$.each(o.alsoResizeReverse, function(exp, c) {
					_store(exp);
				});
			}
		} else {
			_store(o.alsoResizeReverse);
		}
	},

	resize: function(event, ui) {
		var self = $(this).data("resizable"),
			o = self.options,
			os = self.originalSize,
			op = self.originalPosition;

		var delta = {
			// height: (self.size.height - os.height) || 0,
			width: (self.size.width - os.width) || 0,
			top: (self.position.top - op.top) || 0,
			left: (self.position.left - op.left) || 0
		},

		_alsoResizeReverse = function(exp, c) {
			$(exp).each(function() {
				var el = $(this),
				start = $(this).data("resizable-alsoresize-reverse"),
				style = {},
				css = c && c.length ? c : ['width', /*'height',*/ 'top', 'left'];

				$.each(css || ['width', /*'height',*/ 'top', 'left'], function(i, prop) {
					var sum = (start[prop] || 0) - (delta[prop] || 0);
					if (sum && sum >= 0) style[prop] = sum || null;
				});

				//Opera fixing relative position
				if (/relative/.test(el.css('position')) && $.browser.opera) {
					self._revertToRelativePosition = true;
					el.css({
						position: 'absolute',
						top: 'auto',
						left: 'auto'
					});
				}

				el.css(style);
			});
		};

		if (typeof(o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.nodeType) {
			$.each(o.alsoResizeReverse, function(exp, c) {
				_alsoResizeReverse(exp, c);
			});
		} else {
			_alsoResizeReverse(o.alsoResizeReverse);
		}
	},

	stop: function(event, ui) {
		var self = $(this).data("resizable");

		//Opera fixing relative position
		if (self._revertToRelativePosition && $.browser.opera) {
			self._revertToRelativePosition = false;
			el.css({
				position: 'relative'
			});
		}

		$(this).removeData("resizable-alsoresize-reverse");
	}
});


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
	}
}

var grid = {
	shuffle: function(obj) {

		if ( typeof $origin === 'undefined'  ) {
			var $origin = $('.contain .origin');
			var $target = obj.placeholder;
		} else {
			var $origin = obj.item;
			var $target = $origin.parent().find('.target');
		}

		var $originPos = obj.position;
		var $originOrgPos = obj.originalPosition;
		var $target = $origin.parent().find('.target');
		var tarH = $target.outerHeight();
		var tarW = $target.outerWidth();
		var targetPos = $target.position();

		if ( $originPos.left > targetPos.left && $originPos.left < ( targetPos.left + (tarW / 3) ) ) {

			$origin.addClass('half');
			$target.addClass('half');

			// console.log('shuffle - left of target');

		} else if ( $originPos.left > ( targetPos.left + tarW - (tarW / 3) ) && $originPos.left < ( targetPos.left + tarW ) ) {

			$origin.addClass('half');
			$target.addClass('half');

			// console.log('shuffle - right of target');

		} else if ( $originPos.top > targetPos.top && $originPos.top < ( targetPos.top + (tarH / 3) ) ) {

			$origin.removeClass('half');
			$target.removeClass('half');

			// console.log('shuffle - above target');

		} else if ( $originPos.top > ( targetPos.top + tarH - (tarH / 3) ) && $originPos.top < ( targetPos.top + tarH ) ) {

			$origin.removeClass('half');
			$target.removeClass('half');

			// console.log('shuffle - below target');

		}

		if ( $('.bound:not(".textImage")').siblings().has('.half').length < 1 ) {
			$('.bound:not(".textImage")').removeAttr('style'); /* gross! */
		} else if ( $('.bound.textImage').siblings().has('.half').length < 1 ) {
			$('.bound.textImage .editMe, .bound.textImage .imageArea, .bound.textImage .imageArea img').removeAttr('style'); /* gross! */
		}

	},
	placeholder: function(obj) {

		var $origin = obj.item;
		var $originPos = obj.position;
		var $originOrgPos = obj.originalPosition;
		var $canPos = $('.contain').position();

		var $this = obj.placeholder;
		var myHeight = $origin.outerHeight();
		var myWidth = $origin.outerWidth();
		var nextWidth, nextPos, prevWidth, prevPos;

		var $target = $origin.parent().find('.target');
		var tarH = $target.outerHeight();
		var tarW = $target.outerWidth();
		var targetPos = $target.position();

		// console.log($originPos.left);

		if ( typeof targetPos === 'undefined' ) {

			// position the placeholder
			$this
			.addClass('horiz')
			.css({
				'left': '0',
				'top': '0',
				'visibility': 'visible',
			})
			.width($('.contain').innerWidth());

		} else {

			var $newLeft = $originPos.left - $originOrgPos.left;

			if ( $newLeft > targetPos.left && $newLeft < ( targetPos.left + (tarW / 3) ) ) {

				// position the placeholder
				$this
				.addClass('vert')
				.css({
					'left': targetPos.left,
					'top': targetPos.top,
					'visibility': 'visible',
				})
				.height(tarH)
				.removeClass('horiz');

				// console.log('left of Target');

			} else if ( $newLeft > ( targetPos.left + tarW - (tarW / 3) ) && $newLeft < ( targetPos.left + tarW ) ) {

				// position the placeholder
				$this
				.addClass('vert')
				.css({
					'left': targetPos.left + tarW,
					'top': targetPos.top,
					'visibility': 'visible',
				})
				.height(tarH)
				.removeClass('horiz');

				// console.log('right of target');

			} else if ( $originPos.top > targetPos.top && $originPos.top < ( targetPos.top + (tarH / 3) ) ) {

				// position the placeholder
				$this
				.addClass('horiz')
				.css({
					'left': targetPos.left,
					'top': targetPos.top,
					'visibility': 'visible',
				})
				.removeClass('vert')
				.width(tarW);

				// console.log('above target');

			} else if ( $originPos.top > ( targetPos.top + tarH - (tarH / 3) ) && $originPos.top < ( targetPos.top + tarH ) ) {

				// position the placeholder
				$this
				.addClass('horiz')
				.css({
					'left': targetPos.left,
					'top': targetPos.top + tarH,
					'visibility': 'visible',
				})
				.removeClass('vert')
				.width(tarW);

				// console.log('below target');

			}
		}
	},
	mason: function() {
		$('.contain').masonry({
			animationOptions: {
				duration: speed
			},
			columnWidth: 1,
			// gutterWidth: 10,
			isAnimated: true,
			itemSelector: '.bound'
		});
	},
	reload: function() {
		$('.contain').masonry('reload');
		$('.contain').sortable('refreshPositions');
		$('.contain').children().removeClass('target');
	},
	isResize: function(obj) {
		$this = obj;
		parH = $('.contain').innerHeight();

		if ( $this.is('.image, .text') ) {
			alsoMe = '';
			parW = $('.contain').innerWidth() - 20;
			container = $('.contain');

		} else if ( $this.parents('.bound').is('.textImage') ) {
			alsoMe = $('.editMe');
			parW = $this.parents('.bound').innerWidth() - 20;
			container = 'parent';
		}

		$this.resizable({
			// containment: container,
			// alsoResizeReverse: '.editMe, .imageArea',
			handles: "e, s, w",
			maxHeight: parH,
			minHeight: 100,
			maxWidth: parW,
			minWidth: 100,
			resize: function(event, ui) {
				var newHeight, newWidth;

				if ( $this.is('.image, .text') ) {

					newHeight = ui.element.height();
					newWidth = ui.element.width();

					$('.image', $this).height(newHeight).width(newWidth);

				} else if ( $this.parents('.bound').is('.textImage') ) {

					newHeight = ui.size.height;
					newWidth = ui.size.width;
					newPos = ui.position;

					if ( newWidth < ($('.contain').innerWidth() - 100) ) {
						myW = newWidth;
					} else {
						myW = $('.contain').innerWidth() - 100;
					}

					ui.element.height(newHeight).width(myW);
					$('.image', $this).height(newHeight).width(myW);

					$this
					.css({
						'left': 0
					})
					.siblings()
					.not('.controls')
					.css({
						'left': 0,
						'height': newHeight,
						'width': ((parW - myW) - 10)
					})
					.find('.image')
					.css({
						'height': newHeight,
						'width': (parW - myW - 10)
					});

				}

				// console.log($this.resizable('option', 'maxWidth'));

			},
			create: function(event, ui) {
				if ( $('.ui-resizable').length > 1 ) {
					$this.siblings().not('.controls').resizable('destroy');
				}
			},
			start: function(event, ui) {

			},
			stop: function(event, ui) {
				$('.contain > div').removeClass('target');
				grid.reload();
			}
		});
	},
	startSort: function() {
		$('.contain').sortable('enable');
		$('.palette').fadeOut(speed);
		$('.contain').children('.editMe').blur()
		$('.gearsList div').draggable('enable');
	},
	stopSort: function() {
		$('.contain').sortable('disable');
		$('.gearsList div').draggable('disable');

	}
}




// When document is scriptable
$(document).ready(function() {
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

	$('.contain').sortable({
		activate: function(event, ui) {
			grid.mason();
		},
		beforeStop: function(event, ui) {
			if ( $('.contain').children().length > 3 ) {
				grid.shuffle(ui);
			}
		},
		change: function(event, ui) {
			var start_pos = ui.item.data('start_pos');
			var index = ui.placeholder.index();

			if ( start_pos < index ) {
				$('.contain > div:nth-child(' + index + ')').not('.ui-sortable-helper, .origin, .ui-sortable-placeholder').addClass('target').siblings().removeClass('target');
			} else {
				$('.contain > div:eq(' + (index + 1) + ')').not('.ui-sortable-helper, .origin, .ui-sortable-placeholder').addClass('target').siblings().removeClass('target');
			}

		},
		// containment: '#canvas',
		cursorAt: {top: 0, left: 0 },
		// forcePlaceholderSize: true,
		// grid: [ 120, 120 ],
		helper: function(event, ui) {
			var $itemClass = $(ui).attr('class');

			$helper = '<div class="' + $itemClass + '"><span></span></div>';
			return $helper;
		},
		over: function(event, ui) {
			var start_pos = ui.item.index();
			ui.item.data('start_pos', start_pos);
			
			// sortableIn = 1;

			if ( $(ui.item).hasClass('gear image') ) {
				$(ui.helper).width('75px');
			} else if ( $(ui.item).hasClass('gear text') ) {
				$(ui.helper).width('65px');
			} else if ( $(ui.item).hasClass('gear textImage') ) {
				$(ui.helper).width('112px');
			}

			$('#canvas').addClass('activeCanvas');

		},
		out: function(event, ui) {
			// sortableIn = 0;
		},
		receive: function(event, ui) {
			// sortableIn = 1;

			if ( $(ui.item).hasClass('gear image') ) {
				$placed = doGear.i();
				$(ui.item).html($placed).addClass('bound');
			} else if ( $(ui.item).hasClass('gear text') ) {
				$placed = doGear.t();
				$(ui.item).html($placed).addClass('bound');
			} else if ( $(ui.item).hasClass('gear textImage') ) {
				$placed = doGear.tI();
				$(ui.item).html($placed).addClass('bound');
			}

		},
		remove: function(event, ui) {
			// sortableIn = 1;
		},
		sort: function(event, ui) {
			grid.placeholder(ui);
		},
		start: function(event, ui) {
			// sortableIn = 1;

			var start_pos = ui.item.data('start_pos');
			var index = ui.placeholder.index();

			if ( start_pos < index ) {
				$('.contain > div:nth-child(' + index + ')').not('.ui-sortable-helper, .origin, .ui-sortable-placeholder').addClass('target').siblings().removeClass('target');
			} else {
				$('.contain > div:eq(' + (index + 1) + ')').not('.ui-sortable-helper, .origin, .ui-sortable-placeholder').addClass('target').siblings().removeClass('target');
			}

			$(ui.item).addClass('origin').css('display','block');

			ui.helper.height('46px'); /* why? */

			ui.placeholder.removeClass('bound');
			ui.helper.removeClass('bound');

		},
		stop: function(event, ui) {
			$(ui.item).removeClass('dragging').addClass('bound');

			var $canvasHeight = 776;
			var $totalHeight = 0;

			$(".contain").children().each(function() {
				$totalHeight += $(this).outerHeight(true);

				if ( $totalHeight > $canvasHeight ) {
					$('.contain').innerHeight($totalHeight);
				} else {
					$('.contain').innerHeight($canvasHeight);
				}

			});

			$(ui.item).removeClass('origin');

			$('#canvas').removeClass('activeCanvas');

			grid.reload();
		},
		tolerance: 'intersect',
		update: function(event, ui) {
			$('.contain > div').removeClass('target');

			// grid.reload();
		}
	});

	$('.gearsList div').draggable({
		connectToSortable:'.contain',
		cursor:'move',
		cursorAt: { bottom:0, right:0 },
		helper:'clone',
		revert: 'invalid'
	});


	// CASE — Image or Text only
	$('.contain').on('click', '.bound:not(".textImage")', function(e) {

		grid.stopSort();

		$(this).addClass('active');
		$(this).parents('.contain').addClass('editing');
		$(this).siblings().removeClass('active');

		if ( $(this).hasClass('text') ) {
			$('.palette.text, .palette.html').fadeIn(speed);
			$('.palette.image').fadeOut(speed); /*gross!*/
			$('.editMe', this).focus();
		} else if ( $(this).hasClass('image') ) {
			$('.palette.image').fadeIn(speed);
			$('.palette.text, .palette.html').fadeOut(speed); /*gross!*/
		} 

		grid.isResize($(this));

		e.stopPropagation();
	});

	// CASE — textImage > imagearea only
	$('.contain').on('click', '.textImage .imageArea', function(e) {
		grid.stopSort();

		$(this).parents('.bound').addClass('active');
		$(this).parents('.contain').addClass('editing');
		$(this).parents('.bound').siblings().removeClass('active');

		$('.palette.image').fadeIn(speed);
		$('.palette.text, .palette.html').fadeOut(speed); /*gross!*/

		grid.isResize($(this));

		e.stopPropagation();

	});

	// CASE — textImage > editMe only
	$('.contain').on('click', '.textImage .editMe', function(e) {
		grid.stopSort();

		$(this).parents('.bound').addClass('active');
		$(this).parents('.contain').addClass('editing');
		$(this).parents('.bound').siblings().removeClass('active');

		$('.palette.text, .palette.html').fadeIn(speed);
		$('.palette.image').fadeOut(speed); /*gross!*/
		$('.editMe', this).focus();

		grid.isResize($(this));

		e.stopPropagation();
	});


	$('.contain').on({
		click: function(e) {
			$(this).children('.bound').removeClass('active');
			// $('.palette:visible').fadeOut(speed);
			grid.startSort();
			
			e.stopPropagation();
		}
	});

	$('.palette').draggable({
		containment: "parent"
	});

	$('.contain').on('click', '.controls .remove', function(e) {
			$(this).parents('.bound').remove();
			$('.palette').fadeOut(speed);

			grid.startSort();
			grid.reload();
			e.stopPropagation();
	});

});


//When everythig is loaded
$(window).load(function() {
	draw_viewport();
})

$(window).unload(function() {
  // Hack - empty unload so dropdown menu will automaticlaly occur after browser's 'back' button
});