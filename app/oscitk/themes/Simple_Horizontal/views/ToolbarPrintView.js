OsciTk.views.Print = OsciTk.views.BaseView.extend({
	className: 'print-view',
	template: OsciTk.templateManager.get('toolbar-print'),
	initialize: function() {
		this.render();
		this.listenTo(Backbone, "toolbarInlineClicked", function(href) {
			this.triggerPrint(href);
		});
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},

	triggerPrint: function(href) {
		if (href === "print") {
			window.print();
		}
	}
});