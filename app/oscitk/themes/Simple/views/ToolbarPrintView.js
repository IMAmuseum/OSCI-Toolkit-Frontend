OsciTk.views.PrintToolbar = OsciTk.views.BaseView.extend({
	className: 'print-view',
	template: OsciTk.templateManager.get('toolbar-print'),
	initialize: function() {

		this.listenTo(Backbone, "toolbarInlineClicked", function(href) {
			if (href === "print") {
				window.print();
			}
		});

		this.render();

	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

});