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
    initialize: function() {

        _.bindAll(this, 'updateProgress');

        // bind to window
        $(window).scroll(this.updateProgress);
        this.maxHeightSet = false;

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

                })

                // not sure where this is used
                this.ContentId = navItem.get('id');

                // this.model is undefined unless you call this function!
                this.changeModel(app.models.section);

                app.models.section.loadContent();

            }

            $('#loader').hide();

        });

        // TODO: BIND THE PAGE SPLITTING INTO THIS
        this.listenTo(Backbone, 'windowResized', function() {

            this.maxHeightSet = false;
            this.render();

        });

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

            this.figures = figures;
            this.setFigureStyles();

        });

    },

    render: function() {

        //Allow subclasses to do something before we render
        if (this.preRender) {
            this.preRender();
        }

        //clean up the view incase we have already rendered this before
        this.model.removeAllPages();
        this.removeAllChildViews();

        Backbone.trigger("layoutStart");

        this.$el.html(
            this.template( {
                sectionTitle: this.sectionTitle,
                sectionSubtitle: this.sectionSubtitle,
                sectionThumbnail: this.sectionThumbnail,
                content: $(this.content).html()
            } )
        );

        Backbone.trigger("layoutComplete", { numPages : this.model.get('pages').length } );

        return this;
    },

    // Garbage collection
    onClose: function() {
        this.model.removeAllPages();
    },

    // Given a paragraph id, get parent page
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

    // Given an element, get parent page
    getPageNumberForSelector: function(element) {
        var page = $(element).parents(".page");
        if (page) {
            return page.data("page_num");
        }

        return null;
    },

    // Given an #id, get parent page
    getPageNumberForElementId : function(id) {
        var views = this.getChildViews();
        var p = _.find(views, function(view) { return view.containsElementId(id); });
        if ((p !== undefined) && (p !== -1)) {
            return _.indexOf(views, p) + 1;
        }
        return null;
    },

    // TODO: Determine if this is still necessary
    getSectionTitles: function(sectionId) {

        // Save context to avoid setting window variables
        var that = this;

        // Get section sectionTitle, subtitle, and thumbnail for use in template
        _.each(app.collections.navigationItems.models, function(item) {

            if (item.get('id') == sectionId ) {
                that.sectionTitle = item.get('title');
                that.sectionSubtitle = item.get('subtitle');
                that.sectionThumbnail = item.get('thumbnail');
            }

        }, this);

    },

    // MultiColumn: used by InlineNotesView
    getCurrentPageView: function() {
        // TODO: so the only possible child view of a section is a page???
        return this.getChildViewByIndex(app.views.navigationView.page - 1);
    },

    getPageForProcessing : function(id, newTarget) {
        var page;

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

    // TODO: DELETE ME ?
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

    // TODO: OVERRIDE BY MULTI-COLUMN
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
