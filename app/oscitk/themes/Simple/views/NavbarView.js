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

		this.$el.html(this.template({
			title: this.pubTitle,
			sections: this.sections
		}));

		$('.navbar-item[data-toggle="tooltip"]').tooltip({
			left:'150px'//,container:'body'
		});

		return this;
	},

	itemClick: function(event) {

		event.preventDefault();

		// Save this before closing the navbar
		var sectionId = $(event.currentTarget).attr('data-section-id');
		app.router.navigate("section/" + sectionId, {trigger: true});

	},

});