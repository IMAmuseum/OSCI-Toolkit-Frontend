OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),

    initialize: function() {
        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {
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

        this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
            this.content =  sectionModel.get('content')[0].children.body;
            $('#loader').hide();
            this.getViewportSize();
            this.render();
        });

        this.listenTo(Backbone, 'windowResized', function() {
            this.getViewportSize();
            this.render();
        });

        this.listenTo(Backbone, 'layoutComplete', function() {
            this.getFullSectionWidth();
        });

        this.listenTo(Backbone, 'scrollToPage', function(direction) {
            console.log(direction);
            if (direction == 'next') {
                this.nextPage();
            }
            if (direction == 'prev') {
                this.prevPage();
            }
        });

    },

    render: function() {
        this.$el.html(this.template({content: $(this.content).html()}));
        Backbone.trigger("layoutComplete");
        return this;
    },

    nextPage: function(event) {
        console.log('nextPage');
        var that = this.x;
        $('#section').animate({
            left: '-='+that+'px'
        }, 1);
    },

    prevPage: function(event) {
        var that = this.x;
        $('#section').animate({
            left: '+='+that+'px'
        }, 1);
    },

    getViewportSize: function() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            x = w.innerWidth||e.clientWidth||g.clientWidth,
            y = w.innerHeight||e.clientHeight||g.clientHeight;
        this.x = x;
        this.y = y-110;

        // get reflow column styles
        this.columnWidthStyle = this.getPrefixedStyle('columnWidth');
        this.columnGapStyle = this.getPrefixedStyle('columnGap');
        this.spreadColumnWidth = this.x / 4;
        this.spreadGapWidth = this.spreadColumnWidth / 2;
        this.reflowStyle = 'margin: 0; width: auto; height:'+ this.y +'px; '+this.columnGapStyle +': '
            +this.spreadGapWidth+'px; '+this.columnWidthStyle +': '+this.spreadColumnWidth+'px;';
        $('#section').attr("style", this.reflowStyle);
    },

    getFullSectionWidth: function() {
        var d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            sx = g.scrollWidth,
            sy = g.scrollHeight;
        this.sectionWidth = sx;
        this.numPages = Math.floor(this.sectionWidth / this.x);
        console.log(this.numPages);
        $('#section').attr("style", 'position:relative; '+this.reflowStyle);
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
    }

});
