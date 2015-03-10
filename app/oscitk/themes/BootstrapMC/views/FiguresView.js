OsciTk.views.Figures = OsciTk.views.BaseView.extend({
	className: 'figures-view',
	template: OsciTk.templateManager.get('figures'),
	events: {
		"click #dismiss": "closeOverlay",
	},
	initialize: function() {
		// re-render this view when collection changes
		this.listenTo(app.collections.figures, 'add remove reset', function() {
			this.render();
		});
	},
	render: function() {
		var fig_data = app.collections.figures.toJSON();

		if (! _.isEmpty(fig_data)) {
			this.$el.html(this.template({figures: fig_data}));
		}

		return this;
	},
	closeOverlay: function(e) {
		e.preventDefault();
		Backbone.trigger("overlayDismiss", e);
	}
});