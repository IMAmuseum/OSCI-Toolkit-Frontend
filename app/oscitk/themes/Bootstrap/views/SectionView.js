OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        "scroll" : "updateProgress",
        'click .content-paragraph': 'paragraphClicked',
        'click .paragraph-button': 'paragraphClicked',
        'click #note-submit': 'noteSubmit',
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

        this.listenTo(Backbone, "figuresAvailable", function(figures) {
            this.figures = figures;
            this.setFigureStyles();
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

    noteSubmit: function(e) {
        var $this = this;
        var textarea = $(e.currentTarget).parent().find('textarea');
        var noteText = textarea.val();
        var cid = textarea.data('id');
        var paragraph_number = textarea.data('paragraph_number');
        if (noteText != '') {
            console.log(noteText);
            var note = app.collections.notes.get(cid);
            note.set('note', noteText);
            note.save();
            textarea.html(noteText);
        }
        $('#paragraph-'+paragraph_number).popover({
            content: function() {
                return $("#popover-content").html();
            }
        });
        $('#paragraph-'+paragraph_number).popover('destroy');
    },

    setFigureStyles: function() {
        _.each(this.figures, function(figure) {
            var position = $(figure).data('position');
            switch(position) {
                // plate
                case 'p':
                case 'plate':
                    var imgClass = 'plate';
                    break;
                // full page plate
                case 'f':
                    var imgClass = 'full-plate';
                    break;
                // left
                case 'tl':
                    var imgClass = 'left';
                    break;
                // right
                case 'r':
                    var imgClass = 'right';
                    break;
                //case inline
                case 'i':
                    var imgClass = 'inline';
                    break;
                // top
                case 't':
                    var imgClass = 'top';
                    break;
                // bottom
                case 'b':
                    var imgClass = 'bottom';
                    break;
            }
            $(figure).addClass(imgClass);
            $(figure).find("div > object > div > img").addClass(imgClass);
        }, this);
    }

});
