OsciTk.views.Toolbar = OsciTk.views.BaseView.extend({
	id: 'toolbar-view',
	template: OsciTk.templateManager.get('toolbar'),

	events: {
		'click .close-toolbar-item' : 'closeToolbar',
		'click #toolbar-overlay' : 'closeToolbar'
	},

	initialize: function() {

		// Just declaring objects for future use
		this.$container = $();

		this.listenTo(Backbone, 'closeToolbar', function(data) {
			this.closeToolbar();
		});

		this.listenTo(Backbone, 'openToolbar', function(data) {
			this.openToolbar();
		});

		// In other themes, we wait for figuresAvailable,
		// but since we don't have a figures section here,
		// it doesn't matter as much
		this.render();

	},

	render: function() {

		this.$el.html( this.template() );

		// After pulling the template, #tow is now available
		this.$container = this.$el.find('#toolbar-overlay-wrapper');

		// See config in index.html
		_.each(app.toolbarItems, function(toolbarItem) {
			
			if(toolbarItem.text != 'figures' || this.figureSize != 0) {

				// This adds the buttons to the toolbar
				var item = new OsciTk.views.ToolbarItem({ toolbarItem: toolbarItem });

				this.addView(item, '#toolbar-area');
				item.render();

			}

		}, this);

	},

	closeToolbar: function() {
		$('.toolbar-item-view').removeClass('light');
		this.$container.hide();
	},

	openToolbar: function() {
		$('.toolbar-item-view').addClass('light');
		this.$container.show();
	}

});


