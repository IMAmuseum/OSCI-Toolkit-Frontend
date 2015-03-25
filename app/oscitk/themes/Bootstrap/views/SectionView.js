OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        "scroll" : "updateProgress",
        'click .content-paragraph': 'paragraphClicked',
        'click .paragraph-button': 'paragraphClicked',
        'click .toggleNoteDialog' : 'noteTooltipClicked',
        'click .toggleCiteDialog' : 'citeTooltipClicked',
    },
    initialize: function() {
        _.bindAll(this, 'updateProgress');
        // bind to window
        $(window).scroll(this.updateProgress);
        this.maxHeightSet = false;

        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {
            var that = this;
            $('#section-view').empty();
            $('.header-view').empty();
            $('#loader').show();
            $('#loader').fadeTo(500, 0.7);

            if (navItem) {
                // loading section content
                app.models.section = new OsciTk.models.Section({
                    uri : navItem.get('uri'),
                    id : navItem.get('id')
                });

                this.ContentId = navItem.get('id');

                app.models.section.loadContent();
            }
        });

        this.listenTo(Backbone, 'windowResized', function() {
            this.maxHeightSet = false;
            this.render();
        });

        this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
            this.makeIds(sectionModel);
        });
    },

    render: function() {
        $('#loader').hide();
        this.$el.html(this.template({content: $(this.content).html()}));
        Backbone.trigger("layoutComplete");
        return this;
    },

    updateProgress: function() {
        var value = $(window).scrollTop();
        $('progress').attr('value', value);
        if(! this.maxHeightSet) {
            var height = $(document).height();
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName("body")[0],
                cy = g.clientHeight;
            var max = height-cy;
            $('progress').attr('max', max);
        }
    },

    makeIds: function(sectionModel) {
        var content =  sectionModel.get('content')[0].children.body;
        this.content = content;
        var i = 0;
        var p = 1;
        //var paragraphs = sectionModel.get('content')[0].children.body.children;
        _.each(this.content.children, function(sectionItem) {
            if($(sectionItem).is('p')){
                // add attr to p and add
                $(sectionItem).attr({
                    'data-paragraph_number': p,
                    'data-osci_content_id': 'osci-content-'+i,
                    'data-sectionid': 'body',
                    'id': 'osci-content-'+i
                }).addClass('content-paragraph');
                p++;
            }
            i++;
        }, this);
        this.render();
    },

    paragraphClicked: function(e) {
        var p = $(e.currentTarget);
        var paragraphNum = p.data("paragraph_number");
        Backbone.trigger("paragraphClicked", paragraphNum);
    },

    noteTooltipClicked: function(e) {
        e.preventDefault();
        console.log('note');
        //var evt = $(e.target).data('event');
        //var paragraphNumber = $(e.target).data('paragraph');
        //console.log(this.ContentId);
        //evt is the name of the event 'toggleNoteDialog' or 'toggleCiteDialog'
        //Backbone.trigger(evt, {contentId: 'osci-content-'+paragraphNumber, paragraphNumber: paragraphNumber});
    },

    citeTooltipClicked: function(e) {
        e.preventDefault();
        console.log('cite');
        //var evt = $(e.target).data('event');
        //var paragraphNumber = $(e.target).data('paragraph');
        //console.log(this.ContentId);
        //evt is the name of the event 'toggleNoteDialog' or 'toggleCiteDialog'
        //Backbone.trigger(evt, {contentId: 'osci-content-'+paragraphNumber, paragraphNumber: paragraphNumber});
    },

});
