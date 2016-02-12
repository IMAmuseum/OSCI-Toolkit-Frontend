OsciTk.views.Footnotes = OsciTk.views.BaseView.extend({
	id: 'footnote-view',

	initialize: function() {

		this.listenTo(Backbone, 'layoutComplete', function(params) {

			$('a.footnote-reference').qtip({
                content: {
                    title: null, // no title bar here
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
                        var id = $(event.originalEvent.target).attr('href').slice(1);
                        var item = app.collections.footnotes.get(id);
                        // set the tooltip contents
                        //api.set('content.title', $(item.get('body')).text() );
                        api.set('content.text', $(item.get('body')).text() );
                    }
                }
            }).click(function(e) {
                e.preventDefault();
                e.stopPropagation();
            });


		});
	}
});