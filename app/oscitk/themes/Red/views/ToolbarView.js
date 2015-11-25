OsciTk.views.Toolbar = OsciTk.views.BaseView.extend({
	id: 'toolbar-view',
	template: OsciTk.templateManager.get('toolbar'),
	initialize: function() {
		
		// tracks the state of the content area drawer
		// this.activeToolbarItemView = undefined;

		/*
		this.listenTo(Backbone, 'packageLoaded', function(packageModel) {
			//Add the publication title to the Toolbar
			this.title = packageModel.getTitle();
		});
		*/

		this.listenTo(Backbone, 'figuresAvailable', function(figures) {

			this.figureSize = figures.size();
			this.render();

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

		this.$el.html(this.template({
			//'title': this.title
		}));

		// See config in index.html
		_.each(app.toolbarItems, function(toolbarItem) {
			
			if(toolbarItem.text != 'figures' || this.figureSize != 0) {

				// This adds the buttons to the toolbar
				var item = new OsciTk.views.ToolbarItem({ toolbarItem: toolbarItem });

				this.addView(item, '#toolbar-area');
				item.render();

			}

		}, this);

	}

});

