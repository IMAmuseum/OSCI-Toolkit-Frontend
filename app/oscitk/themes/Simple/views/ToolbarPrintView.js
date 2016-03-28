OsciTk.views.PrintToolbar = OsciTk.views.BaseView.extend({
	className: 'print-view',
	template: OsciTk.templateManager.get('toolbar-print'),
	
	initialize: function() {
	},

	render: function() {

		this.$el.html(this.template());

		// Technically, nothing inside is big enough to catch the event
		// So we'll watch when the parent li gets clicked
		$('li.printToolbarView-toolbar-item').on('click', function() {
			window.print();
		});

	}

});