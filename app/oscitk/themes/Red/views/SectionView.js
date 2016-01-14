OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'default-section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'click .paragraph-button': 'paragraphButtonClicked'
    },
    initialize: function(options) {

        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {

            $('#section-view').empty(); // removes all the headings, p, figure, etc.
            $('.header-view').empty(); // changes section titles and whatnot

            $('#section').css('opacity', 0); // straight-up hiding it would be bad
            $('#loader').show();

            if (navItem) {

                // loading section content
                app.models.section = new OsciTk.models.Section({
                    uri : navItem.get('uri'),
                    id : navItem.get('id')
                });

                // not sure where this is used
                this.ContentId = navItem.get('id');

                // this.model is undefined unless you call this function!
                this.changeModel(app.models.section);

                app.models.section.loadContent();

            }

        });

        // Technically, this should fire after all the AJAX calls, but it's close enough
        this.listenTo(Backbone, 'columnRenderEnd', function() {
            $('#loader').hide();
            $('#section').css('opacity', 1);
        });


        // We'll keep track of all things happening and hide the loader when it's done...


        // listen a laundry list of events and trigger hideLoader when they are ready
        // make sure to wait until all of the images have been converted into layeredImages

        // Used for toggling column count
        this.listenTo(Backbone, 'setSectionColumns', function( columnCount ) {

            $('#section').attr('data-columns-setting', columnCount );

            // We're doing this through windowResized to trigger LayeredImage re-centering
            Backbone.trigger( 'windowResized' );

        });

        // Set maximum height on figures to make sure they don't overflow their columns
        // Also re-centers LayeredImages
        this.listenTo(Backbone, 'windowResized', function() {
            this.renderColumns();
        });

        // Proceed to render after the section is ready
        this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {

            // We will modify this and pass it to our template via this.render
            this.content = sectionModel.get('content')[0].children.body;

            this.makeIds(sectionModel);
            this.sectionId = sectionModel.get('id');
            this.getSectionTitles(this.sectionId);

            // Render will be expecting the above functions to have completed
            this.render();

        });


        return true;
    },

    // Layout magic happens here
    renderColumns: function(  ) {

        // Shorthand
        var $sv = this.$el;             // $('#default-section-view')
        var $sc = this.$el.parent();    // $('#section') i.e. section-view container

        var sb = 0,   // scroll bar height compensation, currently unused
            cg = 40,  // column-gap
            cc,       // column-count
            sw,       // $('#section').width()
            cw,       // column-width
            sh,       // $('#section').heght()
            ch;       // column-height i.e. $sv.height()


        // see NavigationView.js
        Backbone.trigger("columnRenderStart");

        // Apply the column gap
        $sv.css({
            '-webkit-column-gap': cg,
               '-moz-column-gap': cg,
                    'column-gap': cg
        });

        // Determine column count. Default is 2. Force 1 on mobile.
        // Note that this is hardcoded to match Bootstrap's breakpoints
        cc = $sc.attr('data-columns-setting');
        cc = typeof cc === 'undefined' ? 2 : parseInt( cc );
        cc = $(window).width() < 768 ? 1 : cc; 

        // Used for page scrolling in NavigationView.js
        $sc.attr('data-columns-rendered', cc );

        // Reset all stats for the section view
        $sv.css({
            '-webkit-column-width': 'auto',
               '-moz-column-width': 'auto',
                    'column-width': 'auto',
            '-webkit-column-count': 'auto',
               '-moz-column-count': 'auto',
                    'column-count': 'auto',
                           'width': 'auto',
                          'height': 'auto'
        });

        // Determine column width using width of #section 
        sw = $sc.width();
        cw = (sw/cc) - cg/2; // account for one gap
        
        $('#default-section-view').css({
            '-webkit-column-width': cw,
               '-moz-column-width': cw,
                    'column-width': cw
        }); 
        
        // Add plate image to front..?
        //*
        var plateFigures = app.collections.figures.where({plate: true});
        if( plateFigures.length > 0 ) {
            var $plate = $( plateFigures[0].get('body') );
            var $table = this.$el;

            var id = $plate.find('object').attr('id');
            var $img = $plate.find('img');
                $img.attr('id', id );

            if( $table.find('#'+id).length < 1 ) {
                $img.prependTo( $table );
                $img.css('width', '100%');
            }
            
        }
        //*/
            
        /*
        if (plateFigures.length) {
            _.each(plateFigures, function(fig) {
                this.unplacedFigures.push(fig.id);
            }, this);
        }
        */

        // Save context to avoid setting window variables
        var that = this;

        // Now resize figures to the correct height
        this.$el.find('figure').each( function( i, e ) {

            // Shorthand heirarchy
            var $s = $('#section');
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
                $w.addClass('noSwipe'); // see NavigationView.js
                $f.wrap( $w )
            }

            // Figure was wrapped in a copy of $w, not $w itself, so select it again
            $w = $f.parent();

            // Ensure that the figure (via its wrapper) always takes up a full column
            $w.css({
                'width' : cw, // column-width
                'height' : $s.innerHeight() - sb // scrollbar offset
            }); 

            // Expand figure to use all the available space
            // TODO: Account for margins?
            $f.css({
                'height' : $w.innerHeight(),
                'width' : 'auto' // column-width
            });

            // IE hot-fix: remove float from .figure-wrapper
            var is_ie = detectIE(); // returns 0 or IE version, see _functions.js
            if( is_ie ) {
                $w.css({
                    'float' : 'none'
                });
            }

            // In IE, figcaptions get pushed to next column if bottom: 0 is set
            // Therefore, we must set bottom: 0 here instead of in _figures.css
            // Furthermore, position must be (re)set to absolute for calc,
            //   but in ie, it will be set to relative later to avoid overflow
            if( !is_ie ) {
                $c.css({
                    'bottom' : 0
                });
            }else{
                $c.css({
                    'position' : 'relative'
                });
            }

            setTimeout( function() {
                var is_ie = detectIE();
                if( is_ie ) {
                    $c.css({
                        'position' : 'relative'
                    });
                }
            }, 250 );

            // Set the dimensions of .figure_content to fill the space, sans figcaption
            $d.css({
                'height' : $f.innerHeight() - $c.outerHeight(true) - ( is_ie ? 80 : 10 ), // - 40 for IE ?
                'width' : 'auto'
            });

            // Set dimensions of image to fill the .figure_content div
            $i.css({
                'height' : $d.innerHeight(),
                'width' : 'auto'
            });

            // In FireFox, figcaption will not appear unless it is first-child of figure
            // This moves the figcaption above the LayeredImage; necessary compromise
            // I think this is a conflict with CSS3 columns, which will be fixed in future versions
            var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if( is_firefox ) {
                //console.log( 'I am firefox!' );
                $d.before( $c );
            }

            // Layered image init
            // <object/> is removed in the AJAX call, so this will be called only on first load of section
            var url = $f.find('object').attr('data');
            if (url !== undefined) {

                $.ajax({

                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    success: function(data) {

                        var $content = $(data).filter('.layered_image-asset').first();
                        var $container = $f.find('.figure_content');
                        

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
                                } catch(e) {
                                    // slider not init'd error
                                }
                                
                            }, 500 ); // 500 is an estimate, tweak it if needed
                        });

                        // Chrome hack; moves figures back and forth, fixing mid-figure column breaks. Magic!
                        var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
                        if( is_chrome ) {
                            $('.figure-wrapper').each( function(i,e) {
                                if( $(this).offset().top < 0 ) {
                                    $(this).prev().before( $(this) );
                                }
                            });
                        }

                    }
                });
            }
        });


        // Now that the height of all elements is determined,
        // Increase number of columns until everything fits vertically,
        // Or until there is no more change in height
        var ch = 0; var _ch = -1; var i = cc;
        do {

            $sv.css({
                '-webkit-column-count': i.toString(),
                   '-moz-column-count': i.toString(),
                        'column-count': i.toString()
            }); 

            $sv.width( i * cw + (i - 1) * cg);

            _ch = ch;
             ch = this.$el.height();
            
            // console.log( _ch, ch );

            i+=1;

        } while( ch > $sc.height() && ch !== _ch );

        // FireFox needs explicit height set for the section view
        $sv.css('height', $sc.innerHeight() );

        // Safari will break if the figure wrappers have explicit heights 
        var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if( is_safari ) {
            $('.figure-wrapper').css('height', '' ); 
        }

        // see NavigationView.js
        Backbone.trigger("columnRenderEnd");

    },

    // Get section sectionTitle, subtitle, and thumbnail for use in template
    getSectionTitles: function(sectionId) {

        // Save context to avoid setting window variables
        var that = this;

        _.each(app.collections.navigationItems.models, function(item) {
            if (item.get('id') == sectionId ) {
                that.sectionTitle = item.get('title');
                that.sectionSubtitle = item.get('subtitle');
                //that.sectionThumbnail = item.get('thumbnail');
            }
        }, this);

    },

    render: function() {

        //clean up the view incase we have already rendered this before
        this.model.removeAllPages();
        this.removeAllChildViews();

        // Apply template set above + render the html
        this.$el.html(
            this.template( {
                sectionTitle: this.sectionTitle,
                sectionSubtitle: this.sectionSubtitle,
                //sectionThumbnail: this.sectionThumbnail,
                content: $(this.content).html()
            } )
        );

        // numPages is for NavigationView.js -- remove if it's not used
        // Backbone.trigger("layoutComplete", { numPages : this.model.get('pages').length } );

        Backbone.trigger("layoutComplete");

        // Used to ensure that all figures are of a conistent width
        $('#section').imagesLoaded( function() {
            Backbone.trigger("windowResized");
        });

        return this;
    },

    // Garbage collection
    onClose: function() {
        this.model.removeAllPages();
    },

    // Add data attributes to paragraphs; used for paragraph tooltips
    makeIds: function(sectionModel) {
        
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
    /*
    paragraphClicked: function(e) {

        // Checking whether or not the user is logged in is handled by ParagraphControlsView
        var id = $(e.currentTarget).data('paragraph_number');
        Backbone.trigger('paragraphClicked', id);

    },
    */

    // Trigger a paragraph clicked event (pops up a cite / note box)
    paragraphButtonClicked: function(e) {

        // Checking whether or not the user is logged in is handled by ParagraphControlsView.js
        var id = $(e.currentTarget).data('paragraph_number');
        Backbone.trigger('paragraphButtonClicked', id);

    },

    // Over-ridden by the sub-theme
    isElementVisible: function(element) {
        return true;
    },


});
