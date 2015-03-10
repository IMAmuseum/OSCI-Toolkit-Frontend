OsciTk.views.FontSize = OsciTk.views.BaseView.extend({
	className: 'font-size-view',
	template: OsciTk.templateManager.get('font-size'),
	events: {
		"click .font-button": "changeFontSize",
	},
	initialize: function() {
		this.currentFontSize = 100;
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	changeFontSize: function(e) {
		e.preventDefault();

		var sectionView = app.views.sectionView;
		var clicked = $(e.target);

		if (clicked.attr("href") === "#font-larger") {
			this.currentFontSize += 25;
		} else {
			this.currentFontSize -= 25;
		}

		sectionView.$el.css({
			"font-size": this.currentFontSize + "%"
		});

		Backbone.trigger("windowResized");
	}
});