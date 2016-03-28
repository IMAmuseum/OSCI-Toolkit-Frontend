OsciTk.views.Toolbar = OsciTk.views.BaseView.extend({
	id: 'toolbar-view',
	template: OsciTk.templateManager.get('toolbar'),
	events: {
		'click .close-toolbar-item': 'closeToolbar'
	},
	initialize: function() {
		
		// tracks the state of the content area drawer
		// this.activeToolbarItemView = undefined;

		this.listenTo(Backbone, 'figuresAvailable', function(figures) {

			this.figureSize = figures.size();
			this.render();

		});

		this.listenTo(Backbone, 'menuClicked', function(data) {

			this.$el.parent().toggle("slide", { direction: "right" }, 350);

		});

		this.listenTo(Backbone, 'openToolbar', function(data) {
			this.$el.parent().show("slide", { direction: "right" }, 350);
		});

		this.listenTo(Backbone, 'loginClicked', function(data) {
			Backbone.trigger('openToolbar');
			$('.accountToolbarView-toolbar-item').click();

		});

		// Switch filler and readout when items are toggled
		this.listenTo(Backbone, 'toolbarItemClicked', function(data) {
			
			if( data.active ) {
				$('#toolbar-filler').hide();
				$('#toolbar-readout').show();
			}else{
				$('#toolbar-filler').show();
				$('#toolbar-readout').hide();
			}

		});

	},
	render: function() {

		this.$el.html(this.template( { } ) );

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
	closeToolbar: function(e) {
		this.$el.parent().hide("slide", {direction: "right"}, 350 );
	}

});


