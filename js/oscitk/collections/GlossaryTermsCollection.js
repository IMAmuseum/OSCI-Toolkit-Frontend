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
			var data = xmlToJson(loadXMLDoc(doc.href));

			// add terms to collection
			for (var i = 0, count = data.dl.td.length; i < count; i++) {
				var item = {
					id: data.dl.td[i]['data-tid'],
					term: data.dl.td[i].dfn.value,
					definition: data.dl.dd[i].value
				};
				this.add(item);
			}
		}
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