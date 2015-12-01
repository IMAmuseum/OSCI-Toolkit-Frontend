OsciTk.views.App = OsciTk.views.BaseView.extend({
	id: 'reader',
	template: OsciTk.templateManager.get('app'),

	initialize: function() {
		this.render();


		app.toolbarItems = app.config.get('toolbarItems') ? app.config.get('toolbarItems') : [];

		// initialize all possible views
		app.views = {
			//titleView: new OsciTk.views.Title(),
			headerView: new OsciTk.views.Header(),
			
			//printView: new OsciTk.views.Print(),

			
			//sectionView: new OsciTk.views.Section(),
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




		// Set the default section view
		var sectionViewClass = OsciTk.views.Section;

		// Allow a custom section view to be used
		// This is where we would define MultiColumnSectionView in config
		if (app.config.get('sectionView') && OsciTk.views[app.config.get('sectionView')]) {
			sectionViewClass = OsciTk.views[app.config.get('sectionView')];
		}

		var sectionViewOptions = {};
		if (app.config.get('sectionViewOptions')) {
			sectionViewOptions = app.config.get('sectionViewOptions');
		}

		app.views.sectionView = new sectionViewClass(sectionViewOptions);

		// Add the section view
		this.addView(app.views.sectionView, '#section');

		/*
		// Add the section view
		app.views.sectionView = new OsciTk.views.Section(),
		this.addView(app.views.sectionView, '#section');
		*/
		





		// Add the navigation view to the AppView
		this.addView(app.views.navigationView, '#navigation');



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
		//console.log( view );

		view = view[toolbarItem.view];
		//console.log( view );

		this.removeView(view, false);


		//console.log( '#'+toolbarItem.text );
		this.addView(view, '#'+toolbarItem.text);
	},

	toolbarAction: function(toolbarItem) {

		this.toolbarToggle();

		// if toolbar items is active show it
		// this toggles the view

		if (toolbarItem.active) {
			var view = _.pick(app.views, toolbarItem.item.view);
			view = view[toolbarItem.item.view];

			//console.log( '#'+toolbarItem.item.text );
			this.addView(view, '#'+toolbarItem.item.text);
		}

	},

	toolbarToggle: function() {
		//console.log(toolbarItem);
		_.each(app.toolbarItems, function(item) {

			//remove all active classes
			//$('.'+item.view+'-toolbar-item').removeClass('active');

			if (item.style == 'default') {
				var view = _.pick(app.views, item.view);
				view = view[item.view];

				this.removeView(view, false);
			}

		}, this);

	}

});
