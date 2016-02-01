OsciTk.views.ParagraphControls = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('paragraph-popover'),
    templateNotes: OsciTk.templateManager.get('paragraph-notes'),
    templateCites: OsciTk.templateManager.get('paragraph-cite'),

    initialize: function() {

        // Just some shorthands
        this.sectionLoaded = false;
        this.notesLoaded = false;
        this.userLogged = false;
        this.section_id = null;
        this.paragraphs = null;

        // Reset vars on section change
        this.listenTo(Backbone, 'routedToSection', function() {
            $('[id^="paragraph-"]').popover('destroy');
            this.sectionLoaded = false;
            this.notesLoaded = false;
        });

        // We must wait for the section to load before setting up the account hook
        this.listenTo(Backbone, 'sectionLoaded', function() {
            this.sectionLoaded = true;
            this.render();
        });

        // This happens after sectionLoaded
        this.listenTo(Backbone, 'layoutComplete', function() {
            this.section_id = app.models.section.get('id');
            this.render();
        });

        // Notes will not be loaded if the user is not logged in
        this.listenTo(Backbone, 'notesLoaded', function(params) {
            this.notesLoaded = true;
            this.render();
        });

        // Default check
        this.userLogged = app.account.get('id') > 0;

        // Whenever something happens to the account, try to reload the notes
        // See ToolbarAccountView.js for more info
        this.listenTo(Backbone, 'accountReady accountStateChanged', function() {
            
            $('[id^="paragraph-"]').popover('destroy');
            //app.collections.notes.reset();

            this.userLogged = app.account.get('id') > 0;
            this.notesLoaded = this.notesLoaded ? this.userLogged : this.notesLoaded;

            this.render();

        });

        // Clicking on the disc enables the popover
        this.listenTo(Backbone, 'paragraphButtonClicked', function(data) {
            this.togglePopover(data);
        });

        // When the user scrolls, destroy the popover
        this.listenTo(Backbone, 'navigate windowResized', function() {
            $('[id^="paragraph-"]').popover('destroy');
        });

    },


    render: function() {

        //console.log('sL: ' + this.sectionLoaded +', uL: ' + this.userLogged + ', nL: ' + this.notesLoaded);

        // Force re-load of Notes, see ../../../collections/NotesCollection.js
        if( this.userLogged && this.sectionLoaded && !this.notesLoaded ) {

            var section_id = app.models.section.id;
            app.collections.notes.getNotesForSection( section_id );
        
        }

        // This is the final check; this will show the controls
        if( this.sectionLoaded ) {

            this.paragraphs = $('.content-paragraph');
            this.addParagraphControls();

        }

        // Alt code: this destroys the controls on logout

        /*
        if ( this.userLogged && this.notesLoaded) {
            // see above
        }else{
            $('[id^="paragraph-"]').popover('destroy');
            $('.paragraph-controls').remove();
        }
        */

        return this;

    },

    addParagraphControls: function() {

        // get all paragraph with id and append controls
        var i = 1; // all osci-content counts start with 1

        _.each(this.paragraphs, function(paragraph) {
            
            // Remove previous .paragraph-controls if this is called twice
            $('.paragraph-controls[data-osci_content_id="osci-content-' + i + '"]' ).remove();

            var hasNotes = ''; // determines if the dot is red

            if( this.userLogged && this.notesLoaded ) {

                // This will find the note or return false if notesLoaded is false
                var note = this.checkForNote({
                    content_id: 'osci-content-'+i,
                    section_id: this.section_id,
                    paragraph_number: i
                });

                hasNotes = note.get('note') ? 'withNotes' : '';

            }


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

    togglePopover: function (id) {

        var noteForm = false;

        // Out goal is to return undefined for noteform if the notes are not available
        if( this.notesLoaded && this.userLogged ) {

            // Returns false if notes not loaded; else returns existing note or new note
            var note = this.checkForNote({
                content_id: 'osci-content-'+ id,
                section_id: this.section_id,
                paragraph_number: id
            });

            var noteText = note  ? note.get('note') : '';
                noteText = noteText === null  ? '' : noteText;

            var popoverData = {
                id: id,
                cid: note.cid,
                noteText: noteText,
                sectionId: this.section_id,
                contentId: 'osci-content-'+id,
                paragraph_number: id
            };

            var noteForm = this.templateNotes({
                paragraph_number: note.get('paragraph_number'),
                note: noteText,
                cid: note.cid
            });

        }

        // Unfortunately, FireFox requires tooltip placement to be on top rather than right
        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var placement = is_firefox ? 'top' : 'right';
       
        var popover = this.template({
            'noteForm' : noteForm,
            'citation' : this.citation
        });

        $('#paragraph-'+id).popover({
            'html' : true,
            'trigger' : 'manual',
            'placement' : placement, // see FireFox hotfix above
            'container' : 'body', // avoid overflow: hidden cutoff
            'content' : popover
        });


        // Set focus on the Notes textarea once the popover has toggled
        // Should auto-fail if the area doesn't exist
        // Also binds the noteSubmit event, since the button is ready
        var that = this;
        $('#paragraph-'+id).on('shown.bs.popover', function(e) {

            // Creates the little citation scrollbox
            that.getCitation(id);

            // Auto-focus on notes if it exists
            $('#' + $(this).attr('aria-describedby') ).find('textarea').focus();

            // Bind "Submit note" button
            $('#note-submit').on('click', function(e) {
                that.noteSubmit(e);
            });



            // Remove popover if there is a click outside the popover
            // $('html').one() wrapper that rebinds until success
            var selfbound = function(e) {

                $target = $(e.target);
                $button = $('#paragraph-'+id);
                $popover = $('#' + $button.attr('aria-describedby') );

                // If the two DOM elements are not the same...
                if( $target.get(0) !== $popover.get(0) ) {

                    // If the target is not a descendant of popover...
                    if( $popover.find($target).length < 1  ) {
                        $button.popover('destroy');
                    }else{
                        $('html').one('click', selfbound );
                    }

                }

            };

            $('html').one('click', selfbound );


        });

        $('#paragraph-'+id).popover('toggle');

        //step through paragraphs and destroy existing open popovers
        var i = 1;
        _.each(this.paragraphs, function(paragraph) {
            if ( id != i ) {
                $('#paragraph-'+i).popover('destroy');
            }
            i++;
        }, this);

    },

    togglePopover: function (id) {

        var noteForm = false;

        // Out goal is to return undefined for noteform if the notes are not available
        if( this.notesLoaded && this.userLogged ) {

            // Returns false if notes not loaded; else returns existing note or new note
            var note = this.checkForNote({
                content_id: 'osci-content-'+ id,
                section_id: this.section_id,
                paragraph_number: id
            });

            var noteText = note  ? note.get('note') : '';
                noteText = noteText === null  ? '' : noteText;

            var popoverData = {
                id: id,
                cid: note.cid,
                noteText: noteText,
                sectionId: this.section_id,
                contentId: 'osci-content-'+id,
                paragraph_number: id
            };

            var noteForm = this.templateNotes({
                paragraph_number: note.get('paragraph_number'),
                note: noteText,
                cid: note.cid
            });

        }

        // Unfortunately, FireFox requires tooltip placement to be on top rather than right
        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var placement = is_firefox ? 'top' : 'right';
       
        var popover = this.template({
            'noteForm' : noteForm,
            'citation' : this.citation
        });

        $('#paragraph-'+id).popover({
            'html' : true,
            'trigger' : 'manual',
            'placement' : placement, // see FireFox hotfix above
            'container' : 'body', // avoid overflow: hidden cutoff
            'content' : popover
        });


        // Set focus on the Notes textarea once the popover has toggled
        // Should auto-fail if the area doesn't exist
        // Also binds the noteSubmit event, since the button is ready
        var that = this;
        $('#paragraph-'+id).on('shown.bs.popover', function(e) {

            // Creates the little citation scrollbox
            that.getCitation(id);

            // Auto-focus on notes if it exists
            $('#' + $(this).attr('aria-describedby') ).find('textarea').focus();

            // Bind "Submit note" button
            $('#note-submit').on('click', function(e) {
                that.noteSubmit(e);
            });



            // Remove popover if there is a click outside the popover
            // $('html').one() wrapper that rebinds until success
            var selfbound = function(e) {

                $target = $(e.target);
                $button = $('#paragraph-'+id);
                $popover = $('#' + $button.attr('aria-describedby') );

                // If the two DOM elements are not the same...
                if( $target.get(0) !== $popover.get(0) ) {

                    // If the target is not a descendant of popover...
                    if( $popover.find($target).length < 1  ) {
                        $button.popover('destroy');
                    }else{
                        $('html').one('click', selfbound );
                    }

                }

            };

            $('html').one('click', selfbound );


        });

        $('#paragraph-'+id).popover('toggle');

        //step through paragraphs and destroy existing open popovers
        var i = 1;
        _.each(this.paragraphs, function(paragraph) {
            if ( id != i ) {
                $('#paragraph-'+i).popover('destroy');
            }
            i++;
        }, this);

    },

});