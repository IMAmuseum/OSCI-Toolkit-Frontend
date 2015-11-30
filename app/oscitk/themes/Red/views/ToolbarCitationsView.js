OsciTk.views.CitationsToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-citations-view',
	template: OsciTk.templateManager.get('toolbar-citations'),
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
