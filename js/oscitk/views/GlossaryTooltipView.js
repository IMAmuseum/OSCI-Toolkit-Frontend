OsciTk.views.GlossaryTooltip = OsciTk.views.BaseView.extend({
	initialize: function() {
		app.dispatcher.on('layoutComplete', function() {
			$('.glossary-term').qtip({
				content: {
					title: 'Title',
					text: 'Definition'
				},
				position: {
					viewport: $(window)
				},
				style: {
					classes: 'glossary-tooltip',
					def: false,
					width: app.views.sectionView.dimensions.columnWidth + 'px'
				},
				events: {
					show: function(event, api) {
						$('.glossary-tooltip').not(event.target).qtip('destroy');

						var tid = $(event.originalEvent.target).data('tid');
						var item = app.collections.glossaryTerms.get(tid);
						// set the tooltip contents
						api.set('content.title.text', item.get('term'));
						api.set('content.text', item.get('definition'));
					}
				}
			});
		});
	}
});