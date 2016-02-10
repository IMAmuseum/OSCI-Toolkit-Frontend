OsciTk.views.TocToolbar = OsciTk.views.BaseView.extend({
	className: 'toc-view',
	template: OsciTk.templateManager.get('toolbar-toc'),
    templateModal: OsciTk.templateManager.get('toolbar-modal'),
	events: {

	},

	initialize: function() {
		
		this.listenTo(Backbone, "sectionLoaded", function() {

			// get the modal backdrop
			var body = this.template({
				items: app.collections.navigationItems.where({depth: 0})
			});

			console.log( body );
			
			var modal = this.templateModal({
				title: "Table of Contents",
				body: body
			});

			var $modal = $(modal);

			this.listenTo(Backbone, "toolbarItemClicked", function(toolbarItem) {
				console.log( 'modaling' );
				$modal.modal();
			});

		});

		//console.log( modal );


		/*
		this.listenTo(Backbone, "currentNavigationItemChanged", function() {
			this.render();
		});
		*/

	},

	render: function() {



		

		return this;

	},

	// Executed when a section link is clicked
	itemClick: function(event) {

		event.preventDefault();

		var sectionId = $(event.currentTarget).attr('data-section-id');
		$('li.tocView-toolbar-item>a').removeClass('active');
		Backbone.trigger("toolbarRemoveViews");

		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});

	},

	closeOverlay: function() {
		Backbone.trigger("toolbarRemoveViews");
	}

});