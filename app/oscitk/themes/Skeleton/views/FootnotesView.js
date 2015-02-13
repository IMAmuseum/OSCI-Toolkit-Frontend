OsciTk.views.Footnotes = OsciTk.views.BaseView.extend({
	id: 'footnote-view',

	initialize: function() {
		// listen to layoutComplete event
		this.listenTo(Backbone, 'layoutComplete', function(params) {
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
			for (var i = 0; i < fnLinks.length; i++) {
				var fnRef = $(fnLinks[i]);
				fnRef.off('click');
				fnRef.bind('click', {'caller': this}, this.footnoteClicked);
			}
		});
	},

	footnoteClicked: function(e) {
		e.preventDefault();
		e.stopPropagation();
	}
});