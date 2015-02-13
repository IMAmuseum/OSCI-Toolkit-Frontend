OsciTk.views.Footnotes = OsciTk.views.BaseView.extend({
	id: 'footnote',
	initialize: function() {
		// listen to layoutComplete event
		this.listenTo(Backbone, 'layoutComplete', function(params) {
			// find all footnote links in the section content
			var fnLinks = app.views.sectionView.$el.find('a.footnote-reference');
			_.each(fnLinks, function(link) {
				link = $(link);
				// is there a matching footnote?
				var id = link.attr('href').slice(1);
				var fn = app.collections.footnotes.get(id);
				if (fn) {
					link.qtip({
						content: fn.get('body'),
						style: {
							def: false
						},
						position: {
							viewport: $(window)
						}
					});
				}
			});
		});
	}
});