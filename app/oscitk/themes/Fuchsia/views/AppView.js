OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',
	template: OsciTk.templateManager.get('app'),

	initialize: function() {
		this.render();


		app.toolbarItems = app.config.get('toolbarItems') ? app.config.get('toolbarItems') : [];

		// initialize all possible views
		app.views = {

			sectionView: new OsciTk.views.Section(),
			footnotesView: new OsciTk.views.Footnotes(),

			navigationView: new OsciTk.views.Navigation(),
			toolbarView: new OsciTk.views.Toolbar(),

			paragraphControlsView: new OsciTk.views.ParagraphControls(),
			glossaryTooltipView: new OsciTk.views.GlossaryTooltip(),

			accountToolbarView: new OsciTk.views.AccountToolbar(),
			tocToolbarView: new OsciTk.views.TocToolbar(),
			notesToolbarView: new OsciTk.views.NotesToolbar(),
			searchToolbarView: new OsciTk.views.SearchToolbar(),

		};

		// Add the toolbar view
		this.addView(app.views.toolbarView, '#toolbar');

		// Add the section view
		this.addView(app.views.sectionView, '#section');


		// Add the navigation view to the AppView
		this.addView(app.views.navigationView, '#navigation');

	},

	render: function() {

		this.$el.html(this.template);

		// div#reader
		$('body').append(this.el);

	},



});
