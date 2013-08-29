OsciTk.views.InlineNotes = OsciTk.views.BaseView.extend({
    template: OsciTk.templateManager.get('note-popup'),
    initialize: function() {

        this.listenTo(Backbone, 'toggleNoteDialog', function(data) {
            this.render(data);
        });

        // place icon next to paragraphs with notes after layout is complete
        this.listenTo(Backbone, 'notesLoaded', function(params) {
            _.each(app.collections.notes.models, function(n) {
                // place a class on the paragraph identifier to indicate a note is present
                var paragraphControls = app.views.sectionView.$el.find('.paragraph-controls[data-osci_content_id=' + n.get('content_id') + ']');
                if (paragraphControls.length) {
                    paragraphControls.addClass('notes-present');
                }
            });
        });
    },
    render: function(data) {
        var $this = this;
        var contentId = data.contentId;
        var content = $('#' + contentId);
        if (contentId) {
            // find the note content if pre-existing
            var note;
            var notes = app.collections.notes.where({content_id: contentId});
            if (notes[0]) {
                note = notes[0];
            } else {
                note = new OsciTk.models.Note({
                    content_id: contentId,
                    section_id: app.models.section.id
                });
                app.collections.notes.add(note);
            }
            var noteJson = note.toJSON();
            noteJson.referenceContent = content.text();

            $.fancybox({
                'padding'       : 0,
                'content'       : $this.template(noteJson),
                'type'          : 'inline',
                'titleShow'     : false,
                'beforeClose'   : function() {
                    // if closing the modal for a note with content, mark the paragraph control
                    // to indicate this paragraph has a note
                    var content = $('.note-popup').find('textarea').val();
                    if (content.length > 0) {
                        var pageView = app.views.sectionView.getCurrentPageView();
                        var pc = pageView.$el.find('.paragraph-controls[data-osci_content_id=' + contentId + ']');
                        pc.addClass('notes-present');
                    }
                }
            });

            var notePop = $('.note-popup');
            notePop.attr("id", note.cid);

            notePop.find('textarea, input').on('keyup', function(e) {
                // change status text
                notePop.find('.status').text('Saving...');
                // save the content to the model in case the note disappears (user clicks off)
                var cid = notePop.attr('id').match(/c\d+/)[0];
                // search the collection for this cid
                var note = app.collections.notes.get(cid);

                var noteText = notePop.find('textarea').val();
                var tempTags = notePop.find('input').val().split(',');
                var tags = [];
                for (var i = 0, len = tempTags.length; i < len; i++) {
                    tags.push(tempTags[i].replace(/ /g,''));
                }

                note.set('note', noteText);
                note.set('tags', tags);

                // clear the previous timer if there is one
                if (typeof($this['saveTimeout'+cid]) !== 'undefined') {
                    clearTimeout($this['saveTimeout'+cid]);
                    delete $this['saveTimeout'+cid];
                }
                // set timer to save the note
                $this['saveTimeout'+cid] = window.setTimeout(function() {
                    note.save();
                    notePop.find('.status').text('Saved');
                }, 1500);
            });
        }
    }
});