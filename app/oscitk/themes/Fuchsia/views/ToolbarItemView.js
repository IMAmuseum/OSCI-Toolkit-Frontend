OsciTk.views.ToolbarItem = OsciTk.views.BaseView.extend({
	tagName: 'li',
	className: 'toolbar-item-view',
	template: OsciTk.templateManager.get('toolbar-item'),
	events: {
		'click': 'itemClicked',
		'touch': 'itemClicked'
	},
	initialize: function(options) {
		this.options = options;
		this.itemClass = this.options.toolbarItem.view + '-toolbar-item';

		// add a class to this element based on the view this button triggers
		this.$el.addClass( this.itemClass );

		this.$el.attr('data-href', this.options.toolbarItem.text);
		this.$el.attr('data-style', this.options.toolbarItem.style);

	},
	render: function() {

		this.$el.html(this.template({
			text: this.options.toolbarItem.text,
			style: this.options.toolbarItem.style
		}));

		if (this.options.toolbarItem.style != 'default') {
			Backbone.trigger("toolbarInline", this.options.toolbarItem);
		}

		return this;

	},

	itemClicked: function(e) {

		// Show the toolbar if it's hidden
		Backbone.trigger("openToolbar");

		// Set this item to be active
		$('.toolbar-item-view').removeClass('active');
		this.$el.addClass('active');

		// triggered in AppView.js
		Backbone.trigger("toolbarItemClicked", {
			item : this.options.toolbarItem,
			active: true
		});

	}

});
