OsciTk.views.Header = OsciTk.views.BaseView.extend({
	className: 'header-view',
	template: OsciTk.templateManager.get('header'),
	initialize: function() {
		this.listenTo(Backbone, 'packageLoaded', function(packageModel) {
			this.creator = $(packageModel)[0].attributes['metadata']['dc:creator'];
			this.pubTitle = packageModel.getTitle();
		});

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
		} else {
			this.headerImage = null;
			// console.log(this.headerImage);
			this.headerImageCaption = null;
		}

		console.log(this.creator);
		this.$el.html(this.template({
			creator: this.creator,
			title: this.pubTitle,
			sectionTitle: this.sectionTitle,
			sectionSubtitle: this.sectionSubtitle
		}));
		return this;
	}
});