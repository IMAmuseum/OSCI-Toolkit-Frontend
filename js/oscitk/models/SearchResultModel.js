OsciTk.models.SearchResult = OsciTk.models.BaseModel.extend({
	get: function(attr) { // override get method
		if(!this.attributes[attr]) return this.attributes[attr];

		var val = this.attributes[attr];
		switch(attr) {
			case 'bundle':
				if(val === 'footnote' || val === 'note' || val === 'figure') {
					return val;
				} else {
					return 'content';
				}
				break;
			case 'url':

				break;
            case 'teaser':
                var teaser = this.attributes[attr];
                var tmp = document.createElement("DIV");
                tmp.innerHTML = teaser;
                return tmp.textContent || tmpinnerText || "";
			default:
				return this.attributes[attr];
		}
	}
});
