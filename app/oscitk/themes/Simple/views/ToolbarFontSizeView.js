OsciTk.views.FontSizeToolbar = OsciTk.views.BaseView.extend({
	className: 'font-size-view',
	template: OsciTk.templateManager.get('toolbar-font-size'),
	events: {
		'click .larger' : 'changeFontSize',
		'click .smaller' : 'changeFontSize'
	},

	initialize: function() {
		this.currentFontSize = 100;
	},

	render: function() {
		this.$el.html(this.template());
	},

	changeFontSize: function( e ) {

		e.preventDefault();



		var $target = $(e.currentTarget);

		
		if ( $target.hasClass('larger') && this.currentFontSize < "200") {
			this.currentFontSize += 10;
		}

		if ( $target.hasClass('smaller') && this.currentFontSize > "50")  {
			this.currentFontSize -= 10;
		}


				console.log( this.currentFontSize );

		app.views.sectionView.$el.css({
			"font-size": this.currentFontSize + "%"
		});

		// This moved the figures around if necessary
		Backbone.trigger("windowResized");

	}

});