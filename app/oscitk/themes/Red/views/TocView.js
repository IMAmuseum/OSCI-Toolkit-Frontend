OsciTk.views.Toc = OsciTk.views.BaseView.extend({
	className: 'toc-view',
	template: OsciTk.templateManager.get('toc'),
	events: {
		'click li a': 'itemClick',
		//'click #dismiss': 'closeOverlay',
	},
	initialize: function() {
		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			this.render();
		});
	},
	render: function() {
		this.$el.html(this.template({
			items: app.collections.navigationItems.where({depth: 0})
		}));
		return this;
	},
	itemClick: function(event) {
		event.preventDefault();

		console.log( 'section clicked' );

		var sectionId = $(event.currentTarget).attr('data-section-id');

		//$('li.tocView-toolbar-item').removeClass('active');
		
		//Backbone.trigger("toolbarRemoveViews");

		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});

		//app.views.toolbarView.$el.find('li.tocView-toolbar-item').click();


	},

	/*
	closeOverlay: function() {
		Backbone.trigger("toolbarRemoveViews");
	}
	*/

});
