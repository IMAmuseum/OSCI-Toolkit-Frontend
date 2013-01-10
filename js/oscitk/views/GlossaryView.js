OsciTk.views.Glossary = OsciTk.views.BaseView.extend({
	id: 'glossary-view',
	className: 'toolbar-item-view',
	template: OsciTk.templateManager.get('glossary'),
	initialize: function() {
	
	},
	events: {
		'keyup #glossary-filter': 'filterTerms',
		'click li': 'selectTerm'
	},
	render: function() {
		this.$el.html(this.template({glossary: app.collections.glossaryTerms.models}));
	},
	filterTerms: function() {
		var keyword = $('#glossary-filter').val();

		var terms;
		if (_.isEmpty(keyword)) {
			terms = app.collections.glossaryTerms.models;
		} else {
			terms = app.collections.glossaryTerms.filterByKeyword(keyword);
		}

		// clear out list
		$('#glossary-term-listing').empty();

		// re-add terms to list
		_.each(terms, function(item) {
			var view = new Backbone.View();
			var el = view.make('li', {'data-tid': item.get('id')}, item.get('term'));
			$('#glossary-term-listing').append(el);
		});
	},
	selectTerm: function(e) {
		var tid = $(e.target).data('tid');
		var item = app.collections.glossaryTerms.get(tid);

		this.$el.find('h4').html(item.get('term'));
		this.$el.find('p').html(item.get('definition'));
	}
});