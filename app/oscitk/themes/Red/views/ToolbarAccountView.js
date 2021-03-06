// TODO: Check if user is logged in immediately
// Don't show the Login screen if there's a cookie / session in place

OsciTk.views.AccountToolbar = OsciTk.views.BaseView.extend({
	events: {
		'click button.login': 'login',
		'click button.register': 'register',
		'click a.register': 'showRegistrationForm',
		'click a.login': 'showLoginForm',
		'click a.logout': 'logout',
	},
	className: 'toolbar-account-view',
	template: null,

	initialize: function() {

		// see ../../../models/AccountModel.js
		// re-renders form when the account info is retrieved
		this.listenTo(Backbone, 'accountReady', function(sectionModel) {
			this.render();
		});

		this.listenTo(Backbone, 'sectionLoaded', function(sectionModel) {
			this.sectionId = sectionModel.get('id');
		});

		console.log("account toolbar inited");
		this.render();

	},

	render: function() {


		// determine if user is logged in.  Show login form or user details
		if (app.account && app.account.get('id') > 0) {
			this.showProfile();
		}
		else {
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

					app.account.set( {
						username: data.user.username,
						email: data.user.email,
						id: parseInt(data.user.id)
					});

					accountView.showProfile();

					Backbone.trigger("accountStateChanged");

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

				// The data returned doesn't quite match the js model
				// { email: null, id: "1", uid: 0, username: "anonymous" }

				app.account.set( app.account.defaults );
				accountView.showLoginForm();

				Backbone.trigger("accountStateChanged");

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

					Backbone.trigger("accountStateChanged");

				}
				else {

					// user was not logged in, show error
					accountView.$el.find('div.form-error').html(data.error);

				}

			}
		});

	},

	showRegistrationClicked: function(e) {

		e.preventDefault();
		e.stopPropagation();
		this.showRegistrationForm();

	},

	showLoginClicked: function(e) {

		e.preventDefault();
		e.stopPropagation();
		this.showLoginForm();

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
		this.$el.html(this.template(app.account.toJSON()));

	},


});