
OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    events: {
        "scroll" : "updateProgress",
        'click .content-paragraph': 'paragraphClicked',
        'click .paragraph-button': 'paragraphClicked',
        'click #note-submit': 'noteSubmit',
        'click #cite': 'getCitation',
    },
    initialize: function(options) {
        
        _.bindAll(this, 'updateProgress');
        console.log( this );
        // bind to window
        $(window).scroll(this.updateProgress);
        this.maxHeightSet = false;

        // from MultiColumn
        this.options = options ? options : {};

        _.defaults(this.options, {
            pageView : 'Page'
        });

        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {
            var that = this;
            $("html, body").animate({
                scrollTop: 0
            }, 0);
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

                //console.log( 'SectionView caught cNIC' );

                app.models.section.loadContent();
                that.changeModel(app.models.section);
                that.render();

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

        // console.log( "Rendering section..." );
        
        $('#loader').hide();


        //Allow subclasses to do something before we render
        if (this.preRender) {
            this.preRender();
        }

        //clean up the view incase we have already rendered this before
        //this.model.removeAllPages();
        //this.removeAllChildViews();

        Backbone.trigger("layoutStart");

        this.renderContent();
        
        Backbone.trigger("layoutComplete", {numPages : this.model.get('pages').length});
        


        return this;

    },

    getSectionTitles: function(sectionId) {


        // Save context to avoid setting window variables
        var $this = this;


        // get section sectionTitle, subtitle, and thumbnail for use in template
        _.each(app.collections.navigationItems.models, function(item) {
            if (item.get('id') == sectionId ) {
                $this.sectionTitle = item.get('title');
                $this.sectionSubtitle = item.get('subtitle');
                $this.sectionThumbnail = item.get('thumbnail');
            }
        }, this);

        this.render();
    },

    updateProgress: function() {
        var value = $(window).scrollTop();
        var offset = 400;
        var sectionValue = value - offset;
        $('.progress .progress-bar').attr('aria-valuenow', value);
        if(! this.maxHeightSet) {
            var height = $(document).height();
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName("body")[0],
                cy = g.clientHeight;
            var max = (height-cy)-offset;
            $('.progress .progress-bar').attr('aria-valuemax', max);
            var percent = Math.floor((sectionValue/max)*100);
            $('.progress .progress-bar').attr('style', 'height: '+percent+'%');
        }
        if (value >= offset){
            $('.progress').removeClass('hidden');
        } else {
            $('.progress').addClass('hidden');
        }
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

    paragraphClicked: function(e) {
        if ( app.account.get('email') != null) {
            var p = $(e.currentTarget);
            var paragraphNum = p.data("paragraph_number");
            Backbone.trigger("paragraphClicked", paragraphNum);
        }
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
    },
    onClose: function() {
        this.model.removeAllPages();
    },
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
    getPageNumberForSelector: function(element) {
        var page = $(element).parents(".page");
        if (page) {
            return page.data("page_num");
        }

        return null;
    },
    getPageNumberForElementId : function(id) {
        var views = this.getChildViews();
        var p = _.find(views, function(view) { return view.containsElementId(id); });
        if ((p !== undefined) && (p !== -1)) {
            return _.indexOf(views, p) + 1;
        }
        return null;
    },
    isElementVisible: function(element) {
        return true;
    },
    getPageForProcessing : function(id, newTarget) {
        var page;

        //console.log( id );

        if (id !== undefined) {
            page = this.getChildViewById(id);
        } else {

            page = _.filter(this.getChildViews(), function(page){
                return page.isPageComplete() === false;
            });

            //console.log( page );

/*

            if (page.length === 0) {
                var pagesCollection = app.models.section.attributes.pages;

                if( pagesCollection === null ) {
                    pagesCollection = [{ pageNumber: 1}];
                }else{
                    pagesCollection.add({
                        pageNumber: app.models.section.attributes.pages.length + 1
                    });
                }
*/



            if (page.length < 1) {

                var pagesCollection = app.models.section.attributes.pages;

                if( pagesCollection === null ) {
                    //console.log( app.collections );
                    pagesCollection = new OsciTk.collections.Pages();
                }


                //console.log( pagesCollection );

                pagesCollection.add({
                    pageNumber: pagesCollection.length + 1
                });

                page = new OsciTk.views[this.options.pageView]({
                    model : pagesCollection.last(),
                    pageNumber : pagesCollection.length
                });

                console.log( page );

                this.addView(page, newTarget);

            } else {
                page = page.pop();
            }



        }

        return page;
    },
    getCurrentPageView: function() {
        // TODO: so the only possible child view of a section is a page???
        return this.getChildViewByIndex(app.views.navigationView.page - 1);
    },

    renderContent: function() {
        //basic layout just loads the content into a single page with scrolling
        var pageView = this.getPageForProcessing();

        //add the content to the view/model
        pageView.addContent($(this.model.get('content')));

        //render the view
        pageView.render();

        //mark processing complete (not necessary, but here for example)
        pageView.processingComplete();
    }

});


