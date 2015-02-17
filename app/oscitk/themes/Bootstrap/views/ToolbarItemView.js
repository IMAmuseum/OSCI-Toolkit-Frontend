OsciTk.views.ToolbarItem = OsciTk.views.BaseView.extend({
	tagName: 'li',
	className: 'toolbar-item-view',
	template: OsciTk.templateManager.get('toolbar-item'),
	initialize: function(options) {
		this.options = options;
		// add a class to this element based on view button uses
		this.$el.addClass(this.options.toolbarItem.view + '-toolbar-item');
	},
	events: {
		'click': 'itemClicked',
		'touch': 'itemClicked'
	},
	render: function() {
		//this.contentView = new OsciTk.views[this.options.toolbarItem.view]({parent: this});
		this.$el.html(this.template({
			text: '<a href="#">'+this.options.toolbarItem.text+'</a>'
		}));
		return this;
	},
	itemClicked: function(e) {
		e.preventDefault();
		e.stopPropagation();

		Backbone.trigger("toolbarItemClicked", {item : this.options.toolbarItem});

		// remove active class
		app.views.toolbarView.$el.find('.toolbar-item-view').removeClass('active');
		// add active class
		var $target = $(e.target);
		$target.addClass('active');
	}
});