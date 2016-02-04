OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'click .paragraph-button': 'paragraphButtonClicked'
    },
    initialize: function() {

        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {

            if ( navItem ) {

                // loading section content
                app.models.section = new OsciTk.models.Section({
                    uri : navItem.get( 'uri' ),
                    id : navItem.get( 'id' )
                });

                // This makes the AJAX calls, parsing XML
                app.models.section.loadContent();

            }

        });

        // Set maximum height on figures to make sure they don't overflow their columns
        this.listenTo(Backbone, 'imagesLoaded', function() {
            this.renderLayout();
        });

        // Proceed to render after the section is ready
        this.listenTo(Backbone, 'sectionLoaded', function( sectionModel ) {

            // We will modify this and pass it to our template via this.render
            this.content = sectionModel.get('content')[0].children.body;

            this.processParagraphs( sectionModel );
            this.sectionId = sectionModel.get( 'id' );
            this.getSectionTitles( this.sectionId );

            // Render will be expecting the above functions to have completed
            this.render();

        });

    },

    render: function() {

        // clean up the view incase we have already rendered this before
        this.removeAllChildViews();

        // Apply template set above + render the html
        this.$el.html(
            this.template( {
                sectionTitle: this.sectionTitle,
                sectionSubtitle: this.sectionSubtitle,
                sectionThumbnail: this.sectionThumbnail,
                content: $(this.content).html()
            } )
        );

        // See Footnotes, GlossaryTooltip, Navigation, and ParagraphControls
        Backbone.trigger("layoutComplete");

        // Used to ensure that all figures are of a conistent width
        $('img').imagesLoaded( function() {
            Backbone.trigger("imagesLoaded");
        });

        return this;
    },

    renderLayout: function() {

        // Currently not used by anything
        Backbone.trigger("sectionRenderStart");

        // that refers to the view
        var that = this;

        $('figure').each( function( i, e ) {

            // Shorthand heirarchy
            var $w = null; // wrapper

            var $f = $(e);
            var $d = $f.find('div.figure_content');
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

        // again, currently not used
        Backbone.trigger("sectionRenderEnd");

        // we want to re-calibrate the layout on resize
        this.listenToOnce(Backbone, 'windowResized', function(section) {
            this.renderLayout();
        });

    },

    // Get section sectionTitle, subtitle, and thumbnail for use in template
    getSectionTitles: function(sectionId) {

        _.each(app.collections.navigationItems.models, function(item) {
            if (item.get('id') == sectionId ) {
                this.sectionTitle = item.get('title');
                this.sectionSubtitle = item.get('subtitle');
                this.sectionThumbnail = item.get('thumbnail');
            }
        }, this);

    },

    // Add data attributes to paragraphs; used in ParagraphControlsView.js
    processParagraphs: function( sectionModel ) {

        var paragraphs = $(this.content.children).filter('p');
        _.each( paragraphs, function(e, i) {

            var $e = $(e);
            var j = i+1; 

            $(e).addClass('content-paragraph');
            $(e).attr({
                'data-paragraph_number': j,
                'data-osci_content_id': 'osci-content-'+j,
                'data-sectionid': 'body',
                'id': 'osci-content-'+j
            });

        }, this);

    },

    // Trigger a paragraph clicked event (pops up a cite / note box)
    paragraphButtonClicked: function(e) {
        var id = $(e.currentTarget).data('paragraph_number');
        Backbone.trigger('paragraphButtonClicked', id);

    },

});
