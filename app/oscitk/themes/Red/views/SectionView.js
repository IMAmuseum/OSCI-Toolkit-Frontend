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

            // DEBUGGING
            //console.log( "SectionView caught currentNavigationItemChanged" );

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
                })

                // not sure where this is used
                this.ContentId = navItem.get('id');

                // this.model is undefined unless you call this function!
                this.changeModel(app.models.section);

                // console.log( this.model );

                app.models.section.loadContent();

            }

            $('#loader').hide();

        });

        this.listenTo(Backbone, 'setSectionColumns', function( columnCount ) {

            $('#section').attr('data-columns-setting', columnCount );
            this.renderColumns();

        });

        // Set maximum height on figures to make sure they don't overflow their columns
        this.listenTo(Backbone, 'windowResized', function() {

            this.renderColumns();
            //this.render();

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

        this.listenTo(Backbone, "figuresAvailable", function(figures) {

            //console.log( "SectionView caught figures available..." );

            this.figures = figures;
            this.setFigureStyles();

        });



        return true;
    },

    renderColumns: function(  ) {

        var sh = $('#section').height();

        $('figure').each( function( i, e ) {

            // set max-height of figure equal to #section height
            var $e = $(e);
                $e.css('max-height', sh );

            var $c = $e.find('figcaption');

            // account for the figcaption when setting max height of inner elements
            var ch = $c.outerHeight();
                $e.find('.figure_content,object,img').css('max-height', sh - ch - 10);

            // now, constrain the width of the figure caption
            $e.css('max-width', 'none' );            

            var iw = $e.find('img').outerWidth();
                $c.css('max-width', iw );

            $e.css('max-width', iw );

        }); 
            
        // set column gap here so that it's readily accessible
        var cg = 40;
        $('#default-section-view').css({
            '-webkit-column-gap': cg,
               '-moz-column-gap': cg,
                    'column-gap': cg
        });


        // Determine column count
        var cc = $('#section').attr('data-columns-setting');

        if( typeof cc === 'undefined' ) {
            cc = 2;
        }else{
            cc = parseInt( cc );
        }

        if( $(window).width() < 768 ) {
            cc = 1;
        }

        $('#section').attr('data-columns-rendered', cc );


        // Reset the stats of #default-section-view
        $('#default-section-view').css({
            '-webkit-column-width': 'auto',
               '-moz-column-width': 'auto',
                    'column-width': 'auto',
            '-webkit-column-count': 'auto',
               '-moz-column-count': 'auto',
                    'column-count': 'auto',
                           'width': 'auto'
        });

        // set the width of the columns in #section to equal 1/2 of #section width
        var sw = $('#section').width();
        var cw = (sw/cc) - cg/2; // account for one gap
        

        //console.log( cw );

        $('#default-section-view').css({
            '-webkit-column-width': cw,
               '-moz-column-width': cw,
                    'column-width': cw
        }); 

        // ENSURE THIS NEVER FAILS
        var ch = 0; var i = cc;
        do {

            $('#default-section-view').css({
                '-webkit-column-count': i.toString(),
                   '-moz-column-count': i.toString(),
                        'column-count': i.toString()
            }); 

            //console.log( i );
            $('#default-section-view').width( i * cw + (i - 1) * cg);

            ch = $('#default-section-view').height();
            i+=1;

        } while( ch > $('#section').height() );

        // see NavigationView.js
        Backbone.trigger("columnsComplete");

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

        // DEBUGGING
        //console.log( "SectionView rendering..." );

        //clean up the view incase we have already rendered this before
        this.model.removeAllPages();
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

        Backbone.trigger("layoutComplete");

        // Used to ensure that all figures are of a conistent width
        $('img').load( function() {
            Backbone.trigger("windowResized");
        });

        return this;
    },

    // Garbage collection
    onClose: function() {
        this.model.removeAllPages();
    },

    // Given a paragraph id, get parent page
    /*
    getPageForParagraphId: function(pid) {

        var views = this.getChildViews();
        var p = _.find(views, function(view) {
            return view.$el.find("[data-paragraph_identifier='" + pid + "']").length !== 0;
        });

        if ((p !== undefined) && (p !== -1)) {
            return _.indexOf(views, p) + 1;
        }

        return null;
    },
    */

    // Given an element, get parent page
    /*
    getPageNumberForSelector: function(element) {
        var page = $(element).parents(".page");
        if (page) {
            return page.data("page_num");
        }

        return null;
    },
    */

    // Given an #id, get parent page
    /*
    getPageNumberForElementId : function(id) {
        var views = this.getChildViews();
        var p = _.find(views, function(view) { return view.containsElementId(id); });
        if ((p !== undefined) && (p !== -1)) {
            return _.indexOf(views, p) + 1;
        }
        return null;
    },
    */

    // MultiColumn: used by InlineNotesView
    /*
    getCurrentPageView: function() {
        // TODO: so the only possible child view of a section is a page???
        return this.getChildViewByIndex(app.views.navigationView.page - 1);
    },
    */

    /*
    getPageForProcessing : function(id, newTarget) {
        var page;

        // Are we looking for an existing page?
        if (id !== undefined) {

            page = this.getChildViewById(id);

        } else {

            page = _.filter(this.getChildViews(), function(page){
                return page.isPageComplete() === false;
            });

            //console.log( page );
            
            if (page.length === 0) {

                var pagesCollection = this.model.get('pages');
                pagesCollection.add({
                    pageNumber: this.model.get('pages').length + 1
                });

                page = new OsciTk.views[this.options.pageView]({
                    model : pagesCollection.last(),
                    pageNumber : this.model.get('pages').length
                });

                this.addView(page, newTarget);

            } else {

                page = page.pop();

            }
        }

        return page;
    },
    */
    /*
        this.listenTo(Backbone, "navigate", function(data) {
            var matches, refs, occurrenceCount, j;
            var gotoPage = 1;
            if (data.page) {
                gotoPage = data.page;
            }
            else if (data.identifier) {
                switch (data.identifier) {
                    case 'end':
                        gotoPage = this.model.get('pages').length;
                        break;
                    case 'start':
                        gotoPage = 1;
                        break;
                    default:
                        var page_for_id = null;
                        if(data.identifier.search(/^p-[0-9]+/) > -1) {
                            var pid = data.identifier.slice(data.identifier.lastIndexOf('-') + 1, data.identifier.length);
                            page_for_id = this.getPageForParagraphId(pid);
                        } else if (data.identifier.search(/^fig-[0-9]+-[0-9]+-[0-9]+/) > -1) {
                            // Route for figure references
                            matches = data.identifier.match(/^(fig-[0-9]+-[0-9]+)-([0-9])+?/);
                            var figureId = matches[1];
                            var occurrence = matches[2] ? parseInt(matches[2],10) : 1;

                            refs = $(".figure_reference").filter("[href='#" + figureId + "']");
                            if (refs.length) {
                                if (refs.length === 1) {
                                    page_for_id = this.getPageNumberForSelector(refs[0]);
                                } else {
                                    //find visible occurence
                                    occurrenceCount = 0;
                                    for (j = 0, l = refs.length; j < l; j++) {
                                        if (this.isElementVisible(refs[j])) {
                                            occurrenceCount++;
                                            if (occurrenceCount === occurrence) {
                                                page_for_id = this.getPageNumberForSelector(refs[j]);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (data.identifier.search(/^fn-[0-9]+-[0-9]+/) > -1) {
                            // Route for footnote references
                            matches = data.identifier.match(/^fn-[0-9]+-[0-9]+/);
                            refs = $('a[href="#' + matches[0] + '"]');
                            if (refs.length === 1) {
                                page_for_id = this.getPageNumberForSelector(refs[0]);
                            }
                            else {
                                // find visible occurence
                                for (j = 0; j < refs.length; j++) {
                                    if (this.isElementVisible(refs[j])) {
                                        page_for_id = this.getPageNumberForSelector(refs[j]);
                                        break;
                                    }
                                }
                            }
                        } else {
                            page_for_id = this.getPageNumberForElementId(data.identifier);
                        }

                        if (page_for_id !== null) {
                            gotoPage = page_for_id;
                        } else {
                            gotoPage = 1;
                        }

                        break;
                }
            }

            //make the view visible
            this.getChildViewByIndex(gotoPage - 1).show();

            //calculate the page offset to move the page into view
            var offset = (gotoPage - 1) * (this.dimensions.innerSectionHeight) * -1;

            //TODO: add step to hide all other pages
            var pages = this.getChildViews();
            var numPages = pages.length;
            for(var i = 0; i < numPages; i++) {
                if (i !== (gotoPage - 1)) {
                    pages[i].hide();
                }
            }

            //move all the pages to the proper offset
            this.$el.find("#pages").css({
                "-webkit-transform": "translate3d(0, " + offset + "px, 0)",
                "-moz-transform": "translate3d(0, " + offset + "px, 0)",
                "transform": "translate3d(0, " + offset + "px, 0)"
            });

            //trigger event so other elements can update with current page
            Backbone.trigger("pageChanged", {page: gotoPage});

        });
    */
    // Add data attributes to paragraphs; used for paragraph tooltips
    makeIds: function(sectionModel) {
        
        var paragraphs = $(this.content.children).filter('p');

        _.each( paragraphs, function(e, i) {

            $(e).attr({

                'data-paragraph_number': i+1,
                'data-osci_content_id': 'osci-content-'+i,
                'data-sectionid': 'body',
                'id': 'osci-content-'+i

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

        var $this = this;
        var textarea = $(e.currentTarget).parent().find('textarea');
        var noteText = textarea.val();

        var cid = textarea.data('id');
        var paragraph_number = textarea.data('paragraph_number');

        var note = app.collections.notes.get(cid);
            note.set('note', noteText);

        // Check to see if the red dot needs to be toggled
        if (noteText !== '') {

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

    // TODO: Delete me?
    setFigureStyles: function() {

        _.each(this.figures, function(figure) {

            // UNWRAPPING FALLBACK DIV
            var fallback_content =  $(figure).find('.figure_content > object > .fallback-content').html();
                                    $(figure).find('.figure_content').html(fallback_content);

            var figcaption = $(figure).find('figcaption').html();
            var position = $(figure).data('position');
            
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
