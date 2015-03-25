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
            this.toggleTooltip(data);
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

            var linkItems = app.config.get('paragraphControls');
            var tipContent = '';
            for(var item in linkItems) {
                var text = linkItems[item];
                if (text == 'note') {
                    var note = this.checkForNote({
                                content_id: 'osci-content-'+i,
                                section_id: this.sectionId,
                                paragraph_number: i
                            });
                    var noteText = note ? note.get('note') : '';
                    var notePopoverForm = "<form><textarea>"+ noteText +"</textarea></form>";
                    //tipContent += "<a data-content='"+notePopoverForm+"' data-paragraph='"+i+"' data-event='"+item+"' class='"+item+"'>"+text+"</a> ";
                }

                // if (text == 'cite') {
                //     tipContent += "<a data-paragraph='"+i+"' data-event='"+item+"' class='"+item+"'>"+text+"</a> ";
                // }
            }

            $(paragraph).before(
                '<div class="paragraph-controls" data-osci_content_id="osci-content-'+i+'" data-paragraph_identifier="'+i+'" >'+
                '<button class="btn btn-default btn-xs paragraph-button" type="button" id="paragraph-'+i+'" title="Note" data-content="'+notePopoverForm+'" data-toggle="popover" data-placement="right" data-paragraph_number="'+i+'">'+
                '<span class="paragraph-identifier" paragraph-identifier="'+i+'">'+i+'</span>'+
                '</button>'+
                '</div>'
            );
            i++;
        }, this);
        $('[data-toggle="popover"]').popover({html:true, trigger:'manual', placement:'top', viewport: '#section-view'});
        // $('[data-toggle=popover]').on('shown.bs.popover', function () {
        //     $('.arrow').css('left',parseInt($('.popover').css('left')) + 25 + 'px')
        //     $('.popover').css('left',parseInt($('.popover').css('left')) + 40 + 'px')
        // });
    },

    toggleTooltip: function (data) {
        console.log(data);
        $('#paragraph-'+data).popover('toggle');
    },

    checkForNote: function (data) {
        var note;
        var notes = app.collections.notes.where({content_id: data.content_id});
        if (notes[0]) {
            note = notes[0];
        }
        return note;
    }

});