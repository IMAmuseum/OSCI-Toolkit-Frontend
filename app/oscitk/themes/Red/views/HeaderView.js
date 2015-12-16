// Clickable back-forward buttons to cycle b/w sections
// Make clicking on login / menu cause actions
// Adjust the menu icon background-size

OsciTk.views.Header = OsciTk.views.BaseView.extend({
	className: 'header-view',
	events: {
		'click #header-menu-button': 'menuClick',
		'click #header-login-button': 'loginClick'
	},
	template: OsciTk.templateManager.get('header'),

	initialize: function() {

		this.sectionId = null;

		this.pubTitle = null;
		this.sectionTitle = null;
		this.sectionSubtitle = null;

		this.username = null;

		this.listenTo(Backbone, 'packageLoaded', function(packageModel) {
			this.pubTitle = packageModel.getTitle();
		});

		this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
			this.sectionId = sectionModel.get('id');
			this.render();
		});

		// Change the Login button text when account actions happen
		this.listenTo( Backbone, 'accountReady accountStateChanged', function() {
			if( app.account.get('id') > 0 ) {
				this.username = app.account.get('username');
			} else {
				this.username = null;
			}
			
			this.render();
		});

	},
	render: function( ) {

		// Save context - otherwise the section stuff gets set to Window!
		// It actually does get inherited down to the view, I think, but that's bad.
		var $this = this;

		// get section sectionTitle, subtitle, and thumbnail for use in template
		_.each(app.collections.navigationItems.models, function(item) {
			if (item.get('id') == $this.sectionId ) {
				$this.sectionTitle = item.get('title');
				$this.sectionSubtitle = item.get('subtitle');
			}
		});


		this.$el.html(this.template({
			username: this.username,
			pubTitle: this.pubTitle,
			sectionTitle: this.sectionTitle,
			sectionSubtitle: this.sectionSubtitle
		}));

		//console.log( this );


		return this;
	},

	menuClick: function(){
		Backbone.trigger('menuClicked');
	},

	loginClick: function() {
		Backbone.trigger('loginClicked');
	}

});