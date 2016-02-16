OsciTk.views.ParagraphControls = OsciTk.views.BaseView.extend({
    initialize: function() {
        // when layut is complete add numbers for paragraph controls
        this.listenTo(Backbone, 'layoutComplete', function() {
            this.sectionId = app.models.section.get('id');
        });

        this.listenTo(Backbone, 'notesLoaded', function(params) {
            //console.log('notesLoaded');
            this.notesLoaded = true;
            this.render();
        });

        this.listenTo(Backbone, 'paragraphClicked', function(data) {
            this.toggleModal(data);
        });

        this.listenTo(Backbone, 'windowResized', function() {
            if (this.notesLoaded) {
                //this.render();
            }
        });

    },

    render: function() {
        this.addParagraphControls();
        return this;
    },

    addParagraphControls: function() {
        // get all paragraph with id and append controls
        var paragraphs = $('.content-paragraph');
        var i = 1;
        //console.log( paragraphs );
        _.each(paragraphs, function(paragraph) {
            var note = this.checkForNote({
                content_id: 'osci-content-'+i,
                section_id: this.sectionId,
                paragraph_number: i
            });
            var hasNotes = note.get('note') ? 'withNotes' : '';

            $("[data-osci_content_id=osci-content-"+i+"]").prepend(
                '<div class="paragraph-controls hidden-print" data-osci_content_id="osci-content-'+i+'" data-paragraph_identifier="'+i+'" >'+
                '<button class="btn btn-link '+ hasNotes +' btn-xs paragraph-button" type="button" id="paragraph-'+i+'" data-paragraph_number="'+i+'" data-toggle="modal" data-target="#note-' + i + '">'+
                '<span class="paragraph-identifier" paragraph-identifier="'+i+'"></span>'+
                '</button>'+
                '</div>'
            );
            i++;
        }, this);
    },

    toggleModal: function (data) {
        var note = this.checkForNote({
            content_id: 'osci-content-'+data,
            section_id: this.sectionId,
            paragraph_number: data
        });
        var noteText = note  ? note.get('note') : '';
        noteText = noteText === null  ? '' : noteText;

        data = {
            id: data,
            cid: note.cid,
            noteText: noteText,
            sectionId: this.sectionId,
            contentId: 'osci-content-'+data,
            paragraph_number: data
        }

        var modal = new OsciTk.views.Modal(data);
    },

    checkForNote: function (data) {
        var note;
        var notes = app.collections.notes.where({content_id: data.content_id});
        if (notes[0]) {
            note = notes[0];
        } else {
            note = new OsciTk.models.Note({
                content_id: data.content_id,
                section_id: data.section_id,
                paragraph_number: data.paragraph_number
            });
            app.collections.notes.add(note);
        }
        return note;
    }

});