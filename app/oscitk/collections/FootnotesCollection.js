OsciTk.collections.Footnotes = OsciTk.collections.BaseCollection.extend({
	model: OsciTk.models.Footnote,

	initialize: function() {
		this.listenTo(Backbone, 'footnotesAvailable', function(footnotes) {
			this.populateFromMarkup(footnotes);
			Backbone.trigger('footnotesLoaded', this);
		});
	},

	populateFromMarkup: function(data) {
		this.reset();
		var raw = data.find('aside');
		var rawLen = raw.length;
		var parsed = [];
		for (var i = 0; i < rawLen; i++) {
			var fn = raw[i];
			var idComponents = fn.id.match(/\w+-(\d+)-(\d+)/);
			parsed.push({
				id:         fn.id,
				rawData:    fn,
				body:       fn.innerHTML,
				section_id: idComponents[1],
				delta:      idComponents[2],
                index:      fn.getAttribute('data-footnote_index')
			});
		}
		this.reset(parsed);
	}
});
