OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',

	initialize: function() {
		$('body').append(this.el);

		// Add the title view to the appView
		app.views.titleView = new OsciTk.views.Title();
		this.addView(app.views.titleView);

		// Add the toolbar to the appView
		app.views.toolbarView = new OsciTk.views.Toolbar();
		this.addView(app.views.toolbarView);

        // Add Section
		app.views.sectionView = new OsciTk.views.Section;
		this.addView(app.views.sectionView);

		// Add the navigation view to the AppView
		app.views.navigationView = new OsciTk.views.Navigation();
		this.addView(app.views.navigationView);

		// Add the footnotes view to the AppView
		app.views.footnotesView = new OsciTk.views.Footnotes();

	}
});