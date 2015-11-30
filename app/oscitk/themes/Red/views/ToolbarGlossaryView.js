OsciTk.views.GlossaryToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-glossary-view',
	template: OsciTk.templateManager.get('toolbar-glossary'),
	events: {
		'keyup #glossary-filter': 'filterTerms',
		'click #glossary-filter-clear': 'clearFilter',
		'click #glossary-term-listing li': 'selectTerm',
		'click #glossary-term-listing-mobile li': 'expandTerm'
	},
	initialize: function() {

		this.listenTo(Backbone, 'layoutComplete', function(params) {
			/*
			var termLinks = app.views.sectionView.$el.find('a.glossary-term');

			var terms = []; // can't use this.terms due to context conflict in loop

			termLinks.each( function( i, e ) {
				
				// TODO: verify that this won't break if multiple footnotes exist
				var $e = $(e);
				
				terms.push( {
					id: $e.data('tid'),
					term: $e.text(),
					definition:
				});

			});

			
			this.terms = terms;
			*/

			
		
			this.render();
		}, this);
	},
	render: function() {
		var that = this;
		console.log( !_.isEmpty(app.collections.glossaryTerms.models) );
		this.$el.html(this.template({hasResults: !_.isEmpty(app.collections.glossaryTerms.models)}));

		_.each(app.collections.glossaryTerms.models, function(item) {
			var termView = OsciTk.templateManager.get('toolbar-glossary-term');
			that.$el.find('#glossary-term-listing').append(termView({item: item}));

			var termViewMobile = OsciTk.templateManager.get('toolbar-glossary-term-mobile');
			that.$el.find('#glossary-term-listing-mobile').append(termViewMobile({item: item}));
		});

		return this;
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
			var termView = OsciTk.templateManager.get('toolbar-glossary-term');
			that.$el.find('#glossary-term-listing').append(termView({item: item}));

			var termViewMobile = OsciTk.templateManager.get('toolbar-glossary-term-mobile');
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

