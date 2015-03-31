OsciTk.views.Navbar = OsciTk.views.BaseView.extend({
	className: 'navbar-view',
	template: OsciTk.templateManager.get('navbar'),
	initialize: function() {
		this.listenTo(Backbone, 'packageLoaded', function(packageModel) {
			this.creator = $(packageModel)[0].attributes['metadata']['dc:creator']['value'];
			this.pubTitle = packageModel.getTitle();
			this.render();
		});

	},
	render: function() {
		this.$el.html(this.template({'title': this.pubTitle}));
		return this;
	}
});