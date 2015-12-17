OsciTk.views.ParagraphControls = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('paragraph-popover'),
    templateNotes: OsciTk.templateManager.get('note-form'),
    templateCites: OsciTk.templateManager.get('citation'),

    initialize: function() {


        // Just some shorthands
        this.notesLoaded = false;
        this.userLogged = false;
        this.sectionId = null;

        // when layout is complete add numbers for paragraph controls
        this.listenTo(Backbone, 'layoutComplete', function() {

            //console.log( "ParagraphControlsView caught layoutComplete" );
            this.sectionId = app.models.section.get('id');

        });

        this.listenTo(Backbone, 'notesLoaded', function(params) {
            //console.log( "ParagraphControlsView caught notesLoaded" );
            this.notesLoaded = true;
            this.render();
        });


        // Whenever something happens to the account, try to reload the notes
        // See ToolbarAccountView.js for more info
        this.listenTo(Backbone, 'accountReady accountStateChanged', function() {
            //console.log( "ParagraphControlsView caught account actions" );

            this.userLogged = app.account.get('id') > 0;

            // Force re-load of Notes, see ../../../collections/NotesCollection.js
            if( this.userLogged ) {

                var section_id = app.models.section.id;
                app.collections.notes.getNotesForSection( section_id );

            }

            this.render();

        });


        // Clicking on the paragraph does nothing

        /*
        this.listenTo(Backbone, 'paragraphClicked', function(data) {
            console.log( "ParagraphControlsView caught paragraphClicked" );
            this.togglePopover(data);
            this.getCitation(data);
        });
        */

        
        // Clicking on the disc enables the popover
        this.listenTo(Backbone, 'paragraphButtonClicked', function(data) {
            //console.log( "ParagraphControlsView caught paragraphButtonClicked" );
            this.togglePopover(data);
            this.getCitation(data);           
        });

        // When the user scrolls, destroy the popover
        this.listenTo(Backbone, 'navigate', function() {
            //console.log( "ParagraphControlsView caught navigate" );
            $('[id^="paragraph-"]').popover('destroy');
        });

    },


    render: function() {

        //console.log( "ParagraphControlsView rendering..." );


        // This is the final check; based on log-in status, this toggles the notes
        if ( this.userLogged && this.notesLoaded) {

            this.paragraphs = $('.content-paragraph');
            this.addParagraphControls();

        }else{

            $('[id^="paragraph-"]').popover('destroy');
            $('.paragraph-controls').remove();

        }

        return this;

    },

    addParagraphControls: function() {

        //console.log( "ParagraphControlsView calls addParagraphControls" );

        // get all paragraph with id and append controls
        var i = 1;

        _.each(this.paragraphs, function(paragraph) {
            
            // note that there is an off by one error b/c paragraph #id and other fields

            /// Make sure that there no redundant paragraphControls if this is called twice
            $('.paragraph-controls[data-osci_content_id="osci-content-' + i + '"]' ).remove();

            var note = this.checkForNote({
                content_id: 'osci-content-'+i,
                section_id: this.sectionId,
                paragraph_number: i
            });

            var hasNotes = note.get('note') ? 'withNotes' : '';

            $(paragraph).prepend(
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

        this.data = data; // id

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
        };

        var noteText = note  ? note.get('note') : '';
            noteText = noteText === null  ? '' : noteText;

        var noteForm = this.templateNotes({paragraph_number: note.get('paragraph_number'), note: noteText, cid: note.cid});

        var popover = this.template({noteForm: noteForm, citation: this.citation});
        $('#paragraph-'+data).popover({html:true, trigger:'manual', placement:'right', content: popover});

        // Set focus on the Notes textarea once the popover has toggled
        $('#paragraph-'+data).on('shown.bs.popover', function() {
            $('#' + $(this).attr('aria-describedby') ).find('textarea').focus();
        });

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

            // Clean-up: destroy note if it's blank
            // See also noteSubmit in SectionView.js
            // This might throw an error; not sure why
            // See Error in NotesCollection.js
            if( note.get('note') === '' ) {
                note.destroy();
            }

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

        // data is paragraph index
        

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