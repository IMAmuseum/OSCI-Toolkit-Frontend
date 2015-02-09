OsciTk.models.NavigationItem = OsciTk.models.BaseModel.extend({
	defaults: {
			title: null,
			subtitle: null,
			uri: null,
			parent: null,
			next: null,
			previous: null,
			depth: 0,
			thumbnail: null,
			timestamp: null
	}
});