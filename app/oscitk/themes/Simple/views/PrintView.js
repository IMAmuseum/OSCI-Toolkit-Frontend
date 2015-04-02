OsciTk.views.Print = OsciTk.views.BaseView.extend({
	className: 'print-view',
	template: OsciTk.templateManager.get('print'),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	events: {
		"click #print": "triggerPrint"
	},

	triggerPrint: function(e) {
		e.preventDefault();
		window.print();
	}
});