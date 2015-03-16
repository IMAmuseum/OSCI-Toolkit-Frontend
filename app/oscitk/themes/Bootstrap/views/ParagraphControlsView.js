OsciTk.views.ParagraphControls = OsciTk.views.BaseView.extend({
    initialize: function() {
        // when layut is complete add numbers for paragraph controls
        this.listenTo(Backbone, 'layoutComplete', function() {
            this.contentId = app.models.section.get('id');
            this.render();
        });

        this.listenTo(Backbone, 'paragraphClicked', function(data) {
            this.toggleTooltip(data);
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
                tipContent += "<a data-paragraph='"+i+"' data-event='"+item+"' class='"+item+"'>"+text+"</a> ";
            }

            $(paragraph).prepend(
                '<div class="paragraph-controls" data-osci_content_id="osci-content-'+this.contentId+'" data-paragraph_identifier="'+i+'" >'+
                '<button type="button" id="paragraph-'+i+'" title="'+tipContent+'" data-toggle="tooltip" data-placement="right">'+
                '<span class="paragraph-identifier" paragraph-identifier="'+i+'">'+i+'</span>'+
                '</button>'+
                '</div>'
            );
            i++;
        }, this);
        $('[data-toggle="tooltip"]').tooltip({html:true, trigger:'manual'});
    },

    toggleTooltip: function (data) {
        $('#paragraph-'+data).tooltip('toggle');
    }

});