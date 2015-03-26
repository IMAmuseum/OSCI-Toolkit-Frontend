OsciTk.views.ParagraphControls = OsciTk.views.BaseView.extend({
    initialize: function() {
        // when layut is complete add numbers for paragraph controls
        this.listenTo(Backbone, 'layoutComplete', function() {
            this.sectionId = app.models.section.get('id');
        });

        this.listenTo(Backbone, 'notesLoaded', function(params) {
            this.render();
            // _.each(app.collections.notes.models, function(n) {
            //     // place a class on the paragraph identifier to indicate a note is present
            //     var paragraphControls = app.views.sectionView.$el.find('.paragraph-controls[data-osci_content_id=' + n.get('content_id') + ']');
            //     if (paragraphControls.length) {
            //         paragraphControls.addClass('notes-present');
            //     }
            // });
        });

        this.listenTo(Backbone, 'paragraphClicked', function(data) {
            this.togglePopover(data);
        });

        this.listenTo(Backbone, 'windowResized', function() {
            this.render();
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
        _.each(paragraphs, function(paragraph) {
            $(paragraph).before(
                '<div class="paragraph-controls" data-osci_content_id="osci-content-'+i+'" data-paragraph_identifier="'+i+'" >'+
                '<button class="btn btn-default btn-xs paragraph-button" type="button" id="paragraph-'+i+'" data-paragraph_number="'+i+'">'+
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
        var notePopoverForm = "<textarea data-paragraph_number='"+ data +"' data-id='"+ note.cid +"'>"+ noteText +"</textarea>'"+
                              "<button id='note-submit' type='button' class='btn btn-primary btn-block'>Add Note</button>";
        $('#paragraph-'+data).popover({html:true, trigger:'manual', placement:'top', viewport: '#section-view', title: 'note', content: notePopoverForm});
        $('#paragraph-'+data).popover('toggle');

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