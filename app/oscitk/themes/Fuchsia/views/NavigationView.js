OsciTk.views.Navigation = OsciTk.views.BaseView.extend({
	id: 'navigation-view',
	template: OsciTk.templateManager.get('navigation'),
	events: {
        //"scroll" : "updateProgress",
    },
	initialize: function() {

		// Stores current section from SectionCollection
		this.currentNavigationItem = null;

		// When section is loaded, render the navigation control
		this.listenTo(Backbone, 'layoutComplete', function( section ) {
			this.render();
		});

		/*
		this.listenTo(Backbone, 'windowResized', function(section) {
			this.render();
		});
		*/

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
				app.router.navigate("section/" + sectionId, { trigger: false } );
				this.setCurrentNavigationItem( sectionId );

			} else {

				// if the first load is via #section/[id]
				if( this.getCurrentNavigationItem() === null ) {
					this.setCurrentNavigationItem( data.section_id );
				}else{

					// trigger a nav item change *only* if it's a new section
					// no need to re-render everything if we're staying put...
					if( data.section_id !== this.getCurrentNavigationItem().get('id') ) {
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

					// We can unwrap this
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

		this.listenTo(Backbone, 'navigate', function( data ) {

			//debugger;

			// In this theme, navigate accomplished two things:
			//    1. Change section
			//    2. Scroll to the item refered to in identifier

			// Here, gotoPage refers to how far to scroll in percent
			// 0 = beginning, 1 = end

			var gotoPage = 0; 

            if (data.identifier) {

                switch (data.identifier) {

                    case 'end':
                        app.router.navigate("section/" + this.getCurrentNavigationItem().get('id'), { trigger: false } );
                        gotoPage = 1;
                    break;

                    case 'start':
                        gotoPage = 0;
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

            //console.log( gotoPage );
            //console.log( gotoPage * $(window).height() - $(window).height() / 2 );
            
            $(window).scrollTop( 
            	Math.max( 
            		0,
            		gotoPage * $(document).height( ) 
            		- $(window).height() / 2
            	)
            );
            
            //$(window).scrollTop( Math.max( 0, gotoPage * $(window).height() ) );

            /*
            // this.getPageForSelector() will return false (0) when the selector matches nothing
            // we should fix the URL and remain where we are when that happens
            // TODO: maybe alert the user that they had an invalid link?
            if( typeof gotoPage === 'undefined') {
            	gotoPage = this.page;
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
		
			*/

			/*
			// Check if the page is available...
			var previous = this.currentNavigationItem.get('previous');
			var next = this.currentNavigationItem.get('next');
		
			// If navigating to other section, table of contents no longer works
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
					$toolbar.find( '.' + activeToolbarItemClass ).click();
				}

			};
			*/

		});

		// Bind scroll event to progress bar
		var that = this;
		$(window).on('scroll', function() {
			that.updateProgress();
		});

	},

	render: function() {

		this.$el.html(this.template({
			chapter: this.currentNavigationItem.get('title')
		}));

	},

    updateProgress: function() {

        var value = $(window).scrollTop();
        var offset = 0;
        var sectionValue = value - offset;

        $('.progress .progress-bar').attr('data-now', value);

        if(! this.maxHeightSet) {

            var height = $(document).height();
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName("body")[0],
                cy = g.clientHeight;

            var max = (height-cy)-offset;
            $('.progress .progress-bar').attr('data-max', max);

            var percent = Math.floor((sectionValue/max)*100);
            $('.progress .progress-bar').attr('style', 'width: '+percent+'%');

        }


    },

    getPageForSelector: function( e ) {
    	return  $(e).offset().top / $(document).height();
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

		var section = app.collections.navigationItems.get(section_id);

		if (section) {
			this.currentNavigationItem = app.collections.navigationItems.get(section_id);
		} else {
			this.currentNavigationItem = app.collections.navigationItems.first();
		}

		Backbone.trigger('currentNavigationItemChanged', this.currentNavigationItem);

	}

});
