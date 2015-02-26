OsciTk.views.Search = OsciTk.views.BaseView.extend({
	className: 'search-view',
	template: OsciTk.templateManager.get('search'),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},
});