OsciTk.views.Print = OsciTk.views.BaseView.extend({
	className: 'print-view',
	template: OsciTk.templateManager.get('print'),
	initialize: function() {
		this.render();
		this.listenTo(Backbone, "toolbarInlineClicked", function() {
			this.triggerPrint();
		});
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},

	triggerPrint: function() {
		window.print();
	}
});