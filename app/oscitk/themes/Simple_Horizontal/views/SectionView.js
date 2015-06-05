OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'scroll' : 'updateProgress',
        'click .content-paragraph': 'paragraphClicked',
        'click .paragraph-button': 'paragraphClicked',
        'click .note-submit': 'noteSubmit',
    },
    initialize: function() {
        _.bindAll(this, 'updateProgress');
        // bind to window
        var width;
        //$('.content').scroll(this.updateProgress);
        $(window).scroll(this.updateProgress);
        this.maxHeightSet = false;

        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {
            var that = this;
            $('#determineWidth').remove();
            $('#section-view').empty();
            $('.header-view').empty();
            $('#loader').show().fadeTo(500, 0.7);

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
            this.getViewportSize();
            this.setFigureStyles();
            this.render();
        });

        this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
            this.makeIds(sectionModel);
            this.sectionId = sectionModel.get('id');
            this.getSectionTitles(this.sectionId);
            this.getViewportSize();
            this.setFigureStyles();
        });

        this.listenTo(Backbone, 'layoutComplete', function() {
            this.getFullSectionWidth();
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
        var scrollValue = $(window).scrollLeft();
        //var sectionValue = $('.content').scrollLeft();
        var winWidth = $(window).width();
        var sectionValue = $('body').scrollLeft() - winWidth;

        // Check if test element exists or not
        if( $('#determineWidth').length == 0) {

            // Add element to test the width of the content
            $('#section').append('<div id="determineWidth" style="float: right;"></div>');
        }

        // Get the wide of the content
        var dw = $('#determineWidth').position().left;

        // Set the width of the content minus the screen size
        // width = ((+dw) - (+scrollValue);
        width = dw - winWidth;


        if (scrollValue > winWidth){
            // Set the percentage of the progress width
            var percent = Math.floor((sectionValue/width)*100);
        } else {
            var percent = 0;
            sectionValue = 0;
        }

        // Set variables as attributes on progress bar
        $('.progress .progress-bar').attr('aria-valuemax', width)
            .attr('aria-valuenow', sectionValue)
            .attr('style', 'width: '+percent+'%');

    },

    getViewportSize: function() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            x = w.innerWidth||e.clientWidth||g.clientWidth,
            y = w.innerHeight||e.clientHeight||g.clientHeight;
        this.x = x;
        this.y = y-60;

        if (this.x > 767){
            // get reflow column styles
            this.columnWidthStyle = this.getPrefixedStyle('columnWidth');
            this.columnGapStyle = this.getPrefixedStyle('columnGap');
            this.spreadColumnWidth = this.x / 2.5;
            this.spreadGapWidth = this.spreadColumnWidth / 5;
            this.reflowStyle = 'height:'+ this.y +'px; ' + this.columnGapStyle + ': '
                +this.spreadGapWidth+'px; '+this.columnWidthStyle +': '+this.spreadColumnWidth+'px;';
            $('#section').attr("style", this.reflowStyle);
        } else {
            $('#section').attr("style", "");
        }
    },

    getFullSectionWidth: function() {
        var d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            sx = g.scrollWidth;

            this.sectionWidth = sx;
            this.numPages = Math.floor(this.sectionWidth / (this.x - 80));
            // move width is page width + gap width - padding on container
            this.moveWidth = this.x + this.spreadGapWidth - 80;

        if (this.x > 767){
            $('#section').attr("style", this.reflowStyle);
        } else {
            $('#section').attr("style", "");
        }
    },

    getPrefixedStyle: function(unprefixed) {
        var vendors = ["Webkit", "Moz", "O", "ms" ],
            prefixes = ['-Webkit-', '-moz-', '-o-', '-ms-'],
            upper = unprefixed[0].toUpperCase() + unprefixed.slice(1),
            length = vendors.length;

        if (typeof(document.body.style[unprefixed]) != 'undefined') {
            unprefixed = unprefixed.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            return '-'+unprefixed;
        }

        for ( var i=0; i < length; i++ ) {
            if (typeof(document.body.style[vendors[i] + upper]) != 'undefined') {
                unprefixed = vendors[i] + upper;
                unprefixed = unprefixed.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                return '-'+unprefixed;
            }
        }
        unprefixed = unprefixed.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        return '-'+unprefixed;
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
                    'data-osci_content_id': 'osci-content-'+p,
                    'data-sectionid': 'body',
                    'id': 'osci-content-'+p
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
        var note = app.collections.notes.get(cid);
        note.set('note', noteText);

        if (noteText === ""){
            note.destroy();
            $('#paragraph-'+paragraph_number).removeClass('withNotes').click();
        } else {
            note.save();
            $('#paragraph-'+paragraph_number).addClass('withNotes').click();
        }
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
