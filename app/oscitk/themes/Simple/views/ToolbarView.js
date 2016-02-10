OsciTk.views.Toolbar = OsciTk.views.BaseView.extend({
	id: 'toolbar-view',
	template: OsciTk.templateManager.get('toolbar'),
	initialize: function() {

		// Also used in instances of ToolbarItemView.js
		app.toolbarItems = app.config.get('toolbarItems') ? app.config.get('toolbarItems') : [];

		// Triggered in ToolbarItemView.js
		// This happens when a new inline view is created
		this.listenTo(Backbone, "toolbarInline", function(toolbarItem) {
			console.log( toolbarItem.text );

			var view = app.views[toolbarItem.view];
			
			this.removeView(view, false);

			this.addView(view, '#'+toolbarItem.text);
			view.render();

		});

		// Triggered in ToolbarTocView.js and ToolbarAccountView.js
		// In this theme, we'll use it to just close the modals
		/*
		this.listenTo(Backbone, "toolbarRemoveViews", function() {

			_.each(app.toolbarItems, function(item) {

				// if this item is inline, don't remove its view
				if (item.style == 'default') {
					var view = _.pick(app.views, item.view);
					view = view[item.view];
					this.removeView(view, false);
				}

			}, this);

		});
		*/

		// We must wait until the section is loaded to add the menu
		// Otherwise, values we need won't have been loaded
		this.listenToOnce(Backbone, "sectionLoaded", function() {
			this.render();
		});
		

	},

	render: function() {

		// Renders div.toolbar-view from toolbar.tpl.html
		this.$el.html( this.template( { } ) );

		// See config in index.html
		_.each(app.toolbarItems, function(toolbarItem) {

			var item = new OsciTk.views.ToolbarItem({ toolbarItem: toolbarItem });
			this.addView(item, '#toolbar-area');
			item.render();

		}, this);

	},

});