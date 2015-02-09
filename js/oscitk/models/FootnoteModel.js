OsciTk.models.Footnote = OsciTk.models.BaseModel.extend({
	defaults: {
		body: '',
		section_id: '',
		delta: ''
	},

	sync: function(method, model, options) {
	}
});
