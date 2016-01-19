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
