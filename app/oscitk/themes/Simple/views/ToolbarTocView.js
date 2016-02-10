OsciTk.views.TocToolbar = OsciTk.views.BaseView.extend({
	className: 'toc-view',
	template: OsciTk.templateManager.get('toolbar-toc'),
    templateModal: OsciTk.templateManager.get('toolbar-modal'),

	initialize: function() {
		

		// See ../../../collections/NavigationItemsCollection.js
		// Unfortunately navigationLoaded does not work here
		// Once so that multiple modals aren't created after section change
		this.listenToOnce(Backbone, "sectionLoaded", function() {

			// get the modal backdrop
			var body = this.template({
				items: app.collections.navigationItems.where({depth: 0})
			});

			var modal = this.templateModal({
				title: "Table of Contents",
				body: body
			});

			var $modal = $(modal);

			// Bind section change to the links inside list items
			$modal.find('li.toc-item>a').on('click', this.itemClick );

			this.listenTo(Backbone, "toolbarItemClicked", function(toolbarItem) {
				$modal.modal();
			});

		});


	},

	// Executed when a section link is clicked
	itemClick: function( event ) {

		// Just in case the href hasn't been set to javascript:;
		event.preventDefault();

		var sectionId = $(event.currentTarget).attr('data-section-id');
		$('li.tocView-toolbar-item>a').removeClass('active');
		Backbone.trigger("toolbarRemoveViews");

		// TODO: don't really want to address the appRouter directly
		app.router.navigate("section/" + sectionId, {trigger: true});

	},

});