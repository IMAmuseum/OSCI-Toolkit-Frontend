OsciTk.views.ParagraphControls = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('paragraph-popover'),
    templateNotes: OsciTk.templateManager.get('note-form'),
    templateCites: OsciTk.templateManager.get('citation'),

    initialize: function() {
        // when layout is complete add numbers for paragraph controls
        this.listenTo(Backbone, 'layoutComplete', function() {
            this.sectionId = app.models.section.get('id');
        });

        this.listenTo(Backbone, 'notesLoaded', function(params) {
            this.notesLoaded = false;
            if (params.length > 0) {
                this.notesLoaded = true;
            }
            this.render();
        });

        this.listenTo(Backbone, 'paragraphClicked', function(data) {
            this.togglePopover(data);
            this.getCitation(data);
        });

    },

    render: function() {
        if ( app.account.get('email') != null && this.notesLoaded) {
            this.paragraphs = $('.content-paragraph');
            this.addParagraphControls();
        }
        return this;
    },

    addParagraphControls: function() {
        // get all paragraph with id and append controls
        var i = 1;
        _.each(this.paragraphs, function(paragraph) {
            var note = this.checkForNote({
                content_id: 'osci-content-'+i,
                section_id: this.sectionId,
                paragraph_number: i
            });
            var hasNotes = note.get('note') ? 'withNotes' : '';

            $(paragraph).before(
                '<div class="paragraph-controls hidden-print" data-osci_content_id="osci-content-'+i+'" data-paragraph_identifier="'+i+'" >'+
                '<button class="btn btn-link '+ hasNotes +' btn-xs paragraph-button" type="button" id="paragraph-'+i+'" data-paragraph_number="'+i+'">'+
                '<span class="paragraph-identifier" paragraph-identifier="'+i+'">'+i+'</span>'+
                '</button>'+
                '</div>'
            );
            i++;
        }, this);
    },

    togglePopover: function (data) {
        this.data = data;

        var note = this.checkForNote({
            content_id: 'osci-content-'+ data,
            section_id: this.sectionId,
            paragraph_number: data
        });

        var popoverData = {
            id: data,
            cid: note.cid,
            noteText: noteText,
            sectionId: this.sectionId,
            contentId: 'osci-content-'+data,
            paragraph_number: data
        }

        var noteText = note  ? note.get('note') : '';
        noteText = noteText === null  ? '' : noteText;

        var noteForm = this.templateNotes({paragraph_number: note.get('paragraph_number'), note: noteText, cid: note.cid});

        var popover = this.template({noteForm: noteForm, citation: this.citation});
        $('#paragraph-'+data).popover({html:true, trigger:'manual', placement:'top', content: popover});
        $('#paragraph-'+data).popover('toggle');

        //step through paragraphs and destroy existing open popovers
        var i = 1;
        _.each(this.paragraphs, function(paragraph) {
            if (this.data != i) {
                $('#paragraph-'+i).popover('destroy');
            }
            i++;
        }, this);

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
    },

    getCitation: function(data) {
        var citationView = this;
        var contentId = 'osci-content-'+data;
        var content = $('#' + contentId);

        var citationRequestParams = {
            'section_id': app.models.section.get('id'),
            'publication_id': app.models.docPackage.get('id'),
            'element_id': contentId,
            'field': 'body'
        };

        $.ajax({
            url: app.config.get('endpoints').OsciTkCitation,
            data: citationRequestParams,
            success: function(data, status) {
                if (data.success) {
                    //add reference text to the response
                    data.citation.referenceText = content.text();
                    data.citation.url = document.URL + "/p-" + app.models.section.get('id') + "-" + content.data('paragraph_number');
                    data.citation.paragraphNumber = content.data('paragraph_number');
                    data.citation.date = new Date(data.citation.date);
                    data.citation.formattedDate = (data.citation.date.getMonth() + 1) + "/" + data.citation.date.getDate() + "/" + data.citation.date.getFullYear();

                    //make sure data exists for all variables in templates
                    data.citation.creator = data.citation.creator ? data.citation.creator : '';
                    data.citation.description = data.citation.description ? data.citation.description : '';
                    data.citation.editor = data.citation.editor ? data.citation.editor : '';
                    data.citation.publicationTitle = data.citation.publicationTitle ? data.citation.publicationTitle : '';
                    data.citation.publisher = data.citation.publisher ? data.citation.publisher : '';
                    data.citation.rights = data.citation.rights ? data.citation.rights : '';
                    data.citation.title = data.citation.title ? data.citation.title : '';

                    $('#cite').html(citationView.templateCites(data.citation));
                }
            }
        });
    }

});