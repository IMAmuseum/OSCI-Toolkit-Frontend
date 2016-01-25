OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'click .paragraph-button': 'paragraphButtonClicked',
    },
    initialize: function(options) {

        // See NavigationView.js and  ../../../Router.js
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {

            $("html, body").animate({
                scrollTop: 0
            }, 0);

            // this.$el.parent().empty(); // #section-view

            if ( navItem ) {

                // loading section content
                app.models.section = new OsciTk.models.Section({
                    uri : navItem.get('uri'),
                    id : navItem.get('id')
                })

                // not sure where this is used
                this.ContentId = navItem.get('id');

                // this.model is undefined unless you call this function!
                this.changeModel(app.models.section);

                // This makes the AJAX calls, parsing XML
                app.models.section.loadContent();

            }

        });


        // Set maximum height on figures to make sure they don't overflow their columns
        this.listenTo(Backbone, 'imagesLoaded', function() {
            this.renderLayout();
        });

        // Proceed to render after the section is ready
        this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {

            // We will modify this and pass it to our template via this.render
            this.content = sectionModel.get('content')[0].children.body;

            this.processParagraphs(sectionModel);
            this.sectionId = sectionModel.get('id');
            this.getSectionTitles(this.sectionId);

            // Render will be expecting the above functions to have completed
            this.render();

        });


        return true;
    },

    // Layout magic happens here
    renderLayout: function(  ) {

        // see NavigationView.js
        Backbone.trigger("sectionRenderStart");
        



        // that refers to the view
        var that = this;

        $('figure').each( function( i, e ) {

            var $e = $(e); //shorthand

            // We need to explicitly set .figure_content height,
            //   so as to avoid trouble when the window resizes

            var $i = $(e).find('img');
            $e.find('.figure_content').css({
                'height' : 'auto',
                'width'  : 'auto'
            }).css({
                'height' : $i.outerHeight(),
                'width'  : $i.outerWidth()
            });

            // Layered image init
            var url = $e.find('object').attr('data');
            if (url !== undefined) {

                $.ajax({

                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    success: function(data) {

                        var $content = $(data).filter('.layered_image-asset').first();
                        var $container = $e.find('.figure_content');
                        
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

        // see NavigationView.js
        Backbone.trigger("sectionRenderEnd");

    },

    // Get section sectionTitle, subtitle, and thumbnail for use in template
    getSectionTitles: function(sectionId) {

        // Save context to avoid setting window variables
        var that = this;

        _.each(app.collections.navigationItems.models, function(item) {
            if (item.get('id') == sectionId ) {
                that.sectionTitle = item.get('title');
                that.sectionSubtitle = item.get('subtitle');
                that.sectionThumbnail = item.get('thumbnail');
            }
        }, this);

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


        // Adjust the size of the headline
        $('h3').fitText(1.2, { minFontSize: '30px', maxFontSize: '42px' });

        // Add plate image to front as background to .plate
        // Should be done before any height processing at all
        // We want the images to load first!
        var plateFigures = app.collections.figures.where({plate: true});
        if( plateFigures.length > 0 ) {

            var $plate = $( plateFigures[0].get('body') );
            var $table = this.$el.find('#figure-plate-container');

            var id = $plate.find('object').attr('id');
            var $img = $plate.find('img');

            // This is what we would use to place the plate as an img
            /*
            if( $table.find('#'+id).length < 1 ) {
                $img.prependTo( $table );
                $img.addClass('plate');
                $img.attr('id', id );
            }
            */

            var src = $img.attr('src');

            $table.css('background-image', 'url("' + src + '")' );
            $table.attr('id', id);
            $table.addClass('plate');

            // We want to get the dimensions of the image w/o displaying it
            var imageLoad = function() {

                var $img = $('<img/>');

                $img.attr( 'src', src );
                $img.load( function() {
                    $table.attr('data-width', this.width);
                    $table.attr('data-height', this.height);
                    $table.attr('data-aspect', this.height / this.width);
                    $img.remove(); // vs. memory leaks
                    resizePlate(); // requires data-aspect
                } );

            };

            // Now we need to constrain the $table to be no taller than that which would allow for the 
            //   chapter title to be seen; accounting for navigation and toolbar on smaller screens

            var resizePlate = function() {

                $table.height(0);

                var h = $(window).height();
                    h -= 15; // .section-content vertical padding
                    h -= $('#section-offset').offset().top; // size of section heading
                
                // Account for navigation
                if( $('#osci-bp-lg').is(':visible') ) {
                    h -= $('#navigation').outerHeight();
                }

                // TODO: Account for toolbar menu on mobile

                // Check if the auto height is smaller than the necessary height
                // Since this is a div, we need to calculate the auto height by hand
                var w = $table.width();
                var t = $table.attr('data-aspect') * w;

                if( t > h ) {
                    $table.height(h);
                }else{
                    $table.height(t);
                }

            };

            // Just some standard jQuery binds...
            $(window).on('resize', resizePlate );

            // Not necessary, since section won't render until all images are loaded anyway
            //$(window).on('load', imageLoad );

            this.listenTo( Backbone, "sectionRenderEnd", imageLoad );
            
        }

        Backbone.trigger("layoutComplete");

        // Used to ensure that all figures are of a conistent width
        $('img').load( function() {
            Backbone.trigger("imagesLoaded");
        });

        return this;
    },

    // Add data attributes to paragraphs; used for paragraph tooltips
    processParagraphs: function(sectionModel) {
        
        var paragraphs = $(this.content.children).filter('p');

        _.each( paragraphs, function(e, i) {

            var j = i+1; // see also ParagraphControlsView.js
            $(e).attr({

                'data-paragraph_number': j,
                'data-osci_content_id': 'osci-content-'+j,
                'data-sectionid': 'body',
                'id': 'osci-content-'+j

            }).addClass('content-paragraph');

        }, this);
    },

    // Trigger a paragraph clicked event (pops up a cite / note box)
    paragraphButtonClicked: function(e) {

        var id = $(e.currentTarget).data('paragraph_number');
        Backbone.trigger('paragraphButtonClicked', id);


    },

    // Over-ridden by the sub-theme
    isElementVisible: function(element) {
        return true;
    },


});
