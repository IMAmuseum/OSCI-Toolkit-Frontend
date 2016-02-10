OsciTk.views.AccountToolbar = OsciTk.views.BaseView.extend({
	events: {
		'click button.login': 'login',
		'click button.register': 'register',
		'click a.register': 'showRegistrationForm',
		'click a.login': 'showLoginForm',
		'click a.logout': 'logout'
	},
	className: 'account-view',
	template: null,
	initialize: function() {

		// see ../../../models/AccountModel.js
		// re-renders form when the account info is ready
		// theoretically, we ought to include accountStateChanged here too
		// but below, we set this.$el.html explicitly, so we don't need it
		this.listenTo(Backbone, 'accountReady', function() {
			
		});

		this.render();
		
	},

	render: function() {

		// determine if user is logged in.  Show login form or user details
		if( app.account.get('id') > 0 ) {
			this.showProfile();
		} else {
			this.showLoginForm();
		}


		return this;
	},

	login: function() {

		// alias this for use in ajax callbacks
		var accountView = this;
		// get user/pass from form
		var username = this.$el.find('#username').val();
		var password = this.$el.find('#password').val();
		// send login request
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'login', username: username, password: password},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				if (data.success === true) {
					// user was logged in, set the returned user data
					app.account.set(data.user);
					accountView.showProfile();
				}
				else {
					// user was not logged in, show error
					accountView.$el.find('div.form-error').html(data.error);
				}
			}
		});
	},

	logout: function() {

		// alias this for use in ajax callback
		var accountView = this;
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'logout'},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				app.account.set(data.user);
				accountView.showLoginForm();
				app.account.set({'email': null});
			}
		});

	},

	register: function() {

		// alias for callbacks
		var accountView = this;
		// get user/pass from form
		var username = this.$el.find('#username').val();
		var password = this.$el.find('#password').val();
		var email = this.$el.find('#email').val();
		// send registration request
		$.ajax({
			url: app.config.get('endpoints').OsciTkAccount,
			data: {action: 'register', username: username, password: password, email: email},
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				if (data.success === true) {
					// user was logged in, set the returned user data
					app.account.set(data.user);
					accountView.showProfile();
				}
				else {
					// user was not logged in, show error
					accountView.$el.find('div.form-error').html(data.error);
				}
			}
		});
	},

	showRegistrationForm: function() {
		this.template = OsciTk.templateManager.get('toolbar-account-register');
		this.$el.html(this.template());
	},

	showLoginForm: function() {
		this.template = OsciTk.templateManager.get('toolbar-account-login');
		this.$el.html(this.template());
	},

	showProfile: function() {
		this.template = OsciTk.templateManager.get('toolbar-account-profile');
		this.$el.html(this.template( app.account.toJSON() ));
	},

	closeOverlay: function() {

		Backbone.trigger("toolbarRemoveViews");
		var section = app.collections.navigationItems.get(this.section_id);
		if (section) {
			this.currentNavigationItem = app.collections.navigationItems.get(section_id);
		} else {
			this.currentNavigationItem = app.collections.navigationItems.first();
		}

		// This causes the page to refresh in a bad way
		//Backbone.trigger('currentNavigationItemChanged', this.currentNavigationItem);

	}

});