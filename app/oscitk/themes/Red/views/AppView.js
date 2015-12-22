OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',
	template: OsciTk.templateManager.get('app'),

	initialize: function() {
		this.render();


		app.toolbarItems = app.config.get('toolbarItems') ? app.config.get('toolbarItems') : [];

		// initialize all possible views
		app.views = {
			
			headerView: new OsciTk.views.Header(),
			
			//printView: new OsciTk.views.Print(),

			
			sectionView: new OsciTk.views.Section(),
			footnotesView: new OsciTk.views.Footnotes(),
			paragraphControlsView: new OsciTk.views.ParagraphControls(),

			navigationView: new OsciTk.views.Navigation(),

			navbarView: new OsciTk.views.Navbar(),
			fontSizeView: new OsciTk.views.FontSize(),

			toolbarView: new OsciTk.views.Toolbar(),
			tocToolbarView: new OsciTk.views.TocToolbar(),
			searchToolbarView: new OsciTk.views.SearchToolbar(),
			glossaryToolbarView: new OsciTk.views.GlossaryToolbar(),
			footnotesToolbarView: new OsciTk.views.FootnotesToolbar(),
			figuresToolbarView: new OsciTk.views.FiguresToolbar(),
			notesToolbarView: new OsciTk.views.NotesToolbar(),
			citationsToolbarView: new OsciTk.views.CitationsToolbar(),
			accountToolbarView: new OsciTk.views.AccountToolbar(),
			

		};

		// Add the header view
		this.addView(app.views.headerView, '#header');

		// Add the toolbar view
		this.addView(app.views.toolbarView, '#toolbar');

		// Add the navbar view
		this.addView(app.views.navbarView, '#navbar');

		// Add the section view
		this.addView(app.views.sectionView, '#section');






		// Add the navigation view to the AppView
		this.addView(app.views.navigationView, '#navigation');


		// TODO: Move these functions to ToolbarView.js?
		this.listenTo(Backbone, "toolbarInline", function(toolbarItem) {
			this.toolbarInline(toolbarItem);
		});

		this.listenTo(Backbone, "toolbarItemClicked", function(toolbarItem) {
			this.toolbarAction(toolbarItem);
		});

		this.listenTo(Backbone, "toolbarRemoveViews", function() {
			this.toolbarToggle();
		});


	},

	render: function() {

		this.$el.html(this.template);

		// div#reader
		$('body').append(this.el);

	},

	toolbarInline: function(toolbarItem) {
		var view = _.pick(app.views, toolbarItem.view);

		view = view[toolbarItem.view];

		this.removeView(view, false);

		this.addView(view, '#'+toolbarItem.text);
	},

	toolbarAction: function(toolbarItem) {

		this.toolbarToggle();

		// if toolbar item is active show it
		// this toggles the view

		if (toolbarItem.active) {
			var view = _.pick(app.views, toolbarItem.item.view);
			view = view[toolbarItem.item.view];

			this.addView(view, '#'+toolbarItem.item.text);

			$('#' + toolbarItem.item.text ).show(); // For FireFox
		}

	},

	toolbarToggle: function() {
		
		_.each(app.toolbarItems, function(item) {

			if (item.style == 'default') {
				var view = _.pick(app.views, item.view);
				view = view[item.view];

				this.removeView(view, false);

				$('#' + item.text ).hide(); // For FireFox
			}

		}, this);

	}

});
