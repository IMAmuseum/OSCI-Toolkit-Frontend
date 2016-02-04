OsciTk.views.Toolbar = OsciTk.views.BaseView.extend({
	id: 'toolbar-view',
	template: OsciTk.templateManager.get('toolbar'),
	initialize: function() {

		// Also used in instances of ToolbarItemView.js
		app.toolbarItems = app.config.get('toolbarItems') ? app.config.get('toolbarItems') : [];

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

		// Renders div.toolbar-view from toolbar.tpl.html
		this.$el.html( this.template( { } ) );

		// Loop through 
		_.each(app.toolbarItems, function(toolbarItem) {
			var item = new OsciTk.views.ToolbarItem({toolbarItem: toolbarItem});
			this.addView(item, '#toolbar-area');
			item.render();
		}, this);

	},

	toolbarInline: function(toolbarItem) {

		var view = _.pick(app.views, toolbarItem.view);
		view = view[toolbarItem.view];

		this.removeView(view, false);
		this.addView(view, '#'+toolbarItem.text);

	},

	toolbarAction: function(toolbarItem) {

		// Opens / closes the item
		this.toolbarToggle();

		// Do nothing if this item is already open
		if (toolbarItem.active) {
			return false;
		}

		var view = _.pick(app.views, toolbarItem.item.view);
		view = view[toolbarItem.item.view];

		this.addView(view, '#'+toolbarItem.item.text);

	},

	toolbarToggle: function() {

		_.each(app.toolbarItems, function(item) {

			//remove all active classes
			$('.'+item.view+'-toolbar-item > a').removeClass('active')

			// if this item is inline, don't remove its view
			if (item.style != 'default') {
				continue;
			}

			var view = _.pick(app.views, item.view);
			view = view[item.view];
			this.removeView(view, false);

		}, this);

	}

});