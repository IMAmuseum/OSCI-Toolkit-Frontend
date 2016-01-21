// TODO: Notes should be cleared when the user logs out
// TODO: Notes should be retrieved for all sections, not just the currently displayed section

OsciTk.views.NotesToolbar = OsciTk.views.BaseView.extend({
	className: 'toolbar-notes-view',
	template: OsciTk.templateManager.get('toolbar-notes'),
	events: {
		//"click a.note-link": "noteLinkClick"
	},

	initialize: function() {


		// re-render this view when collection changes
		this.listenTo(app.collections.notes, 'add remove change', function() {
			this.render();
		});

		// remove all notes when the user logs out
		this.listenTo( Backbone, 'accountStateChanged', function() {
			
			if( app.account.get('id') < 1 ) {
				app.collections.notes.reset();
			}

			this.render();

		});

		// Initial render is meant to just tell the user to log in
		this.render();
		
	},

	render: function() {

		var notes = this.getSavedNotes();
		this.$el.html( this.template( { notes: notes } ) );

		var that = this;
		this.$el.find('a.note-link').on('click', function(e) {
			e.preventDefault();
			that.noteLinkClick(e);
			return false;
		});

		return this;
		
	},

	noteLinkClick: function(e) {

		e.preventDefault();

		var $target = $(e.currentTarget);
		var content_id = $target.attr('data-content_id');

		if (content_id) {
			Backbone.trigger('navigate', { identifier: '#' + content_id } );
			$('.close-toolbar-item').click(); // closes toolbar
			$('.paragraph-controls[data-osci_content_id="'+content_id+'"] .paragraph-button').click(); // opens note dialog
		}

		return false;

	},

	getSavedNotes: function() {

		// filter notes - only return notes with ids (saved to server)
		var notes = _.filter(app.collections.notes.models, function(note) {
			if (note.id !== null) return true;
			return false;
		});

		// furthemore, ensure that they are returned in the same order as they appear in-text
		notes = _.sortBy( notes, function( note ) {
			return note.get('paragraph_number');
		});

		return notes;

	}

});