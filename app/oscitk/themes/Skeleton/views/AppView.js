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
			searchView: new OsciTk.views.Search()
		};

		// Add the title view
		this.addView(app.views.titleView, '#title');

		// Add the header view
		this.addView(app.views.headerView, '#header');

		// Add the toolbar view
		this.addView(app.views.toolbarView, '#toolbar');

		// Add Section
		this.addView(app.views.sectionView, '#section');

		// Add the navigation view to the AppView
		this.addView(app.views.navigationView, '#navigation');

		// these event listeners exist here because they control views
		this.listenTo(Backbone, "toolbarItemClicked", function(toolbarItem) {
			this.toolbarAction(toolbarItem);
		});

		this.listenTo(Backbone, "tocItemClicked", function(toolbarItem) {
			this.toolbarToggle();
		});

	},

	render: function() {
		this.$el.html(this.template);
		$('body').append(this.el);

		return this;
	},

	toolbarAction: function(toolbarItem) {
		this.toolbarToggle();
		// if toolbar items is active show it
		// this toggles the view
		if (! toolbarItem.active) {
			var view = _.pick(app.views, toolbarItem.item.view);
			view = view[toolbarItem.item.view];
			this.addView(view, '#'+toolbarItem.item.text);
		}
	},

	toolbarToggle: function() {
		// remove all toolbar views
		_.each(app.toolbarItems, function(item) {
			var view = _.pick(app.views, item.view);
			view = view[item.view];
			this.removeView(view, false);
		}, this);
	}
});