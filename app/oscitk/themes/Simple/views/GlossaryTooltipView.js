OsciTk.views.GlossaryTooltip = OsciTk.views.BaseView.extend({
    initialize: function() {
        this.listenTo(Backbone, 'layoutComplete', function() {
            if (app.collections.glossaryTerms.length !== 0) {
                var glossaryLinks = app.views.sectionView.$el.find('a.glossary-term');
                for (var i = 0; i < glossaryLinks.length; i++) {
                    var glossaryRef = $(glossaryLinks[i]);
                    var tid = glossaryRef.data('tid');
                    var item = app.collections.glossaryTerms.get(tid);
                    var term = item.get('term');
                    var definition = item.get('definition');
                    var template = '<h5 class="glossaryTerm">' + term + ': </h5><p class="glossaryDefinition">' + definition + '</p>';
                    glossaryRef.attr("title", template);
                    glossaryRef.attr("data-toggle", "tooltip");
                    glossaryRef.off('click');
                    glossaryRef.bind('click', {'caller': this}, this.glossaryClicked);
                }
                $('[data-toggle="tooltip"]').tooltip({placement: 'bottom', html: true});
            }
        });
    },

    glossaryClicked: function(e) {
        e.preventDefault();
        e.stopPropagation();
    }
});
