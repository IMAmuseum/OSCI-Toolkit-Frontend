OsciTk.views.FiguresToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-figures-view',
	template: OsciTk.templateManager.get('toolbar-figures'),
	events: {
	},
	initialize: function() {

		// re-render this view when collection changes
		this.listenTo(app.collections.figures, 'add remove reset', function() {

			/*
			var data = app.collections.figures.toJSON();			
			var out = [];
			_.each( data, function( i, e ) {
				out.push({

				});
			});

			this.figures = out;
			*/

			this.render();
		
		});

	},
	render: function() {

		var fig_data = app.collections.figures.toJSON();
		this.$el.html( this.template( { figures: fig_data } ) );

		// Enable linking functionality
		this.$el.find('a').on('click', function() {
			Backbone.trigger('navigate', { identifier: $(this).attr('data-figure-id') } );
		});
		
		return this;

	}

});
