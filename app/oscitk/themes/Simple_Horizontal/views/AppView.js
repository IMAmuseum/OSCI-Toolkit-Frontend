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

			// Section must be init'd after title
			sectionView: new OsciTk.views.Section(),
			footnotesView: new OsciTk.views.Footnotes(),

			navigationView: new OsciTk.views.Navigation(),
			toolbarView: new OsciTk.views.Toolbar(),

			// These two should be init'd after section, but before navigation
			paragraphControlsView: new OsciTk.views.ParagraphControls(),
			glossaryTooltipView: new OsciTk.views.GlossaryTooltip(),			

			// Not too sure where this belongs
			notesView: new OsciTk.views.Notes(),
			
			accountView: new OsciTk.views.Account(),
			navbarView: new OsciTk.views.Navbar(),
			fontSizeView: new OsciTk.views.FontSize(),
			printView: new OsciTk.views.Print(),
			tocView: new OsciTk.views.Toc(),			


		};

		// Add the header view
		this.addView(app.views.headerView, '#header');

		// Add the toolbar view
		this.addView(app.views.toolbarView, '#toolbar');

		// Add the navbar view
		this.addView(app.views.navbarView, '#navbar');

		// Add Section
		this.addView(app.views.sectionView, '#section');

		// Add the navigation view to the AppView
		this.addView(app.views.navigationView, '#navigation');

		this.listenTo(Backbone, "toolbarInline", function(toolbarItem) {
			this.toolbarInline(toolbarItem);
		});

		this.listenTo(Backbone, "toolbarItemClicked", function(toolbarItem, active) {
			this.toolbarAction(toolbarItem);
		});

		this.listenTo(Backbone, "toolbarRemoveViews", function() {
			this.toolbarToggle();
		});

	},

	render: function() {
		this.$el.html(this.template);
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
		// if toolbar items is active show it
		// this toggles the view
		if (! toolbarItem.active) {
			var view = _.pick(app.views, toolbarItem.item.view);
			view = view[toolbarItem.item.view];
			this.addView(view, '#'+toolbarItem.item.text);
		}
	},

	toolbarToggle: function() {
		//console.log(toolbarItem);
		_.each(app.toolbarItems, function(item) {
			//remove all active classes
			$('.'+item.view+'-toolbar-item > a').removeClass('active')
			if (item.style == 'default') {
				var view = _.pick(app.views, item.view);
				view = view[item.view];
				this.removeView(view, false);
			}
		}, this);
	}
});
