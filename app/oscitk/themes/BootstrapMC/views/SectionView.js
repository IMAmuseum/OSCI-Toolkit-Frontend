OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        "scroll" : "updateProgress"
    },
    initialize: function() {
        _.bindAll(this, 'updateProgress');
        // bind to window
        $(window).scroll(this.updateProgress);
        this.maxHeightSet = false;
        this.pageNumber = 1;

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

                app.models.section.loadContent();
                this.changeModel(app.models.section);
            }
        });

        this.listenTo(Backbone, 'windowResized', function() {
            this.maxHeightSet = false;
            this.getViewportSize();
            this.setFigureStyles();
            this.render();
        });

        this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
            this.content =  sectionModel.get('content')[0].children.body;
            $('#loader').hide();
            this.getViewportSize();
            this.setFigureStyles();
            this.render();
        });

        this.listenTo(Backbone, 'layoutComplete', function() {
            this.getFullSectionWidth();
        });

        this.listenTo(Backbone, 'changePage', function(direction) {
            if (direction == 'next') {
               this.nextPage();
            }
            if (direction == 'prev') {
                this.prevPage();
            }
        });

        this.listenTo(Backbone, "figuresAvailable", function(figures) {
            this.figures = figures;
        });
    },

    render: function() {
        this.$el.html(this.template({content: $(this.content).html()}));
        Backbone.trigger("layoutComplete");
        return this;
    },

    nextPage: function() {
        var x = this.moveWidth;
        console.log(x);
        $('#section').animate({
            left: '-='+x+'px'
        }, 1);
    },

    prevPage: function() {
        var x = this.moveWidth;
        console.log(x);
        $('#section').animate({
            left: '+='+x+'px'
        }, 1);
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

    getViewportSize: function() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            x = w.innerWidth||e.clientWidth||g.clientWidth,
            y = w.innerHeight||e.clientHeight||g.clientHeight;
        this.x = x;
        this.y = y-150;

        // get reflow column styles
        this.columnWidthStyle = this.getPrefixedStyle('columnWidth');
        this.columnGapStyle = this.getPrefixedStyle('columnGap');
        this.spreadColumnWidth = this.x / 3;
        this.spreadGapWidth = this.spreadColumnWidth / 3;
        this.reflowStyle = 'width: auto; height:'+ this.y +'px; '+this.columnGapStyle +': '
            +this.spreadGapWidth+'px; '+this.columnWidthStyle +': '+this.spreadColumnWidth+'px;';
        $('#section').attr("style", this.reflowStyle);
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
        console.log(this.numPages + this.numFigures);
        $('#section').attr("style", 'position:relative; width: 100%; '+this.reflowStyle);
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

    setFigureStyles: function() {
        _.each(this.figures, function(figure) {
            var position = $(figure).data('position');
            var prefixBreak = this.getPrefixedStyle('columnBreakAfter');
            var prefixSpan = this.getPrefixedStyle('columnSpan');
            switch(position) {
                // plate
                case 'p':
                case 'plate':
                    // style applied to the figure image tag
                    var imgStyle = "max-height:"+(this.y - 20 )+"px; max-width:"+this.spreadColumnWidth+"px;";
                    // style applied th the figure tag
                    $(figure).attr("style", prefixBreak+": always;");
                    break;
                // bottom
                case 'b':
                    var height = this.y / 2;
                    $(figure).attr("style", prefixBreak+ ": always; position:relative; margin:auto;");
                    var imgStyle = "max-height:"+(height)+"px; max-width:"+this.spreadColumnWidth+"px;";
                    break;
            }
            $(figure).find("div > object > div > img").attr("style", imgStyle);
        }, this);
        this.numFigures = this.figures.size();
    }

            // //Determine the top offset based on the layout hint
            // switch (modelData.position.vertical) {
            //     //top & regular plate image
            //     case 't':
            //     case 'p':
            //         offsetTop = 0;
            //         break;
            //     // full page plate
            //     case 'f':
            //         offsetTop =  (dimensions.innerSectionHeight - this.calculatedHeight) / 2;
            //         break;
            //     //bottom
            //     case 'b':
            //         offsetTop = dimensions.innerSectionHeight - this.calculatedHeight;
            //         break;
            //     //case inline
            //     case 'i':
            //         offsetTop = currentColumn.position.top + currentColumn.height - currentColumn.heightRemain;
            //         //add figure gutter if not at top of a column
            //         if (currentColumn.height - currentColumn.heightRemain > 0) {
            //             offsetTop += dimensions.figureContentGutter;
            //         }
            //         break;
            // }
});
