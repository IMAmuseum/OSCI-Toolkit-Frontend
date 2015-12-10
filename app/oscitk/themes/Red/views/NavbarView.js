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

		// Render basic template
		this.$el.html( this.template( {  } ) );

		// Initialize and render the font size selector
		var item = new OsciTk.views.ToolbarItem( { toolbarItem: { view: 'fontSizeView', text: 'font-size', style: 'inline' } } );
		this.addView(item, '#font-size-area');
		item.render();

		return this;

	},

	// Could be used to trigger FontSizeView
	itemClick: function(event) {
		event.preventDefault();
	},

});
