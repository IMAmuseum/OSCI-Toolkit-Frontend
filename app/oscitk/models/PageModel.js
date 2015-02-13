OsciTk.models.Page = OsciTk.models.BaseModel.extend({
	defaults: function() {
		return {
			content : {},
			pageNumber : 0
		};
	},

	addContent : function(newContent) {
		var content = this.get('content');

		// get the id from a data attribute if it exists
		var dataId = $(newContent[0]).data("osci_content_id");

		// if no id found grab it from the id attribute
		if (dataId === undefined) {
			dataId = $(newContent[0]).attr("id");
		}

		// if no id add content to the "content" property
		if (dataId === undefined) {
			dataId = "content";
			//initialize the "content" property if it doesnt exist
			if (content[dataId] === undefined) {
				content[dataId] = newContent.html();
			} else {
				// add content to the "content" property
				content[dataId] = content[dataId] + newContent.html();
			}
		} else {
			// set content into the id found from above
			content[dataId] = newContent[0];
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