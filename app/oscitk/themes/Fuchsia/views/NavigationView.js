OsciTk.views.Navigation = OsciTk.views.BaseView.extend({
	id: 'navigation-view',
	template: OsciTk.templateManager.get('navigation'),
	events: {
        //"scroll" : "updateProgress",
        'click .mobile-menu' : 'triggerToggleToolbar',
    },
	initialize: function() {

		// Stores current section from SectionCollection
		this.currentNavigationItem = null;

		// When section is loaded, render the navigation control
		this.listenTo(Backbone, 'layoutComplete', function( section ) {
			this.render();
		});

		this.listenTo(Backbone, 'navigate', function() {
			this.updateNavigationArrows();
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

					this.listenToOnce( Backbone, "sectionRenderEnd", function() {
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
			var selector = false;

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
                        	//selector = 'p[data-paragraph_number='+pid+']';
                        	selectro = '.paragraph-controls[data-paragraph_identifier='+pid+']';
                            gotoPage = this.getPageForSelector( selector );

                        	break;

                        }


                        // Route to a figure /fig-[section_id]-[figure_index]-[occurance]
                        // [occurance] is meant to be used when the same figure is placed multiple times
                        // We'll ignore it for now and just link to the first one...
                        if (data.identifier.search(/^fig-[0-9]+-[0-9]+$/) > -1) {

                        	var fid = data.identifier;
                        	selector = "#" + fid;
                        	gotoPage = this.getPageForSelector( selector );

                        	break;

                        }

                        // Route to specific element
                        selector = data.identifier;
                        gotoPage = this.getPageForSelector( data.identifier );
	                    break;


                }
            }

            var scroll = gotoPage * $(document).height();
            	scroll = scroll - $(window).height() / 2;
            	scroll = Math.max( 0, scroll );

            if( selector ) {
            	// todo: for paragraphs, use the button selector, not the paragraph selector
            	scroll = scroll + $(selector).height() / 2;
            }


            if( $('#osci-bp-xl').is(':not(visible)') ) {
            	scroll = scroll - this.$el.height();
            }

            $(window).scrollTop( scroll );

		});

	},

	render: function() {

		this.$el.html(this.template({
			chapter: this.currentNavigationItem.get('title')
		}));

		// Bind scroll event to progress bar
		var that = this;
		$(window).on('scroll', function() {
			that.updateProgress();
		});

	},

    updateProgress: function() {

        var value = $(document).scrollTop();
        var max = $('body').innerHeight();
        	max -= $(window).height();

        var percent = (value/max)*100;

        // Just some debug info
        $('.progress .progress-bar').attr('data-max', max);
        $('.progress .progress-bar').attr('data-now', value);

        $('.progress .progress-bar').attr('style', 'width: ' + percent + '%');

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

		var collection = app.collections.navigationItems;
		var section = collection.get(section_id);

		// Verify that the section exists; else go to first
		this.currentNavigationItem = section ? section : collection.first() ;

		Backbone.trigger( 'currentNavigationItemChanged', this.currentNavigationItem );

	},
	// Here, these buttons always move between sections, not pages.
	updateNavigationArrows: function(page) {

		var $prev = this.$el.find('.prev-page');
		var $next = this.$el.find('.next-page');

		// reset both controls to start
		$prev.unbind('click').addClass('inactive');
		$next.unbind('click').addClass('inactive');

		var previous = app.views.navigationView.currentNavigationItem.get('previous');
		var next = app.views.navigationView.currentNavigationItem.get('next');
		
		if( previous ) {
			$prev.removeClass('inactive').on('click', function(e) {
				app.router.navigate("section/" + previous.get('id'), { trigger: true } );
			});
		}

		if( next ) {
			$next.removeClass('inactive').on('click', function(e) {
				app.router.navigate("section/" + next.get('id'), { trigger: true } );
			});
		}

	},

	triggerToggleToolbar: function() {
		Backbone.trigger('toggleToolbar');
	}

});
