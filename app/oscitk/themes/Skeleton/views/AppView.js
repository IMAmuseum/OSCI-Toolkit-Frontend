OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',
	template: OsciTk.templateManager.get('app'),

	initialize: function() {
		this.render();

		// Add the title view to the appView
		app.views.titleView = new OsciTk.views.Title();
		this.addView(app.views.titleView, '#title');

		app.views.headerView = new OsciTk.views.Header();
		this.addView(app.views.headerView, '#header');

		// Add Font Reading Settings
		// app.views.fontView = new OsciTk.views.Font();
		// this.addView(app.views.fontView, '#font');

		// Add Font Size View
		app.views.fontSizeView = new OsciTk.views.FontSize();
		this.addView(app.views.fontSizeView, '#font-size');

		// Add Font Style View
		// app.views.fontStyleView = new OsciTk.views.FontStyle();
		// this.addView(app.views.fontStyleView, '#font-style');

		// Add Table of Contents View
		app.views.tocView = new OsciTk.views.Toc();
		this.addView(app.views.tocView, '#toc');

		// Add Account Login, Register and Profile Views
		app.views.accountView = new OsciTk.views.Account();
		this.addView(app.views.accountView, '#account');

		// Add the toolbar to the appView
		app.views.toolbarView = new OsciTk.views.Toolbar();
		this.addView(app.views.toolbarView, '#toolbar');

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