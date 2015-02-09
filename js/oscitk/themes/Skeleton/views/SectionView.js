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
        //Allow subclasses to do something before we render
        if (this.preRender) {
            this.preRender();
        }
        //clean up the view incase we have already rendered this before
        this.model.removeAllPages();
        this.removeAllChildViews();

        Backbone.trigger("layoutStart");
        this.renderContent();
        Backbone.trigger("layoutComplete", {numPages : this.model.get('pages').length});
        return this;
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
