OsciTk.views.ToolbarItem = OsciTk.views.BaseView.extend({
	tagName: 'li',
	className: 'toolbar-item-view',
	template: OsciTk.templateManager.get('toolbar-item'),
	events: {
		'click': 'itemClicked',
		//'touch': 'itemClicked'
	},

	initialize: function(options) {

		this.options = options;

		// add a class to this element based on view button uses
		this.$el.addClass(this.options.toolbarItem.view + '-toolbar-item');
		
	},

	render: function() {
		
		this.$el.html(this.template({
			text: this.options.toolbarItem.text,
			style: this.options.toolbarItem.style
		}));

		// This should be used to replace the view content w/ inline item's template
		if (this.options.toolbarItem.style != 'default') {
			Backbone.trigger("toolbarAddItemInline", this.options.toolbarItem);
		}

		return this;
	},

	itemClicked: function(e) {

		// Set this item to be active
		$('.toolbar-item-view').removeClass('active');
		this.$el.addClass('active');

		// triggered in ToolbarView.js
		Backbone.trigger("toolbarItemClicked", {
			item : this.options.toolbarItem
		});

	}

});