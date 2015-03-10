OsciTk.views.Toc = OsciTk.views.BaseView.extend({
	className: 'toc-view',
	template: OsciTk.templateManager.get('toc'),
	events: {
		'click li a': 'itemClick',
		'click #dismiss': 'closeOverlay',
	},
	initialize: function() {
		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
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

		var sectionId = $(event.currentTarget).attr('data-section-id');
		$('li.tocView-toolbar-item>a').removeClass('active');
		Backbone.trigger("tocItemClicked");
		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});
	},
	closeOverlay: function(e) {
		e.preventDefault();
		Backbone.trigger("overlayDismiss", e);
	}
});
