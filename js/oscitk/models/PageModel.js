OsciTk.models.Page = OsciTk.models.BaseModel.extend({

	defaults: function() {
		return {
			content : {},
			pageNumber : 0
		};
	},

	addContent : function(newContent) {
		var content = this.get('content');
		if (_.isArray(content)) {
			content[$(newContent[0]).data("osci_content_id")] = newContent[0];
		} else {
			content['content'] = newContent;
		}

		return this;
	},

	removeContentAt : function(index) {
		var content = this.get('content');
		delete content[index];

		return this;
	},

	removeAllContent : function() {
		this.set('content', {});
	},

	contentLength : function() {
		return this.get('content').length;
	},

	getContent : function(id) {
		return this.get('content')[id];
	}
});