OsciTk.views.Notes = OsciTk.views.BaseView.extend({
	className: 'notes-view',
	template: OsciTk.templateManager.get('notes'),
	events: {
		"click .noteLink": "noteLinkClick"
	},
	initialize: function() {
		// re-render this view when collection changes
		this.listenTo(app.collections.notes, 'add remove change', function() {
			this.render();
		});
	},

	render: function() {
		var notes = this.getSavedNotes();
		this.$el.html(this.template({notes: notes}));
		this.active();

		return this;
	},

	noteLinkClick: function(e) {
		e.preventDefault();
		var target = $(e.target);
		var content_id = target.attr('data-content_id');
		if (content_id) {
			Backbone.trigger('navigate', {identifier: content_id});
			Backbone.trigger('toggleNoteDialog', { contentId: content_id });
			$('#'+content_id).click();
			app.views.toolbarView.contentClose();
		}
	},

	getSavedNotes: function() {
		// filter notes - only return notes with ids (saved to server)
		var notes = _.filter(app.collections.notes.models, function(note) {
			if (note.id !== null) return true;
			return false;
		});

		return notes;
	},

	active: function() {
		// Set the width of the notes reel if there is more than one note
		if (app.collections.notes.length > 1) {
			var notes = this.$el.find('.notesListItem');
			this.$el.find('.notesList').width(notes.length * (notes.first().outerWidth(true)));
		}
	}
});