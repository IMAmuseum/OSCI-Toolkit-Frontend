OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',
	template: OsciTk.templateManager.get('app'),

	initialize: function() {
		this.render();

		app.toolbarItems = app.config.get('toolbarItems') ? app.config.get('toolbarItems') : [];

		// initialize all possible views
		app.views = {
			titleView: new OsciTk.views.Title(),
			headerView: new OsciTk.views.Header(),
			fontSizeView: new OsciTk.views.FontSize(),
			fontStyleView: new OsciTk.views.FontStyle(),
			tocView: new OsciTk.views.Toc(),
			accountView: new OsciTk.views.Account(),
			toolbarView: new OsciTk.views.Toolbar(),
			sectionView: new OsciTk.views.Section(),
			figuresView: new OsciTk.views.Figures(),
			navigationView: new OsciTk.views.Navigation(),
			footnotesView: new OsciTk.views.Footnotes(),
			paragraphControlsView: new OsciTk.views.ParagraphControls(),
			notesView: new OsciTk.views.Notes(),
			inlineNotesView: new OsciTk.views.InlineNotes(),
			citationsView: new OsciTk.views.Citation(),
		};

		// Add the header view
		this.addView(app.views.headerView, '#header');

		// Add the toolbar view
		this.addView(app.views.toolbarView, '#toolbar');

		// Add Section
		this.addView(app.views.sectionView, '#section');

		// Add the navigation view to the AppView
		this.addView(app.views.navigationView, '#navigation');

		this.listenTo(Backbone, "toolbarItemClicked", function(toolbarItem, active) {
			this.toolbarAction(toolbarItem);
		});

		this.listenTo(Backbone, "tocItemClicked", function(toolbarItem) {
			this.toolbarToggle();
		});

	},

	render: function() {
		this.$el.html(this.template);
		$('body').append(this.el);
	},

	toolbarAction: function(toolbarItem) {

		this.toolbarToggle(toolbarItem);
		// if toolbar items is active show it
		// this toggles the view
		if (! toolbarItem.active) {
			var view = _.pick(app.views, toolbarItem.item.view);
			view = view[toolbarItem.item.view];
			this.addView(view, '#'+toolbarItem.item.text);
		}
	},

	toolbarToggle: function(toolbarItem) {

		_.each(app.toolbarItems, function(item) {
			var view = _.pick(app.views, item.view);
			view = view[item.view];
			this.removeView(view, false);
		}, this);
	}
});