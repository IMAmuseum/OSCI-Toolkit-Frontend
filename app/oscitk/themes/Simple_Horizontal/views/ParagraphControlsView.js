OsciTk.views.ParagraphControls = OsciTk.views.BaseView.extend({
    initialize: function() {
        // when layut is complete add numbers for paragraph controls
        this.listenTo(Backbone, 'layoutComplete', function() {
            this.sectionId = app.models.section.get('id');
        });

        this.listenTo(Backbone, 'notesLoaded', function(params) {
            this.notesLoaded = true;
            this.render();
        });

        this.listenTo(Backbone, 'paragraphClicked', function(data) {
            this.togglePopover(data);
        });

        this.listenTo(Backbone, 'windowResized', function() {
            if (this.notesLoaded) {
                this.render();
            }
        });

    },

    render: function() {
        this.addParagraphControls();
        return this;
    },

    // addParagraphControls: function() {
    //     // get all paragraph with id and append controls
    //     var paragraphs = $('.content-paragraph');
    //     var i = 1;
    //     _.each(paragraphs, function(paragraph) {
    //         var note = this.checkForNote({
    //             content_id: 'osci-content-'+i,
    //             section_id: this.sectionId,
    //             paragraph_number: i
    //         });
    //         var hasNotes = note.get('note') ? 'withNotes' : '';

    //         $(paragraph).before(
    //             '<div class="paragraph-controls hidden-print" data-osci_content_id="osci-content-'+i+'" data-paragraph_identifier="'+i+'" >'+
    //             '<button class="btn btn-link '+ hasNotes +' btn-xs paragraph-button" type="button" id="paragraph-'+i+'" data-paragraph_number="'+i+'">'+
    //             '<span class="paragraph-identifier" paragraph-identifier="'+i+'">'+i+'</span>'+
    //             '</button>'+
    //             '</div>'
    //         );
    //         i++;
    //     }, this);
    // },

    // togglePopover: function (data) {
    //     var note = this.checkForNote({
    //         content_id: 'osci-content-'+data,
    //         section_id: this.sectionId,
    //         paragraph_number: data
    //     });
    //     var noteText = note  ? note.get('note') : '';
    //     noteText = noteText === null  ? '' : noteText;
    //     var notePopoverForm = "<textarea data-paragraph_number='"+ data +"' data-id='"+ note.cid +"'>"+ noteText +"</textarea>"+
    //                           "<button id='note-submit' type='button' class='btn btn-primary btn-block'>Add Note</button>";
    //     $('#paragraph-'+data).popover({html:true, trigger:'manual', placement:'top', content: notePopoverForm});
    //     $('#paragraph-'+data).popover('toggle');

    // },

    addParagraphControls: function() {
        // get all paragraph with id and append controls
        var paragraphs = $('.content-paragraph');
        var i = 1;
        _.each(paragraphs, function(paragraph) {
            var note = this.checkForNote({
                content_id: 'osci-content-'+i,
                section_id: this.sectionId,
                paragraph_number: i
            });
            var hasNotes = note.get('note') ? 'withNotes' : '';

            $(paragraph).before(
                '<div class="paragraph-controls hidden-print" data-osci_content_id="osci-content-'+i+'" data-paragraph_identifier="'+i+'" >'+
                '<button class="btn btn-link '+ hasNotes +' btn-xs paragraph-button" type="button" id="paragraph-'+i+'" data-paragraph_number="'+i+'" data-toggle="modal" data-target="#note-' + i + '">'+
                '<span class="paragraph-identifier" paragraph-identifier="'+i+'">'+i+'</span>'+
                '</button>'+
                '</div>'
            );
            i++;
        }, this);
    },

    togglePopover: function (data) {
        var note = this.checkForNote({
            content_id: 'osci-content-'+data,
            section_id: this.sectionId,
            paragraph_number: data
        });
        var noteText = note  ? note.get('note') : '';
        noteText = noteText === null  ? '' : noteText;
        var notePopoverForm = '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="note-' + data + '" id="note-' + data + '">' +
                                '<div class="modal-dialog modal-sm">' +
                                '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '<h4 class="modal-title" id="myModalLabel">Notes</h4>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                '<textarea data-paragraph_number="'+ data +'" data-id="'+ note.cid +'">'+ noteText +'</textarea>'+
                                '<button type="button" class="btn btn-primary btn-block note-submit">Add Note</button>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
        if ( $('#note-' + data).length === 0 ) {
            $('#section-view').append(notePopoverForm);
        }

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