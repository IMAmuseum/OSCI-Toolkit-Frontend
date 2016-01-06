OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'default-section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'click .content-paragraph': 'paragraphClicked',
        'click .paragraph-button': 'paragraphButtonClicked',
        'click #note-submit': 'noteSubmit',
        'click #cite': 'getCitation',
    },
    initialize: function(options) {

        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {

            $("html, body").animate({
                scrollTop: 0
            }, 0);

            $('#section-view').empty();
            $('.header-view').empty();

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

                // console.log( this.model );

                app.models.section.loadContent();

            }

            $('#loader').hide();

        });

        // Used for toggling column count
        this.listenTo(Backbone, 'setSectionColumns', function( columnCount ) {

            $('#section').attr('data-columns-setting', columnCount );

            this.renderColumns();

        });

        // Set maximum height on figures to make sure they don't overflow their columns
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

        // Now resize figures to the correct height
        $('figure').each( function( i, e ) {

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
                $f.wrap( $w )
            }

            // Figure was wrapped in a copy of $w, not $w itself, so select it again
            $w = $f.parent();

            // Ensure that the figure (via its wrapper) always takes up a full column
            $w.css({
                'height' : $s.innerHeight() - sb, // scrollbar offset
                'width' : cw // column-width
            });

            // Expand figure to use all the available space
            // Since the figure height is defaulted to 0 in CSS,
            //   outerHeight(true) will return any margins
            $f.css({
                'height' : $w.innerHeight() - $f.outerHeight(true),
                'width' : 'auto' // column-width
            });

            // Let the caption expand to fill the space it needs
            $c.css({
                'height' : 'auto',
                'width' : 'auto'
            });


            // Set the dimensions of .figure_content to fill the space, sans figcaption
            $d.css({
                'height' : $f.innerHeight() - $c.outerHeight(true),
                'width' : 'auto'
            });

            // Set dimensions of image to fill the .figure_content div
            $i.css({
                'height' : $d.innerHeight(),
                'width' : 'auto'
            });


            /*
            $e.css({
                'max-height' : $('#section').innerHeight() - $('#section').css('padding-down'),
                'width' : $i.outerWidth()
            });

            
            var $c = $e.find('figcaption');

            // account for the figcaption when setting max height of inner elements
            // apply this to img and object too if using the fallback <img>
            var ch = $c.outerHeight();

            
            
            $e.find('.figure_content').css({
                'max-height' : 'auto',
                'max-width' : 'auto'
            }).css({
                'max-height' : $i.outerHeight(),
                'max-width' : $i.outerWidth()
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


                        new window.LayeredImage( $content );

                    }
                });
            }
           */

        }); 
        //*/


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
            
            i+=1;

        } while( ch > $sc.height() && ch !== _ch );

        // FireFox needs explicit height set for the section view
        $sv.css('height', $sc.innerHeight() );

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
    paragraphClicked: function(e) {

        // Checks if the user is logged in
        if ( app.account.get('email') != null) {

            var id = $(e.currentTarget).data('paragraph_number');
            Backbone.trigger('paragraphClicked', id);

        }

    },

    // Trigger a paragraph clicked event (pops up a cite / note box)
    paragraphButtonClicked: function(e) {

        // Checks if the user is logged in
        if ( app.account.get('email') != null) {

            var id = $(e.currentTarget).data('paragraph_number');
            Backbone.trigger('paragraphButtonClicked', id);

        }

    },

    // Over-ridden by the sub-theme
    isElementVisible: function(element) {
        return true;
    },

    // CALLED WHEN THE USER HITS THE SUBMIT NOTES BUTTON
    noteSubmit: function(e) {

        var textarea = $(e.currentTarget).parent().find('textarea');
        var noteText = textarea.val();

        var cid = textarea.data('id');
        var paragraph_number = textarea.data('paragraph_number');

        var note = app.collections.notes.get(cid);
            note.set('note', noteText);

        // Check to see if the red dot needs to be toggled
        if ( $.trim(noteText) !== '') {

            note.save();
            textarea.html(noteText);
            $('#paragraph-'+paragraph_number).addClass('withNotes');

        }else{

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

});
