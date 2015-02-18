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

		this.e = e;
		this.view = app.views.toolbarView;

		// toggle active class
		this.$target = $(e.target);
		this.$target.toggleClass('active');

		//get the target li for checking if true in each loop below
		this.$targetCheck = $(e.currentTarget);

		// step through toolbar items and find non-selected and remove active class
		_.each(app.toolbarItems, function(toolbarItem) {
			// if target is not currently selected remove active clasee
			if (this.$targetCheck.hasClass(toolbarItem.view +'-toolbar-item') == false) {
				this.view.$el.find('li.'+toolbarItem.view+'-toolbar-item>a').removeClass('active');
			}
		}, this);

		// triggered in appView.js
		Backbone.trigger("toolbarItemClicked", {item : this.options.toolbarItem});
	}
});