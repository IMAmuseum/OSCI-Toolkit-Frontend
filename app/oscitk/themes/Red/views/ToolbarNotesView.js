// TODO: Notes should be cleared when the user logs out
// TODO: Notes should be retrieved for all sections, not just the currently displayed section

OsciTk.views.NotesToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-notes-view',
	template: OsciTk.templateManager.get('toolbar-notes'),
	events: {
		"click .noteLink": "noteLinkClick"
	},

	initialize: function() {


		// re-render this view when collection changes
		this.listenTo(app.collections.notes, 'add remove change', function() {
			//console.log('ToolbarNotesView caught change in app.collecions.notes');
			this.render();
		});

		// remove all notes when the user logs out
		this.listenTo( Backbone, 'accountStateChanged', function() {
			
			if( app.account.get('id') < 1 ) {
				app.collections.notes.reset();
			}

			this.render();

		});

		// This just tells the user to login 
		this.render();
		
	},

	render: function() {

		var notes = this.getSavedNotes();
		this.$el.html( this.template( { notes: notes } ) );

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

	}

});