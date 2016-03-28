app = {
    router : undefined,
    config : undefined,
    views : {},
    models : {},
    collections : {},

    bootstrap : function(config) {

        this.config = new OsciTk.models.Config(config);
        this.router = new OsciTk.router();
        this.features = this.config.get('themeFeatures');

        this.collections.figures = new OsciTk.collections.Figures();
        this.collections.footnotes = new OsciTk.collections.Footnotes();
        this.collections.navigationItems = new OsciTk.collections.NavigationItems();

        // only three features are dependent on theme features configuraton
        if (this.features.notes) {
            this.collections.notes = new OsciTk.collections.Notes();
        }
        if (this.features.account) {
            this.account = new OsciTk.models.Account();
        }
        if (this.features.glossary) {
            this.collections.glossaryTerms = new OsciTk.collections.GlossaryTerms();
        }

        // setup window resizing, to trigger an event
        window.onresize = function() {

            if (window.resizeTimer) {
                clearTimeout(window.resizeTimer);
            }

            var onWindowResize = function(){
                Backbone.trigger('windowResized');
            };

            window.resizeTimer = setTimeout(onWindowResize, 200);
        };

        // init main view
        this.views.app = new OsciTk.views.App();
    },

    run : function() {
        // load package document
        this.models.docPackage = new OsciTk.models.Package({url: this.config.get('packageUrl')});
        Backbone.history.start();
    }
};
