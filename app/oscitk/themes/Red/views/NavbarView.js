OsciTk.views.Navbar = OsciTk.views.BaseView.extend({
	className: 'navbar-view',
	template: OsciTk.templateManager.get('navbar'),
	events: {
		'click li a': 'itemClick',
	},

	initialize: function() {
		
		this.numPages = null;
		this.curPage = null;

		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			this.render();
		});


        // Update the page counter
        this.listenTo(Backbone, 'windowResized', function() {
        	this.render();
        });

        // Update the page counter
        this.listenTo(Backbone, 'pagesCalculated', function(max, val) {

			//this.numPages = Math.ceil( $('#default-section-view').width() / ( $('#section').outerWidth() + 10 ) );
			//this.curPage = Math.ceil( $('#section').scrollLeft() / ( $('#section').outerWidth() + 10 ) ) + 1;

			this.numPages = max;
			this.curPage = val;

        	this.render();

        });

	},

	render: function() {


		// Render basic template
		this.$el.html( this.template( {
			numPages: this.numPages,
			curPage: this.curPage
		} ) );

		// Initialize and render the font size selector
		var item = new OsciTk.views.ToolbarItem( { toolbarItem: { view: 'fontSizeView', text: 'font-size', style: 'inline' } } );
		this.addView(item, '#font-size-area');
		item.render();


		// Start watching the range slider
		$("#osci-page-slider").on("change", function() { 
			Backbone.trigger('navigate', { page: this.value } );
		});

		$("#osci-spread-single").click( function() {
			Backbone.trigger('setSectionColumns', 1);
		});

		$("#osci-spread-double").click( function() {
			Backbone.trigger('setSectionColumns', 2);
		});

		return this;

	},

	// Could be used to trigger FontSizeView
	itemClick: function(event) {
		event.preventDefault();
	},

});
