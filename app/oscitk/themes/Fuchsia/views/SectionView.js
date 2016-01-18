OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        'click .paragraph-button': 'paragraphButtonClicked',
        'click #note-submit': 'noteSubmit',
        'click #cite': 'getCitation',
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

            this.renderColumns();

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
    renderColumns: function(  ) {

        // see NavigationView.js
        Backbone.trigger("columnRenderStart");
        
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

        // numPages is for NavigationView.js -- remove if it's not used
        // Backbone.trigger("layoutComplete", { numPages : this.model.get('pages').length } );

        // Add plate image to front..?
        // Should be done before any height processing at all
        // We want the images to load first!
        var plateFigures = app.collections.figures.where({plate: true});
        if( plateFigures.length > 0 ) {
            var $plate = $( plateFigures[0].get('body') );
            var $table = this.$el;

            var id = $plate.find('object').attr('id');
            var $img = $plate.find('img');
                $img.attr('id', id );

            if( $table.find('#'+id).length < 1 ) {
                $img.prependTo( $table );
                $img.addClass('plate');
            }
            
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
