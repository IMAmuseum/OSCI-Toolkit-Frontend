OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'click .content-paragraph': 'paragraphClicked',
        'click .paragraph-button': 'paragraphClicked',
        'click #note-submit': 'noteSubmit',
        'click #cite': 'getCitation',
    },
    initialize: function() {


        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {
            var that = this;
            $("html, body").animate({
                scrollTop: 0
            }, 0);
            $('#section-view').empty();
            $('.header-view').empty();

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
        this.$el.html(this.template({sectionTitle: this.sectionTitle, content: $(this.content).html()}));

        // that refers to the view
        var that = this;

        $('figure').each( function( i, e ) {

            // Shorthand heirarchy
            var $w = null; // wrapper

            var $f = $(e);
            var $d = $f.find('.figure_content');
            var $o = $d.find('object');
            var $i = $o.find('img');


            var $c = $f.find('figcaption');

            // Check if the figure is wrapped; otherwise, wrap it
            if( $f.parent().attr('id') !== $f.attr('id') + '-wrapper' ) {
                $w = $("<div></div>").attr('id', $f.attr('id') + '-wrapper');
                $w.addClass('figure-wrapper');
                $f.wrap( $w ); // wraps in a copy!
            }

            // Figure was wrapped in a copy of $w, not $w itself, so select it again
            // This is super important! If attr() is not sticking, this is why
            $w = $f.parent();

            // Save the image dimensions if they are not already saved
            $i = $i[0]; // FireFox work-around... tentative!
            if( !$w.attr("data-aspect") ) {
                $w.attr('data-width', $i.width );
                $w.attr('data-height', $i.height );
                $w.attr('data-aspect', $i.height / $i.width );
            }

            // Reset all dimensions
            $w.add($f).add($d).add($o).add($i).css({
                'height' : 'auto',
                'width'  : 'auto'
            });

            // Use max-width on .figure-wrapper in _figure.scss to constrain it
            $w.css({
                'width' : '66%' // constrained by max width
            }).css({
                'height' : $w.attr('data-aspect') * $w.width() + $c.outerHeight()
            });


            // Continuing on...
            $f.css({
                'height' : $w.innerHeight(),
                'width' : $w.innerWidth()
            });

            // Just a little hack for mobile...
            if( $('#osci-bp-md,#osci-bp-sm').is(':visible') ) {
                $w.css({
                    'width' : '100%'
                });
            }

            $d.css({
                'height' : $f.innerHeight() - $c.outerHeight() - 12, // padding..?
                'width' : $f.innerWidth()
            });

            // Layered image init
            var url = $o.attr('data');
            if (url !== undefined) {

                $.ajax({

                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    success: function(data) {

                        var $content = $(data).filter('.layered_image-asset').first();
                        var $container = $f.find('.figure_content');
                        
                        // Note that this permanently deletes $o and $i
                        $container.empty();
                        $content.appendTo( $container );

                        var li = new window.LayeredImage( $content );

                        // This forces a re-centering of the layered image on windows.resize
                        that.listenTo(Backbone, 'windowResized', function(e) {
                            setTimeout( function() {

                                li.map.resize(); // recenter
                                
                                try {
                                    li.resetZoomRange(); // ensure it can scale down
                                    li.reset(); // reset size and options
                                    li.map.resize();
                                } catch(e) {
                                    // slider not init'd error
                                }
                                
                            }, 100 ); // this is an estimate, tweak it if needed
                        });

                    }

                });

            }

        }); 

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

    // Just trigger the event, leave the logic to ParagraphControlsView
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

        if (noteText != '') {
            note.save();
            textarea.html(noteText);
            $('#paragraph-'+paragraph_number).addClass('withNotes');
        }

        if (noteText === '') {
            note.destroy();
            $('#paragraph-'+paragraph_number).removeClass('withNotes');
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
