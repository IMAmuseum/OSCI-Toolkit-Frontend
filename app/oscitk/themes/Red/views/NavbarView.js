OsciTk.views.Navbar = OsciTk.views.BaseView.extend({
	className: 'navbar-view',
	template: OsciTk.templateManager.get('navbar'),
	events: {
		'click li a': 'itemClick',
	},
	initialize: function() {
		
		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			this.render();
		});

	},

	render: function() {

		this.$el.html( this.template( {  } ) );

		$('.navbar-item[data-toggle="tooltip"]').tooltip({left:'150px'});

		// Render the font size selector
		var item = new OsciTk.views.ToolbarItem( { toolbarItem: { view: 'fontSizeView', text: 'font-size', style: 'inline' } } );
		this.addView(item, '#font-size-area');
		item.render();

		return this;

	},

	itemClick: function(event) {

		event.preventDefault();

		var sectionId = $(event.currentTarget).attr('data-section-id');

		$('li.tocView-toolbar-item').removeClass('active');
		Backbone.trigger("toolbarRemoveViews");

		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});

	},

});
