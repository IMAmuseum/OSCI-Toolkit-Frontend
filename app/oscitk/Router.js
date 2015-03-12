OsciTk.router = Backbone.Router.extend({

	routes: {
		'' : 'routeToSection',
		'section/:section_id' : 'routeToSection',
		'section/:section_id/:identifier' : 'routeToSection',
	},

    initialize: function(options) {
        this.on('all', this._trackPageView);
    },

	routeToSection: function(section_id, identifier) {
		Backbone.trigger('routedToSection', {section_id: section_id, identifier: identifier});
	},

    _trackPageView: function() {
        var url = Backbone.history.getFragment();
        if (!_.isUndefined(window._gaq)) {
            _gaq.push(['_trackPageview', "/#" + url])
        }
    }
});