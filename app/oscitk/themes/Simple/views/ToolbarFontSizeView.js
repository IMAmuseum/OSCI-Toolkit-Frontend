OsciTk.views.FontSize = OsciTk.views.BaseView.extend({
	className: 'font-size-view',
	template: OsciTk.templateManager.get('font-size'),
	initialize: function() {
		this.currentFontSize = 100;
		// listen for inline toolbar item clicks in ToolbarItemView.js
		this.listenTo(Backbone, "toolbarInlineClicked", function(href) {
			this.changeFontSize(href);
		});
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	changeFontSize: function(href) {
		var sectionView = app.views.sectionView;

		if (href === "font-larger" && this.currentFontSize < "200") {
			this.currentFontSize += 10;
		}
		if (href === "font-smaller" && this.currentFontSize > "50")  {
			this.currentFontSize -= 10;
		}

		sectionView.$el.css({
			"font-size": this.currentFontSize + "%"
		});

		Backbone.trigger("windowResized");
	}
});