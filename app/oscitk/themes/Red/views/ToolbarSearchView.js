OsciTk.views.SearchToolbar = OsciTk.views.BaseView.extend({
	className: 'search-view',
	template: OsciTk.templateManager.get('toolbar-search'),
	initialize: function() {

		// define defaults for the query
		this.query = {
			page: 0,
			keyword: null,
			filters: [],
			sort: 'score'
		};

		// define results object
		this.response = {
			numFound: 0,
			docs: new OsciTk.collections.SearchResults(),
			facets: null
		};

		this.results = null;
		this.hasSearched = false;
		this.isLoading = false;
		this.resultsTemplate = OsciTk.templateManager.get('toolbar-search-results');

		this.render();

	},
	events: {
		'submit #search-form': 'submitSearch',
		'click #search-submit': 'submitSearch',
		'click .search-result': 'gotoResult',
		'click .facet': 'addFacet',
		'click .filter': 'addFilter',
		'change .search-filters': 'addFilter',
		'click #reset-search': 'resetSearch',
		'click .sort-button': 'addSort'
	},
	render: function() {
		this.$el.html(this.template(this));
	},
	renderResults: function() {
		this.prepareResults();
		this.$el.find("#search-results-container").html(this.resultsTemplate(this));
	},
	prepareResults: function() {
		this.results = _.groupBy(this.response.docs.models, function(doc) {
			return doc.get('ss_section_id');
		});
	},
	search: function() {
		var that = this;
		// set keyword
		this.query.keyword = this.$el.find('#search-keyword').val();
		// reset collection
		this.response.docs.reset();
		// let the template know that we can now display results
		this.hasSearched = true;

		// build query params to send to api
		var queryParams = {
			key: this.query.keyword,
			group: 'true',
			page: this.query.page,
			sort: this.query.sort
		};

		var publicationId = 'pid:' + app.models.docPackage.get('id');
		// check if publication filter already exists
		if (_.indexOf(this.query.filters, publicationId) === -1) {
			// filter by publication id
			this.query.filters.push(publicationId);
		}

		if (this.query.filters.length) {
			queryParams['filters'] = this.query.filters.join(' ');
		}

		// send search query
		$.ajax({
			url: app.config.get('endpoints')['OsciTkSearch'],
			data: queryParams,
			success: function(data) {
				data = JSON.parse(data);
				console.log( data );
				// add the incoming docs to the results collection
				that.response.docs.reset(data.docs);
				that.response.facets = data.facets;
				that.response.numFound = data.numFound;
				// re-render the search view
				that.renderResults();
			},
			error: function() {
				// error handling
			}
		});
	},
	gotoResult: function(e) {
		var $elem = $(e.currentTarget);
		var resultModel = this.response.docs.get($elem.data("id"));

		if( resultModel.get('bundle_name') === "Note" ) {
			var pid = resultModel.get('sm_field_paragraph_number')[0];

			this.listenToOnce( Backbone, 'navigateScrollEnd', function() {
				setTimeout( function() {
					$('button#paragraph-'+pid).click(); // opens note dialog
				}, 0 );
			});

			$('.close-toolbar-item').click(); // closes toolbar
			app.router.navigate("section/" + resultModel.get("ss_section_id") + "/p-" + pid, {trigger: true} );

		}else{

			// The Red theme expects the toolbar to be closed and re-opened
			Backbone.trigger("toolbarRemoveViews");
			app.router.navigate("section/" + resultModel.get("ss_section_id") + "/" + resultModel.get("id"), {trigger: true} );
			$('.searchToolbarView-toolbar-item').click();

		}

		//app.views.toolbarView.contentClose();

	},
	addSort: function(e) {
		e.preventDefault();
		var sort = $(e.currentTarget).data('sort');
		var exists = sort === this.query.sort;

		this.$el.find('.sort-button').removeClass("active");

		if (!exists) {
			this.query.sort = sort;
		}

		if (this.hasSearched) {
			this.search();
		}

		this.$el.find(e.currentTarget).addClass('active');
	},
	addFilter: function(e) {
		e.preventDefault();

		var filter;
		if (e.type === 'change') {
			filter = $(e.currentTarget).val();
		} else {
			filter = $(e.currentTarget).data('filter');
		}
		var exists = _.indexOf(this.query.filters, filter);

		this.$el.find(".filter").removeClass("active");

		//remove type filters (only one at a time)
		this.query.filters = _.reject(this.query.filters, function(filter) {
			return filter.indexOf("type:") === 0;
		});

		//if filter wasn't in list add it
		if (exists === -1) {
			this.query.filters.push(filter);
			$(e.currentTarget).addClass("active");
		}

		if (this.hasSearched) {
			this.search();
		}
	},
	addFacet: function(e) {
		e.preventDefault();
		var facet = $(e.currentTarget).data('filter');
		this.query.filters.push(facet);

		if (this.hasSearched) {
			this.search();
		}
	},
	submitSearch: function(e) {
		e.preventDefault();
		this.search();
	},
	resetSearch: function(e) {
		e.preventDefault();
		e.stopPropagation();

		this.initialize();
		this.$el.find("#search-results-header").remove();
		this.$el.find("#search-results-column-wrapper").remove();
		this.$el.find("#search-keyword").val('');
	}
});