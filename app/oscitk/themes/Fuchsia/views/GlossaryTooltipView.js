// app.themeFeatures.glossary must be true
OsciTk.views.GlossaryTooltip = OsciTk.views.BaseView.extend({
    initialize: function() {
        this.listenTo(Backbone, 'layoutComplete', this.glossaryProcess );
    },

    glossaryClicked: function(e) {
        e.preventDefault();
        e.stopPropagation();
    },

    glossaryProcess: function() {

        if (app.collections.glossaryTerms.length !== 0) {

            // Loop through the glossary links inside this section
            var glossaryLinks = app.views.sectionView.$el.find('a.glossary-term');

            for (var i = 0; i < glossaryLinks.length; i++) {

                var $link = $( glossaryLinks[i] );
                var tid = $link.data('tid'); // term id

                var item = app.collections.glossaryTerms.get( tid );
                var term = item.get('term');
                var definition = item.get('definition');

                // definition needs some serious clean-up ugh
                definition = $( definition ).text();

                $link.attr("title", definition );

                $link.attr("data-toggle", "tooltip");
                $link.off('click');
                $link.bind('click', {'caller': this}, this.glossaryClicked);

            }

            $('[data-toggle="tooltip"]').tooltip( { placement: 'bottom', html: false } );

        }

    }


});