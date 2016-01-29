OsciTk.views.Navigation = OsciTk.views.BaseView.extend({
	id: 'navigation-view',
	template: OsciTk.templateManager.get('navigation'),
	initialize: function() {

		// Pages here have nothing to do with the MultiColumn theme's Pages
		// They are simply a way to keep track of how far to scroll the screen
		// They are NOT distinct <div> elements and have no associated model or collection 
		// They exist only within the context of the NavigationView.js
		// They are just numbers!

		// set some defaults
		this.currentNavigationItem = null;

		this.numPages = null;
		this.page = null;

		// when section is loaded, render the navigation control
		this.listenTo(Backbone, 'layoutComplete', function(section) {

			this.render();

		});

		this.listenTo(Backbone, 'windowResized', function(section) {

			this.calculatePages();
			this.render();

		});

		// See ../../../Router.js
		this.listenTo(Backbone, 'routedToSection', function( data ) {

			// Used to delay triggering of navigate with an identifier
			var waitForSection = true;

			// First, determine if we need to navigate to a different section
			// Assuming that section_id is almost always defined!
			// It should be undefined only on initial load with no hash

			if( !data.section_id ) {

				// go to first section
				var sectionId = app.collections.navigationItems.at(0).id;
				//console.log( sectionId + " asdf"); //asdf
				app.router.navigate("section/" + sectionId, { trigger: false } );
				this.setCurrentNavigationItem( sectionId );

			} else {

				// if the first load is via #section/[id]
				if( this.getCurrentNavigationItem() === null ) {
					//console.log( data.section_id + " abba" );
					this.setCurrentNavigationItem( data.section_id );
				}else{

					// trigger a nav item change *only* if it's a new section
					// no need to re-render everything if we're staying put...
					if( data.section_id !== this.getCurrentNavigationItem().get('id') ) {
						//console.log( data.section_id + " wert" );
						this.setCurrentNavigationItem( data.section_id );
					}else{
						waitForSection = false;
					}
					
				}

			}

            

			// if there is a secondary route (e.g. to a paragraph),
			// pass the ball on to the navigate listener
			if( typeof data.identifier !== undefined ) {
				if( waitForSection ) {
					this.listenToOnce( Backbone, "columnRenderEnd", function() {
						Backbone.trigger('navigate', { identifier: data.identifier } );
					});
				}else{
					Backbone.trigger('navigate', { identifier: data.identifier } );
				}
			}

			// set the document title | section name
			this.setDocumentTitle();

		});

		

		// TODO: Respond to scroll events?

		// Respond to touch swipes
		var that = this;
		$('#section-container').swipe({
			swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
				Backbone.trigger('navigate', { page: that.page - 1 } );
			},
			swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
				Backbone.trigger('navigate', { page: that.page + 1 } );
			},
			//excludedElements: "button, input, select, textarea, a, .noSwipe"
		});

		// Respond to scroll up and down
		var that = this;
		$(document).keydown(function(event) {

			// Don't trigger this if the cursor is in an input field
			var em = event.target.nodeName.toLowerCase();
			if( em === 'input' || em === 'textarea' ){
       			 return;
    		}

    		var key = event.which;
    		if( key == 39 || key == 37 ) {
    			event.preventDefault();
				Backbone.trigger('navigate', { page: that.page + key - 38 } );
    		}


		});

		// Figure out the first element on the page and save it
		this.listenTo(Backbone, 'columnRenderStart', function() {
	        
	        var offset = $('#default-section-view').offset();
			
	        var em = $('#default-section-view>*').findNearest({
	            left: offset.left + $('#section').scrollLeft() + 1,
	            top: offset.top + 1
	        });

	        $('#section').attr('data-columns-element', em.index() );

		});

		// Navigate to page that contains last known element
		this.listenTo(Backbone, 'columnRenderEnd', function() {

			var i = $('#section').attr('data-columns-element');
			var id = '#default-section-view>*:eq(' + i +')';

			Backbone.trigger('navigate', { identifier: id } );

		});

		this.listenTo(Backbone, 'navigate', function( data ) {


			// Stay on current page by default
            var gotoPage = this.page ? this.page : 1;

            if (typeof data.page !== "undefined") {
                gotoPage = data.page;
            }

            if (data.identifier) {

                switch (data.identifier) {

                    case 'end':
                        gotoPage = this.numPages;
                        app.router.navigate("section/" + this.getCurrentNavigationItem().get('id'), { trigger: false } );
                    break;

                    case 'start':
                        gotoPage = 1;
                    break;

                    default:

                        // Route to a paragraph /p-[section_id]-[id]
                        if(data.identifier.search(/^p-[0-9]+/) > -1) {

                        	var pid = data.identifier.slice(data.identifier.lastIndexOf('-') + 1, data.identifier.length);
                            gotoPage = this.getPageForSelector('p[data-paragraph_number='+pid+']');

                        	break;

                        }


                        // Route to a figure /fig-[section_id]-[figure_index]-[occurance]
                        // [occurance] is meant to be used when the same figure is placed multiple times
                        // We'll ignore it for now and just link to the first one...
                        if (data.identifier.search(/^fig-[0-9]+-[0-9]+$/) > -1) {

                        	var fid = data.identifier;
                        	gotoPage = this.getPageForSelector("#" + fid);

                        	break;

                        }

						/*
						// Route for footnote references
                        if (data.identifier.search(/^fn-[0-9]+-[0-9]+/) > -1) {
                            
                            matches = data.identifier.match(/^fn-[0-9]+-[0-9]+/);
                            refs = $('a[href="#' + matches[0] + '"]');
                            if (refs.length === 1) {
                                page_for_id = this.getPageNumberForSelector(refs[0]);
                            }
                            else {
                                // find visible occurence
                                for (j = 0; j < refs.length; j++) {
                                    if (this.isElementVisible(refs[j])) {
                                        page_for_id = this.getPageNumberForSelector(refs[j]);
                                        break;
                                    }
                                }
                            }
                            break;
                        
                        }
                        */

                        // Route to specific element
                        gotoPage = this.getPageForSelector( data.identifier );
	                    break;


                }
            }


            // this.getPageForSelector() will return false (0) when the selector matches nothing
            // we should fix the URL and remain where we are when that happens
            // TODO: maybe alert the user that they had an invalid link?
            if( typeof gotoPage === 'undefined') {
            	gotoPage = this.page;
            	//console.log( this.getCurrentNavigationItem().get('id') + " jkl;");
            	app.router.navigate("section/" + this.getCurrentNavigationItem().get('id'), { trigger: true } );
            }

            // page width is used for determining how far to scroll
			var $target = $('#section');
			var page_width = $target.outerWidth();

			// account for column gutter
			if( $target.attr('data-columns-rendered') == 1 ) {
				page_width -= 10;
			}else{
				page_width += 10;
			}

			// Check if the page is available...
			var previous = this.currentNavigationItem.get('previous');
			var next = this.currentNavigationItem.get('next');
		
			// If navigating too far, table of contents no longer works
			var navigateRestoreToolbar = function( route ) {
				
				var $toolbar = app.views.toolbarView.$el;
				var $activeItem = $toolbar.find('#toolbar-area > li.active');
				var restoreItem = $activeItem.length > 0;


				if( restoreItem ) {
					var activeToolbarItemClass = $activeItem.attr('class').match(/(:?\s)(.+?-toolbar-item)(:?\s|$)/)[2];
				}

				Backbone.trigger("toolbarRemoveViews");
				app.router.navigate( route, { trigger: true } );

				if( restoreItem ) {
					//console.log( $toolbar.find( '.' + activeToolbarItemClass ) );
					$toolbar.find( '.' + activeToolbarItemClass ).click();
				}

			};

			if( gotoPage < 1 && previous ) {

				navigateRestoreToolbar( "section/" + previous.id + "/end" );

			// Note that we must wait for calculatePages to run in order to get this.numPages
			} else if( gotoPage > this.numPages && this.numPages && next ) {

				navigateRestoreToolbar( "section/" + next.id );

			} else {

				// We will need to account for column offset
				var cc = $('#section').attr('data-columns-rendered');
					cc = cc ? cc : $('#section').attr('data-columns-setting');

				// This is the only time when scrolling is allowed
				$target.scrollLeft( page_width * ( gotoPage - 1 ) );

				this.calculatePages();
				this.update(this.page);
				
			}



		});


	},

	// Given a selector, find first element, its offset, and the corresponding page
	getPageForSelector: function( selector ) {
		var $selector = $(selector);


		if( $selector.length < 1 ) {
			return false;
		}

		var offset = $selector.offset().left - $('#default-section-view').offset().left
			return Math.floor( offset / ( $('#section').outerWidth() + 10 ) ) + 1;
	},

	// Get element by id, find its offset, determine corresponding page


	// Sets current page and total # of pages for reference
	calculatePages: function() {

		this.numPages = Math.ceil( $('#default-section-view').width() / ( $('#section').outerWidth() + 10 ) );
		this.page = Math.ceil( $('#section').scrollLeft() / ( $('#section').outerWidth() + 10 ) ) + 1;

		Backbone.trigger('pagesCalculated', this.numPages, this.page);

	},

	render: function() {

		this.$el.html(this.template({
			numPages: this.numPages,
			chapter: this.currentNavigationItem.get('title')
		}));

		// Do other things that can happen whenever the page changes
		this.update(this.page);

	},

	// Mostly updates the arrow button links to navigate to the right page
	update: function(page) {

		var $prev = this.$el.find('.prev-page');
		var $next = this.$el.find('.next-page');



		// unbind both controls to start
		$prev.unbind('click');
		$next.unbind('click');

		var previous = this.currentNavigationItem.get('previous');
		var next = this.currentNavigationItem.get('next');
		
		// First, just bind each button to move the page
		$prev.removeClass('inactive').click(function () {
			Backbone.trigger('navigate', { page: page-1 } );
		});

		$next.removeClass('inactive').click(function () {
			Backbone.trigger('navigate', { page: page+1 } );
		});

		// Wait until we have info about total and current page
		// Will never be false unless null, i.e. not yet calculated
		if( this.numPages && this.page ) {

			if( !previous && this.page === 1 ) {
				$prev.addClass('inactive').off('click');
			}

			if( !next && this.page === this.numPages ) {
				$next.addClass('inactive').off('click');
			}

		}

	},

	// Book Title | Section Title
	setDocumentTitle: function() {

		//set the document title
		var title = app.models.docPackage.getTitle();
		title = (title) ? title + " | ": "";
		title += this.getCurrentNavigationItem().get('title');
		document.title = title;

	},

	getCurrentNavigationItem: function(){
		return this.currentNavigationItem;
	},

	setCurrentNavigationItem: function( section_id ) {

		// console.log("setCurrentNavigationItem called: " + section_id);

		var section = app.collections.navigationItems.get(section_id);

		if (section) {
			this.currentNavigationItem = app.collections.navigationItems.get(section_id);
		} else {
			this.currentNavigationItem = app.collections.navigationItems.first();
		}

		// Reset to first page when the section changes
		$('#section').attr('data-columns-element', 0 ).scrollLeft(0);

		Backbone.trigger('currentNavigationItemChanged', this.currentNavigationItem);

	}

});
