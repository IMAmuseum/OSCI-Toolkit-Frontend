OsciTk.views.SearchToolbar = OsciTk.views.BaseView.extend({
	className: 'search-view',
	events: {
		'submit #search-form': 'submitSearch',
		'click #search-submit': 'submitSearch',
		'click .search-result': 'gotoResult',
		'click .filter': 'addFilter',
		'change .search-filters': 'addFilter'
	},

	template: OsciTk.templateManager.get('toolbar-search'),
	templateModal: OsciTk.templateManager.get('toolbar-modal'),
	resultsTemplate: OsciTk.templateManager.get('toolbar-search-results'),

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

		// state tracking
		this.hasSearched = false;
		this.isLoading = false;

		// Pop up the modal when the item is clicked
		this.listenTo(Backbone, "toolbarItemClicked", function(e) {

			if( e.item.text === "toolbar-search" ) {
				this.render();
			}

		});

	},

	render: function() {

		var modal = this.templateModal({
			title: "Search",
			body: this.template(this)
		});

		var $modal = $(modal);

		// For stylesheet reasons, mostly
		$modal.find('.modal-body').attr('id', 'toolbar-search');

		// Bind events
		$modal.find('#search-form').on('submit', $.proxy( this.submitSearch, this ) );
		$modal.find('#search-submit').on('click', $.proxy( this.submitSearch, this ) );

		$modal.find('.search-filters').on('click', $.proxy( this.addFilter, this ) );
		$modal.find('.filter').on('click', $.proxy( this.addFilter ) );

		// Launch the modal
		$modal.modal().on('hidden.bs.modal', function() {
			$(this).data('bs.modal', null).remove();
		});

	},

	renderResults: function() {

		this.results = _.groupBy(this.response.docs.models, function(doc) {
			return doc.get('ss_section_id');
		});

		var results = this.resultsTemplate(this);

		$("#search-results-container").html( results );

		$('.search-result').on('click', $.proxy( this.gotoResult, this ) );

	},

	search: function() {

		var that = this;

		// set keyword
		this.query.keyword = $('#search-keyword').val();

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
			app.router.navigate("section/" + resultModel.get("ss_section_id") + "/" + resultModel.get("id"), {trigger: true} );
		}

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

	submitSearch: function(e) {

		e.preventDefault();
		this.search();

	},

});