OsciTk.collections.GlossaryTerms = OsciTk.collections.BaseCollection.extend({
	model: OsciTk.models.GlossaryTerm,
	initialize: function() {
		this.listenTo(Backbone, 'packageLoaded', this.parseGlossary);
	},
	parseGlossary: function(packageModel) {
		// retrieve glossary from manifest
		var doc = _.find(packageModel.get('manifest').item, function(item) {
			return item.id === 'glossary';
		});

		if (doc) {
			// retrieve glossary doc
			var data =loadXMLDoc(doc.href);
			var dds = $(data).find('dd');
			var dts = $(data).find('dt');
			if (dds.length > 0 && dts.length > 0) {
				for (var i = 0, count=dts.length; i < count; i++) {
					var item = {
						id: $(dts[i]).attr('data-tid'),
						term: $(dts[i]).find('dfn:first').html(),
						definition: $(dds[i]).html()
					};
					this.add(item);
				}
			}
		}
		Backbone.trigger('osci.glossary.loaded', this);
	},
	filterByKeyword: function(keyword) {
		var regExp = new RegExp('\\b' + keyword, "gi");
		return _.filter(this.models, function(item) {
			return item.get('term').search(regExp) !== -1;
		});
	},
	comparator: function(item) {
		return item.get('term');
	}
});