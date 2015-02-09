OsciTk.models.GlossaryTerm = OsciTk.models.BaseModel.extend({
	defaults: function() {
		return {
			term: '',
			definition: ''
		};
	}
});