// Find me. [Some custom stuff I added--search for others.]
var panelHeight,
	whoiam,
	scrollDefault,
	winHeight,
	totalHeight,
	extraMargin,
	diff;
function resetvalues() {
	panelHeight = $('#about').height();
	whoiam = $('#whoiam').outerHeight();
	scrollDefault = panelHeight - whoiam;
	winHeight = $(window).height();
	totalHeight = winHeight + (panelHeight - whoiam);
	extraMargin = parseInt($('.og-grid li').css('margin-bottom'));
	diff = (winHeight - whoiam) - ( $('#og-grid').height());
	
	var gridWidth = $('#og-grid').width();
	var mysteryMargin = 5; // Inexplicable space between items.
	var itemWidth = $('#og-grid li').outerWidth() + parseInt($('#og-grid li').css('margin-left')) + parseInt($('#og-grid li').css('margin-right'));

	var itemsInRow = 1;
	function calcGridWidth() {
		if (gridWidth - (itemWidth * itemsInRow) - (mysteryMargin * (itemsInRow - 1)) >= itemWidth + mysteryMargin) {
			itemsInRow++;
			calcGridWidth();
		} else return
	}
	calcGridWidth();

	$('#wrapper').css('height', totalHeight);
	$('#games').css('max-height', winHeight);
	// $('#about').css('width', (itemWidth * itemsInRow) + (mysteryMargin * (itemsInRow - 1)) - 20);
	if (diff > 0) {
		$('#games').css('padding-top', whoiam + (diff * 0.5) + (extraMargin * 0.5));
	} else {
		$('#games').css('padding-top', whoiam + extraMargin);
	}
}

// Run when page loads.
resetvalues();
// $(document).ready( function() { // Doesn't work, at least in Chrome. Thanks to http://stackoverflow.com/questions/2248325/webkit-browsers-are-getting-elements-width-wrong for solving a problem that was driving me crazy.
$(window).load( function() {
	resetvalues();
	// $(window).scrollTop(scrollDefault);
	$('body').animate( { scrollTop : scrollDefault }, 350 );
});

$(window).on('beforeunload', function() {
	// Run when page reloads.
    // $(window).scrollTop(scrollDefault);
}); // Credit: http://stackoverflow.com/questions/7035331/prevent-automatic-browser-scroll-on-refresh/18633915#18633915

function controlScroll() {
	if ($(window).scrollTop() < scrollDefault) {
		$('#games').css('overflow', 'hidden');
		$('.og-details p').css('overflow', 'hidden');
	} else {
		$('#games').css("overflow", 'auto');
		$('.og-details p').css('overflow', 'auto');
	}
}
$(window).scroll(controlScroll);
$('#games').scroll(controlScroll);
$('.og-details p').scroll(controlScroll);

// -----------------------------

/*
* debouncedresize: special jQuery event that happens once after a window resize
*
* latest version and complete README available on Github:
* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
*
* Copyright 2011 @louis_remi
* Licensed under the MIT license.
*/
var $event = $.event,
$special,
resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 250
};

// ======================= imagesLoaded Plugin ===============================
// https://github.com/desandro/imagesloaded

// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// callback function gets image collection as argument
//  this is the container

// original: MIT license. Paul Irish. 2010.
// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	// Register deferred callbacks
	if ($.isPlainObject(callback)) {
		$.each(callback, function (key, value) {
			if (key === 'callback') {
				callback = value;
			} else if (deferred) {
				deferred[key](value);
			}
		});
	}

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

var Grid = (function() {

		// list of items
	var $grid = $( '#og-grid' ),
		// the items
		$items = $grid.children( 'li' ),
		// current expanded item's index
		current = -1,
		// position (top) of the expanded item
		// used to know if the preview will expand in a different row
		previewPos = -1,
		// extra amount of pixels to scroll the window
		scrollExtra = 0,
		// extra margin when expanded (between preview overlay and the next items)
		marginExpanded = 10,
		$window = $( window ), winsize,
		$body = $( 'html, body' ),
		// transitionend events
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support for csstransitions
		support = Modernizr.csstransitions,
		// default settings
		settings = {
			minHeight : 500,
			speed : 350,
			easing : 'ease'
		};

	function init( config ) {
		
		// the settings..
		settings = $.extend( true, {}, settings, config );

		// preload all images
		$grid.imagesLoaded( function() {

			// save item´s size and offset
			saveItemInfo( true );
			// get window´s size
			getWinSize();
			// initialize some events
			initEvents();

		} );

	}

	// add more items to the grid.
	// the new items need to appended to the grid.
	// after that call Grid.addItems(theItems);
	function addItems( $newitems ) {

		$items = $items.add( $newitems );

		$newitems.each( function() {
			var $item = $( this );
			$item.data( {
				// offsetTop : $item.offset().top,
				offsetTop : $item.position().top, // Find me
				height : $item.height()
			} );
		} );

		initItemsEvents( $newitems );

	}

	// saves the item´s offset top and height (if saveheight is true)
	function saveItemInfo( saveheight ) {
		$items.each( function() {
			var $item = $( this );
			// $item.data( 'offsetTop', $item.offset().top );
			$item.data( 'offsetTop', $item.position().top ); // Find me
			if( saveheight ) {
				$item.data( 'height', $item.height() );
			}
		} );
	}

	function initEvents() {
		
		// when clicking an item, show the preview with the item´s info and large image.
		// close the item if already expanded.
		// also close if clicking on the item´s cross
		initItemsEvents( $items );
		
		// on window resize get the window´s size again
		// reset some values..
		$window.on( 'debouncedresize', function() {
			// Run when page resizes.
			resetvalues();
			$body.animate( { scrollTop : scrollDefault }, settings.speed ); // Find me.
			// $('#games').animate( { scrollTop : 0 }, settings.speed); // Find me.

			scrollExtra = 0;
			previewPos = -1;
			// save item´s offset
			saveItemInfo();
			getWinSize();
			var preview = $.data( this, 'preview' );
			if( typeof preview != 'undefined' ) {
				//hidePreview();
			}

		} );

	}

	function initItemsEvents( $items ) {
		$items.on( 'click', 'span.og-close', function() {
			hidePreview();
			return false;
		} ).children( 'a' ).on( 'click', function(e) {

			var $item = $( this ).parent();
			// check if item already opened
			current === $item.index() ? hidePreview() : showPreview( $item );
			return false;

		} );
	}

	// Find me.
	$('#about span.og-close').on('click', function() {
		$body.animate( { scrollTop : scrollDefault }, settings.speed );
	} );

	function getWinSize() {
		winsize = { width : $window.width(), height : $window.height() };
	}

	function showPreview( $item ) {

		var preview = $.data( this, 'preview' ),
			// item´s offset top
			// position = $item.data( 'offsetTop' );
			position = $item.data( 'offsetTop' ) - whoiam; // Find me

		scrollExtra = 0;

		// if a preview exists and previewPos is different (different row) from item´s top then close it
		if( typeof preview != 'undefined' ) {

			// not in the same row
			if( previewPos !== position ) {
				// if position > previewPos then we need to take te current preview´s height in consideration when scrolling the window
				if( position > previewPos ) {
					scrollExtra = preview.height;
				}
				hidePreview();
			}
			// same row
			else {
				preview.update( $item );
				return false;
			}
			
		}

		// update previewPos
		previewPos = position;
		// initialize new preview for the clicked item
		preview = $.data( this, 'preview', new Preview( $item ) );
		// expand preview overlay
		preview.open();
	}

	function hidePreview() {

		// Find me
		$('a.myButtons').each( function() {
			$(this).removeClass('myButtons');
		});

		current = -1;
		var preview = $.data( this, 'preview' );
		preview.close();
		$.removeData( this, 'preview' );
	}

	// the preview obj / overlay
	function Preview( $item ) {
		this.$item = $item;
		this.expandedIdx = this.$item.index();
		this.create();
		this.update();
	}

	Preview.prototype = {
		create : function() {
			// create Preview structure:
			this.$title = $( '<h3></h3>' );
			this.$description = $( '<p></p>' );

			// My buttons:
			this.$website = $( '<a class="myButtons" target="_blank" href="#">Site</a>' );
			this.$play = $( '<a class="myButtons" target="_blank" href="#">Play</a>' );
			this.$downloadMac = $( '<a class="myButtons" href="#">Get It (Mac)</a>' );
			this.$downloadWin = $( '<a class="myButtons" href="#">Get It (PC)</a>' );
			this.$video = $( '<a class="myButtons" target="_blank" href="#">Video</a>' );
			this.$gallery = $( '<a class="myButtons" target="_blank" href="#">Gallery</a>' );
			this.$about = $( '<a class="myButtons" target="_blank" href="#">More</a>' );
			this.$code = $( '<a class="myButtons" target="_blank" href="#">Code</a>' );
			
			this.$details = $( '<div class="og-details"></div>' ).append( this.$title, this.$description, this.$play, this.$website, this.$downloadWin, this.$downloadMac, this.$video, this.$gallery, this.$code, this.$about );
			this.$loading = $( '<div class="og-loading"></div>' );
			this.$fullimage = $( '<div class="og-fullimg"></div>' ).append( this.$loading );
			this.$closePreview = $( '<span class="og-close"></span>' );
			this.$previewInner = $( '<div class="og-expander-inner"></div>' ).append( this.$closePreview, this.$details, this.$fullimage );
			this.$previewEl = $( '<div class="og-expander"></div>' ).append( this.$previewInner );
			// append preview element to the item
			this.$item.append( this.getEl() );
			// set the transitions for the preview and the item
			if( support ) {
				this.setTransition();
			}
		},
		update : function( $item ) {
			$body.animate( { scrollTop : scrollDefault }, settings.speed ); // Find me.

			if( $item ) {
				this.$item = $item;
			}
			
			// if already expanded remove class "og-expanded" from current item and add it to new item
			if( current !== -1 ) {
				var $currentItem = $items.eq( current );
				$currentItem.removeClass( 'og-expanded' );
				this.$item.addClass( 'og-expanded' );
				// position the preview correctly
				this.positionPreview();
			}

			// update current value
			current = this.$item.index();

			// update preview´s content
			var $itemEl = this.$item.children( 'a' ),
				eldata = {
					// My buttons:
					website : $itemEl.data( 'website' ),
					play : $itemEl.data( 'play' ),
					downloadMac : $itemEl.data( 'downloadmac' ),
					downloadWin : $itemEl.data( 'downloadwin' ),
					video : $itemEl.data( 'video' ),
					gallery: $itemEl.data( 'gallery' ),
					about : $itemEl.data( 'about' ),
					code : $itemEl.data( 'code' ),

					largesrc : $itemEl.data( 'largesrc' ),
					title : $itemEl.data( 'title' ),
					description : $itemEl.data( 'description' )
				};

			this.$title.html( eldata.title );
			this.$description.html( eldata.description );
			// My buttons:
			this.$website.attr( 'href', eldata.website );
			this.$play.attr( 'href', eldata.play );
			this.$downloadMac.attr( 'href', eldata.downloadMac );
			this.$downloadWin.attr( 'href', eldata.downloadWin );
			this.$video.attr( 'href', eldata.video );
			this.$gallery.attr( 'href', eldata.gallery );
			this.$about.attr( 'href', eldata.about );
			this.$code.attr( 'href', eldata.code );

			// Hide and show buttons as needed: // Find me.

			if( typeof eldata.website == 'undefined' ) {
				// this.$website.hide();
				this.$website.css('display', 'none');
			} else {
				// this.$website.show();
				this.$website.css('display', 'inline-block');
				// this.$website.addClass('myButtons');
			}

			if( typeof eldata.play == 'undefined' ) {
				// this.$play.hide();
				this.$play.css('display', 'none');
			} else {
				// this.$play.show();
				this.$play.css('display', 'inline-block');
				// this.$play.addClass('myButtons');
			}
			
			if( typeof eldata.downloadMac == 'undefined' ) {
				// this.$downloadMac.hide();
				this.$downloadMac.css('display', 'none');
			} else {
				// this.$downloadMac.show();
				this.$downloadMac.css('display', 'inline-block');
				// this.$downloadMac.addClass('myButtons');
			}
			
			if( typeof eldata.downloadWin == 'undefined' ) {
				// this.$downloadWin.hide();
				this.$downloadWin.css('display', 'none');
			} else {
				// this.$downloadWin.show();
				this.$downloadWin.css('display', 'inline-block');
				// this.$downloadWin.addClass('myButtons');
			}
			
			if( typeof eldata.video == 'undefined' ) {
				// this.$video.hide();
				this.$video.css('display', 'none');
			} else {
				// this.$video.show();
				this.$video.css('display', 'inline-block');
				// this.$video.addClass('myButtons');
			}

			if( typeof eldata.gallery == 'undefined' ) {
				// this.$gallery.hide();
				this.$gallery.css('display', 'none');
			} else {
				// this.$gallery.show();
				this.$gallery.css('display', 'inline-block');
				// this.$gallery.addClass('myButtons');
			}
			
			if( typeof eldata.about == 'undefined' ) {
				// this.$about.hide();
				this.$about.css('display', 'none');
			} else {
				// this.$about.show();
				this.$about.css('display', 'inline-block');
				// this.$about.addClass('myButtons');
			}
			
			if( typeof eldata.code == 'undefined' ) {
				// this.$code.hide();
				this.$code.css('display', 'none');
			} else {
				// this.$code.show();
				this.$code.css('display', 'inline-block');
				// this.$code.addClass('myButtons');
			}
			
			var self = this;
			
			// remove the current image in the preview
			if( typeof self.$largeImg != 'undefined' ) {
				self.$largeImg.remove();
			}

			// preload large image and add it to the preview
			// for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
			if( self.$fullimage.is( ':visible' ) ) {
				this.$loading.show();
				$( '<img/>' ).load( function() {
					var $img = $( this );
					if( $img.attr( 'src' ) === self.$item.children('a').data( 'largesrc' ) ) {
						self.$loading.hide();
						self.$fullimage.find( 'img' ).remove();
						self.$largeImg = $img.fadeIn( 350 );
						self.$fullimage.append( self.$largeImg );
					}
				} ).attr( 'src', eldata.largesrc );	
			}

			// Wrap the buttons in a div. Find me.
			$('a.myButtons').wrapAll( '<div class="myButtonsDiv"></div>');
			$('.myButtonsDiv').each( function() {
				if ($(this).parent().is('.myButtonsDiv')) {
					$(this).unwrap();
				}
			});

			// Find me
			var myPaddingT = $('.og-details h3').outerHeight();
			$('.og-details p').css('padding-top', myPaddingT);
			var myPaddingB = $('.og-details div.myButtonsDiv').outerHeight();
			$('.og-details p').css('padding-bottom', myPaddingB);
		},
		open : function() {

			// $body.animate( { scrollTop : scrollDefault }, settings.speed ); // Find me.

			setTimeout( $.proxy( function() {	
				// set the height for the preview and the item
				this.setHeights();
				// scroll to position the preview in the right place
				this.positionPreview();
			}, this ), 25 );
		},
		close : function() {

			// $body.animate( { scrollTop : scrollDefault }, settings.speed ); // Find me.

			var self = this,
				onEndFn = function() {
					if( support ) {
						$( this ).off( transEndEventName );
					}
					self.$item.removeClass( 'og-expanded' );
					self.$previewEl.remove();
				};

			setTimeout( $.proxy( function() {

				if( typeof this.$largeImg !== 'undefined' ) {
					this.$largeImg.fadeOut( 'fast' );
				}
				this.$previewEl.css( 'height', 0 );
				// the current expanded item (might be different from this.$item)
				var $expandedItem = $items.eq( this.expandedIdx );
				$expandedItem.css( 'height', $expandedItem.data( 'height' ) ).on( transEndEventName, onEndFn );

				if( !support ) {
					onEndFn.call();
				}

			}, this ), 25 );
			
			return false;

		},
		calcHeight : function() {

			// var heightPreview = (winsize.height - whoiam) - this.$item.data( 'height' ) - marginExpanded,
			// 	itemHeight = (winsize.height - whoiam);
			var heightPreview = (winHeight - whoiam) - this.$item.data( 'height' ) - marginExpanded,
				itemHeight = (winHeight - whoiam); // Find me

			//if( heightPreview < settings.minHeight ) {
				heightPreview = settings.minHeight;
				itemHeight = settings.minHeight + this.$item.data( 'height' ) + marginExpanded;
			//}

			this.height = heightPreview;
			this.itemHeight = itemHeight;

		},
		setHeights : function() {

			var self = this,
				onEndFn = function() {
					if( support ) {
						self.$item.off( transEndEventName );
					}
					self.$item.addClass( 'og-expanded' );
				};

			this.calcHeight();
			this.$previewEl.css( 'height', this.height );
			this.$item.css( 'height', this.itemHeight ).on( transEndEventName, onEndFn );

			if( !support ) {
				onEndFn.call();
			}

		},
		positionPreview : function() {

			// scroll page
			// case 1 : preview height + item height fits in window´s height
			// case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
			// case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
			// var position = this.$item.data( 'offsetTop' ),
			var position = this.$item.data( 'offsetTop' ) - whoiam, // Find me
				// previewOffsetT = this.$previewEl.offset().top - scrollExtra,
				previewOffsetT = this.$previewEl.position().top + $('#games').scrollTop() - scrollExtra, // Find me.
				// scrollVal = this.height + this.$item.data( 'height' ) + marginExpanded <= winsize.height ? position : this.height < winsize.height ? previewOffsetT - ( winsize.height - this.height ) : previewOffsetT;
				scrollVal = this.height + this.$item.data( 'height' ) + marginExpanded <= (winHeight - whoiam) ? position : this.height < (winHeight - whoiam) ? previewOffsetT - whoiam - (winHeight - whoiam - this.height) : previewOffsetT; // Find me
				// scrollVal = previewOffsetT - whoiam - (winsize.height - whoiam - this.height);
//yoyo
			// $body.animate( { scrollTop : scrollVal }, settings.speed );
			$('#games').animate( { scrollTop : scrollVal }, settings.speed ); // Find me.
		},
		setTransition  : function() {
			this.$previewEl.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
			this.$item.css( 'transition', 'height ' + settings.speed + 'ms ' + settings.easing );
		},
		getEl : function() {
			return this.$previewEl;
		}
	}

	return { 
		init : init,
		addItems : addItems
	};

})();