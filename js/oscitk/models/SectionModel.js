OsciTk.models.Section = OsciTk.models.BaseModel.extend({
	defaults: function() {
		return {
			title: null,
			content: null,
			uri: null,
			media_type: 'application/xhtml+xml',
			contentLoaded: false,
			pages: null
		};
	},

	initialize: function() {
		pages = new OsciTk.collections.Pages();
	},

	loadContent: function() {
		//pages = new OsciTk.collections.Pages();
		var content = null;
		if (this.get('contentLoaded') === false) {
			var data = (loadHTMLDoc(this.get('uri')));

			var addClasses = [];
			var bodyClasses = /body([^>]*)class=(["']+)([^"']*)(["']+)/gi.exec(data.substring(data.indexOf("<body"), data.indexOf("</body>") + 7));
			if (_.isArray(bodyClasses) && !_.isUndefined(bodyClasses[3])) {
				addClasses = bodyClasses[3].split(' ');
			}
			content = $('<div />').html(data);

			this.set('title', content.find('title').html());
			this.set('content', content);
			this.set('contentLoaded', true);
			this.set('classes', addClasses);
		}

		if (content === null) {
			content = $(this.get('content'));
		}

		// parse out footnotes and figures, make them available via event
		var footnotes = content.find('section#footnotes');
		var figures   = content.find('figure');

		Backbone.trigger('footnotesAvailable', footnotes);
		Backbone.trigger('figuresAvailable', figures);
		Backbone.trigger('sectionLoaded', this);

	},

	removeAllPages : function() {
		this.set('pages', new OsciTk.collections.Pages());
	}
});
