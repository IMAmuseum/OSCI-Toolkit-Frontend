OsciTk.views.Navigation = OsciTk.views.BaseView.extend({
	id: 'navigation-view',
	template: OsciTk.templateManager.get('navigation'),
	events: {
        'click .next-page': 'nextPageClicked',
        'click .prev-page': 'prevPageClicked'
    },
	initialize: function() {
		//set some defaults
		this.identifier = null;
		this.currentNavigationItem = null;

		// when section is loaded, render the navigation control
		this.listenTo(Backbone, 'layoutComplete', function(section) {
			if (this.identifier) {
				Backbone.trigger("navigate", {identifier: this.identifier});
				this.identifier = null;
			}
			else {
				Backbone.trigger("navigate", {page: 1});
			}
			this.render();
		});

		// bind routedTo
		this.listenTo(Backbone, 'routedToSection', function(params) {
			this.identifier = params.identifier;
			if (!params.section_id) {
				// go to first section
				var sectionId = app.collections.navigationItems.at(0).id;
				this.setCurrentNavigationItem(sectionId);
				app.router.navigate("section/" + sectionId, {trigger: false});
			}
			else {
				// go to section_id
				this.setCurrentNavigationItem(params.section_id);
			}
			// set the document title | section name
			this.setDocumentTitle();
		});
	},

	render: function() {
		this.$el.html(this.template({
			chapter: this.currentNavigationItem.get('title'),
			previousItem: this.currentNavigationItem.get('previous'),
			nextItem: this.currentNavigationItem.get('next')
		}));
	},

	nextPageClicked: function(e) {
		e.preventDefault();
		e.stopPropagation();
		Backbone.trigger("changePage", 'next');
	},

	prevPageClicked: function(e) {
		e.preventDefault();
		e.stopPropagation();
		Backbone.trigger("changePage", 'prev');
	},

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

	setCurrentNavigationItem: function(section_id) {
		var section = app.collections.navigationItems.get(section_id);
		if (section) {
			this.currentNavigationItem = app.collections.navigationItems.get(section_id);
		} else {
			this.currentNavigationItem = app.collections.navigationItems.first();
		}
		Backbone.trigger('currentNavigationItemChanged', this.currentNavigationItem);
	}

});
