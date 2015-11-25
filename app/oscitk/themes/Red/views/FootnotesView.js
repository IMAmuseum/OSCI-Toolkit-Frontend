OsciTk.views.Footnotes = OsciTk.views.BaseView.extend({
	id: 'footnote-view',
	
	initialize: function() {
		// listen to layoutComplete event
		this.listenTo(Backbone, 'layoutComplete', function(params) {
			var fnLinks = app.views.sectionView.$el.find('a.footnote-reference');

			for (var i = 0; i < fnLinks.length; i++) {
				var fnRef = $(fnLinks[i]);
				var id = fnRef.attr('href').slice(1);
				var fn = app.collections.footnotes.get(id);
				var title = $(fn.get('body')).text();
				fnRef.attr("title", title);
				// fnRef.tooltip();
				fnRef.attr("data-toggle", "tooltip");
				fnRef.attr("data-placement","bottom");
				fnRef.off('click');
				fnRef.bind('click', {'caller': this}, this.footnoteClicked);
			}
			$('[data-toggle="tooltip"]').tooltip();
		});
	},

	footnoteClicked: function(e) {
		e.preventDefault();
		e.stopPropagation();
	}
});