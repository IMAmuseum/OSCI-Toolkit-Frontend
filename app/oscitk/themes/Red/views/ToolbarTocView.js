OsciTk.views.TocToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-toc-view',
	template: OsciTk.templateManager.get('toolbar-toc'),
	events: {
		'click li a': 'itemClick',

	},
	initialize: function() {
		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			console.log( "currentNavigationItemChanged" );
			this.render();
		});
	},
	render: function() {
		this.$el.html(this.template({
			items: app.collections.navigationItems.where({depth: 0})
		}));
		return this;
	},
	itemClick: function(event) {
		event.preventDefault();

		// console.log( 'section clicked' );

		var sectionId = $(event.currentTarget).attr('data-section-id');

		$('li.tocView-toolbar-item').removeClass('active');
		
		Backbone.trigger("toolbarRemoveViews");

		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});

		// This opens the menu again so that the user can pick another chapter
		app.views.toolbarView.$el.find('li.tocView-toolbar-item').click();

	},


});
