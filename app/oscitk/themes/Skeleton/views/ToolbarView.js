OsciTk.views.Toolbar = OsciTk.views.BaseView.extend({
	id: 'toolbar-view',
	template: OsciTk.templateManager.get('toolbar'),
	initialize: function() {
		// tracks the state of the content area drawer
		this.activeToolbarItemView = undefined;
		this.render();

		this.listenTo(Backbone, "packageLoaded", function(packageModel) {
			//Add the publication title to the Toolbar
			var title = packageModel.getTitle();
			if (title) {
				this.$el.find("#toolbar-title").text(title);
			}
		});
	},
	render: function() {
		this.$el.html(this.template());

		_.each(app.toolbarItems, function(toolbarItem) {
			var item = new OsciTk.views.ToolbarItem({toolbarItem: toolbarItem});
			this.addView(item, '#toolbar-area');
			item.render();
		}, this);
	}
});