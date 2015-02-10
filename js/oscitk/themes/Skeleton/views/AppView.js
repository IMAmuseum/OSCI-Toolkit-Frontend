OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',
	template: OsciTk.templateManager.get('app'),

	initialize: function() {
		this.render();

		// Add the title view to the appView
		app.views.titleView = new OsciTk.views.Title();
		this.addView(app.views.titleView, '#title');

		// Add Font Reading Settings
		app.views.fontView = new OsciTk.views.Font();
		this.addView(app.views.fontView, '#font');

		// Add Table of Contents View
		app.views.tocView = new OsciTk.views.Toc();
		this.addView(app.views.tocView, '#toc');

		// Add Account Login, Register and Profile Views
		app.views.accountView = new OsciTk.views.Account();
		this.addView(app.views.accountView, '#account');

		// Add the toolbar to the appView
		// app.views.toolbarView = new OsciTk.views.Toolbar();
		// this.addView(app.views.toolbarView);

		// Add Section
		app.views.sectionView = new OsciTk.views.Section;
		this.addView(app.views.sectionView, '#section');

		// Add Figures
		app.views.figuresView = new OsciTk.views.Figures;
		this.addView(app.views.figuresView, '#figures');

		// Add the navigation view to the AppView
		app.views.navigationView = new OsciTk.views.Navigation();
		this.addView(app.views.navigationView, '#navigation');

		// Add the footnotes view to the AppView
		app.views.footnotesView = new OsciTk.views.Footnotes();

	},

	render: function() {
		this.$el.html(this.template);
		$('body').append(this.el);
	}
});