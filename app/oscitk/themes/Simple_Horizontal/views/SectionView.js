OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'scroll' : 'updateProgress',
        'click .paragraph-button': 'paragraphButtonClicked',
        'click .note-submit': 'noteSubmit',
    },
    initialize: function() {

        // http://underscorejs.org/#bindAll
        _.bindAll(this, 'updateProgress');


        var width; // see updateProgress
        $(window).scroll(this.updateProgress);
        this.maxHeightSet = false;

        this.$container = $('#container-container');

        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {

            var that = this;

            $('#determineWidth').remove();
            $('#section-view').empty(); // removes all the headings, p, figure, etc.
            $('.header-view').empty(); // changes section titles and whatnot


            this.$container.css('opacity', 0); // straight-up hiding it would be bad
            $('#loader').show();

            if (navItem) {

                // loading section content
                app.models.section = new OsciTk.models.Section({
                    uri : navItem.get('uri'),
                    id : navItem.get('id')
                });

                // this.model is undefined unless you call this function!
                this.changeModel(app.models.section);

                app.models.section.loadContent();
            }
        });


        // Technically, this should fire after all the AJAX calls, but it's close enough
        this.listenTo(Backbone, 'sectionRenderEnd', function() {
            $('#loader').hide();
            this.$container.css('opacity', 1);
        });


        // Used for toggling column count
        this.listenTo(Backbone, 'setSectionColumns', function( columnCount ) {

            $('#section').attr('data-columns-setting', columnCount );

            setTimeout( function(){

                // We're doing this through windowResized to trigger LayeredImage re-centering
                Backbone.trigger( 'windowResized' );

            }, 25)

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


        // Currently unused
        Backbone.trigger("sectionRenderStart");

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
                                    li.map.resize();
                                } catch(e) {
                                    // slider not init'd error
                                }
                                
                            }, 100 ); // 250 is an estimate, tweak it if needed
                        });

                        // Chrome hack; moves figures back and forth, fixing mid-figure column breaks. Magic!
                        that.listenTo(Backbone, 'windowResized', function(e) {

                            var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
                            if( is_chrome ) {

                                $('.figure-wrapper').each( function(i,e) {
                                    var $fig = $(this);
                                    $fig.prev().before( $fig );
                                    $fig.next().after( $fig );
                                });

                            }

                        });

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
        //$sv.css('height', $sc.innerHeight() );

        // Safari will break if the figure wrappers have explicit heights 
        // For some reason, on this theme, it'll also beak due to content overflow
        var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if( is_safari ) {
            $('.figure-wrapper').css('height', '' );
            $('.figure-wrapper').css('-webkit-column-break-inside', 'auto' );
        }

        // see NavigationView.js
        Backbone.trigger("sectionRenderEnd");

        $('img').imagesLoaded( function() {

            // See NavigationView.js
            // Typically triggered at same time as "sectionRenderEnd"
            Backbone.trigger("navigateReady");

        });

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

        Backbone.trigger("layoutComplete");

        // Used to ensure that all figures are of a conistent width
        $('#section').imagesLoaded( function() {
            Backbone.trigger("windowResized");
        });

        return this;
    },

    // Get section sectionTitle, subtitle for use in template
    getSectionTitles: function(sectionId) {

        _.each(app.collections.navigationItems.models, function(item) {
            if (item.get('id') == sectionId ) {
                this.sectionTitle = item.get('title');
                this.sectionSubtitle = item.get('subtitle');
            }
        }, this);

        this.render();

    },

    updateProgress: function() {


        var value = $(document).scrollLeft();
        var max = this.$el.innerWidth();
            max -= $(window).width();

        var percent = (value/max)*100;

        // Just some debug info
        $('.progress .progress-bar').attr('data-max', max);
        $('.progress .progress-bar').attr('data-now', value);

        $('.progress .progress-bar').attr('style', 'width: ' + percent + '%');

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

    paragraphButtonClicked: function(e) {
        var p = $(e.currentTarget);
        var paragraphNum = p.data("paragraph_number");
        Backbone.trigger("paragraphButtonClicked", paragraphNum);
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


});
