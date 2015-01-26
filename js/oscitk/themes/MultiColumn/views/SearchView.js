OsciTk.views.Search = OsciTk.views.BaseView.extend({
	className: 'search-view',
	template: OsciTk.templateManager.get('search'),
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
		this.resultsTemplate = OsciTk.templateManager.get('search-results');
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
				// add the incoming docs to the results collection
				that.response.docs.reset(data.docs);
				that.response.facets = data.facets;
				that.response.numFound = data.numFound;
				// re-render the search view
				that.renderResults();
				// handle container resizing
				that.resizeContainers();
			},
			error: function() {
				// error handling
			}
		});
	},
	gotoResult: function(e) {
		var $elem = $(e.currentTarget);
		var resultModel = this.response.docs.get($elem.data("id"));

		app.router.navigate("section/" + resultModel.get("ss_section_id") + "/" + resultModel.get("id"), {trigger: true});
		app.views.toolbarView.contentClose();
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
		this.resizeContainers();
	},
	resizeContainers: function() {
				this.$el.find("#search-container").height('');
		app.views.toolbarView.contentOpen();
		
		// calculate height for search container
		var containerSize = $('#toolbar-content').height();
		var headerSize = this.$el.find("h3").outerHeight(true);
		var newContainerHeight = containerSize - headerSize;

		var toolbarSize = $('#toolbar').height();

		var toolbarTitleHeight = $('#toolbar-title-container').outerHeight();
		var toolbarHandleSize = $('#toolbar-handle').height();

		if (newContainerHeight > toolbarSize) {
			newContainerHeight = toolbarSize - toolbarTitleHeight - headerSize - toolbarHandleSize;
		}
		this.$el.find("#search-container").height(newContainerHeight);

		// calculate size for column wrapper
		var searchFormHeight = this.$el.find('#search-form').outerHeight(true);
		var resultsHeaderHeight = this.$el.find('#search-results-header').outerHeight(true);
		this.$el.find('#search-results-column-wrapper').height(newContainerHeight - searchFormHeight - resultsHeaderHeight);

		// calculate width of facet column
		var filterSectionContainer = $('#facet-by-section').find('.section-title').outerHeight(true);
		this.$el.find('#facet-sections-container').height(newContainerHeight - searchFormHeight - resultsHeaderHeight - filterSectionContainer);
	}
});