OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    initialize: function(options) {
        this.options = options ? options : {};

        _.defaults(this.options, {
            pageView : 'Page'
        });

        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {
            var that = this;
            $('#section-view').empty();
            $('.header-view').empty();
            $('#loader').show();

            $('#loader').fadeTo(500, 0.7, function() {

                if (navItem) {
                    // loading section content
                    app.models.section = new OsciTk.models.Section({
                        uri : navItem.get('uri'),
                        id : navItem.get('id')
                    });

                    app.models.section.loadContent();
                    that.changeModel(app.models.section);
                    that.render();
                }

                $('#loader').hide();
            });
        });

    },
    render: function() {
        //clean up the view incase we have already rendered this before
        this.model.removeAllPages();
        this.removeAllChildViews();
        this.renderContent();
        Backbone.trigger("layoutComplete", {numPages : this.model.get('pages').length});
        return this;
    },

    getPageForProcessing : function(id, newTarget) {
        var page;

        if (id !== undefined) {
            page = this.getChildViewById(id);
        } else {
            page = _.filter(this.getChildViews(), function(page){
                return page.isPageComplete() === false;
            });

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
