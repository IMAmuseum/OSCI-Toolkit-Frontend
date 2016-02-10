OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',
	template: OsciTk.templateManager.get('app'),

	initialize: function() {

		// Render executed first so that the view containers get created
		this.render();

		// See also app.toolbarItems in toolbarView

		// initialize all possible views
		app.views = {

			sectionView: new OsciTk.views.Section(),
			footnotesView: new OsciTk.views.Footnotes(),

			// These two should be init'd after section, but before navigation
			paragraphControlsView: new OsciTk.views.ParagraphControls(),
			glossaryTooltipView: new OsciTk.views.GlossaryTooltip(),

			headerView: new OsciTk.views.Header(),
			navbarView: new OsciTk.views.Navbar(),

			navigationView: new OsciTk.views.Navigation(),
			toolbarView: new OsciTk.views.Toolbar(),

			// We can't list the toolbar views here, since toolbarInline queries app.views,
			// and at this stage, app.views is not yet defined

			//accountToolbarView: new OsciTk.views.AccountToolbar(), // PROBLEM
			tocToolbarView: new OsciTk.views.TocToolbar(), // NO PROB
			//printToolbarView: new OsciTk.views.PrintToolbar(), // NO PROB
			fontsizeToolbarView: new OsciTk.views.FontSizeToolbar(), // NO PROB
			
		};

		// Add the header view
		this.addView(app.views.headerView, '#header');

		// Add the toolbar view
		this.addView(app.views.toolbarView, '#toolbar');

		// Add the navbar view
		this.addView(app.views.navbarView, '#navbar');

		// Add section
		this.addView(app.views.sectionView, '#section');

		// Add the navigation view to the AppView
		this.addView(app.views.navigationView, '#navigation');

	},

	render: function() {
		this.$el.html( this.template );
		$('body').append( this.el );
	},

});