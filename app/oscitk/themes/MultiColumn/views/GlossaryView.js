OsciTk.views.Glossary = OsciTk.views.BaseView.extend({
	id: 'glossary-view',
	className: 'toolbar-item-view',
	template: OsciTk.templateManager.get('glossary'),
	events: {
		'keyup #glossary-filter': 'filterTerms',
		'click #glossary-filter-clear': 'clearFilter',
		'click #glossary-term-listing li': 'selectTerm',
		'click #glossary-term-listing-mobile li': 'expandTerm'
	},
	render: function() {
		var that = this;
		this.$el.html(this.template({hasResults: !_.isEmpty(app.collections.glossaryTerms.models)}));

		_.each(app.collections.glossaryTerms.models, function(item) {
			var termView = OsciTk.templateManager.get('glossary-term');
			that.$el.find('#glossary-term-listing').append(termView({item: item}));

			var termViewMobile = OsciTk.templateManager.get('glossary-term-mobile');
			that.$el.find('#glossary-term-listing-mobile').append(termViewMobile({item: item}));
		});
	},
	filterTerms: function() {
		var that = this,
			keyword = $('#glossary-filter').val();

		if (!keyword.length) {
			$('#glossary-filter-clear').hide();
		} else {
			$('#glossary-filter-clear').show();
		}

		var terms;
		if (_.isEmpty(keyword)) {
			terms = app.collections.glossaryTerms.models;
		} else {
			terms = app.collections.glossaryTerms.filterByKeyword(keyword);
		}

		// clear out list
		$('#glossary-term-listing').empty();
		$('#glossary-term-listing-mobile').empty();

		// re-add terms to list
		_.each(terms, function(item) {
			var termView = OsciTk.templateManager.get('glossary-term');
			that.$el.find('#glossary-term-listing').append(termView({item: item}));

			var termViewMobile = OsciTk.templateManager.get('glossary-term-mobile');
			that.$el.find('#glossary-term-listing-mobile').append(termViewMobile({item: item}));
		});
	},
	clearFilter: function() {
		$('#glossary-filter').val('');
		this.filterTerms();
	},
	selectTerm: function(e) {
		var tid = $(e.target).data('tid');
		var item = app.collections.glossaryTerms.get(tid);

		this.$el.find('h4').html(item.get('term'));
		this.$el.find('p').html(item.get('definition'));
	},
	expandTerm: function(e) {
		$(e.target).removeClass('active-term');
		if ($(e.target).find('ul').is(":visible")) {
			$(e.target).find('ul').hide();
		} else {
			this.$el.find('#glossary-term-listing-mobile ul').hide();
			$(e.target).find('ul').show();
			$(e.target).addClass('active-term');
		}
	}
});