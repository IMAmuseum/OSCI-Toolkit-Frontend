OsciTk.views.FootnotesToolbar = OsciTk.views.BaseView.extend({
	className: 'footnotes-toolbar',
	template: OsciTk.templateManager.get('footnotes-toolbar'),
	events: {
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

	}

});
