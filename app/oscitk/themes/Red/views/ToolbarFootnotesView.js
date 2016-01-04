OsciTk.views.FootnotesToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-footnotes-view',
	template: OsciTk.templateManager.get('toolbar-footnotes'),
	events: {
		'click li .toolbar-link': 'findFootnote',
	},
	initialize: function() {

		this.listenTo(Backbone, 'layoutComplete', function(params) {

			var fnLinks = app.views.sectionView.$el.find('a.footnote-reference');

			var fns = []; // can't use this.footnotes due to context conflict in loop
			fnLinks.each( function( i, e ) {
				
				// TODO: verify that this won't break if multiple footnotes exist
				var $e = $(e);

				fns.push( {
					id: $e.text(),
					title: $e.attr("data-original-title")
				});

			});


			this.footnotes = fns;

			this.render();
			
		}, this);

	},
	render: function() {

		this.$el.html(this.template({
			items: this.footnotes
		}));

		return this;

	},

	// Scrolls to the footnote in text
	findFootnote: function(e) {
		var $a = $(e.currentTarget);
		Backbone.trigger('navigate', { identifier: ".footnote-reference:contains('" + $a.attr('data-id') + "')" } );
	}
	
});
