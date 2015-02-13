OsciTk.views.FontStyle = OsciTk.views.BaseView.extend({
	className: 'font-style-view',
	template: OsciTk.templateManager.get('font-style'),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	events: {
		"click .theme-button": "changeTheme"
	},

	changeTheme: function(e) {
		e.preventDefault();

		var clicked = $(e.target);
		var theme = clicked.attr("href").substr(1);
		var body = $("body");

		body.removeClass("normal sepia night");

		body.addClass(theme);
	}
});