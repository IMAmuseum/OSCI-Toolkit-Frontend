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
		this.identifier = null;
		this.currentNavigationItem = null;

		this.numPages = null;
		this.page = null;

		// when section is loaded, render the navigation control
		this.listenTo(Backbone, 'layoutComplete', function(section) {

			console.log('NavigationView caught layoutComplete');
			this.render();

		});

		this.listenTo(Backbone, 'windowResized', function(section) {

			
			this.calculatePages();
			this.render();

		});

		// bind routedTo
		this.listenTo(Backbone, 'routedToSection', function(params) {

			console.log('NavigationView caught routedToSection');
			console.log( params ); // Object {section_id: "2", identifier: "end"}

			this.identifier = params.identifier;

			if( !params.section_id ) {

				// go to first section
				var sectionId = app.collections.navigationItems.at(0).id;
				this.setCurrentNavigationItem(sectionId);
				app.router.navigate("section/" + sectionId, {trigger: false});

			} else {

				// go to section_id
				this.setCurrentNavigationItem(params.section_id);

			}

			// set the document title | section name
			this.setDocumentTitle();

		});

		/*
		// #section ==
        var lastScrollLeft = $('#section').scrollLeft();
        $('#section').scroll(function() {

            var sectionScrollLeft = $('#section').scrollLeft();
            if( lastScrollLeft != sectionScrollLeft ) {
                lastScrollLeft  = sectionScrollLeft;
            }



        });
		*/

		// Respond to keyboard events
		var that = this;
		$(document).keydown(function(event) {

			// Don't trigger this if the cursor is in an input field
			var em = event.target.nodeName.toLowerCase();
			if( em === 'input' || em === 'textarea' ){
       			 return;
    		}

    		event.preventDefault();

			switch(event.which) {

				case 39:
					that.page += 1;
				break;

				case 37:
					that.page -= 1;
				break;

			}

			Backbone.trigger('navigate', { page: that.page } );

		});

		// the section resets to first page when columns re-render
		this.listenTo(Backbone, 'columnsComplete', function() {

			console.log('NavigationView caught columnsComplete');
			Backbone.trigger('navigate', { page: this.page } );

		});

		this.listenTo(Backbone, 'navigate', function(params) {

			console.log('NavigationView caught navigate');

			var page = params.page;

			var $target = $('#section');
			var page_width = $target.outerWidth();

			// add one gutter
			if( $target.attr('data-columns-rendered') == 1 ) {
				page_width -= 10;
			}else{
				page_width += 10;
			}

			$target.scrollLeft( page_width * (page - 1) );

			this.calculatePages();
			this.update(this.page);

		});

	},

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

	update: function(page) {

		// unbind both controls to start
		this.$el.find('.prev-page').unbind('click');
		this.$el.find('.next-page').unbind('click');

		// Set previous button state
		if (page == 1) {

			/*
			// check if we can go to the previous section
			var previous = this.currentNavigationItem.get('previous');

			console.log( previous );

			if (previous) {

				// this.$el.find('.prev-page .label').html('Previous Section');

				this.$el.find('.prev-page').removeClass('inactive').click(function () {
					app.router.navigate("section/" + previous.id + "/end", {trigger: true});
				});

			} else {

				// on first page and no previous section, disable interaction
				$('.prev-page', this.$el).addClass('inactive').unbind('click');

			}

			//*/

			$('.prev-page', this.$el).addClass('inactive').unbind('click');

		} else if (this.numPages > 1) {

			var that = this;
			//this.$el.find('.prev-page .label').html('Previous');

			// TODO: UPDATE PREV BUTTON TO ENABLE PROPERLY
			this.$el.find('.prev-page').removeClass('inactive').click(function () {

				//app.router.navigate("section/" + that.currentNavigationItem.id);
				Backbone.trigger('navigate', { page: page-1 } );

			});

		}

		// Set next button state
		if (page == this.numPages) {

			/*
			// check if we can go to the next section
			var next = this.currentNavigationItem.get('next');

			// TODO: UPDATE NEXT BUTTON TO ACTIVATE PROPERLIKE
			if (next) {

				//this.$el.find('.next-page .label').html('Next Section');
				this.$el.find('.next-page').removeClass('inactive').click(function () {
					app.router.navigate("section/" + next.id, {trigger: true});
				});

			}

			
			else {

				// on last page and no next section, disable interaction
				this.$el.find('.next-page').addClass('inactive').unbind('click');

			}

			*/

			this.$el.find('.next-page').addClass('inactive').unbind('click');

		} else if (this.numPages > 1) {

			// this.$el.find('.next-page .label').html('Next');

			this.$el.find('.next-page').removeClass('inactive').click(function () {
				Backbone.trigger('navigate', { page: page + 1 } );
			});

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

	// Change section
	setCurrentNavigationItem: function(section_id) {

		console.log( 'NavigationView calls setCurrentNavigationItem(' + section_id + ')' );

		var section = app.collections.navigationItems.get(section_id);

		if (section) {
			this.currentNavigationItem = app.collections.navigationItems.get(section_id);
		} else {
			this.currentNavigationItem = app.collections.navigationItems.first();
		}

		Backbone.trigger('currentNavigationItemChanged', this.currentNavigationItem);

	}

});
