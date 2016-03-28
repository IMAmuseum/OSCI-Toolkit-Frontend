OsciTk.views.Navbar = OsciTk.views.BaseView.extend({
	className: 'navbar-view',
	template: OsciTk.templateManager.get('navbar'),
	events: {
		'click li a': 'itemClick',
	},
	initialize: function() {
		this.listenTo(Backbone, 'packageLoaded', function(packageModel) {
			this.creator = $(packageModel)[0].attributes['metadata']['dc:creator'];
			this.pubTitle = packageModel.getTitle();
			this.sections = app.collections.navigationItems.where({depth: 0});
		});

		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			this.render();
		});

	},
	render: function() {
		this.$el.html(this.template({title: this.pubTitle, sections: this.sections}));
		$('.navbar-item[data-toggle="tooltip"]').tooltip({container:'.navbar-item[aria-describedby]'});
		return this;
	},
	itemClick: function(event) {

		event.preventDefault();

		var sectionId = $(event.currentTarget).attr('data-section-id');
		$('li.tocView-toolbar-item>a').removeClass('active');
		Backbone.trigger("toolbarRemoveViews");
		
		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});

	},
});