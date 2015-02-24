OsciTk.views.Section = OsciTk.views.BaseView.extend({
    id: 'section-view',
    template: OsciTk.templateManager.get('section'),
    initialize: function() {
        // bind sectionChanged
        this.listenTo(Backbone, 'currentNavigationItemChanged', function(navItem) {
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

                app.models.section.loadContent();
                this.changeModel(app.models.section);
            }
        });

        this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
            this.content =  sectionModel.get('content')[0].children.body;
            $('#loader').hide();
            this.render();
        });

    },

    render: function() {
        this.$el.html(this.template({content: $(this.content).html()}));
        Backbone.trigger("layoutComplete");
        return this;
    }

});
