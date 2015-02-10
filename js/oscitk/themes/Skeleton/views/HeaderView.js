OsciTk.views.Header = OsciTk.views.BaseView.extend({
	className: 'header-view',
	template: OsciTk.templateManager.get('header'),
	initialize: function() {
		this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
			this.sectionTitle = null;
			this.sectionSubtitle = null;
			this.sectionThumbnail = null;
			this.headerImage = null;
			this.headerImageCaption = null;
			var sectionId = sectionModel.get('id');
			this.render(sectionId);
		});
	},
	render: function(sectionId) {

		// get section sectionTitle, subtitle, and thumbnail for use in template
		_.each(app.collections.navigationItems.models, function(item) {
			if (item.get('id') == sectionId ) {
				this.sectionTitle = item.get('title');
				this.sectionSubtitle = item.get('subtitle');
				this.sectionThumbnail = item.get('thumbnail');
			}
		});

		// get first figure marked as plate for header image
		if (! _.isEmpty(app.collections.figures.models)) {
			_.each(app.collections.figures.models, function(figure) {
				if (figure.get('plate') == true) {
					this.headerImage = figure.get('preview_url');
					this.headerImageCaption = figure.get('caption');
				}
			});
		}

		this.$el.html(this.template());
		return this;
	}
});