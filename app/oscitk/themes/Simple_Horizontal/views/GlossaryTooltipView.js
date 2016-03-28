OsciTk.views.GlossaryTooltip = OsciTk.views.BaseView.extend({
    initialize: function() {

        // Also requires packageLoaded
        this.listenTo(Backbone, 'sectionLoaded', function() {
            
            if ( app.collections.glossaryTerms && app.collections.glossaryTerms.length !== 0 ) {

                $('.glossary-term').qtip({
                    content: {
                        title: ' ',
                        text: ' '
                    },
                    position: {
                        viewport: $(window)
                    },
                    style: {
                        classes: 'glossary-tooltip',
                        def: false,
                        width: '200px',
                        tip: {
                            color: '#6699CC',
                        }
                    },
                    events: {
                        show: function(event, api) {
                            var tid = $(event.originalEvent.target).data('tid');
                            var item = app.collections.glossaryTerms.get(tid);
                            // set the tooltip contents
                            api.set('content.title', item.get('term'));
                            api.set('content.text', $(item.get('definition')).text() );
                        }
                    }
                }).click(function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });

                /*

                var glossaryLinks = app.views.sectionView.$el.find('a.glossary-term');
                console.log( glossaryLinks );
                for (var i = 0; i < glossaryLinks.length; i++) {

                    var glossaryRef = $(glossaryLinks[i]);
                    var tid = glossaryRef.data('tid');
                    var item = app.collections.glossaryTerms.get(tid);
                    var term = item.get('term');
                    var definition = item.get('definition');
                    
                    //var template = '<h5 class="glossaryTerm">' + term + ': </h5><p class="glossaryDefinition">' + definition + '</p>';
                    var template = $(definition).text();

                    glossaryRef.attr("title", template);
                    glossaryRef.attr("data-toggle", "tooltip");
                    glossaryRef.off('click');
                    glossaryRef.bind('click', {'caller': this}, this.glossaryClicked );

                }

                $('[data-toggle="tooltip"]').tooltip({placement: 'bottom', html: true});
                */

            }

        });

    }
});
