app = {
	router : undefined,
	config : undefined,
	views : {},
	models : {},
	collections : {},

	bootstrap : function(config) {
		this.config = new OsciTk.models.Config(config);
		this.router = new OsciTk.router();
		this.account = new OsciTk.models.Account();
		this.collections.notes = new OsciTk.collections.Notes();
		this.collections.figures = new OsciTk.collections.Figures();
		this.collections.footnotes = new OsciTk.collections.Footnotes();
		this.collections.navigationItems = new OsciTk.collections.NavigationItems();
		this.collections.glossaryTerms = new OsciTk.collections.GlossaryTerms();
		
		//setup window resizing, to trigger an event
		window.onresize = function() {
			if (window.resizeTimer) {
				clearTimeout(window.resizeTimer);
			}

			var onWindowResize = function(){
				Backbone.trigger('windowResized');
			};

			window.resizeTimer = setTimeout(onWindowResize, 200);
		};
		
		// init main view
		this.views.app = new OsciTk.views.App();
		
	},

	run : function() {
		
		var getUrlPath = this.views.app.$el.prop('baseURI');
		if (!getUrlPath) { //for I.E., doesn't support baseURI
			getUrlPath = document.URL;
		}
		
		if (window.location.hash) {
			//if there's a # in the url replace with /
			getUrlPath = getUrlPath.replace("#", "/");
		}
		var pathArray = getUrlPath.split('/');
		var rootPath = '';
		
		for (i=3; i < 6; i++) {
			rootPath += "/";
			rootPath += pathArray[i];
		}
		
		// load package document
		this.models.docPackage = new OsciTk.models.Package({url: this.config.get('packageUrl')});
		Backbone.history.start({pushState:true, root: rootPath});
	}
};
