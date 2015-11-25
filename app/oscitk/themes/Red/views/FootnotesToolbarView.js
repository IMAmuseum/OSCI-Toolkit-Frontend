OsciTk.views.FootnotesToolbar = OsciTk.views.BaseView.extend({
	className: 'footnotes-toolbar',
	template: OsciTk.templateManager.get('footnotes-toolbar'),
	events: {

	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({}));
		return this;
	}

});
