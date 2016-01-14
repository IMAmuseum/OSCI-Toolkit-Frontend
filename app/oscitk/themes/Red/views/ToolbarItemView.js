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
		// add a class to this element based on view button uses
		this.$el.addClass(this.options.toolbarItem.view + '-toolbar-item');
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

		e.preventDefault();
		e.stopPropagation();

		this.$target = $(e.target);

		//console.log( this.$target );

		// toggle active class
		this.$target.addClass('active');

		this.setActiveStates(e);
		
	},
	setActiveStates: function(e) {

		// Shorthand
		this.view = app.views.toolbarView;


		// get true / false target is active
		this.active = this.$target.hasClass('active');

		// default actions only pass a
		/*
		if(this.$target.data("style") != 'default') {
			Backbone.trigger("toolbarInlineClicked", this.$target.data("href") );
		}
		*/

		// get the target li for checking if true in each loop below
		this.$targetCheck = $(e.currentTarget);

		// step through toolbar items and find non-selected and remove active class
		_.each(app.toolbarItems, function(toolbarItem) {

			// if target is not currently selected remove active class
			if (this.$targetCheck.hasClass(toolbarItem.view +'-toolbar-item') == false) {
				this.view.$el.find('li.'+toolbarItem.view+'-toolbar-item').removeClass('active');
			}


		}, this);

		// triggered in AppView.js
		Backbone.trigger("toolbarItemClicked", {
			item : this.options.toolbarItem,
			active: this.active
		});

	}

});
