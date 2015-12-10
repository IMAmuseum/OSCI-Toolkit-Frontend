OsciTk.views.Navigation = OsciTk.views.BaseView.extend({
	id: 'navigation-view',
	template: OsciTk.templateManager.get('navigation'),
	initialize: function() {

		// console.log( this.id );
		// returns navigation-view

		// set some defaults
		this.identifier = null;
		this.currentNavigationItem = null;

		this.numPages = null;
		this.page = null;

		// when section is loaded, render the navigation control
		this.listenTo(Backbone, 'layoutComplete', function(section) {

			console.log('NavigationView caught layoutComplete');

			// Used to navigate to specific elements, e.g. notes
			if (this.identifier) {

				Backbone.trigger("navigate", {identifier: this.identifier});
				this.identifier = null;

			} else {

				Backbone.trigger("navigate", {page: 1});

			}

			// VERIFY THIS
			this.numPages = 2;

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

		this.listenTo(Backbone, 'pageChanged', function(info) {

			console.log('NavigationView caught pageChanged');

			// clear old identifier in url
			// app.router.navigate("section/" + previous.id + "/end");
			this.page = info.page;
			this.update(info.page);

		});


		// Respond to keyboard events
		$(document).keydown(function(event) {

			var p; // temp var used to determine target page

			switch(event.which) {

				case 39:

					// Right arrow navigates to next page
					p = app.views.navigationView.page + 1;
					if (p > app.views.navigationView.numPages) {
						var next = app.views.navigationView.currentNavigationItem.get('next');
						if (next) {
							app.router.navigate("section/" + next.id, {trigger: true});
						}
					} else {
						Backbone.trigger('navigate', {page: p});
					}

				break;

				case 37:

					// Left arrow navigates to previous page
					p = app.views.navigationView.page - 1;
					if (p < 1) {
						var previous = app.views.navigationView.currentNavigationItem.get('previous');
						if (previous) {
							app.router.navigate("section/" + previous.id + "/end", {trigger: true});
						}
					} else {
						Backbone.trigger('navigate', {page: p});
					}

				break;

			}

		});
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

			// check if we can go to the previous section
			var previous = this.currentNavigationItem.get('previous');

			if (previous) {
				this.$el.find('.prev-page .label').html('Previous Section');
				this.$el.find('.prev-page').removeClass('inactive').click(function () {
					app.router.navigate("section/" + previous.id + "/end", {trigger: true});
				});
			}

			// on first page and no previous section, disable interaction
			else {
				$('.prev-page', this.$el).addClass('inactive').unbind('click');
			}

		} else if (this.numPages > 1) {

			var $this = this;
			//this.$el.find('.prev-page .label').html('Previous');

			// TODO: UPDATE PREV BUTTON TO ENABLE PROPERLY
			this.$el.find('.prev-page').removeClass('inactive').click(function () {
				app.router.navigate("section/" + $this.currentNavigationItem.id);
				Backbone.trigger('navigate', {page:(page-1)});
			});

		}

		// Set next button state
		if (page == this.numPages) {

			// check if we can go to the next section
			var next = this.currentNavigationItem.get('next');

			// TODO: UPDATE NEXT BUTTON TO ACTIVATE PROPERLIKE
			if (next) {
				//this.$el.find('.next-page .label').html('Next Section');
				this.$el.find('.next-page').removeClass('inactive').click(function () {
					app.router.navigate("section/" + next.id, {trigger: true});
				});
			}

			// on last page and no next section, disable interaction
			else {
				this.$el.find('.next-page').addClass('inactive').unbind('click');
			}

		} else if (this.numPages > 1) {
			this.$el.find('.next-page .label').html('Next');
			this.$el.find('.next-page').removeClass('inactive').click(function () {
				Backbone.trigger('navigate', { page: page+1 });
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
