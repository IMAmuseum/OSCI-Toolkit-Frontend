OsciTk.views.Navbar = OsciTk.views.BaseView.extend({
	className: 'navbar-view',
	template: OsciTk.templateManager.get('navbar'),
	events: {
		'click li a': 'itemClick',
	},
	initialize: function() {
		
		this.listenTo(Backbone, 'packageLoaded', function(packageModel) {

			// Get total number of pages
			// Get current page
			// Instantiate progress bar
			// Draw the toggle single / double

			//this.creator = $(packageModel)[0].attributes['metadata']['dc:creator'];
			//this.pubTitle = packageModel.getTitle();
			//this.sections = app.collections.navigationItems.where({depth: 0});



			//console.log( this.sections );

		});

		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			this.render();
		});

	},
	render: function() {

		// sections: this.sections
		
		this.$el.html( this.template( {  } ) );

		$('.navbar-item[data-toggle="tooltip"]').tooltip({left:'150px'});

		// Render the font size selector
		var item = new OsciTk.views.ToolbarItem({toolbarItem: {view: 'fontSizeView', text: 'font-size', style: 'inline'} });
		this.addView(item, '#font-size-area');
		item.render();

		console.log( $('input[type="range"]') );


		return this;

	},
	itemClick: function(event) {

		event.preventDefault();

		var sectionId = $(event.currentTarget).attr('data-section-id');

		$('li.tocView-toolbar-item>a').removeClass('active');
		Backbone.trigger("toolbarRemoveViews");

		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});

	},
});