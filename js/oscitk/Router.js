if (window.location.hash) {
	//reroute #! urls
	window.location.hash = window.location.hash.replace(/#!/, '/');
}

OsciTk.router = Backbone.Router.extend({

	routes: {
		'' : 'routeToSection',
		'section/:section_id' : 'routeToSection',
		'section/:section_id/:identifier' : 'routeToSection'
	},

	initialize: function() {
		this.bind('route', this._pageView);
	},

	routeToSection: function(section_id, identifier) {
		Backbone.trigger('routedToSection', {section_id: section_id, identifier: identifier});
	},
	
	_pageView: function() {
	  var path = Backbone.history.getFragment();
	  dataLayer.push({
		'event': 'vpv',
		'pageview': '/' + path
	  })
	}

});