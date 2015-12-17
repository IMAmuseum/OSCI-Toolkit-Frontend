OsciTk.views.SearchToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-search-view',
	template: OsciTk.templateManager.get('toolbar-search'),
	events: {
	},
	initialize: function() {

		this.listenTo(Backbone, 'layoutComplete', function(params) {

			this.render();
		
		}, this);

	},
	render: function() {

		this.$el.html(this.template({
			//items: this.footnotes
		}));

		return this;

	}

});
