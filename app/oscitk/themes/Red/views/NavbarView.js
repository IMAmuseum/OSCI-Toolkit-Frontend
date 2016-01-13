OsciTk.views.Navbar = OsciTk.views.BaseView.extend({
	className: 'navbar-view',
	template: OsciTk.templateManager.get('navbar'),

	// TODO: Fix infinite loop bug in FireFox
	// Why does it happen?

	initialize: function() {
		
		this.currentFontSize = 100;

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

			this.numPages = max;
			this.curPage = val;

        	this.render();

        });

	},

	render: function() {

		// I don't like doing this, but FireFox has some known bugs with FontSize changes
		// We we're going to disable the font-size selector until they are resolved
		// There might be possible workarounds, but it seems best to wait
        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

		// Render basic template
		this.$el.html( this.template( {
			numPages: this.numPages,
			curPage: this.curPage,
			is_firefox: is_firefox
		} ) );

		var that = this;

		$("#font-size-larger").on('click', function() {
			that.fontLarger();
		});

		$("#font-size-smaller").on('click', function() {
			that.fontSmaller();
		});

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

	fontLarger: function() {

		console.log( 'large clicked');

		if( this.currentFontSize < 200 ) {
			this.currentFontSize += 10;
		}

		this.changeFontSize();
	},

	fontSmaller: function() {
		
		console.log( 'small clicked');

		if( this.currentFontSize > 50 ) {
			this.currentFontSize -= 10;
		}

		this.changeFontSize();
	},

	changeFontSize: function() {
		
		console.log( this.currentFontSize );

		app.views.sectionView.$el.css({
			"font-size": "18px"
		});

		// Backbone.trigger("windowResized");

	}

});
