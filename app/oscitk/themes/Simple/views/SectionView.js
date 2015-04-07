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
            this.sectionId = sectionModel.get('id');
            this.getSectionTitles(this.sectionId);
        });

        this.listenTo(Backbone, "figuresAvailable", function(figures) {
            this.figures = figures;
            this.setFigureStyles();
        });
    },

    render: function() {
        $('#loader').hide();
        this.$el.html(this.template({sectionTitle: this.sectionTitle, content: $(this.content).html()}));
        Backbone.trigger("layoutComplete");
        return this;
    },

    getSectionTitles: function(sectionId) {
        // get section sectionTitle, subtitle, and thumbnail for use in template
        _.each(app.collections.navigationItems.models, function(item) {
            if (item.get('id') == sectionId ) {
                this.sectionTitle = item.get('title');
                this.sectionSubtitle = item.get('subtitle');
                this.sectionThumbnail = item.get('thumbnail');
            }
        }, this);
        this.render();
    },

    updateProgress: function() {
        var value = $(window).scrollTop();
        var offset = 400;
        var sectionValue = value - offset;
        $('.progress .progress-bar').attr('aria-valuenow', value);
        if(! this.maxHeightSet) {
            var height = $(document).height();
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName("body")[0],
                cy = g.clientHeight;
            var max = (height-cy)-offset;
            $('.progress .progress-bar').attr('aria-valuemax', max);
            var percent = Math.floor((sectionValue/max)*100);
            $('.progress .progress-bar').attr('style', 'height: '+percent+'%');
        }
        if (value >= offset){
            $('.progress').removeClass('hidden');
        } else {
            $('.progress').addClass('hidden');
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
            var fallback_content = $(figure).find('.figure_content > object > .fallback-content').html();
            var figcaption = $(figure).find('figcaption').html();
            $(figure).find('.figure_content').html(fallback_content);
            switch(position) {
                // full page
                case 'p':
                    var imgClass = 'fullpage';
                    break;
                // plate
                case 'plate':
                    var imgClass = 'plate';
                    break;
                // full page plate
                case 'platefull':
                    var imgClass = 'platefull';
                    break;
                // top left
                case 'tl':
                    var imgClass = 'top left';
                    break;
                // bottom left
                case 'bl':
                    var imgClass = 'bottom left';
                    break;
                // top right
                case 'tr':
                    var imgClass = 'top right';
                    break;
                // bottom right
                case 'br':
                    var imgClass = 'bottom right';
                    break;
                // inline, top, bottom
                case 'i':
                case 't':
                case 'b':
                    var imgClass = 'center';
                    break;
            }
            $(figure).addClass(imgClass);
            $(figure).find("div > img").addClass(imgClass);
        }, this);
    }

});
