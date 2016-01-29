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
		this.$items = $();

		this.listenTo(Backbone, 'closeToolbar', function(data) {
			this.closeToolbar();
		});

		this.listenTo(Backbone, 'openToolbar', function(data) {
			this.openToolbar();
		});

		this.listenTo(Backbone, 'toggleToolbar', function(data) {
			this.toggleToolbar();
		});

		// In other themes, we wait for figuresAvailable,
		// but since we don't have a figures section here,
		// it doesn't matter as much
		this.render();

	},

	render: function() {

		this.$el.html( this.template() );

		// See config in index.html
		_.each(app.toolbarItems, function(toolbarItem) {
			
			if(toolbarItem.text != 'figures' || this.figureSize != 0) {

				// This adds the buttons to the toolbar
				var item = new OsciTk.views.ToolbarItem({ toolbarItem: toolbarItem });

				this.addView(item, '#toolbar-area');
				item.render();

			}

		}, this);

		// After pulling the template, #tow is now available
		this.$container = this.$el.find('#toolbar-overlay-wrapper');
		this.$items = this.$el.find('#toolbar-area, .toolbar-item-view');

	},

	closeToolbar: function() {
		if( this.$items.hasClass('open') ) {
			this.$items.removeClass('open');
			this.$container.hide();
		}
	},

	openToolbar: function() {
		if( !this.$items.hasClass('open') ) {
			this.$items.addClass('open');
			this.$container.show();


			if( !this.$items.is('.active') ) {
				$('.tocToolbarView-toolbar-item').click();
			}
		}

	},

	toggleToolbar: function() {
		if( this.$items.hasClass('open') ) {
			this.closeToolbar();
		}else{
			this.openToolbar();
		}
	},

});


